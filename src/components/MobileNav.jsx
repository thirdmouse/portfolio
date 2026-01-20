"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

export default function NavButton() {
  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      const b = btnRef.current;
      const p = panelRef.current;
      if (b?.contains(e.target) || p?.contains(e.target)) return;
      setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Close on ESC
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }
    return false;
  };

  // Smart nav: if you’re not on home, go home first, then scroll
  const goHomeAndScroll = (id) => {
    setOpen(false);

    if (pathname === "/") {
      scrollToId(id);
      return;
    }

    router.push("/");

    // Wait a tick for the new page to paint, then scroll
    requestAnimationFrame(() => {
      // a couple frames is safer with Next hydration
      requestAnimationFrame(() => scrollToId(id));
    });
  };

  const go = (href) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <div className="navBtnWrap">
      <button
        ref={btnRef}
        className="navBtn"
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Menu
      </button>

      {open && (
        <div ref={panelRef} className="navPanel" role="menu" aria-label="Site navigation">
          {/* HOME group */}
          <div className="navGroup">
            <button className="navTop" role="menuitem" onClick={() => go("/")}>
              Home
            </button>

            <div className="navSub">
              <button className="navItem" role="menuitem" onClick={() => goHomeAndScroll("about")}>
                About
              </button>
              <button className="navItem" role="menuitem" onClick={() => goHomeAndScroll("resume")}>
                Resume
              </button>
              <button className="navItem" role="menuitem" onClick={() => goHomeAndScroll("contact")}>
                Contact
              </button>
            </div>
          </div>

          <div className="navDivider" />

          {/* PROCESS */}
          <button className="navTop" role="menuitem" onClick={() => goHomeAndScroll("process")}>
            Process
          </button>

          <div className="navDivider" />

          {/* PROJECTS group */}
          <div className="navGroup">
            <button className="navTop" role="menuitem" onClick={() => go("/projects")}>
              Projects
            </button>

            <div className="navSub">
              <button className="navItem" role="menuitem" onClick={() => go("/projects?type=digital")}>
                Digital
              </button>
              <button className="navItem" role="menuitem" onClick={() => go("/projects?type=physical")}>
                Physical
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
