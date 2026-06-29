"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { fetchInventoryBySlug, type InventoryDetailItem } from "../../../lib/api";
import { sanitizeHtml, stripTags } from "../../../lib/sanitize";
import { useCompare } from "../../../lib/useCompare";

export default function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { addToCompare, removeFromCompare, isInCompare, maxReached, mounted } = useCompare();
  const [item, setItem] = useState<InventoryDetailItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [slug, setSlug] = useState<string>("");

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
              />
              {item.featured && <span className="car-detail-badge">Featured</span>}
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
              {item.category && <span className="car-detail-cat">{item.category.name}</span>}
            </div>

            <div className="car-detail-price">
              <span className="car-detail-price-tag">{formatPrice(item)}</span>
              {item.price_visible && item.price ? <span className="car-detail-price-note">+ tax & licensing</span> : null}
            </div>

            <p className="car-detail-desc">{stripTags(item.description || item.attributes?.condition || 'No description available.')}</p>

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

        <div className="car-detail-cta-row">
          <Link href="/inventory" className="cta-main-btn">Back to Inventory →</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
