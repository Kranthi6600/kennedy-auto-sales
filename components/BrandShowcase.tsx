"use client";

import Link from "next/link";

const BRANDS = [
  "Ford", "BMW", "Toyota", "Honda", "Mercedes-Benz", "Audi",
  "Tesla", "Hyundai", "Nissan", "Chevrolet", "Jeep", "Mazda",
  "Lexus", "Subaru", "Kia", "Volkswagen",
];

export default function BrandShowcase() {
  return (
    <section className="brand-showcase-section" id="brand-showcase">
      <div className="brand-showcase-header">
        <span className="section-eyebrow">SHOP BY BRAND</span>
        <h2 className="brand-showcase-heading">Find Your Favorite Make</h2>
      </div>
      <div className="brand-showcase-scroll">
        {BRANDS.map((brand) => (
          <Link key={brand} href={`/inventory?make=${encodeURIComponent(brand)}`} className="brand-pill glass-card">
            {brand}
          </Link>
        ))}
      </div>
    </section>
  );
}
