"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { fetchServices, type ServiceItem } from "../../lib/api";
import { stripTags } from "../../lib/sanitize";

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchServices({ limit: 100, sortBy: "created_at", sortOrder: "desc" })
      .then((res) => {
        if (!cancelled) {
          const list = Array.isArray(res) ? res : (res.services ?? res.data ?? []);
          setServices(list);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Failed to load services");
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <Navbar />

      <section className="subpage-section">
        <div className="subpage-header">
          <span className="section-eyebrow">WHAT WE OFFER</span>
          <h1 className="subpage-title">Our Services</h1>
          <p className="subpage-subtitle">Everything you need to find, finance, and maintain your next vehicle — all under one roof.</p>
        </div>

        {error && (
          <div className="inv-error-state">
            <p>Failed to load services: {error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}

        {loading ? (
          <div className="inv-loading-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="inv-card-skeleton">
                <div className="skeleton-img" />
                <div className="skeleton-body">
                  <div className="skeleton-line w-60" />
                  <div className="skeleton-line w-40" />
                  <div className="skeleton-line w-80" />
                  <div className="skeleton-line w-50" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="services-grid">
            {services.map((service) => (
              <Link key={service.id} href={`/services/${service.slug}`} className="service-card glass-card">
                {service.thumbnail && (
                  <div className="service-card-img">
                    <img
                      src={service.thumbnail}
                      alt={service.thumbnail_alt || service.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <div className="service-card-body">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{stripTags(service.description || "")}</p>
                  {service.tags && service.tags.length > 0 && (
                    <ul className="service-points">
                      {service.tags.slice(0, 3).map((tag, j) => (
                        <li key={j}>✓ {tag}</li>
                      ))}
                    </ul>
                  )}
                  {service.fee !== null && service.fee !== undefined && (
                    <span className="service-fee">{service.fee_label || `${service.fee} ${service.fee_currency || ""}`}</span>
                  )}
                  <span className="service-card-link">Learn More →</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="services-cta">
          <h2>Ready to get started?</h2>
          <p>Visit our showroom or book online today.</p>
          <a href="/" className="cta-main-btn">Back to Home →</a>
        </div>
      </section>

      <Footer />
    </>
  );
}
