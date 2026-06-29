import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { services } from '../../lib/services';

export const metadata: Metadata = {
  title: 'Services — Kennedy Auto Sales',
  description: 'Financing, trade-in valuation, test drives, home delivery, and certified pre-owned inspections at Kennedy Auto Sales.',
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <section className="subpage-section">
        <div className="subpage-header">
          <span className="section-eyebrow">WHAT WE OFFER</span>
          <h1 className="subpage-title">Our Services</h1>
          <p className="subpage-subtitle">Everything you need to find, finance, and maintain your next vehicle — all under one roof.</p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <Link key={i} href={`/services/${service.slug}`} className="service-card glass-card">
              <div className="service-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={service.icon} />
                </svg>
              </div>
              <h3 className="service-title" dangerouslySetInnerHTML={{ __html: service.title }} />
              <p className="service-desc">{service.desc}</p>
              <ul className="service-points">
                {service.points.map((point, j) => (
                  <li key={j}>✓ {point}</li>
                ))}
              </ul>
              <span className="service-card-link">Learn More →</span>
            </Link>
          ))}
        </div>

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
