"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";

const MAKES = [
  "Toyota", "Honda", "Ford", "BMW", "Mercedes-Benz", "Audi", "Hyundai",
  "Nissan", "Chevrolet", "Jeep", "Mazda", "Lexus", "Subaru", "Kia",
  "Volkswagen", "Tesla", "Ram", "GMC", "Dodge", "Acura", "Infiniti", "Volvo",
];

const CURRENT_YEAR = new Date().getFullYear();

const CONDITIONS = [
  { label: "Excellent", value: 1.0, desc: "Like new, no issues" },
  { label: "Good", value: 0.85, desc: "Minor wear, well maintained" },
  { label: "Fair", value: 0.7, desc: "Some visible wear, runs well" },
  { label: "Poor", value: 0.5, desc: "Needs repairs, cosmetic issues" },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getBaseValue(make: string, year: number): number {
  const makeMultiplier: Record<string, number> = {
    "Mercedes-Benz": 1.6, "BMW": 1.55, "Audi": 1.5, "Lexus": 1.45,
    "Tesla": 1.5, "Volvo": 1.3, "Infiniti": 1.25, "Acura": 1.25,
    "Toyota": 1.15, "Honda": 1.1, "Subaru": 1.1, "Ford": 1.0,
    "Chevrolet": 1.0, "Jeep": 1.05, "GMC": 1.05, "Ram": 1.05,
    "Dodge": 0.95, "Nissan": 0.95, "Hyundai": 0.85, "Kia": 0.85,
    "Mazda": 0.9, "Volkswagen": 1.0,
  };
  const multiplier = makeMultiplier[make] ?? 1.0;
  const ageFactor = Math.max(0.1, 1 - (CURRENT_YEAR - year) * 0.08);
  return Math.round(45000 * multiplier * ageFactor);
}

interface DropdownOption {
  value: string;
  label: string;
}

function CustomDropdown({
  options,
  value,
  onChange,
  placeholder,
  searchable = false,
}: {
  options: DropdownOption[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  searchable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value);

  const filtered = useMemo(() => {
    if (!search) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      if (searchRef.current) {
        setTimeout(() => searchRef.current?.focus(), 50);
      }
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className={`tradein-dropdown ${open ? "open" : ""}`} ref={ref}>
      <button
        type="button"
        className="tradein-dropdown-trigger"
        onClick={() => setOpen(!open)}
      >
        <span className={selected ? "" : "tradein-dropdown-placeholder"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className="tradein-dropdown-chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="tradein-dropdown-menu">
          {searchable && (
            <div className="tradein-dropdown-search">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tradein-dropdown-search-icon"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className="tradein-dropdown-search-input"
              />
            </div>
          )}
          <div className="tradein-dropdown-options">
            {filtered.length === 0 && (
              <div className="tradein-dropdown-empty">No results found</div>
            )}
            {filtered.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`tradein-dropdown-option ${
                  opt.value === value ? "selected" : ""
                }`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                  setSearch("");
                }}
              >
                {opt.label}
                {opt.value === value && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="tradein-dropdown-check"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TradeInEstimator() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(String(CURRENT_YEAR - 5));
  const [mileage, setMileage] = useState(80000);
  const [condition, setCondition] = useState("Good");
  const [submitted, setSubmitted] = useState(false);

  const makeOptions: DropdownOption[] = useMemo(
    () => MAKES.map((m) => ({ value: m, label: m })),
    []
  );
  const yearOptions: DropdownOption[] = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        value: String(CURRENT_YEAR - i),
        label: String(CURRENT_YEAR - i),
      })),
    []
  );

  const estimate = useMemo(() => {
    if (!make) return null;
    const base = getBaseValue(make, Number(year));
    const cond = CONDITIONS.find((c) => c.label === condition)?.value ?? 0.85;
    const mileageFactor = Math.max(0.3, 1 - (mileage / 300000) * 0.5);
    const value = Math.round(base * cond * mileageFactor);
    const low = Math.round(value * 0.9);
    const high = Math.round(value * 1.1);
    return { low, high, mid: value };
  }, [make, year, mileage, condition]);

  return (
    <section className="tradein-section" id="trade-in-estimator">
      <div className="tradein-header">
        <span className="section-eyebrow">INSTANT TRADE-IN</span>
        <h2 className="tradein-heading">What&apos;s Your Car Worth?</h2>
        <p className="tradein-subtitle">Get an estimated trade-in value in seconds. No obligation, no contact required.</p>
      </div>

      <div className="tradein-card glass-card">
        <div className="tradein-form">
          <div className="tradein-field">
            <label>Vehicle Make</label>
            <CustomDropdown
              options={makeOptions}
              value={make}
              onChange={(v) => { setMake(v); setSubmitted(false); }}
              placeholder="Select make…"
              searchable
            />
          </div>

          <div className="tradein-field">
            <label htmlFor="ti-model">Model (optional)</label>
            <input
              id="ti-model"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. Camry, Civic, F-150"
              className="tradein-input"
            />
          </div>

          <div className="tradein-field-row">
            <div className="tradein-field">
              <label>Year</label>
              <CustomDropdown
                options={yearOptions}
                value={year}
                onChange={(v) => { setYear(v); setSubmitted(false); }}
                placeholder="Select year…"
              />
            </div>

            <div className="tradein-field">
              <label htmlFor="ti-mileage">Mileage: {mileage.toLocaleString()} km</label>
              <input
                id="ti-mileage"
                type="range"
                min={0}
                max={300000}
                step={5000}
                value={mileage}
                onChange={(e) => { setMileage(Number(e.target.value)); setSubmitted(false); }}
                className="tradein-slider"
              />
              <div className="tradein-slider-marks">
                <span>0</span><span>150k</span><span>300k</span>
              </div>
            </div>
          </div>

          <div className="tradein-field">
            <label>Condition</label>
            <div className="tradein-conditions">
              {CONDITIONS.map((c) => (
                <button
                  key={c.label}
                  className={`tradein-condition-btn ${condition === c.label ? "active" : ""}`}
                  onClick={() => { setCondition(c.label); setSubmitted(false); }}
                  type="button"
                >
                  <span className="tradein-condition-label">{c.label}</span>
                  <span className="tradein-condition-desc">{c.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            className="tradein-submit cta-main-btn"
            onClick={() => setSubmitted(true)}
            disabled={!make}
            type="button"
          >
            Get Estimate →
          </button>
        </div>

        <div className="tradein-result">
          {!estimate || !submitted ? (
            <div className="tradein-result-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="tradein-empty-icon">
                <path d="M3 17h2l2-2 3 3 4-4 3 3 4-4" /><path d="M3 21h18" /><path d="M7 10V5l5-3 5 3v5" />
              </svg>
              <p className="tradein-empty-text">
                {make ? "Click \"Get Estimate\" to see your trade-in value" : "Select your vehicle details to get started"}
              </p>
            </div>
          ) : (
            <div className="tradein-result-content">
              <span className="tradein-result-label">Estimated Trade-In Value</span>
              <div className="tradein-result-range">
                <span className="tradein-result-low">{formatCurrency(estimate.low)}</span>
                <span className="tradein-result-dash">–</span>
                <span className="tradein-result-high">{formatCurrency(estimate.high)}</span>
              </div>
              <div className="tradein-result-mid">
                <span className="tradein-result-mid-label">Midpoint estimate</span>
                <span className="tradein-result-mid-value">{formatCurrency(estimate.mid)}</span>
              </div>
              <div className="tradein-result-disclaimer">
                This is a preliminary estimate. Final value subject to inspection.
              </div>
              <Link href="/contact" className="tradein-result-cta">
                Schedule Free Appraisal →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
