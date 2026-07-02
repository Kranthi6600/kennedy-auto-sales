import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-bg-car" />
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">Kennedy Auto Sales</div>
            <p className="footer-tagline">Your trusted car dealership in<br />Scarborough, Ontario, Canada.</p>
            <p className="footer-address">1425 Kennedy Rd, Kennedy &amp; Ellesmere</p>
            <div className="footer-socials">
              <a href="#" className="social-pill glass-pill">𝕏 Twitter</a>
              <a href="#" className="social-pill glass-pill">▶ Instagram</a>
              <a href="#" className="social-pill glass-pill">in LinkedIn</a>
            </div>
          </div>
          <div className="footer-links-grid">
            <div className="footer-col">
              <span className="footer-col-title">Inventory</span>
              <Link href="/inventory" className="footer-link">Browse All Vehicles</Link>
              <Link href="/inventory" className="footer-link">New Cars</Link>
              <Link href="/inventory" className="footer-link">Certified Pre-Owned</Link>
              <Link href="/compare" className="footer-link">Compare Vehicles</Link>
            </div>
            <div className="footer-col">
              <span className="footer-col-title">Services</span>
              <Link href="/services" className="footer-link">Financing</Link>
              <Link href="/services" className="footer-link">Trade-In Valuation</Link>
              <Link href="/services" className="footer-link">Schedule Test Drive</Link>
              <Link href="/services" className="footer-link">Home Delivery</Link>
            </div>
            <div className="footer-col">
              <span className="footer-col-title">Company</span>
              <Link href="/about" className="footer-link">About Us</Link>
              <Link href="/blogs" className="footer-link">Blog</Link>
              <Link href="/contact" className="footer-link">Contact</Link>
              <Link href="/inventory" className="footer-link">Locations</Link>
            </div>
          </div>
          <div className="footer-newsletter">
            <span className="newsletter-title">Get exclusive offers</span>
            <p className="newsletter-desc">Join our list for new arrivals, financing deals, and member-only pricing.</p>
            <div className="newsletter-input-row">
              <input type="email" placeholder="your@email.com" className="newsletter-input" />
              <button className="newsletter-btn">→</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span className="footer-copy">© {new Date().getFullYear()} Kennedy Auto Sales. All rights reserved.</span>
            <div className="footer-legal">
              <a href="#" className="legal-link">Privacy</a>
              <span className="sep">·</span>
              <a href="#" className="legal-link">Terms</a>
              <span className="sep">·</span>
              <a href="#" className="legal-link">Cookies</a>
            </div>
          </div>
          <div className="footer-ph-badge">
            <svg width="16" height="16" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="120" cy="120" r="120" fill="#DA552F" />
              <path d="M138 120h-28V90h28a15 15 0 010 30zm0-50h-48v100h20v-30h28a35 35 0 000-70z" fill="#fff" />
            </svg>
            <span>Best Dealer Award 2025</span>
          </div>
          <div className="footer-cities">
            <span className="cities-label">SERVING THE GTA</span>
            <div className="cities-scroll">
              <span>SCARBOROUGH · TORONTO · MARKHAM · PICKERING · MISSISSAUGA · BRAMPTON · AJAX · WHITBY · OSHAWA · NEWMARKET ·&nbsp;</span>
              <span aria-hidden="true">SCARBOROUGH · TORONTO · MARKHAM · PICKERING · MISSISSAUGA · BRAMPTON · AJAX · WHITBY · OSHAWA · NEWMARKET ·&nbsp;</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
