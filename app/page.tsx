import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CarSceneLazy from '../components/CarSceneLazy';
import HomeInventory from '../components/HomeInventory';
import HomeBlogs from '../components/HomeBlogs';
import BrandShowcase from '../components/BrandShowcase';
import FinanceCalculator from '../components/FinanceCalculator';
import BuyingJourneyTimeline from '../components/BuyingJourneyTimeline';
import TradeInEstimator from '../components/TradeInEstimator';
import HeroPricing from '../components/HeroPricing';
import EventCard from '../components/EventCard';
import MobileDragToggle from '../components/MobileDragToggle';

export default function Home() {
  return (
    <>
      <div className="noise-overlay" />

      {/* Global liquid-glass SVG distortion filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter id="lg-distort" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.004 0.008" numOctaves={1} result="turbulence" />
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="35" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <Navbar />

      {/* HERO SECTION */}
      <section className="section hero-section" id="hero-section">
        <CarSceneLazy />

        {/* Event card */}
        <EventCard />

        {/* Hero text */}
        <div className="hero-text" id="hero-text">
          <span className="hero-eyebrow">EXPLORE HOME</span>
          <h1 className="hero-headline">
            <span className="hl-line">FIND YOUR</span>
            <span className="hl-line">DREAM</span>
            <span className="hl-line">MACHINE</span>
          </h1>
          <p className="hero-brand">Kennedy Auto Sales</p>
          <HeroPricing />
        </div>

        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span>scroll</span>
        </div>
        <div className="drag-hint">↔ drag to rotate</div>

        {/* Mobile rotate toggle — placed above heading */}
        <MobileDragToggle />
      </section>

      {/* SECTION 2 — STATS */}
      <section className="section stats-section" id="stats-section">
        <div className="stats-bg-text">STAT</div>
        <div className="stats-left">
          <span className="section-eyebrow">By The Numbers</span>
          <h2 className="section-headline">THE ROAD<br />AWAITS.</h2>
          <p className="section-body">From sedans to SUVs, electric to exotic — Kennedy Auto Sales connects drivers in Scarborough and the GTA with 12,000+ premium vehicles.</p>
          <div className="stats-grid">
            <div className="stat-card glass-card">
              <span className="stat-num">12K+</span>
              <span className="stat-label">Vehicles in Stock</span>
              <span className="stat-delta up">↑ +15% this month</span>
            </div>
            <div className="stat-card glass-card">
              <span className="stat-num">840</span>
              <span className="stat-label">Cars Sold This Month</span>
              <span className="stat-delta up">↑ +22% vs last month</span>
            </div>
            <div className="stat-card glass-card">
              <span className="stat-num">38</span>
              <span className="stat-label">Locations Nationwide</span>
              <span className="stat-delta neutral">→ 3 new this quarter</span>
            </div>
            <div className="stat-card glass-card">
              <span className="stat-num">4.9★</span>
              <span className="stat-label">Customer Satisfaction</span>
              <span className="stat-delta up">↑ Consistent</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS */}
      <section className="section how-section" id="how-section">
        <div className="how-bg-text">DRIVE</div>
        <div className="how-car-zone" id="how-car-zone" />
        <div className="how-content">
          <span className="section-eyebrow">HOW IT WORKS</span>
          <h2 className="section-headline">THREE STEPS<br />TO YOUR CAR</h2>
          <div className="steps-list">
            <div className="step-item glass-card" id="step-1">
              <div className="step-number">01</div>
              <div className="step-info">
                <h3 className="step-title">Browse Home</h3>
                <p className="step-desc">Search 12,000+ new and certified pre-owned vehicles. Filter by make, body type, price range, fuel type, or location.</p>
              </div>
              <div className="step-arrow">→</div>
            </div>
            <div className="step-item glass-card" id="step-2">
              <div className="step-number">02</div>
              <div className="step-info">
                <h3 className="step-title">Finance &amp; Trade-In</h3>
                <p className="step-desc">Get pre-approved in 60 seconds. Value your trade-in instantly and customize your down payment, term, and monthly budget.</p>
              </div>
              <div className="step-arrow">→</div>
            </div>
            <div className="step-item glass-card" id="step-3">
              <div className="step-number">03</div>
              <div className="step-info">
                <h3 className="step-title">Drive It Home</h3>
                <p className="step-desc">Schedule a test drive or get free home delivery. Complete paperwork online and hit the road the same day.</p>
              </div>
              <div className="step-arrow">→</div>
            </div>
          </div>
          <div className="cta-row">
            <a href="/inventory" className="cta-main-btn">Shop Home →</a>
            <a href="#reviews-section" className="ph-embed glass-pill">
              <svg width="18" height="18" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="120" cy="120" r="120" fill="#DA552F" />
                <path d="M120 50l-50 90h100z" fill="#fff" />
              </svg>
              <div className="ph-embed-text">
                <span className="ph-embed-label">Rated #1</span>
                <span className="ph-embed-name">Auto Dealer 2025</span>
              </div>
              <span className="ph-embed-score">A+</span>
            </a>
          </div>
        </div>
      </section>

      <BrandShowcase />
      <HomeInventory />
      <FinanceCalculator />
      <HomeBlogs />
      <TradeInEstimator />
      <BuyingJourneyTimeline />

      <section className="reviews-section" id="reviews-section">
        <div className="reviews-header">
          <span className="section-eyebrow">CUSTOMER REVIEWS</span>
          <h2 className="reviews-heading">What Our Customers Say</h2>
          <div className="reviews-rating-summary">
            <div className="reviews-stars">★★★★★</div>
            <span className="reviews-rating-text">4.9 / 5 · Based on 327 reviews</span>
          </div>
        </div>
        <div className="reviews-grid">
          <div className="review-card glass-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"Best car buying experience I've ever had. No pressure, honest advice, and they got me financed the same day. Highly recommend Kennedy Auto Sales!"</p>
            <div className="review-author">
              <div className="review-avatar">JM</div>
              <div>
                <span className="review-name">Jason M.</span>
                <span className="review-date">2 weeks ago</span>
              </div>
            </div>
          </div>
          <div className="review-card glass-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"Found my dream car at a great price. The team was transparent about everything and the financing process was super smooth. Will definitely come back!"</p>
            <div className="review-author">
              <div className="review-avatar">SP</div>
              <div>
                <span className="review-name">Sarah P.</span>
                <span className="review-date">1 month ago</span>
              </div>
            </div>
          </div>
          <div className="review-card glass-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"Traded in my old car and drove away in something newer the same day. Fair trade-in value and no hidden fees. These guys are the real deal."</p>
            <div className="review-author">
              <div className="review-avatar">DK</div>
              <div>
                <span className="review-name">David K.</span>
                <span className="review-date">1 month ago</span>
              </div>
            </div>
          </div>
          <div className="review-card glass-card">
            <div className="review-stars">★★★★☆</div>
            <p className="review-text">"Great selection of vehicles and friendly staff. They helped me find exactly what I was looking for within my budget. The home delivery was a nice bonus!"</p>
            <div className="review-author">
              <div className="review-avatar">AL</div>
              <div>
                <span className="review-name">Amanda L.</span>
                <span className="review-date">2 months ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section" id="map-section">
        <div className="map-embed">
          <iframe
            src="https://www.google.com/maps?q=1425+Kennedy+Rd,+Scarborough,+ON&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kennedy Auto Sales Location"
          />
        </div>
        <div className="map-content">
          <span className="section-eyebrow">VISIT US</span>
          <h2 className="map-heading">Find Our Showroom</h2>
          <div className="map-info-card glass-card">
            <div className="map-info-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="map-info-icon">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <span className="map-info-label">Address</span>
                <span className="map-info-value">1425 Kennedy Rd<br />Kennedy &amp; Ellesmere, Scarborough, ON</span>
              </div>
            </div>
            <div className="map-info-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="map-info-icon">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
              </svg>
              <div>
                <span className="map-info-label">Phone</span>
                <a href="tel:+14165550199" className="map-info-value map-info-link">(416) 555-0199</a>
              </div>
            </div>
            <div className="map-info-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="map-info-icon">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <div>
                <span className="map-info-label">Email</span>
                <a href="mailto:info@kennedyautosales.ca" className="map-info-value map-info-link">info@kennedyautosales.ca</a>
              </div>
            </div>
          </div>
          <div className="map-hours-card glass-card">
            <div className="map-hours-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="map-info-icon">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="map-hours-title">Business Hours</span>
              <span className="map-hours-status">Open Now</span>
            </div>
            <div className="map-hours-list">
              <div className="map-hours-row"><span>Mon – Fri</span><span>9:00 AM – 7:00 PM</span></div>
              <div className="map-hours-row"><span>Saturday</span><span>9:00 AM – 5:00 PM</span></div>
              <div className="map-hours-row closed"><span>Sunday</span><span>Closed</span></div>
            </div>
          </div>
          <a href="https://maps.google.com/?q=1425+Kennedy+Rd,+Scarborough,+ON" target="_blank" rel="noopener noreferrer" className="cta-main-btn map-directions-btn">Get Directions →</a>
        </div>
      </section>

      <Footer />
    </>
  );
}
