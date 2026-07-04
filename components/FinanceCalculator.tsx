"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function FinanceCalculator() {
  const [price, setPrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(5000);
  const [term, setTerm] = useState(60);
  const rate = 6.99;

  const monthlyPayment = useMemo(() => {
    const principal = Math.max(0, price - downPayment);
    const monthlyRate = rate / 100 / 12;
    if (monthlyRate === 0) return principal / term;
    const factor = Math.pow(1 + monthlyRate, term);
    return (principal * monthlyRate * factor) / (factor - 1);
  }, [price, downPayment, term, rate]);

  const totalCost = monthlyPayment * term + downPayment;
  const totalInterest = totalCost - price;

  return (
    <section className="finance-calc-section" id="finance-calculator">
      <div className="finance-calc-header">
        <span className="section-eyebrow">FINANCING</span>
        <h2 className="finance-calc-heading">Estimate Your Monthly Payment</h2>
      </div>
      <div className="finance-calc-card glass-card">
        <div className="finance-calc-display">
          <span className="finance-calc-display-label">Estimated Monthly Payment</span>
          <span className="finance-calc-display-value">{formatCurrency(monthlyPayment)}<span className="finance-calc-display-unit">/mo</span></span>
          <div className="finance-calc-display-meta">
            <div>
              <span className="finance-calc-meta-label">Rate</span>
              <span className="finance-calc-meta-value">{rate.toFixed(2)}% APR</span>
            </div>
            <div>
              <span className="finance-calc-meta-label">Total Interest</span>
              <span className="finance-calc-meta-value">{formatCurrency(totalInterest)}</span>
            </div>
            <div>
              <span className="finance-calc-meta-label">Total Cost</span>
              <span className="finance-calc-meta-value">{formatCurrency(totalCost)}</span>
            </div>
          </div>
        </div>

        <div className="finance-calc-controls">
          <div className="finance-calc-row">
            <div className="finance-calc-row-header">
              <label htmlFor="fc-price">Vehicle Price</label>
              <span className="finance-calc-row-value">{formatCurrency(price)}</span>
            </div>
            <input
              id="fc-price"
              type="range"
              min={5000}
              max={150000}
              step={1000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="finance-calc-slider"
            />
          </div>

          <div className="finance-calc-row">
            <div className="finance-calc-row-header">
              <label htmlFor="fc-down">Down Payment</label>
              <span className="finance-calc-row-value">{formatCurrency(downPayment)}</span>
            </div>
            <input
              id="fc-down"
              type="range"
              min={0}
              max={Math.min(price - 1000, 50000)}
              step={500}
              value={Math.min(downPayment, price - 1000)}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="finance-calc-slider"
            />
          </div>

          <div className="finance-calc-row">
            <div className="finance-calc-row-header">
              <label htmlFor="fc-term">Loan Term</label>
              <span className="finance-calc-row-value">{term} months</span>
            </div>
            <input
              id="fc-term"
              type="range"
              min={12}
              max={96}
              step={12}
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="finance-calc-slider"
            />
            <div className="finance-calc-term-marks">
              <span>1yr</span>
              <span>4yr</span>
              <span>8yr</span>
            </div>
          </div>
        </div>

        <Link href="/contact" className="finance-calc-cta cta-main-btn">
          Get Pre-Approved →
        </Link>
      </div>
    </section>
  );
}
