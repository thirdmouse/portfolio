"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../styles.css"; // if you already use this pattern; otherwise remove

export default function ProjectsPage() {
  // Category chips (using your earlier images)
  const categories = React.useMemo(
    () => [
      { key: "games", label: "Games", imgSrc: "/images/games.png" },
      { key: "film", label: "Film", imgSrc: "/images/film.png" },
      { key: "design", label: "Design", imgSrc: "/images/design.png" },
      { key: "engineering", label: "Engineering", imgSrc: "/images/engineering.png" },
    ],
    []
  );

  // All start ACTIVE (blue)
  const [activeCats, setActiveCats] = React.useState(() => {
    const s = new Set();
    for (const c of categories) s.add(c.key);
    return s;
  });

  const toggleCat = (key) => {
    setActiveCats((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // Products/projects data (example). Use `category` for single-tag behavior.
  const products = React.useMemo(
    () => [
      { id: "c1", title: "Want Cake, Am Lazy", category: "design", thumbSrc: "/images/thumbs/wcal.png" },
      { id: "c2", title: "A Closet", category: "film", thumbSrc: "/images/thumbs/closet.png" },
      { id: "c3", title: "Curses!", category: "games", thumbSrc: "/images/thumbs/curses.png" },
      { id: "c4", title: "Touchscreen Experiments", category: "design", thumbSrc: "/images/thumbs/ts.png" },
      { id: "c5", title: "Storyvox", category: "engineering", thumbSrc: "/images/thumbs/storyvox.png" },
      { id: "c6", title: "Heat", category: "film", thumbSrc: "/images/thumbs/heat.png" },
      { id: "c7", title: "Guerra de Discretos", category: "games", thumbSrc: "/images/thumbs/guerra.png" },
      { id: "c8", title: "Lil' Dipper Rover", category: "engineering", thumbSrc: "/images/thumbs/rover.png" },
      { id: "c9", title: "Requiem for Sisyphus", category: "film", thumbSrc: "/images/thumbs/sisyphus.png" },
      { id: "c10", title: "Cart Hanger", category: "engineering", thumbSrc: "/images/thumbs/hanger.png" },
      { id: "c11", title: "Live from the Acropolis", category: "design", thumbSrc: "/images/thumbs/athens.png" },
      { id: "c12", title: "PLTW Habitat for Humanity", category: "engineering", thumbSrc: "/images/thumbs/habitat.png" },
    ],
    []
  );

  const visibleProducts = React.useMemo(() => {
    // Hide products whose category is currently OFF
    return products.filter((p) => activeCats.has(p.category));
  }, [products, activeCats]);

  const catMeta = React.useMemo(() => {
    const m = {};
    for (const c of categories) m[c.key] = c;
    return m;
  }, [categories]);

  return (
    <main className="projectsPage">
      <header className="projectsHeader">
        <h1 className="projectsTitle">Projects</h1>
        <p className="projectsSub">
          Toggle categories to filter the grid. Everything reflows smoothly.
        </p>

        <div className="catRow" aria-label="Project categories">
          {categories.map((c) => {
            const isOn = activeCats.has(c.key);
            return (
              <button
                key={c.key}
                className={`catBtn ${isOn ? "isOn" : "isOff"}`}
                onClick={() => toggleCat(c.key)}
                aria-pressed={isOn}
                title={isOn ? `Hide ${c.label}` : `Show ${c.label}`}
              >
                <span className="catIconMask" aria-hidden="true">
                  <img src={c.imgSrc} alt="" />
                </span>
                <span className="catLabel">{c.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      <section className="productsGrid" aria-label="All projects">
        <AnimatePresence mode="popLayout">
          {visibleProducts.map((p) => {
            const c = catMeta[p.category];
            return (
              <motion.a
                key={p.id}
                href="#"
                className="productCard"
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22 }}
              >
                <div className="productThumb">
                  {p.thumbSrc ? <img src={p.thumbSrc} alt="" aria-hidden="true" /> : null}

                  {/* category corner badge */}
                  {c?.imgSrc ? (
                    <div className="productCatBadge" aria-label={c.label} title={c.label}>
                      <img src={c.imgSrc} alt="" aria-hidden="true" />
                    </div>
                  ) : null}
                </div>

                <div className="productInfo">
                  <div className="productTitle">{p.title}</div>
                  <div className="productMeta">{c?.label}</div>
                </div>
              </motion.a>
            );
          })}
        </AnimatePresence>
      </section>
    </main>
  );
}
