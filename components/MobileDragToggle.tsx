"use client";

import { useState, useEffect } from "react";

declare global {
  interface Window {
    __mobileDragOn?: boolean;
  }
}

export default function MobileDragToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    window.__mobileDragOn = on;
    const canvas = document.getElementById("hero-canvas");
    if (canvas) {
      if (on) canvas.classList.add("drag-enabled");
      else canvas.classList.remove("drag-enabled");
    }
  }, [on]);

  return (
    <button
      className="mobile-drag-toggle"
      onClick={() => setOn((v) => !v)}
      aria-label={on ? "Exit rotate mode" : "Rotate car"}
    >
      {on ? "✕ Done" : "↻ Rotate Car"}
    </button>
  );
}
