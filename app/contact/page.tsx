import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ContactForm = dynamic(() => import('../../components/ContactForm'), {
  loading: () => (
    <div className="contact-form-wrap glass-card">
      <div className="contact-form-title">Send us a message</div>
      <div style={{ padding: '2rem 0' }}>
        <div className="skeleton-line w-60" />
        <div className="skeleton-line w-40" />
        <div className="skeleton-line w-80" />
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: 'Contact — Kennedy Auto Sales',
  description: 'Get in touch with Kennedy Auto Sales in Scarborough, Ontario. Visit our showroom, call, or send us a message.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <section className="subpage-section">
        <div className="subpage-header">
          <span className="section-eyebrow">GET IN TOUCH</span>
          <h1 className="subpage-title">Contact Us</h1>
          <p className="subpage-subtitle">Have questions? We're here to help you find your perfect vehicle.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-card glass-card">
              <div className="contact-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <span className="contact-card-label">Phone</span>
                <a href="tel:+14165551234" className="contact-card-value">(416) 555-1234</a>
              </div>
            </div>

            <div className="contact-card glass-card">
              <div className="contact-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <span className="contact-card-label">Email</span>
                <a href="mailto:info@kennedyautosales.ca" className="contact-card-value">info@kennedyautosales.ca</a>
              </div>
            </div>

            <div className="contact-card glass-card">
              <div className="contact-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <span className="contact-card-label">Address</span>
                <span className="contact-card-value">1425 Kennedy Rd<br />Kennedy &amp; Ellesmere</span>
              </div>
            </div>

            <div className="contact-card glass-card">
              <div className="contact-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
              </div>
              <div>
                <span className="contact-card-label">Hours</span>
                <span className="contact-card-value">
                  Mon–Fri: 9:00 AM – 7:00 PM<br />
                  Saturday: 9:00 AM – 5:00 PM<br />
                  Sunday: Closed
                </span>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
