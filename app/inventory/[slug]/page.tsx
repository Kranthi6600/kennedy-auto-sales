"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Seo from "../../../components/Seo";
import { fetchInventoryBySlug, fetchInventory, type InventoryDetailItem, type InventoryItem } from "../../../lib/api";
import { sanitizeHtml, stripTags } from "../../../lib/sanitize";
import { useCompare } from "../../../lib/useCompare";

export default function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { addToCompare, removeFromCompare, isInCompare, maxReached, mounted } = useCompare();
  const [item, setItem] = useState<InventoryDetailItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");
  const lightboxRef = useRef<HTMLDivElement>(null);
  const [slug, setSlug] = useState<string>("");
  const [recommended, setRecommended] = useState<InventoryItem[]>([]);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchInventoryBySlug(slug)
      .then((res) => {
        if (!cancelled) {
          setItem(res.item);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'Failed to load vehicle');
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    fetchInventory({ type: "vehicle", limit: 5, sortBy: "created_at", sortOrder: "desc" })
      .then((res) => {
        if (!cancelled) {
          setRecommended(res.data.filter((v) => v.slug !== slug).slice(0, 4));
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    if (!modalOpen) return;
    const imgs = item?.images?.map((i) => i.url).filter(Boolean) ?? [];
    const count = imgs.length || (item?.thumbnail ? 1 : 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
      else if (e.key === "ArrowLeft" && count > 1) setActiveImg((i) => (i - 1 + count) % count);
      else if (e.key === "ArrowRight" && count > 1) setActiveImg((i) => (i + 1) % count);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modalOpen, item]);

  useEffect(() => {
    if (!modalOpen) return;
    const el = lightboxRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const img = el.querySelector("img");
      if (img) {
        const rect = img.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomOrigin(
          `${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`
        );
      }
      setZoom((z) => Math.min(4, Math.max(1, z + (e.deltaY < 0 ? 0.25 : -0.25))));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [modalOpen]);

  useEffect(() => {
    setZoom(1);
    setZoomOrigin("50% 50%");
  }, [modalOpen, activeImg]);

  const formatPrice = (v: InventoryDetailItem) => {
    if (!v.price_visible) return 'Contact for pricing';
    if (v.price_label) return v.price_label;
    if (v.price === null) return 'Contact for pricing';
    if (v.price === 0) return 'Free';
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: v.currency || 'CAD', maximumFractionDigits: 0 }).format(v.price);
  };

  const formatMileage = (v: InventoryDetailItem) => {
    const m = v.attributes?.mileage;
    if (!m) return 'N/A';
    const num = parseInt(m, 10);
    if (isNaN(num)) return m;
    return `${num.toLocaleString()} KM`;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <section className="subpage-section">
          <div className="car-detail-loading">
            <div className="car-detail-skeleton">
              <div className="skeleton-img skeleton-large" />
              <div className="skeleton-body">
                <div className="skeleton-line w-60" />
                <div className="skeleton-line w-40" />
                <div className="skeleton-line w-80" />
                <div className="skeleton-line w-50" />
                <div className="skeleton-line w-70" />
                <div className="skeleton-line w-30" />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (error || !item) {
    return (
      <>
        <Navbar />
        <section className="subpage-section">
          <div className="inv-error-state">
            <p>{error || 'Vehicle not found'}</p>
            <Link href="/inventory" className="cta-main-btn">Back to Inventory →</Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const imageUrls: string[] = item.images?.length
    ? item.images.map((img) => img.url).filter(Boolean)
    : [];
  const imageAlts: string[] = item.images?.length
    ? item.images.map((img) => img.alt || item.title)
    : [];
  const allImages: string[] = imageUrls.length > 0
    ? imageUrls
    : item.thumbnail
      ? [item.thumbnail]
      : [];
  const allAlts: string[] = imageAlts.length > 0
    ? imageAlts
    : item.thumbnail
      ? [item.thumbnail_alt || item.title]
      : [];
  const carfaxUrl = item.attributes?.carfax_url;
  const selected = mounted && isInCompare(item.id);
  const disabled = !selected && maxReached;

  const specs: { label: string; value: string }[] = [
    { label: 'Mileage', value: formatMileage(item) },
    { label: 'Engine', value: item.attributes?.engine_size ? `${item.attributes.engine_size}L` : 'N/A' },
    { label: 'Drivetrain', value: item.attributes?.drivetrain || 'N/A' },
    { label: 'Fuel Type', value: item.attributes?.fuel_type || 'N/A' },
    { label: 'Transmission', value: item.attributes?.transmission || 'N/A' },
    { label: 'Body Style', value: item.attributes?.body_type || 'N/A' },
    { label: 'Exterior Color', value: item.attributes?.exterior_color || 'N/A' },
    { label: 'Interior Color', value: item.attributes?.interior_color || 'N/A' },
    { label: 'Doors', value: item.attributes?.doors || 'N/A' },
    { label: 'Seats', value: item.attributes?.seats || 'N/A' },
    { label: 'Condition', value: item.attributes?.condition || 'N/A' },
    { label: 'Year', value: item.attributes?.year || 'N/A' },
  ];

  return (
    <>
      <Seo
        title={`${item.title} | Kennedy Auto Sales`}
        description={stripTags(item.description || item.attributes?.condition || 'View this vehicle at Kennedy Auto Sales.')}
        ogTitle={item.title}
        ogDescription={stripTags(item.description || '')}
        ogImage={item.thumbnail || item.images?.[0]?.url || undefined}
        canonicalPath={`/inventory/${slug}`}
      />
      <Navbar />

      <section className="subpage-section car-detail-section">
        <div className="car-detail-breadcrumb">
          <Link href="/inventory">← Back to Inventory</Link>
        </div>

        <div className="car-detail-layout">
          <div className="car-detail-gallery">
            <div className="car-detail-main-img">
              <img
                src={allImages[activeImg] || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80'}
                alt={allAlts[activeImg] || item.title}
                fetchPriority="high"
                decoding="async"
                onClick={() => allImages.length > 0 && setModalOpen(true)}
              />
              {item.featured && <span className="car-detail-badge">Featured</span>}
              {allImages.length > 1 && (
                <>
                  <button
                    type="button"
                    className="car-detail-arrow car-detail-arrow-prev"
                    aria-label="Previous image"
                    onClick={() => setActiveImg((i) => (i - 1 + allImages.length) % allImages.length)}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="car-detail-arrow car-detail-arrow-next"
                    aria-label="Next image"
                    onClick={() => setActiveImg((i) => (i + 1) % allImages.length)}
                  >
                    ›
                  </button>
                </>
              )}
              {allImages.length > 0 && (
                <button
                  type="button"
                  className="car-detail-expand"
                  aria-label="View fullscreen"
                  onClick={() => setModalOpen(true)}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                  Full View
                </button>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="car-detail-thumbs">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    className={`car-detail-thumb ${i === activeImg ? 'active' : ''}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt={allAlts[i] || `${item.title} - Image ${i + 1}`} loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="car-detail-info glass-card">
            <div className="car-detail-header">
              <h1 className="car-detail-title">{item.title}</h1>
              <div className="car-detail-header-side">
                {item.category && <span className="car-detail-cat">{item.category.name}</span>}
                {carfaxUrl && (
                  <a
                    href={carfaxUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="carfax-badge"
                    aria-label="View CARFAX report"
                  >
                    <img src="/assets/CARFAX.jpg" alt="CARFAX report" />
                  </a>
                )}
              </div>
            </div>

            <div className="car-detail-price">
              <span className="car-detail-price-tag">{formatPrice(item)}</span>
              {item.price_visible && item.price ? <span className="car-detail-price-note">+ tax & licensing</span> : null}
              {item.attributes?.condition && <span className="car-detail-cat">{item.attributes.condition}</span>}
            </div>

            {item.description && <p className="car-detail-desc">{stripTags(item.description)}</p>}

            <div className="car-detail-actions">
              <button
                className={`inv-btn-secondary ${selected ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
                onClick={() => selected ? removeFromCompare(item.id) : addToCompare(item)}
                disabled={disabled}
              >
                {selected ? '✓ Comparing' : disabled ? 'Max 4' : 'Add to Compare'}
              </button>
              <Link href="/contact" className="inv-cta">Inquire Now →</Link>
            </div>


            <div className="car-detail-specs">
              <h3>Specifications</h3>
              <div className="car-detail-specs-grid">
                {specs.map((s) => (
                  <div key={s.label} className="car-detail-spec-item">
                    <span className="inv-spec-label">{s.label}</span>
                    <span className="inv-spec-val">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {item.tags && item.tags.length > 0 && (
              <div className="car-detail-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="car-detail-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {item.content && (
          <div className="car-detail-content glass-card">
            <h3>About This Vehicle</h3>
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.content) }} />
          </div>
        )}

        {recommended.length > 0 && (
          <div className="car-detail-recommended">
            <h2 className="car-detail-recommended-title">Recommended from this dealer</h2>
            <div className="car-detail-recommended-grid">
              {recommended.map((v) => (
                <Link key={v.id} href={`/inventory/${v.slug}`} className="inv-card glass-card">
                  <div className="inv-card-img">
                    <img
                      src={v.thumbnail || v.images?.[0]?.url || "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80"}
                      alt={v.thumbnail_alt || v.title}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="inv-tag">{v.attributes?.body_type || "Vehicle"}</span>
                  </div>
                  <div className="inv-card-body">
                    <h3 className="inv-card-title">{v.title}</h3>
                    <div className="inv-card-specs">
                      <span>{v.attributes?.year || ""}</span>
                      <span>{v.attributes?.mileage ? `${parseInt(v.attributes.mileage).toLocaleString()} KM` : "N/A"}</span>
                      <span>{v.attributes?.fuel_type || "N/A"}</span>
                    </div>
                    <span className="inv-card-price">
                      {v.price_visible ? (v.price_label || (v.price ? new Intl.NumberFormat("en-CA", { style: "currency", currency: v.currency || "CAD", maximumFractionDigits: 0 }).format(v.price) : "Contact for pricing")) : "Contact for pricing"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="car-detail-cta-row">
          <Link href="/inventory" className="cta-main-btn">Back to Inventory →</Link>
        </div>
      </section>

      {modalOpen && allImages.length > 0 && (
        <div className="car-lightbox" ref={lightboxRef} onClick={() => setModalOpen(false)}>
          <button
            type="button"
            className="car-lightbox-close"
            aria-label="Close full view"
            onClick={() => setModalOpen(false)}
          >
            ×
          </button>
          {allImages.length > 1 && (
            <>
              <button
                type="button"
                className="car-detail-arrow car-detail-arrow-prev"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImg((i) => (i - 1 + allImages.length) % allImages.length);
                }}
              >
                ‹
              </button>
              <button
                type="button"
                className="car-detail-arrow car-detail-arrow-next"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImg((i) => (i + 1) % allImages.length);
                }}
              >
                ›
              </button>
            </>
          )}
          <img
            src={allImages[activeImg]}
            alt={allAlts[activeImg] || item.title}
            className={zoom > 1 ? "zoomed" : undefined}
            style={{ transform: `scale(${zoom})`, transformOrigin: zoomOrigin }}
            onClick={(e) => e.stopPropagation()}
          />
          <span className="car-lightbox-counter">{activeImg + 1} / {allImages.length}</span>
        </div>
      )}

      <Footer />
    </>
  );
}
