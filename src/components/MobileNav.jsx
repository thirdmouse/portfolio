"use client";

import React from "react";
import { usePathname } from "next/navigation";

const DEFAULT_ITEMS = [
  {
    key: "home",
    href: "/",
    label: "Home",
    children: [
      { label: "About", scrollTo: "#about" },
      { label: "Resume", scrollTo: "#resume" },
      { label: "Contact", scrollTo: "#contact" },
    ],
  },
  { key: "process", href: "/process", label: "Process" },
  {
    key: "projects",
    href: "/projects",
    label: "Projects",
    children: [
      { label: "Digital", scrollTo: "#digital" },
      { label: "Physical", scrollTo: "#physical" },
    ],
  },
];

export default function MobileNav({
  items = DEFAULT_ITEMS,
  pageKey,
  scrollContainerSelector = ".contentSheet",
  revealOnScroll = false,
  alwaysVisible = false,
  // NEW: key used for session gating (optional to override)
  revealOnceSessionKey = "mobileNavRevealDoneThisSession",
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(alwaysVisible || !revealOnScroll);
  const [openGroupKey, setOpenGroupKey] = React.useState(null);

  // Close on route change
  React.useEffect(() => {
    setMenuOpen(false);
    setOpenGroupKey(null);
  }, [pathname]);

  // Esc closes
  React.useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Reveal logic (NOW: only once per session)
  React.useEffect(() => {
    if (alwaysVisible || !revealOnScroll) {
      setIsVisible(true);
      return;
    }

    // If we've already revealed once this session, stay visible immediately.
    const alreadyRevealed = sessionStorage.getItem(revealOnceSessionKey) === "1";
    if (alreadyRevealed) {
      setIsVisible(true);
      return;
    }

    const scrollerEl =
      (scrollContainerSelector && document.querySelector(scrollContainerSelector)) || null;

    const getScrolled = () => {
      if (scrollerEl) return (scrollerEl.scrollTop || 0) > 0;
      return (window.scrollY || 0) > 0;
    };

    // If user loads in already scrolled, reveal and mark the session flag.
    if (getScrolled()) {
      setIsVisible(true);
      sessionStorage.setItem(revealOnceSessionKey, "1");
      return;
    }

    let revealed = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;

      setIsVisible(true);
      sessionStorage.setItem(revealOnceSessionKey, "1");

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
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " " || e.key === "End") {
        reveal();
      }
    };

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
  }, [alwaysVisible, revealOnScroll, scrollContainerSelector, revealOnceSessionKey]);

  const rootClass = `mobileNav${isVisible ? " isVisible" : ""}`;

  const isRouteActive = (href) => {
    if (!href) return false;
    return href === "/" ? pathname === "/" : pathname?.startsWith(href);
  };

  const scrollToSelector = (selector) => {
    const el = document.querySelector(selector);
    if (!el) {
      console.warn(`Element not found for selector: ${selector}`);
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Which group should show its subitems?
  const routeGroupKey = items.find((it) => it.key && isRouteActive(it.href))?.key || null;
  const visibleGroupKey = openGroupKey ?? pageKey ?? routeGroupKey;

  const onParentClick = (e, item) => {
    const hasChildren = Array.isArray(item.children) && item.children.length > 0;

    // If parent has children and you're already on that page
    if (hasChildren && (pageKey === item.key || isRouteActive(item.href))) {
      e.preventDefault();
      // Toggle open/closed
      setOpenGroupKey((prev) => (prev === item.key ? null : item.key));
      return;
    }

    // Otherwise allow normal navigation
    setMenuOpen(false);
  };

  const onSubClick = (e, child) => {
    e.preventDefault();
    e.stopPropagation();

    if (child.scrollTo) {
      scrollToSelector(child.scrollTo);
    }

    setMenuOpen(false);
  };

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
              const active = item.key ? visibleGroupKey === item.key : isRouteActive(item.href);
              const showChildren = active && Array.isArray(item.children) && item.children.length > 0;

              return (
                <div key={item.href} className="mobileNavGroup">
                  <a
                    href={item.href}
                    className={`mobileNavItem ${active ? "isActive" : ""}`}
                    onClick={(e) => onParentClick(e, item)}
                    role="menuitem"
                  >
                    <span className="navBullet" />
                    <span className="navText">{item.label}</span>
                  </a>

                  {showChildren && (
                    <div className="mobileNavSubmenu" role="group" aria-label={`${item.label} submenu`}>
                      {item.children.map((child) => (
                        <a
                          key={`${item.key}-${child.label}`}
                          href={child.scrollTo || "#"}
                          className="mobileNavItem mobileNavSubItem"
                          onClick={(e) => onSubClick(e, child)}
                          role="menuitem"
                        >
                          <span className="navBullet navBulletSub" />
                          <span className="navText">{child.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
