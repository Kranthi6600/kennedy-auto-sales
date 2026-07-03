"use client";

import { useState, useEffect } from "react";
import { fetchInventory, type InventoryItem } from "../lib/api";

export default function EventCard() {
  const [car, setCar] = useState<InventoryItem | null>(null);

  useEffect(() => {
    fetchInventory({ featured: true, limit: 1 })
      .then((res) => {
        if (res.data?.length) setCar(res.data[0]);
        else return fetchInventory({ limit: 1 }).then((r) => setCar(r.data?.[0] ?? null));
      })
      .catch(() => {});
  }, []);

  const title = car?.title || "Ford Bronco Sport";
  const yearMatch = title.match(/\b(19|20)\d{2}\b/);
  const year = car?.attributes?.year || yearMatch?.[0] || "2025";
  const condition = car?.attributes?.condition || "Certified Pre-Owned";
  const thumbnail = car?.thumbnail || "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=560&q=80";
  const altText = car?.thumbnail_alt || `${title} — premium SUV inventory`;
  const price = car?.price
    ? new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(car.price)
    : "$38,900";
  const status = car ? (car.quantity > 0 ? "In Stock" : "Out of Stock") : "In Stock";

  return (
    <div className="event-card" id="event-card">
      <div className="ec-bend" />
      <div className="ec-face" />
      <div className="ec-edge" />
      <div className="ec-content">
        <div className="ec-image">
          <img src={thumbnail} alt={altText} fetchPriority="high" decoding="async" />
          <div className="ec-img-shade" />
          <div className="ec-img-top">
            <span className="ec-time-pill">{year} Model</span>
            <span className="ec-home-pill"><span className={`home-dot${car && car.quantity <= 0 ? " out-of-stock" : ""}`} />{status}</span>
          </div>
          <div className="ec-img-bottom">
            <h3 className="ec-title">{title}</h3>
            <p className="ec-date">Starting at {price}</p>
          </div>
        </div>
        <div className="ec-organizer">
          <div className="org-av grad-1" />
          <div className="org-info">
            <span className="org-name">{condition}</span>
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
          <span className="venue-addr">1425 Kennedy Rd,<br />Kennedy &amp; Ellesmere</span>
        </div>
        <a href="https://maps.google.com/?q=1425+Kennedy+Rd,+Scarborough,+ON" target="_blank" rel="noopener noreferrer" className="ec-btn ghost-btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          Visit showroom
        </a>
      </div>
    </div>
  );
}
