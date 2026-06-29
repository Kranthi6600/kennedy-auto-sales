import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CarSceneLazy from '../components/CarSceneLazy';

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

        {/* Product Hunt badge */}
        <div className="ph-badge-wrap" id="ph-badge">
          <a href="#" target="_blank" className="ph-badge-inner glass-card">
            <svg width="32" height="32" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
              <circle cx="120" cy="120" r="120" fill="#FF6154" />
              <path fill="#fff" d="M120 60c-33 0-60 27-60 60s27 60 60 60 60-27 60-60-27-60-60-60zm0 100c-22 0-40-18-40-40s18-40 40-40 40 18 40 40-18 40-40 40zm-10-60v40l30 20" />
            </svg>
            <div className="ph-badge-text">
              <span className="ph-label">Best Dealer 2025</span>
              <span className="ph-sub">Auto Awards</span>
            </div>
          </a>
        </div>

        {/* Event card */}
        <div className="event-card" id="event-card">
          <div className="ec-bend" />
          <div className="ec-face" />
          <div className="ec-edge" />
          <div className="ec-content">
            <div className="ec-image">
              <img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=560&q=80" alt="2025 Ford Bronco — premium SUV inventory" fetchPriority="high" decoding="async" />
              <div className="ec-img-shade" />
              <div className="ec-img-top">
                <span className="ec-time-pill">2025 Model</span>
                <span className="ec-home-pill"><span className="home-dot" />In Stock</span>
              </div>
              <div className="ec-img-bottom">
                <h3 className="ec-title">Ford Bronco Sport</h3>
                <p className="ec-date">Starting at $38,900</p>
              </div>
            </div>
            <div className="ec-organizer">
              <div className="org-av grad-1" />
              <div className="org-info">
                <span className="org-name">Certified Pre-Owned</span>
                <span className="org-role">150-point inspection</span>
              </div>
              <div className="ec-players">
                <div className="av-stack">
                  <div className="mini-av grad-2" />
                  <div className="mini-av grad-3" />
                  <div className="mini-av grad-4" />
                </div>
                <span className="plus-badge">+12</span>
              </div>
            </div>
            <div className="ec-venue">
              <span className="venue-name">Kennedy Auto Sales</span>
              <span className="venue-addr">1200 Kennedy Road,<br />Scarborough, ON M1P 2X1</span>
            </div>
            <button className="ec-btn ghost-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              Visit showroom
            </button>
            <button className="ec-btn dark-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
              Book test drive
            </button>
            <p className="ec-free">✓ Free home delivery</p>
          </div>
        </div>

        {/* Hero text */}
        <div className="hero-text" id="hero-text">
          <span className="hero-eyebrow">EXPLORE HOME</span>
          <h1 className="hero-headline">
            <span className="hl-line">FIND YOUR</span>
            <span className="hl-line">DREAM</span>
            <span className="hl-line">MACHINE</span>
          </h1>
          <p className="hero-brand">Kennedy Auto Sales</p>
          <div className="hero-pricing glass-pill">
            <span className="price-amount">$34,900</span>
            <span className="price-sep">/</span>
            <span className="price-label">Starting Price</span>
            <button className="price-cta">Browse Cars →</button>
          </div>
        </div>

        {/* Signature */}
        <div className="signature-wrap" id="sig-wrap">
          <svg className="sig-svg" viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 45 C20 10, 35 50, 50 20 C65 -10, 70 55, 90 30 C110 5, 120 50, 140 35 C150 28, 155 38, 150 45"
              stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="sp1" />
            <path d="M85 30 C95 25, 105 40, 100 48"
              stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" className="sp2" />
            <path d="M10 48 C30 46, 50 50, 70 47"
              stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" className="sp3" />
          </svg>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span>scroll</span>
        </div>
        <div className="drag-hint">↔ drag to rotate</div>
        <button className="nav-arrow-btn glass-pill" id="nav-arrow">›</button>
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
            <button className="cta-main-btn">Shop Home →</button>
            <div className="ph-embed glass-pill">
              <svg width="18" height="18" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="120" cy="120" r="120" fill="#DA552F" />
                <path d="M120 50l-50 90h100z" fill="#fff" />
              </svg>
              <div className="ph-embed-text">
                <span className="ph-embed-label">Rated #1</span>
                <span className="ph-embed-name">Auto Dealer 2025</span>
              </div>
              <span className="ph-embed-score">A+</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
