"use client";

import React, { useEffect, useRef, useState } from "react";

export default function ParallaxTripleColumns({ tiles }) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0 → 1 over the section

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);

      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // Small helper: smooth fade from start..end
  const smooth01 = (p, start, end) => {
    if (p <= start) return 0;
    if (p >= end) return 1;
    const t = (p - start) / (end - start);
    return t * t * (3 - 2 * t); // smoothstep
  };

  // Reveal windows: tweak these for timing
  const windows = [
    { start: 0.06, end: 0.18 },
    { start: 0.18, end: 0.30 },
    { start: 0.30, end: 0.42 },
  ];

  // ✅ Contact fades in late
  const contactA = smooth01(progress, 0.72, 0.90);

  return (
    <section ref={sectionRef} className="tripleParallax" aria-label="Primary categories">
      <div className="tripleSticky">
        <div className="tripleRow">
          {tiles.map((t, idx) => {
            const w = windows[idx] ?? { start: 0.1, end: 0.2 };

            const inA = smooth01(progress, w.start, w.end);
            const outA = 1 - smooth01(progress, 0.62, 0.80);
            const vis = inA * outA;

            const enterYPx = (1 - inA) * 40;
            const exitYPx = smooth01(progress, 0.62, 0.80) * -60;
            const yPx = enterYPx + exitYPx;

            return (
              <a
                key={t.id}
                href={t.href}
                className="tripleTile"
                style={{
                  opacity: vis,
                  transform: `translateY(${yPx}px)`,
                  pointerEvents: vis > 0.9 ? "auto" : "none",
                }}
              >
                <video
                  className="tripleVideo"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={t.poster}
                >
                  <source src={t.videoSrc} type="video/mp4" />
                </video>

                <div className="tripleScrim" aria-hidden="true" />
                <div className="tripleTitle">{t.title}</div>
              </a>
            );
          })}
        </div>

        {/* ✅ Center contact */}
        <div
          className="contactCenter"
          style={{
            opacity: contactA,
            transform: `translateY(${(1 - contactA) * 12}px)`,
            pointerEvents: contactA > 0.85 ? "auto" : "none",
          }}
        >
          <div className="contactCard">
            <div className="contactLine">
              <a href="mailto:charliepatton17@gmail.com">charliepatton17@gmail.com</a>
            </div>
            <div className="contactLine">
              <a href="https://www.linkedin.com/in/charliecpatton" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <span className="contactDot">•</span>
              <a href="https://tinyurl.com/cpresumepm" target="_blank" rel="noreferrer">
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
