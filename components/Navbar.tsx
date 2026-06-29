"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const navEl = document.getElementById("navbar");
    const onScroll = () => {
      if (navEl) navEl.classList.toggle("scrolled", window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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
        <span className="pulse-dot" /> My Garage
      </button>
    </nav>
  );
}
