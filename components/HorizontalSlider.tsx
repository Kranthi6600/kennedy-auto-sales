"use client";

import { useRef, useState, useCallback } from "react";

const sliderCars = [
  { src: "/assets/pexels-svonhorst-2920064.jpg", title: "Ford Bronco Raptor", tag: "SUV", year: "2024", spec: "3.0L V6" },
  { src: "/assets/pexels-mikebirdy-7663128.jpg", title: "BMW M4 Competition", tag: "Coupe", year: "2024", spec: "3.0L I6" },
  { src: "/assets/pexels-mikebirdy-1035108.jpg", title: "Audi RS6 Avant", tag: "Wagon", year: "2023", spec: "4.0L V8" },
  { src: "/assets/pexels-lumi-fayaz-2162189197-38048843.jpg", title: "Porsche 911 Carrera", tag: "Coupe", year: "2024", spec: "3.0L Flat-6" },
  { src: "/assets/pexels-lumi-fayaz-2162189197-38048842.jpg", title: "Mercedes-AMG GT", tag: "Coupe", year: "2024", spec: "4.0L V8" },
  { src: "/assets/pexels-burak-karagoz-663432887-17746219.jpg", title: "Lamborghini Huracán", tag: "Supercar", year: "2024", spec: "5.2L V10" },
  { src: "/assets/pexels-alshreef-29883933.jpg", title: "Range Rover SV", tag: "SUV", year: "2024", spec: "4.4L V8" },
  { src: "/assets/pexels-alexander-pollinger-137430820-10475748.jpg", title: "Nissan GT-R Nismo", tag: "Coupe", year: "2023", spec: "3.8L V6" },
];

export default function HorizontalSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 5);
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 5);
  }, []);

  const scrollByDir = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.querySelector<HTMLElement>(".slider-card")?.offsetWidth ?? 380;
    track.scrollBy({ left: dir * (cardWidth + 24), behavior: "smooth" });
  };

  return (
    <section className="horizontal-slider-section" id="horizontal-slider">
      <div className="horizontal-slider-header">
        <span className="section-eyebrow">THE COLLECTION</span>
        <h2 className="section-headline">Featured Vehicles</h2>
      </div>

      <div className="horizontal-slider-viewport">
        <div
          className="horizontal-slider-track"
          ref={trackRef}
          onScroll={updateArrows}
        >
          {sliderCars.map((car, i) => (
            <div key={i} className="slider-card">
              <div className="slider-card-img">
                <img
                  src={car.src}
                  alt={car.title}
                  loading="lazy"
                  decoding="async"
                />
                <span className="slider-card-tag">{car.tag}</span>
              </div>
              <div className="slider-card-body">
                <span className="slider-card-price">{car.year}</span>
                <h3 className="slider-card-title">{car.title}</h3>
                <div className="slider-card-specs">
                  <span>{car.spec}</span>
                  <span>{car.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="slider-arrow slider-arrow-left"
          onClick={() => scrollByDir(-1)}
          disabled={!canPrev}
          aria-label="Previous"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          className="slider-arrow slider-arrow-right"
          onClick={() => scrollByDir(1)}
          disabled={!canNext}
          aria-label="Next"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div className="slider-mask slider-mask-left" aria-hidden="true" />
        <div className="slider-mask slider-mask-right" aria-hidden="true" />
      </div>
    </section>
  );
}
