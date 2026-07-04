"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const STEPS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
      </svg>
    ),
    title: "Browse",
    desc: "Search 12,000+ vehicles with smart filters for make, body type, price, fuel, and location.",
    link: "/inventory",
    linkLabel: "Start Browsing",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
    title: "Choose",
    desc: "Compare side-by-side, save favorites, and request detailed info on any vehicle.",
    link: "/inventory",
    linkLabel: "Find Your Car",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
      </svg>
    ),
    title: "Finance",
    desc: "Get pre-approved in 60 seconds. Customize your down payment, term, and monthly budget.",
    link: "/contact",
    linkLabel: "Get Pre-Approved",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" />
      </svg>
    ),
    title: "Trade-In",
    desc: "Value your current vehicle instantly and apply it toward your new purchase.",
    link: "/contact",
    linkLabel: "Value Your Trade",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: "Inspect",
    desc: "Every vehicle undergoes a 150-point inspection. Schedule a test drive or request a video walkthrough.",
    link: "/contact",
    linkLabel: "Book Test Drive",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-3-6H6L3 10v6c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" />
      </svg>
    ),
    title: "Drive Home",
    desc: "Complete paperwork online and get free home delivery. Hit the road the same day.",
    link: "/contact",
    linkLabel: "Schedule Delivery",
  },
];

export default function BuyingJourneyTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewportH = window.innerHeight;
      if (rect.top > viewportH || rect.bottom < 0) return;

      const totalScroll = rect.height - viewportH * 0.5;
      const scrolled = Math.max(0, -rect.top + viewportH * 0.3);
      const progress = Math.min(1, scrolled / totalScroll);
      const step = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
      setActiveStep(step);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="journey-section" id="journey-section" ref={sectionRef}>
      <div className="journey-header">
        <span className="section-eyebrow">THE EXPERIENCE</span>
        <h2 className="journey-heading">Your Car Buying Journey</h2>
        <p className="journey-subtitle">From browsing to driving home — a seamless, transparent process designed around you.</p>
      </div>

      <div className="journey-timeline">
        <div className="journey-line">
          <div
            className="journey-line-progress"
            style={{ height: `${((activeStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <div className="journey-steps">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className={`journey-step ${i <= activeStep ? "active" : ""} ${i === activeStep ? "current" : ""}`}
            >
              <div className="journey-step-marker">
                <span className="journey-step-icon">{step.icon}</span>
                <span className="journey-step-num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="journey-step-content glass-card">
                <h3 className="journey-step-title">{step.title}</h3>
                <p className="journey-step-desc">{step.desc}</p>
                <Link href={step.link} className="journey-step-link">
                  {step.linkLabel} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
