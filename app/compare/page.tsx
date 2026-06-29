"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCompare } from "../../lib/useCompare";
import type { Vehicle } from "../../lib/useCompare";

function getVal(v: Vehicle, key: string): string {
  switch (key) {
    case 'price':
      if (!v.price_visible) return 'Contact for pricing';
      if (v.price_label) return v.price_label;
      if (v.price === null) return 'N/A';
      return new Intl.NumberFormat('en-CA', { style: 'currency', currency: v.currency || 'CAD', maximumFractionDigits: 0 }).format(v.price);
    case 'title':
      return v.title;
    case 'mileage':
      return v.attributes?.mileage || 'N/A';
    case 'engine':
      return v.attributes?.engine_size ? `${v.attributes.engine_size}L` : 'N/A';
    case 'drivetrain':
      return v.attributes?.drivetrain || 'N/A';
    case 'fuel':
      return v.attributes?.fuel_type || 'N/A';
    case 'transmission':
      return v.attributes?.transmission || 'N/A';
    case 'bodyStyle':
      return v.attributes?.body_type || 'N/A';
    case 'make':
      return v.attributes?.make || 'N/A';
    case 'model':
      return v.attributes?.model || 'N/A';
    case 'year':
      return v.attributes?.year || 'N/A';
    case 'condition':
      return v.attributes?.condition || 'N/A';
    case 'exteriorColor':
      return v.attributes?.exterior_color || 'N/A';
    case 'interiorColor':
      return v.attributes?.interior_color || 'N/A';
    case 'doors':
      return v.attributes?.doors || 'N/A';
    case 'seats':
      return v.attributes?.seats || 'N/A';
    default:
      return 'N/A';
  }
}

const specRows: { label: string; key: string }[] = [
  { label: "Price", key: "price" },
  { label: "Year", key: "year" },
  { label: "Make", key: "make" },
  { label: "Model", key: "model" },
  { label: "Mileage", key: "mileage" },
  { label: "Engine", key: "engine" },
  { label: "Drivetrain", key: "drivetrain" },
  { label: "Fuel Type", key: "fuel" },
  { label: "Transmission", key: "transmission" },
  { label: "Body Style", key: "bodyStyle" },
  { label: "Condition", key: "condition" },
  { label: "Ext. Color", key: "exteriorColor" },
  { label: "Int. Color", key: "interiorColor" },
  { label: "Doors", key: "doors" },
  { label: "Seats", key: "seats" },
];

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare, mounted } = useCompare();

  const findBest = (key: string): number | null => {
    if (key === "mileage") {
      let best: number | null = null;
      let bestIdx = -1;
      compareList.forEach((v, i) => {
        const km = parseInt(v.attributes?.mileage?.replace(/[^0-9]/g, "") || "", 10);
        if (!isNaN(km) && (best === null || km < best)) {
          best = km;
          bestIdx = i;
        }
      });
      return bestIdx;
    }
    if (key === "price") {
      let best = Infinity;
      let bestIdx = -1;
      compareList.forEach((v, i) => {
        if (v.price !== null && v.price < best) { best = v.price; bestIdx = i; }
      });
      return bestIdx >= 0 ? bestIdx : null;
    }
    return null;
  };

  return (
    <>
      <Navbar />

      <section className="subpage-section">
        <div className="subpage-header">
          <span className="section-eyebrow">VEHICLE COMPARISON</span>
          <h1 className="subpage-title">Compare Vehicles</h1>
          <p className="subpage-subtitle">Side-by-side comparison of up to 4 vehicles.</p>
        </div>

        {!mounted ? (
          <div className="compare-empty">
            <p>Loading...</p>
          </div>
        ) : compareList.length === 0 ? (
          <div className="compare-empty">
            <div className="compare-empty-icon">⚖️</div>
            <h2>No vehicles selected for comparison</h2>
            <p>Browse our inventory and click "Compare" on any vehicle to add it here.</p>
            <Link href="/inventory" className="cta-main-btn">Browse Inventory →</Link>
          </div>
        ) : (
          <>
            <div className="compare-actions">
              <span className="compare-count-text">{compareList.length} vehicle{compareList.length > 1 ? "s" : ""} in comparison</span>
              <div className="compare-actions-btns">
                <Link href="/inventory" className="compare-add-more">+ Add More</Link>
                <button className="compare-clear-all" onClick={clearCompare}>Clear All</button>
              </div>
            </div>

            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th className="compare-table-label-col">Specifications</th>
                    {compareList.map((v) => (
                      <th key={v.id} className="compare-table-vehicle-col">
                        <div className="compare-vehicle-header">
                          <button className="compare-remove-btn" onClick={() => removeFromCompare(v.id)}>×</button>
                          <div className="compare-vehicle-img">
                            <img src={v.thumbnail || v.images?.[0]?.url || ''} alt={v.title} loading="lazy" decoding="async" />
                          </div>
                          <h3 className="compare-vehicle-name">{v.title}</h3>
                          <p className="compare-vehicle-model">{v.attributes?.body_type || ''}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specRows.map((row, rowIdx) => {
                    const bestIdx = findBest(row.key);
                    return (
                      <tr key={row.key} className={rowIdx % 2 === 0 ? "compare-row-alt" : ""}>
                        <td className="compare-cell-label">{row.label}</td>
                        {compareList.map((v, vIdx) => (
                          <td
                            key={v.id}
                            className={`compare-cell-val ${bestIdx === vIdx ? "compare-best" : ""}`}
                          >
                            {getVal(v, row.key)}
                            {bestIdx === vIdx && <span className="compare-best-tag">Best</span>}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="compare-cta-row">
              <Link href="/inventory" className="cta-main-btn">Back to Inventory →</Link>
            </div>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}
