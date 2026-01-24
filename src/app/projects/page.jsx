"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../styles.css";
import "./projects.css";
import MobileNav from "../../components/MobileNav";

/**
 * Projects page revamp:
 * - Physical / OR / Digital selector with hash IDs: #physical, #digital, #all
 * - Tag filters with "Deselect all"
 * - Grid cards with subtitle + 2-line description
 * - Cards with href get a subtle blue "hasLink" highlight
 * - Cards without href open a fullscreen modal (inspired by Process example boxes)
 */

const TAGS = [
  { key: "figma", label: "Figma" },
  { key: "miro", label: "Miro" },
  { key: "video-editing", label: "Video Editing (Premiere, Final Cut)" },
  { key: "game-engine", label: "Game Engine (Unity, Unreal)" },
  { key: "physical-design", label: "Physical Design" },
  { key: "event-design", label: "Event Design" },
  { key: "sensory-design", label: "Sensory Design" },
  { key: "engineering", label: "Engineering" },
  { key: "programming", label: "Programming (C#, Python, React, Matlab)" },
  { key: "data-analysis", label: "Data Analysis" },
  { key: "prototyping", label: "Prototyping" },
  { key: "manufacturing", label: "Manufacturing" },
];

// Small helper: normalize hash => "physical" | "digital" | "all"
function hashToMedium(hash) {
  const h = String(hash || "").replace("#", "").trim().toLowerCase();
  if (h === "physical") return "physical";
  if (h === "digital") return "digital";
  if (h === "all") return "all";
  return null;
}

