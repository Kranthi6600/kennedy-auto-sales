"use client";

import { useState, useEffect } from "react";

declare global {
  interface Window {
    __mobileDragOn?: boolean;
  }
}

export default function MobileDragToggle() {
  const [on, setOn] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    window.__mobileDragOn = on;
    const canvas = document.getElementById("hero-canvas");
    if (canvas) {
      if (on) canvas.classList.add("drag-enabled");
      else canvas.classList.remove("drag-enabled");
    }
  }, [on]);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero-section");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      setVisible(rect.bottom > 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`mobile-drag-toggle${visible ? "" : " hidden"}`}
      onClick={() => setOn((v) => !v)}
      aria-label={on ? "Exit rotate mode" : "Rotate car"}
    >
      {on ? "✕ Done" : "↻ Rotate Car"}
    </button>
  );
}
