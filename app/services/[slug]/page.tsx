"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { services, getServiceBySlug } from "../../../lib/services";

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!slug) {
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

  if (!service) {
    return (
      <>
        <Navbar />
        <section className="subpage-section">
          <div className="inv-error-state">
            <p>Service not found.</p>
            <Link href="/services" className="cta-main-btn">Back to Services →</Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Navbar />

      <section className="subpage-section service-detail-section">
        <div className="car-detail-breadcrumb">
          <Link href="/services">← Back to Services</Link>
        </div>

        <div className="service-detail-hero glass-card">
          <div className="service-detail-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={service.icon} />
            </svg>
          </div>
          <div className="service-detail-hero-text">
            <span className="section-eyebrow">OUR SERVICES</span>
            <h1 className="service-detail-title" dangerouslySetInnerHTML={{ __html: service.title }} />
            <p className="service-detail-tagline">{service.desc}</p>
          </div>
        </div>

        <div className="service-detail-layout">
          <div className="service-detail-main">
            <div className="service-detail-overview glass-card">
              <h2>Overview</h2>
              <p>{service.longDesc}</p>
            </div>

            <div className="service-detail-features">
              <h2>What's Included</h2>
              <div className="service-features-grid">
                {service.features.map((f, i) => (
                  <div key={i} className="service-feature-card glass-card">
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="service-detail-key-points glass-card">
              <h2>Key Benefits</h2>
              <ul className="service-points-large">
                {service.points.map((point, i) => (
                  <li key={i}>
                    <span className="service-check">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="service-detail-faqs">
              <h2>Frequently Asked Questions</h2>
              <div className="service-faq-list">
                {service.faqs.map((faq, i) => (
                  <div key={i} className="service-faq-item">
                    <button
                      className={`service-faq-q ${openFaq === i ? 'open' : ''}`}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      {faq.q}
                      <span className="service-faq-toggle">{openFaq === i ? '−' : '+'}</span>
                    </button>
                    {openFaq === i && (
                      <div className="service-faq-a">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="service-detail-sidebar">
            <div className="service-detail-cta-card glass-card">
              <h3>Ready to get started?</h3>
              <p>Contact us today to learn more about this service.</p>
              <Link href="/contact" className="cta-main-btn">Get in Touch →</Link>
              <Link href="/inventory" className="service-detail-secondary-link">Browse Inventory →</Link>
            </div>

            <div className="service-detail-other">
              <h3>Other Services</h3>
              {otherServices.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="service-detail-other-item">
                  <div className="service-detail-other-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={s.icon} />
                    </svg>
                  </div>
                  <span dangerouslySetInnerHTML={{ __html: s.title }} />
                </Link>
              ))}
            </div>
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
