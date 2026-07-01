"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { fetchServiceBySlug, fetchServices, type ServiceDetailItem, type ServiceItem } from "../../../lib/api";
import { sanitizeHtml, stripTags } from "../../../lib/sanitize";

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>("");
  const [service, setService] = useState<ServiceDetailItem | null>(null);
  const [otherServices, setOtherServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchServiceBySlug(slug)
      .then((res) => {
        if (!cancelled) {
          setService(res.service ?? res.data ?? res);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Failed to load service");
          setLoading(false);
        }
      });
    fetchServices({ limit: 100 })
      .then((res) => {
        if (!cancelled) {
          const list = Array.isArray(res) ? res : (res.services ?? res.data ?? []);
          setOtherServices(list.filter((s) => s.slug !== slug).slice(0, 4));
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [slug]);

  if (loading || !slug) {
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
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (error || !service) {
    return (
      <>
        <Navbar />
        <section className="subpage-section">
          <div className="inv-error-state">
            <p>{error || "Service not found."}</p>
            <Link href="/services" className="cta-main-btn">Back to Services →</Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="subpage-section service-detail-section">
        <div className="car-detail-breadcrumb">
          <Link href="/services">← Back to Services</Link>
        </div>

        <div className="service-detail-hero glass-card">
          {service.thumbnail && (
            <div className="service-detail-hero-img">
              <img
                src={service.thumbnail}
                alt={service.thumbnail_alt || service.title}
                fetchPriority="high"
                decoding="async"
              />
            </div>
          )}
          <div className="service-detail-hero-text">
            <span className="section-eyebrow">OUR SERVICES</span>
            <h1 className="service-detail-title">{service.title}</h1>
            <p className="service-detail-tagline">{stripTags(service.description || "")}</p>
            {service.wehoware_service_categories && (
              <span className="service-detail-category">{service.wehoware_service_categories.name}</span>
            )}
            {service.duration && (
              <span className="service-detail-duration">⏱ {service.duration}</span>
            )}
            {service.fee !== null && service.fee !== undefined && (
              <span className="service-detail-fee">
                {service.fee_label || `${service.fee} ${service.fee_currency || ""}`}
              </span>
            )}
          </div>
        </div>

        <div className="service-detail-layout">
          <div className="service-detail-main">
            {service.content && (
              <div className="service-detail-overview glass-card">
                <h2>Overview</h2>
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(service.content) }} />
              </div>
            )}

            {service.description && !service.content && (
              <div className="service-detail-overview glass-card">
                <h2>Overview</h2>
                <p>{service.description}</p>
              </div>
            )}

            {service.tags && service.tags.length > 0 && (
              <div className="service-detail-key-points glass-card">
                <h2>Key Benefits</h2>
                <ul className="service-points-large">
                  {service.tags.map((tag, i) => (
                    <li key={i}>
                      <span className="service-check">✓</span>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.faqs && service.faqs.length > 0 && (
              <div className="service-detail-faqs">
                <h2>Frequently Asked Questions</h2>
                <div className="service-faq-list">
                  {service.faqs.map((faq, i) => (
                    <div key={faq.id || i} className="service-faq-item">
                      <button
                        className={`service-faq-q ${openFaq === i ? 'open' : ''}`}
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      >
                        {faq.question}
                        <span className="service-faq-toggle">{openFaq === i ? '−' : '+'}</span>
                      </button>
                      {openFaq === i && (
                        <div className="service-faq-a">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {service.related_blogs && service.related_blogs.length > 0 && (
              <div className="service-detail-related">
                <h2>Related Articles</h2>
                <div className="service-related-grid">
                  {service.related_blogs.map((blog) => (
                    <Link key={blog.id} href={`/blogs/${blog.slug}`} className="service-related-card glass-card">
                      {blog.thumbnail && (
                        <img src={blog.thumbnail} alt={blog.title} loading="lazy" decoding="async" />
                      )}
                      <h3>{blog.title}</h3>
                      {blog.excerpt && <p>{stripTags(blog.excerpt)}</p>}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="service-detail-sidebar">
            <div className="service-detail-cta-card glass-card">
              <h3>{service.cta_heading || "Ready to get started?"}</h3>
              <p>{service.cta_body || "Contact us today to learn more about this service."}</p>
              <Link
                href={service.cta_button_url || "/contact"}
                className="cta-main-btn"
              >
                {service.cta_button_text || "Get in Touch →"}
              </Link>
              <Link href="/inventory" className="service-detail-secondary-link">Browse Inventory →</Link>
            </div>

            {otherServices.length > 0 && (
              <div className="service-detail-other">
                <h3>Other Services</h3>
                {otherServices.map((s) => (
                  <Link key={s.id} href={`/services/${s.slug}`} className="service-detail-other-item">
                    <span>{s.title}</span>
                    <span className="service-detail-other-arrow">→</span>
                  </Link>
                ))}
              </div>
            )}
          </aside>
        </div>

        <div className="service-detail-bottom-cta">
          <h2>Have questions? We're here to help.</h2>
          <p>Visit our showroom or reach out online — our team is ready to assist you.</p>
          <Link href="/contact" className="cta-main-btn">Contact Us →</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
