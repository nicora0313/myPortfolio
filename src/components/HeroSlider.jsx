"use client";

import { useEffect, useMemo, useState } from "react";
import { assetPath } from "@/data/site";
import styles from "@/styles/components.module.css";

export default function HeroSlider({ slides = [] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const current = useMemo(() => String(index + 1).padStart(2, "0"), [index]);
  const total = String(Math.max(slides.length, 1)).padStart(2, "0");

  return (
    <>
      <div className={`${styles.heroSlider} home-slider`}>
        {slides.map((slide, i) => (
          <picture key={`${slide.pc}-${i}`} className={`${styles.heroSlide} ${i === index ? styles.heroSlideActive : ""} home-slide ${i === index ? "active" : ""}`} aria-hidden={i !== index}>
            <source media="(max-width: 820px)" srcSet={assetPath(slide.sp)} />
            <img src={assetPath(slide.pc)} alt={i === index ? `メインビジュアル ${i + 1}` : ""} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} decoding="async" />
          </picture>
        ))}
      </div>
      <div className="home-hero-side">
        <div className="home-counter" aria-label={`${index + 1} / ${slides.length}`}>
          <span>{current}</span><span className="home-counter-line" /><span>{total}</span>
        </div>
        <div className="home-slider-arrows">
          <button type="button" className="home-slider-arrow" aria-label="前のスライド" onClick={() => setIndex((index - 1 + slides.length) % slides.length)}>‹</button>
          <button type="button" className="home-slider-arrow" aria-label="次のスライド" onClick={() => setIndex((index + 1) % slides.length)}>›</button>
        </div>
      </div>
    </>
  );
}
