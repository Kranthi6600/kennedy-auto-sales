"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const navEl = document.getElementById("navbar");
    const onScroll = () => {
      if (navEl) navEl.classList.toggle("scrolled", window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="navbar" id="navbar">
        <span className="nav-logo" style={isHome ? undefined : { opacity: 1, transform: "none" }}>Kennedy Auto Sales</span>
        <div className="nav-links" style={isHome ? undefined : { opacity: 1, transform: "none" }}>
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/inventory" className="nav-link">Inventory</Link>
          <Link href="/services" className="nav-link">Services</Link>
          <Link href="/blogs" className="nav-link">Blogs</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>
        <button className="profile-btn glass-pill" style={isHome ? undefined : { opacity: 1, transform: "none" }}>
          <span className="pulse-dot" /> Call Now
        </button>
        <button
          className="nav-hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
          <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
          <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
        </button>
      </nav>

      <div className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />

      <aside className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-logo">Kennedy Auto Sales</span>
          <button
            className="mobile-menu-close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className="mobile-menu-links">
          <Link href="/" className="mobile-menu-link">Home</Link>
          <Link href="/inventory" className="mobile-menu-link">Inventory</Link>
          <Link href="/services" className="mobile-menu-link">Services</Link>
          <Link href="/blogs" className="mobile-menu-link">Blogs</Link>
          <Link href="/about" className="mobile-menu-link">About</Link>
          <Link href="/contact" className="mobile-menu-link">Contact</Link>
        </nav>
        <button className="mobile-menu-cta">
          <span className="pulse-dot" /> Call Now
        </button>
      </aside>
    </>
  );
}
