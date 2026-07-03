"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchInventory } from "../lib/api";

export default function HeroPricing() {
  const router = useRouter();
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    fetchInventory({ limit: 100, sortBy: "price", sortOrder: "asc" })
      .then((res) => {
        const vehicles = res.data ?? [];
        const lowest = vehicles
          .filter((v) => v.price !== null && v.price > 0)
          .sort((a, b) => (a.price ?? 0) - (b.price ?? 0))[0];
        if (lowest?.price != null) setPrice(lowest.price);
      })
      .catch(() => {});
  }, []);

  const formatted = price
    ? new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
        maximumFractionDigits: 0,
      }).format(price)
    : "$34,900";

  return (
    <div className="hero-pricing glass-pill" style={{ position: "relative", zIndex: 9999, pointerEvents: "auto" }}>
      <span className="price-amount">{formatted}</span>
      <span className="price-sep">/</span>
      <span className="price-label">Starting Price</span>
      <button
        type="button"
        className="price-cta"
        style={{ position: "relative", zIndex: 9999, pointerEvents: "auto" }}
        onClick={() => router.push("/inventory")}
      >
        Browse Cars →
      </button>
    </div>
  );
}
