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
 *   align?: "left" | "right",
 *   dotImage?: { src: string, alt?: string },
 * }
 */
function Collapsible({ isOpen, children, className = "" }) {
  const innerRef = React.useRef(null);
  const [height, setHeight] = React.useState(0);

  React.useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const measure = () => setHeight(el.scrollHeight);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  return (
    <div
      className={`timelineCollapsible ${isOpen ? "isOpen" : ""} ${className}`}
      style={{ maxHeight: isOpen ? height : 0 }}
      aria-hidden={!isOpen}
    >
      <div ref={innerRef} className="timelineCollapsibleInner">
        {children}
      </div>
    </div>
  );
}

export default function ResumeTimeline({ items, scrollContainerSelector = ".contentSheet" }) {
  const itemRefs = React.useRef(new Map());

  // Use the actual scroller if your page scrolls inside .contentSheet (like your home page).
  const scrollerRef = React.useRef(null);

  const lastScroll = React.useRef(0);
  const [scrollDir, setScrollDir] = React.useState("down"); // "down" | "up"

  // Which items are "revealed" (fade-in / dot active)
  const [activeMap, setActiveMap] = React.useState(() => new Map());

  // Which item is expanded (accordion). If you want multi-open, swap to a Set.
  const [openId, setOpenId] = React.useState(null);

  React.useEffect(() => {
    scrollerRef.current =
      (scrollContainerSelector && document.querySelector(scrollContainerSelector)) || null;
  }, [scrollContainerSelector]);

  const getScrollPos = React.useCallback(() => {
    const scrollerEl = scrollerRef.current;
    if (scrollerEl) return scrollerEl.scrollTop || 0;
    return window.scrollY || 0;
  }, []);

  // Track scroll direction (supports nested scroller)
  React.useEffect(() => {
    lastScroll.current = getScrollPos();

    const onScroll = () => {
      const y = getScrollPos();
      const dir = y > lastScroll.current ? "down" : "up";
      lastScroll.current = y;
      setScrollDir(dir);
    };

    const scrollerEl = scrollerRef.current;
    const target = scrollerEl || window;

    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, [getScrollPos]);

  // Reveal on enter when scrolling down (supports nested scroller via root)
  React.useEffect(() => {
    const root = scrollerRef.current || null;

    const io = new IntersectionObserver(
      (entries) => {
        setActiveMap((prev) => {
          const next = new Map(prev);

          for (const entry of entries) {
            const id = entry.target.getAttribute("data-id");
            if (!id) continue;

            if (scrollDir === "down" && entry.isIntersecting) {
              next.set(id, true);
            }
          }

          return next;
        });
      },
      {
        root,
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    for (const it of items) {
      const el = itemRefs.current.get(it.id);
      if (el) io.observe(el);
    }

    return () => io.disconnect();
  }, [items, scrollDir]);

  // Optional: fade-out items that are below the viewport when scrolling up (supports nested scroller)
  React.useEffect(() => {
    const onScrollUpCollapse = () => {
      if (scrollDir !== "up") return;

      const viewportBottom = (scrollerRef.current?.clientHeight || window.innerHeight) * 0.65;

      setActiveMap((prev) => {
        const next = new Map(prev);

        for (const [id, el] of itemRefs.current.entries()) {
          if (!el) continue;
          const rect = el.getBoundingClientRect();

          if (rect.top > viewportBottom) {
            next.set(id, false);
          }
        }

        return next;
      });
    };

    const target = scrollerRef.current || window;
    target.addEventListener("scroll", onScrollUpCollapse, { passive: true });
    return () => target.removeEventListener("scroll", onScrollUpCollapse);
  }, [scrollDir]);

  const toggleOpen = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="timelineSection" aria-label="Resume timeline">
      <div className="timelineHeader">
        <h2 className="sectionTitle" style={{ marginBottom: 0 }}>
          Resume
        </h2>
      </div>

      <div className="timeline">
        <div className="timelineLine" aria-hidden="true" />

        {items.map((it, idx) => {
          const side = it.align ?? (idx % 2 === 0 ? "left" : "right");
          const isRevealed = activeMap.get(it.id) === true;
          const isOpen = openId === it.id;

          const previewBullet = it.subtitle;

          return (
            <div
              key={it.id}
              className={`timelineRow ${side} ${isOpen ? "isExpanded" : ""}`}
              ref={(el) => {
                if (el) itemRefs.current.set(it.id, el);
              }}
              data-id={it.id}
            >
              <div className="timelineDotWrap" aria-hidden="true">
                {it.dotImage?.src ? (
                  <div className={`timelineDotImgWrap ${isRevealed ? "isActive" : ""}`}>
                    <img
                      className="timelineDotImg"
                      src={it.dotImage.src}
                      alt={it.dotImage.alt ?? ""}
                    />
                  </div>
                ) : (
                  <div className={`timelineDot ${isRevealed ? "isActive" : ""}`} />
                )}
              </div>

              {/* Button card: collapsed preview + expandable details */}
              <button
                type="button"
                className={`timelineCard timelineCardBtn ${isRevealed ? "isIn" : "isOut"}`}
                onClick={() => toggleOpen(it.id)}
                aria-expanded={isOpen}
                aria-controls={`timeline-details-${it.id}`}
              >
                <div className="timelineSummary">
                  <div className="timelineSummaryTop">
                    {it.title && <h3 className="timelineTitle">{it.title}</h3>}
                    <span className={`timelineChevron ${isOpen ? "isOpen" : ""}`} aria-hidden="true">
                      ▾
                    </span>
                  </div>

                  {previewBullet ? <p className="timelinePreviewBullet">{previewBullet}</p> : null}
                </div>

                {/* Full content (same as before) */}
                <Collapsible isOpen={isOpen}>
                <div
                  id={`timeline-details-${it.id}`}
                  className="timelineDetails"
                  // prevent accidental text selection making the button feel weird
                  onClick={(e) => {
                    // Clicking inside still toggles; keep default.
                    // If you later add links inside, we can stopPropagation for them.
                  }}
                >
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

                  {(it.subtitle || it.description || it.image?.src || it.bullets?.length) && (
                    <>
                      {it.subtitle && <p className="timelineSubtitle">{it.subtitle}</p>}

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
                    </>
                  )}
                </div></Collapsible>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
