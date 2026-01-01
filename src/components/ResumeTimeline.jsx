"use client";

import React from "react";

/**
 * Timeline item shape (all optional):
 * {
 *   id: string,
 *   date?: string,
 *   title?: string,
 *   subtitle?: string,
 *   description?: string | ReactNode,
 *   bullets?: string[],
 *   image?: { src: string, alt?: string },
 *   tags?: string[],
 *   align?: "left" | "right"
 * }
 */

export default function ResumeTimeline({ items }) {
  const containerRef = React.useRef(null);
  const itemRefs = React.useRef(new Map());

  const lastScrollY = React.useRef(0);
  const [scrollDir, setScrollDir] = React.useState("down"); // "down" | "up"

  // Track scroll direction
  React.useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const dir = y > lastScrollY.current ? "down" : "up";
      lastScrollY.current = y;
      setScrollDir(dir);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Visibility map per item
  const [activeMap, setActiveMap] = React.useState(() => new Map());

  React.useEffect(() => {
    const root = null; // viewport
    const io = new IntersectionObserver(
      (entries) => {
        setActiveMap((prev) => {
          const next = new Map(prev);

          for (const entry of entries) {
            const id = entry.target.getAttribute("data-id");
            if (!id) continue;

            // When scrolling down: reveal as it enters
            if (scrollDir === "down") {
              if (entry.isIntersecting) next.set(id, true);
            }
          }
          return next;
        });
      },
      {
        root,
        threshold: 0.18, // how much must be visible to count as "in"
        rootMargin: "0px 0px -10% 0px", // makes it feel a bit earlier on the way down
      }
    );

    // Observe all items
    for (const it of items) {
      const el = itemRefs.current.get(it.id);
      if (el) io.observe(el);
    }

    return () => io.disconnect();
  }, [items, scrollDir]);
React.useEffect(() => {
  const onScrollUpCollapse = () => {
    if (scrollDir !== "up") return;

    const viewportBottom = window.innerHeight * 0.65;

    setActiveMap((prev) => {
      const next = new Map(prev);

      for (const [id, el] of itemRefs.current.entries()) {
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        // If the item is fully BELOW the viewport,
        // fade it out first when scrolling up
        if (rect.top > viewportBottom) {
          next.set(id, false);
        }
      }

      return next;
    });
  };

  window.addEventListener("scroll", onScrollUpCollapse, { passive: true });
  return () => window.removeEventListener("scroll", onScrollUpCollapse);
}, [scrollDir]);

  return (
    <section className="timelineSection" ref={containerRef} aria-label="Resume timeline">
      <div className="timelineHeader">
        <h2 className="sectionTitle" style={{ marginBottom: 0 }}>
          Resume
        </h2>
        <div className="timelineSubtle">Scroll to reveal</div>
      </div>

      <div className="timeline">
        <div className="timelineLine" aria-hidden="true" />

        {items.map((it, idx) => {
          const side = it.align ?? (idx % 2 === 0 ? "left" : "right");
          const isActive = activeMap.get(it.id) === true;

          return (
            <div
              key={it.id}
              className={`timelineRow ${side}`}
              ref={(el) => {
                if (el) itemRefs.current.set(it.id, el);
              }}
              data-id={it.id}
            >
              <div className="timelineDotWrap" aria-hidden="true">
                {it.dotImage?.src ? (
                  <div className={`timelineDotImgWrap ${isActive ? "isActive" : ""}`}>
                    <img
                      className="timelineDotImg"
                      src={it.dotImage.src}
                      alt={it.dotImage.alt ?? ""}
                    />
                  </div>
                ) : (
                  <div className={`timelineDot ${isActive ? "isActive" : ""}`} />
                )}
              </div>

              <article className={`timelineCard ${isActive ? "isIn" : "isOut"}`}>
                {(it.date || it.tags?.length) && (
                  <div className="timelineMeta">
                    {it.date && <span className="timelineDate">{it.date}</span>}
                    {it.tags?.length ? (
                      <div className="timelineTags">
                        {it.tags.map((t) => (
                          <span className="timelineTag" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )}

                {/* Any combo of title/subtitle/description */}
                {(it.title || it.subtitle) && (
                  <header className="timelineCardHeader">
                    {it.title && <h3 className="timelineTitle">{it.title}</h3>}
                    {it.subtitle && <p className="timelineSubtitle">{it.subtitle}</p>}
                  </header>
                )}

                {it.image?.src && (
                  <div className="timelineImageWrap">
                    <img className="timelineImage" src={it.image.src} alt={it.image.alt ?? ""} />
                  </div>
                )}

                {it.description && (
                  <div className="timelineDescription">
                    {typeof it.description === "string" ? <p>{it.description}</p> : it.description}
                  </div>
                )}

                {it.bullets?.length ? (
                  <ul className="timelineBullets">
                    {it.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
