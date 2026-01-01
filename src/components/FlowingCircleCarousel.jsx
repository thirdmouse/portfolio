"use client";

import React from "react";

export default function FlowingCircleCarousel({ items, categoryMeta }) {
  const scrollerRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const lastTRef = React.useRef(0);

  const [pausedByHover, setPausedByHover] = React.useState(false);
  const [pausedByBottom, setPausedByBottom] = React.useState(false);

  // Auto-flow velocity (px/sec) with easing
  const baseSpeed = 28; // your gentle drift
  const speedRef = React.useRef(baseSpeed); // current speed
  const targetSpeedRef = React.useRef(baseSpeed); // what we're easing toward

  // Magnetic "pull to center" on release
  const snapRef = React.useRef({
    active: false,
    targetScrollLeft: 0,
  });

  // Drag-to-scroll
  const dragRef = React.useRef({
  isDown: false,
  startX: 0,
  startScrollLeft: 0,
  pointerId: null,
  moved: false,
});

  // Duplicate items for seamless loop
  const loopItems = React.useMemo(() => [...items, ...items], [items]);

  // Pause at bottom of page
  React.useEffect(() => {
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setPausedByBottom(atBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const paused = pausedByHover;

  // Update target speed when paused/unpaused
  React.useEffect(() => {
    targetSpeedRef.current = paused ? 0 : baseSpeed;
    // If we're unpausing, cancel any snapping so motion resumes cleanly
    if (!paused) snapRef.current.active = false;
  }, [paused]);

  // Helpers for infinite loop normalization
  const normalizeScroll = React.useCallback((scroller) => {
  const halfWidth = scroller.scrollWidth / 2;
  if (halfWidth <= 0) return;

  // Perfect wrap for BOTH directions, even for huge deltas
  scroller.scrollLeft = ((scroller.scrollLeft % halfWidth) + halfWidth) % halfWidth;
}, []);

  // Compute a "center this item" target and start magnetic lerp
  const startMagneticCenter = React.useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Need items to exist
    const itemsEls = scroller.querySelectorAll(".carouselItem");
    if (!itemsEls || itemsEls.length < 2) return;

    // Ensure we're normalized before measuring
    normalizeScroll(scroller);

    // We’ll find the item whose CENTER is closest to the scroller’s center line
    const scrollerCenter = scroller.scrollLeft + scroller.clientWidth / 2;

    let best = { dist: Infinity, targetLeft: scroller.scrollLeft };

    for (const el of itemsEls) {
      const itemCenter = el.offsetLeft + el.offsetWidth / 2;

      // We want itemCenter to align with scrollerCenter:
      // target scrollLeft = itemCenter - scrollerWidth/2
      const target = itemCenter - scroller.clientWidth / 2;
      const dist = Math.abs(itemCenter - scrollerCenter);

      if (dist < best.dist) best = { dist, targetLeft: target };
    }

    // Magnetic pull target (normalized into the looping range)
    const halfWidth = scroller.scrollWidth / 2;
    let target = best.targetLeft;

    // Normalize target to [0, halfWidth)
    target = ((target % halfWidth) + halfWidth) % halfWidth;

    snapRef.current.active = true;
    snapRef.current.targetScrollLeft = target;
  }, [normalizeScroll]);

  // Main RAF loop: ease velocity + apply magnetic pull when active
  React.useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const velocityEase = 10; // higher = faster ease to target speed
    const snapStrength = 14; // higher = stronger magnetic pull

    const step = (t) => {
      if (!lastTRef.current) lastTRef.current = t;
      const dt = Math.min(0.05, (t - lastTRef.current) / 1000); // clamp dt
      lastTRef.current = t;

      // Ease current speed toward target speed (critically smooth)
      const targetV = targetSpeedRef.current;
      const v = speedRef.current;

      // Exponential smoothing: stable across framerates
      const vAlpha = 1 - Math.exp(-velocityEase * dt);
      speedRef.current = v + (targetV - v) * vAlpha;

      // If not paused, apply auto-flow
      if (!paused) {
        scroller.scrollLeft += speedRef.current * dt;
        normalizeScroll(scroller);
      } else {
        // While paused, if snap active, magnetically lerp to center target
        if (snapRef.current.active && !dragRef.current.isDown) {
          normalizeScroll(scroller);

          const halfWidth = scroller.scrollWidth / 2;
          const current = scroller.scrollLeft;
          let target = snapRef.current.targetScrollLeft;

          // Choose shortest direction around the loop
          let delta = target - current;
          if (Math.abs(delta) > halfWidth / 2) {
            delta = delta > 0 ? delta - halfWidth : delta + halfWidth;
          }

          const snapAlpha = 1 - Math.exp(-snapStrength * dt);
          scroller.scrollLeft = current + delta * snapAlpha;

          normalizeScroll(scroller);

          if (Math.abs(delta) < 0.5) {
            scroller.scrollLeft = ((target % halfWidth) + halfWidth) % halfWidth;
            snapRef.current.active = false;
          }
        } else {
          // Keep time from “accumulating” so resume is clean
          lastTRef.current = t;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTRef.current = 0;
    };
  }, [paused, normalizeScroll]);

  // Pointer drag only when paused (per your original behavior)
const onPointerDown = (e) => {
  if (!paused) return;
  const scroller = scrollerRef.current;
  if (!scroller) return;

  snapRef.current.active = false;

  dragRef.current.isDown = true;
  dragRef.current.pointerId = e.pointerId;
  dragRef.current.startX = e.clientX;
  dragRef.current.startScrollLeft = scroller.scrollLeft;
  dragRef.current.moved = false;

  scroller.setPointerCapture?.(e.pointerId);
};

const onPointerMove = (e) => {
  if (!paused) return;
  const scroller = scrollerRef.current;
  if (!scroller) return;
  if (!dragRef.current.isDown) return;

  const dx = e.clientX - dragRef.current.startX;

  if (!dragRef.current.moved && Math.abs(dx) > 4) {
    dragRef.current.moved = true;
  }

  scroller.scrollLeft = dragRef.current.startScrollLeft - dx;
  normalizeScroll(scroller);
};

const endDrag = () => {
  if (!paused) {
    dragRef.current.isDown = false;
    dragRef.current.pointerId = null;
    dragRef.current.moved = false;
    return;
  }

  const didDrag = dragRef.current.moved;

  dragRef.current.isDown = false;
  dragRef.current.pointerId = null;
  dragRef.current.moved = false;

  // ✅ Only recenter if the user actually dragged
  if (didDrag) startMagneticCenter();
};

React.useEffect(() => {
  const scroller = scrollerRef.current;
  if (!scroller) return;

  const onWheel = (e) => {
    if (!paused) return; // only when paused (your current design)
    e.preventDefault();  // stops the page from scrolling

    // map vertical wheel -> horizontal scrub
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    scroller.scrollLeft += delta;

    normalizeScroll(scroller);
    // NOTE: no recenter here (per your requirement)
  };

  scroller.addEventListener("wheel", onWheel, { passive: false });
  return () => scroller.removeEventListener("wheel", onWheel);
}, [paused, normalizeScroll]);
const finishDrag = (e) => {
  const scroller = scrollerRef.current;

  const didDrag = dragRef.current.moved;

  dragRef.current.isDown = false;
  dragRef.current.moved = false;

  // ✅ Explicitly release pointer capture (prevents "stuck" behavior)
  if (scroller && dragRef.current.pointerId != null) {
    try {
      scroller.releasePointerCapture?.(dragRef.current.pointerId);
    } catch {}
  }
  dragRef.current.pointerId = null;

  // ✅ Only recenter if the user actually dragged
  if (paused && didDrag) startMagneticCenter();
};
  return (
    <div
      className={`carouselShell ${paused ? "isPaused" : ""}`}
      onMouseEnter={() => setPausedByHover(true)}
      onMouseLeave={() => setPausedByHover(false)}
      aria-label="Project carousel"
    >
      <div
    className="carouselScroller"
    ref={scrollerRef}
    onPointerDown={onPointerDown}
    onPointerMove={onPointerMove}
    onPointerUp={finishDrag}
    onPointerCancel={finishDrag}
    onPointerLeave={(e) => {
      if (dragRef.current.isDown) finishDrag(e);
    }}
  >
        <div className="carouselTrack">
          {loopItems.map((it, idx) => (
            <div className="carouselItem" key={`${it.id}-${idx}`}>
                <div className="miniWrap">
                    <div className="miniCircle" aria-label={it.title}>
                    {it.thumbSrc ? (
                        <img className="miniThumb" src={it.thumbSrc} alt="" aria-hidden="true" />
                    ) : null}
                    </div>

                    <div
                    className="miniCatBadge"
                    aria-hidden="true"
                    onPointerDown={(e) => e.stopPropagation()}  // ✅ prevents drag starting on badge
                    onMouseDown={(e) => e.stopPropagation()}
                    >
                    <img className="miniCatIcon" src={categoryMeta[it.category].imgSrc} alt="" />
                    <div className="miniCatLabel">{categoryMeta[it.category].label}</div>
                    </div>
                </div>

                <div className="miniTitle">{it.title}</div>
                </div>
          ))}
        </div>
      </div>

      <div className="carouselHint">
        {pausedByHover
          ? "Paused — drag/scroll"
          : "Hover to pause"}
      </div>
    </div>
  );
}