export default function ProjectsPage() {
    const CATEGORY_META = React.useMemo(
    () => ({
      games: { label: "Games", imgSrc: "/images/games.png" },
      film: { label: "Film", imgSrc: "/images/film.png" },
      design: { label: "Design", imgSrc: "/images/design.png" },
      engineering: { label: "Engineering", imgSrc: "/images/engineering.png" },
    }),
    []
  );

  const projects = React.useMemo(
    () => [
      {
        id: "inside-risk",
        title: "InsideRisk",
        subtitle: "AI-integrated psychometric experiences",
        description:
          "Redesigned a flagship 4-hour experience into fast, modular delivery—keeping immersion while scaling to enterprise clients.",
        category: "design",
        medium: "digital",
        tags: ["figma", "programming", "data-analysis"],
        href: "/projects/inside-risk",
        thumbSrc: "/images/ir.jpeg",
      },
      {
        id: "color-guard",
        title: "Color Guard",
        subtitle: "iOS game design + analytics iteration",
        description:
          "Shipped to players in 10+ countries. Iterated economy + anti-fun mitigation using playtests and telemetry.",
        category: "games",
        medium: "digital",
        tags: ["game-engine", "programming", "data-analysis"],
        href: "/projects/color-guard",
        thumbSrc: "/images/feat-b.jpg",
      },
      {
        id: "long-time-lets-see",
        title: "Long Time, Let’s See!",
        subtitle: "Social media as an “experience matcher”",
        description:
          "A social platform designed like a dating app—optimized to get users off the app and into new experiences.",
        category: "design",
        medium: "digital",
        tags: ["figma", "prototyping"],
        href: "/projects/long-time-lets-see",
        thumbSrc: "/images/feat-c.jpg",
      },

      // Existing thumbnails (kept) — add richer metadata + some are modal-only for now.
      {
        id: "wcal",
        title: "Want Cake, Am Lazy",
        subtitle: "Rapid ideation through simulation",
        description:
          "Paper-prototyped interaction loops to discover what people naturally reach for—then built the “funniest” solutions.",
        category: "design",
        medium: "digital",
        tags: ["prototyping", "figma"],
        thumbSrc: "/images/thumbs/wcal.png",
        caseStudy: {
          role: "Designer / Builder",
          outcome:
            "Fast prototyping helped validate the core interactions before investing in implementation.",
        },
      },
      {
        id: "closet",
        title: "A Closet",
        subtitle: "Cinematography + editing study",
        description:
          "Short-form film experiment focused on pacing, framing, and emotional clarity through cut structure.",
        category: "film",
        medium: "digital",
        tags: ["video-editing"],
        thumbSrc: "/images/thumbs/closet.png",
      },
      {
        id: "curses",
        title: "Curses!",
        subtitle: "Physical card game UX",
        description:
          "Designed social mechanics to coax group play and break negative loops—toward laughter-first participation.",
        category: "games",
        medium: "physical",
        tags: ["physical-design", "sensory-design", "prototyping"],
        thumbSrc: "/images/thumbs/curses.png",
      },
      {
        id: "touchscreen",
        title: "Touchscreen Experiments",
        subtitle: "Novel interaction affordances",
        description:
          "Iterated on unconventional touch input patterns to understand what feels intuitive, playful, and precise.",
        category: "design",
        medium: "digital",
        tags: ["prototyping", "programming"],
        thumbSrc: "/images/thumbs/ts.png",
      },
      {
        id: "storyvox",
        title: "Storyvox",
        subtitle: "Assistive OCR reader",
        description:
          "Capstone product engineering project: a reader that bridges text recognition to usable, human-centered output.",
        category: "engineering",
        medium: "digital",
        tags: ["engineering", "programming", "data-analysis"],
        thumbSrc: "/images/thumbs/storyvox.png",
      },
      {
        id: "heat",
        title: "Heat",
        subtitle: "Editing + narrative rhythm",
        description:
          "A film edit focused on intensity curves: when to compress, when to linger, and where to let silence land.",
        category: "film",
        medium: "digital",
        tags: ["video-editing"],
        thumbSrc: "/images/thumbs/heat.png",
      },
      {
        id: "guerra",
        title: "Guerra de Discretos",
        subtitle: "Systems-first game design",
        description:
          "Shipped game experiment exploring rules as “experience levers”—balance, pacing, and player intent.",
        category: "games",
        medium: "digital",
        tags: ["game-engine", "programming"],
        thumbSrc: "/images/thumbs/guerra.png",
      },
      {
        id: "rover",
        title: "Lil' Dipper Rover",
        subtitle: "Prototyping a physical system",
        description:
          "Built and iterated a small rover concept—mechanics, fabrication constraints, and test-driven iteration.",
        category: "engineering",
        medium: "physical",
        tags: ["engineering", "prototyping", "manufacturing"],
        thumbSrc: "/images/thumbs/rover.png",
      },
      {
        id: "sisyphus",
        title: "Requiem for Sisyphus",
        subtitle: "Film as experiential design",
        description:
          "A study in mood and structure—how editing and composition can feel like interactive pacing.",
        category: "film",
        medium: "digital",
        tags: ["video-editing", "sensory-design"],
        thumbSrc: "/images/thumbs/sisyphus.png",
      },
      {
        id: "hanger",
        title: "Cart Hanger",
        subtitle: "Manufacturable physical design",
        description:
          "A hardware concept shaped by constraints: tolerances, assembly, and how objects teach use through form.",
        category: "engineering",
        medium: "physical",
        tags: ["physical-design", "engineering", "manufacturing"],
        thumbSrc: "/images/thumbs/hanger.png",
      },
      {
        id: "acropolis",
        title: "Live from the Acropolis",
        subtitle: "Performance + spatial staging",
        description:
          "Designed a live experience with emphasis on audience flow, sightlines, and sensory “moments.”",
        category: "design",
        medium: "physical",
        tags: ["event-design", "sensory-design"],
        thumbSrc: "/images/thumbs/athens.png",
      },
      {
        id: "habitat",
        title: "PLTW Habitat for Humanity",
        subtitle: "End-to-end civil engineering project",
        description:
          "From planning to execution—physical constraints, stakeholder needs, and making complexity feel simple.",
        category: "engineering",
        medium: "physical",
        tags: ["engineering", "manufacturing"],
        thumbSrc: "/images/thumbs/habitat.png",
      },
    ],
    []
  );

  // --- Physical / Digital state (synced to hash) ---
  const [medium, setMedium] = React.useState("all"); // "physical" | "digital" | "all"

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const initial = hashToMedium(window.location.hash);
    if (initial) setMedium(initial);

    const onHash = () => {
      const next = hashToMedium(window.location.hash);
      if (next) setMedium(next);
    };

    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const setMediumAndHash = React.useCallback((next) => {
    setMedium(next);
    if (typeof window === "undefined") return;
    const h = next === "all" ? "all" : next;
    // replace so back button isn't annoying
    window.history.replaceState(null, "", `#${h}`);
  }, []);

  const mediumStatement = React.useMemo(() => {
    if (medium === "physical") {
      return "My physical work is about creating a space where experiences are heightened- harnessing all of the senses to enhance whatever content is being delivered.";
    }
    if (medium === "digital") {
      return "My digital work is about forming experiences that are effective in any location to broad audiences: microactivity and systems are precise and tuned per the medium.";
    }
    return "I see physical and digital as complementary— often comprising the same experience, expressed through different constraints and senses.";
  }, [medium]);

  // --- Tag filter ---
  const [activeTags, setActiveTags] = React.useState(() => new Set());

  const toggleTag = (key) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const deselectAll = () => setActiveTags(new Set());

  // --- Modal ---
  const [openProjectId, setOpenProjectId] = React.useState(null);
  const openProject = React.useMemo(
    () => projects.find((p) => p.id === openProjectId) || null,
    [openProjectId, projects]
  );

  React.useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpenProjectId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const visibleProjects = React.useMemo(() => {
    return projects.filter((p) => {
      if (medium !== "all" && p.medium !== medium) return false;

      // If no tags selected, don't filter by tag.
      if (activeTags.size === 0) return true;

      // OR match (any selected tag).
      return p.tags?.some((t) => activeTags.has(t));
    });
  }, [projects, medium, activeTags]);

  return (
    <main className="projectsPageV2">
      <MobileNav />

      <div className="projectsTitleBar">
        <div className="projectsTitleBarInner">
          <h1 className="projectsTitleH1">PROJECTS</h1>
        </div>
      </div>

      <header className="projectsHeaderV2" aria-label="Projects">
        <div className="projectsTitleBlock">
          <p className="projectsIntroV2">
            Work across mediums—built around microinteractivity, cognitive framing, and the feeling a system leaves behind.
          </p>
        </div>

        {/* Physical / OR / Digital selector */}
        <div className="podRow" aria-label="Physical or digital">
          <button
            id="physical"
            className={`podChoice ${medium === "physical" ? "isActive" : ""}`}
            type="button"
            onClick={() => setMediumAndHash("physical")}
            aria-pressed={medium === "physical"}
          >
            PHYSICAL
          </button>

          <button
            id="all"
            className={`podOr ${medium === "all" ? "isActive" : ""}`}
            type="button"
            onClick={() => setMediumAndHash("all")}
            aria-pressed={medium === "all"}
            title="Show both"
          >
            OR
          </button>

          <button
            id="digital"
            className={`podChoice ${medium === "digital" ? "isActive" : ""}`}
            type="button"
            onClick={() => setMediumAndHash("digital")}
            aria-pressed={medium === "digital"}
          >
            DIGITAL
          </button>
        </div>

        <p className="podStatement">{mediumStatement}</p>

        {/* Tags */}
        <div className="tagPanel" aria-label="Project tags">
          <div className="tagPanelTop">
            <button className="tagClear" type="button" onClick={deselectAll}>
              Deselect all
            </button>

            <div className="tagPanelHint">Tags filter by tool / medium (multi-select).</div>
          </div>

          <div className="tagGrid">
            {TAGS.map((t) => {
              const isOn = activeTags.has(t.key);
              return (
                <button
                  key={t.key}
                  className={`tagChip ${isOn ? "isOn" : ""}`}
                  type="button"
                  onClick={() => toggleTag(t.key)}
                  aria-pressed={isOn}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <section className="productsGridV2" aria-label="All projects">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((p) => {
            const c = CATEGORY_META[p.category];
            const hasLink = Boolean(p.href);

            const CardTag = hasLink ? motion.a : motion.button;
            const cardProps = hasLink
              ? { href: p.href, target: "_self" }
              : { type: "button", onClick: () => setOpenProjectId(p.id) };

            return (
              <CardTag
                key={p.id}
                className={`projectCardV2 ${hasLink ? "hasLink" : ""}`}
                layout
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.22 }}
                {...cardProps}
              >
                <div className="projectThumbV2">
                  {p.thumbSrc ? <img src={p.thumbSrc} alt="" aria-hidden="true" /> : null}

                  {c?.imgSrc ? (
                    <div className="projectCatBadgeV2" aria-label={c.label} title={c.label}>
                      <img src={c.imgSrc} alt="" aria-hidden="true" />
                    </div>
                  ) : null}
                </div>

                <div className="projectInfoV2">
                  <div className="projectTitleRow">
                    <div className="projectTitleV2">{p.title}</div>
                    <div className="projectMediumPill">{p.medium}</div>
                  </div>

                  <div className="projectSubtitleV2">{p.subtitle}</div>
                  <div className="projectDescV2">{p.description}</div>

                  <div className="projectMetaRow">
                    <div className="projectMetaV2">{c?.label}</div>

                    {hasLink ? (
                      <div className="projectLinkHint" aria-hidden="true">
                        ↗
                      </div>
                    ) : null}
                  </div>
                </div>
              </CardTag>
            );
          })}
        </AnimatePresence>
      </section>

      {/* Modal (for projects without href) */}
      <AnimatePresence>
        {openProject ? (
          <motion.div
            className="projectModalOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setOpenProjectId(null);
            }}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="projectModalCard"
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.18 }}
            >
              <div className="projectModalHeader">
                <div className="projectModalHeading">
                  <div className="projectModalTitle">{openProject.title}</div>
                  <div className="projectModalSubtitle">{openProject.subtitle}</div>
                </div>

                <button
                  className="projectModalClose"
                  type="button"
                  onClick={() => setOpenProjectId(null)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="projectModalBody">
                <p className="projectModalDesc">{openProject.description}</p>

                <div className="projectModalChips">
                  <span className="projectModalChip">{openProject.medium}</span>
                  <span className="projectModalChip">{CATEGORY_META[openProject.category]?.label}</span>
                </div>

                {openProject.tags?.length ? (
                  <div className="projectModalTagList">
                    {openProject.tags.map((t) => (
                      <span key={t} className="projectModalTag">
                        {TAGS.find((x) => x.key === t)?.label ?? t}
                      </span>
                    ))}
                  </div>
                ) : null}

                {openProject.caseStudy ? (
                  <div className="projectModalCase">
                    {openProject.caseStudy.role ? (
                      <p>
                        <strong>Role:</strong> {openProject.caseStudy.role}
                      </p>
                    ) : null}
                    {openProject.caseStudy.outcome ? (
                      <p>
                        <strong>Outcome:</strong> {openProject.caseStudy.outcome}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <div className="projectModalCase">
                    <p>
                      This is a short “quick case” placeholder—drop in a few paragraphs, links, or bullet points whenever you’re ready.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
