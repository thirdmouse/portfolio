"use client";

import React from "react";
import { usePathname } from "next/navigation";

const DEFAULT_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/process", label: "Process" },
  { href: "/projects", label: "Projects" },
];

export default function MobileNav({
  items = DEFAULT_ITEMS,
  revealOnScroll = false,
  alwaysVisible = false,
  // In your site, the scroll container is the sheet. This makes reveal work.
  scrollContainerSelector = ".contentSheet",
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(alwaysVisible || !revealOnScroll);

  // Close on route change
  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Esc closes
  React.useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Reveal logic (supports scroll containers like .contentSheet)
  React.useEffect(() => {
    if (alwaysVisible) {
      setIsVisible(true);
      return;
    }
    if (!revealOnScroll) {
      setIsVisible(true);
      return;
    }

    // Prefer the scroll container if it exists; otherwise use window
    const scrollerEl =
      (scrollContainerSelector && document.querySelector(scrollContainerSelector)) || null;

    const getScrolled = () => {
      if (scrollerEl) return (scrollerEl.scrollTop || 0) > 0;
      return (window.scrollY || 0) > 0;
    };

    // If already scrolled (e.g. bfcache), show it immediately
    if (getScrolled()) {
      setIsVisible(true);
      return;
    }

    let revealed = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      setIsVisible(true);

      // cleanup listeners after reveal
      if (scrollerEl) {
        scrollerEl.removeEventListener("scroll", reveal);
        scrollerEl.removeEventListener("wheel", reveal);
        scrollerEl.removeEventListener("touchmove", reveal);
      } else {
        window.removeEventListener("scroll", reveal);
        window.removeEventListener("wheel", reveal);
        window.removeEventListener("touchmove", reveal);
      }
      window.removeEventListener("keydown", onKey);
    };

    const onKey = (e) => {
      // “scroll intent” keys
      if (
        e.key === "ArrowDown" ||
        e.key === "PageDown" ||
        e.key === " " ||
        e.key === "End"
      ) {
        reveal();
      }
    };

    // Attach to the right target
    if (scrollerEl) {
      scrollerEl.addEventListener("scroll", reveal, { passive: true });
      scrollerEl.addEventListener("wheel", reveal, { passive: true });
      scrollerEl.addEventListener("touchmove", reveal, { passive: true });
    } else {
      window.addEventListener("scroll", reveal, { passive: true });
      window.addEventListener("wheel", reveal, { passive: true });
      window.addEventListener("touchmove", reveal, { passive: true });
    }
    window.addEventListener("keydown", onKey);

    return () => {
      if (scrollerEl) {
        scrollerEl.removeEventListener("scroll", reveal);
        scrollerEl.removeEventListener("wheel", reveal);
        scrollerEl.removeEventListener("touchmove", reveal);
      } else {
        window.removeEventListener("scroll", reveal);
        window.removeEventListener("wheel", reveal);
        window.removeEventListener("touchmove", reveal);
      }
      window.removeEventListener("keydown", onKey);
    };
  }, [alwaysVisible, revealOnScroll, scrollContainerSelector]);

  const rootClass = `mobileNav${isVisible ? " isVisible" : ""}`;

  return (
    <div className={rootClass}>
      <button
        className="mobileNavBtn"
        onClick={() => setMenuOpen((v) => !v)}
        aria-expanded={menuOpen}
        aria-controls="mobileNavMenu"
        aria-label="Open menu"
        type="button"
      >
        <img src="/logo.png" alt="" aria-hidden="true" className="mobileNavIcon iconClosed" />
        <img src="/open.png" alt="" aria-hidden="true" className="mobileNavIcon iconOpen" />
      </button>

      {menuOpen && (
        <>
          <button
            className="mobileNavBackdrop"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            type="button"
          />

          <div className="mobileNavMenu" id="mobileNavMenu" role="menu">
            {items.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`mobileNavItem ${active ? "isActive" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="navBullet" />
                  <span className="navText">{item.label}</span>
                </a>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
