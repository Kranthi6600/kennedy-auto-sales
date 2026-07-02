"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchInventory, type InventoryItem } from '../lib/api';

function formatPrice(v: InventoryItem) {
  if (!v.price_visible) return 'Contact for pricing';
  if (v.price_label) return v.price_label;
  if (v.price === null) return 'Contact for pricing';
  if (v.price === 0) return 'Free';
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: v.currency || 'CAD', maximumFractionDigits: 0 }).format(v.price);
}

function formatMileage(v: InventoryItem) {
  const m = v.attributes?.mileage;
  if (!m) return 'N/A';
  const num = parseInt(m, 10);
  if (isNaN(num)) return m;
  return `${num.toLocaleString()} KM`;
}

export default function HomeInventory() {
  const [vehicles, setVehicles] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchInventory({ type: 'vehicle', limit: 8, sortBy: 'created_at', sortOrder: 'desc' })
      .then((res) => {
        if (!cancelled) {
          setVehicles(res.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <section className="home-inventory-section" id="home-inventory">
        <div className="home-inventory-header">
          <span className="section-eyebrow">FEATURED VEHICLES</span>
          <h2 className="home-inventory-heading">Browse Our Latest Inventory</h2>
        </div>
        <div className="home-inventory-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="home-inv-card glass-card">
              <div className="home-inv-img" style={{ background: 'rgba(0,0,0,0.04)' }} />
              <div className="home-inv-body">
                <div style={{ height: '1.3rem', width: '60%', background: 'rgba(0,0,0,0.06)', borderRadius: 4, marginBottom: '0.5rem' }} />
                <div style={{ height: '0.9rem', width: '80%', background: 'rgba(0,0,0,0.04)', borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (vehicles.length === 0) return null;

  return (
    <section className="home-inventory-section" id="home-inventory">
      <div className="home-inventory-header">
        <span className="section-eyebrow">FEATURED VEHICLES</span>
        <h2 className="home-inventory-heading">Browse Our Latest Inventory</h2>
        <Link href="/inventory" className="home-inventory-view-all">View All →</Link>
      </div>
      <div className="home-inventory-grid">
        {vehicles.map((v) => (
          <Link key={v.id} href={`/inventory/${v.slug}`} className="home-inv-card glass-card">
            <div className="home-inv-img">
              <img
                src={v.thumbnail || v.images?.[0]?.url || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80'}
                alt={v.thumbnail_alt || v.title}
                loading="lazy"
                decoding="async"
              />
              <span className="home-inv-tag">{v.attributes?.body_type || 'Vehicle'}</span>
              {v.featured && <span className="home-inv-badge">Featured</span>}
            </div>
            <div className="home-inv-body">
              <div className="home-inv-price">{formatPrice(v)}</div>
              <h3 className="home-inv-name">{v.title}</h3>
              <div className="home-inv-specs">
                <span>{v.attributes?.year || ''}</span>
                <span>{formatMileage(v)}</span>
                <span>{v.attributes?.fuel_type || 'N/A'}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
