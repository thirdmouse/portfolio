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
      className={`projectsCollapsible ${isOpen ? "isOpen" : ""} ${className}`}
      style={{ maxHeight: isOpen ? height : 0 }}
      aria-hidden={!isOpen}
    >
      <div ref={innerRef} className="projectsCollapsibleInner">
        {children}
      </div>
    </div>
  );
}

// Small helper: normalize hash => "physical" | "digital" | "all"
function hashToMedium(hash) {
  const h = String(hash || "").replace("#", "").trim().toLowerCase();
  if (h === "physical") return "physical";
  if (h === "digital") return "digital";
  if (h === "all") return "all";
  return null;
}

export default function ProjectsPage() {
  const [openDropdowns, setOpenDropdowns] = React.useState(() => new Set());

const toggleDropdown = (id) => {
  setOpenDropdowns((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });
};
  const [tagsOpen, setTagsOpen] = React.useState(false);

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
      // TODO: add additional longform blocks / images / metrics
      category: "design",
      medium: "digital",
      tags: [
        "team",
        "management",
        "prototyping",
        "agile",
        "ux-research",
        "data-analysis",
        "video-editing",
        "film",
        "design",
        "engineering",
        "event",
        "miro",
        "figma",
        "programming",
      ],
      href: "/projects/inside-risk",
      thumbSrc: "/images/ir.jpeg",
      // TODO: caseStudy: { role: "", outcome: (<>...</>) }
    },

    {
      id: "color-guard",
      title: "Color Guard",
      subtitle: "iOS game design + analytics iteration",
      description:
        "Shipped to players in 10+ countries. Iterated economy + anti-fun mitigation using playtests and telemetry.",
      // TODO: add playtest notes / charts / iteration snapshots
      category: "games",
      medium: "digital",
      tags: [
        "solo",
        "prototyping",
        "agile",
        "ux-research",
        "video-editing",
        "game",
        "design",
        "unity",
        "programming",
      ],
      href: "/projects/color-guard",
      thumbSrc: "/images/feat-b.jpg",
    },

    {
      id: "long-time-lets-see",
      title: "Long Time, Let’s See!",
      subtitle: "Social media as an “experience matcher”",
      description:
        "A social platform designed like a dating app—optimized to get users off the app and into new experiences.",
      // TODO: add concept flow / screens / user value prop
      category: "design",
      medium: "digital",
      tags: [
        "team",
        "prototyping",
        "ux-research",
        "design",
        "engineering",
        "miro",
        "figma",
        "programming",
      ],
      href: "/projects/long-time-lets-see",
      thumbSrc: "/images/feat-c.jpg",
    },

    {
      id: "wcal",
      title: "Want Cake, Am Lazy",
      subtitle: "Puzzle-Box Game (Demo and Miro board)",
      description:
        "Emergent gameplay through puzzle-box design. Prototyped with paper models, streamlining dev process and revealing what people actually wanted to do, rather than designing towards arbitrary goals.",
      // TODO: add short summary text box (problem / approach / result)
      category: "games",
      medium: "Both",
      tags: [
        "solo",
        "prototyping",
        "ux-research",
        "game",
        "design",
        "miro",
        "unity",
        "programming",
        "manufacturing",
        "cad",
      ],
      thumbSrc: "/images/thumbs/wcal.png",
      caseStudy: {
        role: "Designer (independent)",
        // TODO: split into sections (problem / prototype / learnings / next)
        outcome: (
          <>
            {/* TODO: add a 1–2 sentence “Outcome summary” here */}

            WCAL was inspired by Rube Goldberg machines and 'Please, Don't Touch Anything.' It required players to develop adventurous solutions in a completely normal room to reach cake across it.

            {/* TODO: image + caption blocks */}
            <div className="caseImageWrapper">
              <img className="caseimage" src="/images/thumbs/wcal.png" alt="" aria-hidden="true" />
              <div className="caseImageCaption">
                <span className="caseImageCaptionText">
                  {/* TODO: caption text */}
                  Title screen and view of the room in the demo.
                </span>
              </div>
            </div>

            {/* TODO: add more text blocks / links / second image */}
          </>
        ),
      },
    },

    {
      id: "closet",
      title: "Closet",
      subtitle: "Cinematography + editing study",
      description:
        "Video-editing and cinematography experiment seeking to create horror through the unexpected and uncanny.",
      // TODO: add embed / stills / edit notes
      category: "film",
      medium: "digital",
      tags: ["solo", "video-editing"],
      thumbSrc: "/images/thumbs/closet.png",
    },

    {
      id: "heat",
      title: "Heat",
      subtitle: "Editing + narrative rhythm",
      description:
        "A film edit focused on intensity curves: when to compress, when to linger, and where to let silence land.",
      // TODO: add edit breakdown / before-after clips
      category: "film",
      medium: "digital",
      tags: ["solo", "video-editing", "film"],
      thumbSrc: "/images/thumbs/heat.png",
    },

    {
      id: "storyvox",
      title: "Storyvox",
      subtitle: "Assistive OCR reader",
      description:
        "Capstone product engineering project: a reader that bridges text recognition to usable, human-centered output.",
      // TODO: add system diagram / user flow / testing notes
      category: "engineering",
      medium: "digital",
      tags: ["team", "management", "ux-research", "engineering", "programming", "manufacturing", "cad"],
      thumbSrc: "/images/thumbs/storyvox.png",
    },

    {
      id: "touchscreen",
      title: "Touchscreen Experiments",
      subtitle: "Novel interaction affordances",
      description:
        "Iterated on unconventional touch input patterns to understand what feels intuitive, playful, and precise.",
      // TODO: add gifs / interaction notes / prototype links
      category: "design",
      medium: "digital",
      tags: ["solo", "ux-research", "sensory-design", "data-analysis", "design", "engineering", "unity", "programming"],
      thumbSrc: "/images/thumbs/ts.png",
    },

    {
      id: "curses",
      title: "Curses!",
      subtitle: "Physical Card Game (Downloadable and Playable)",
      description:
        "Designed social mechanics to coax group play and break negative loops, toward laughter-first participation.",
      // TODO: add print-and-play link / photos / rules snippet
      category: "games",
      medium: "physical",
      tags: ["solo", "prototyping", "ux-research", "game", "design", "manufacturing"],
      thumbSrc: "/images/thumbs/curses.png",
      caseStudy: {
        role: "Designer (independent)",
        outcome: (
          <>
            {/* TODO: add outcome text + images */}
          </>
        ),
      },
    },

    {
      id: "acropolis",
      title: "Live from the Acropolis",
      subtitle: "Performance + spatial staging",
      description:
        "Designed a live experience with emphasis on audience flow, sightlines, and sensory “moments.”",
      // TODO: add staging plan / photos / reflection
      category: "design",
      medium: "physical",
      tags: ["solo", "sensory-design", "video-editing", "event"],
      thumbSrc: "/images/thumbs/athens.png",
    },

    // --- These next ones appear in the spreadsheet but not in your pasted code earlier.
    // Keeping them here with clear placeholders so you can fill them in.

    {
      id: "kojima-ovl",
      title: "Kojima @ OVL",
      subtitle: "TODO: subtitle",
      description: "TODO: short description",
      // TODO: add longform text blocks / links
      category: "design",
      medium: "physical",
      tags: ["team", "management", "sensory-design", "design", "event"],
      thumbSrc: "/images/thumbs/kojima.png", // TODO: set thumb path
    },

    {
      id: "yale-historical-society",
      title: "Yale Historical Society",
      subtitle: "TODO: subtitle",
      description: "TODO: short description",
      // TODO: add longform text blocks / links
      category: "design",
      medium: "physical",
      tags: ["team", "management", "data-analysis", "event", "manufacturing"],
      thumbSrc: "/images/thumbs/yale.png", // TODO: set thumb path
    },

    {
      id: "flannel",
      title: "FLANNEL. (band)",
      subtitle: "TODO: subtitle",
      description: "TODO: short description",
      // TODO: add longform text blocks / links
      category: "design",
      medium: "physical",
      tags: ["team", "management", "design", "event"],
      thumbSrc: "/images/thumbs/flannel.png", // TODO: set thumb path
    },

    {
      id: "requiem-for-sisyphus",
      title: "Requiem for Sisyphus",
      subtitle: "Silent inspired slapstick comedy film",
      description:
        "Telling a classic story about two drunken cowboys, their conflict, and their inevitable coming-to-terms for a class in Stage Combat",
      // TODO: add link / stills / edit notes
      category: "film",
      medium: "digital",
      tags: ["team", "film", "video-editing"],
      thumbSrc: "/images/thumbs/sisyphus.png",
    },

    {
      id: "guerra",
      title: "Guerra de Discretos",
      subtitle: "Systems-first game design",
      description:
        "Shipped game experiment exploring rules as “experience levers”—balance, pacing, and player intent.",
      // TODO: add ruleset / balancing notes
      category: "games",
      medium: "digital",
      tags: ["team", "game", "design", "manufacturing"],
      thumbSrc: "/images/thumbs/guerra.png",
    },

    {
      id: "rover",
      title: "Lil' Dipper Rover",
      subtitle: "Prototyping a physical system",
      description:
        "Built and iterated a small rover concept—mechanics, fabrication constraints, and test-driven iteration.",
      // TODO: add build photos / iteration notes
      category: "engineering",
      medium: "physical",
      tags: ["team", "management", "agile", "engineering", "programming", "manufacturing"],
      thumbSrc: "/images/thumbs/rover.png",
    },

    {
      id: "habitat",
      title: "PLTW Habitat for Humanity",
      subtitle: "End-to-end civil engineering project",
      description:
        "From planning to execution—physical constraints, stakeholder needs, and making complexity feel simple.",
      // TODO: add drawings / deliverables
      category: "engineering",
      medium: "physical",
      tags: ["solo", "engineering", "cad"],
      thumbSrc: "/images/thumbs/habitat.png",
    },

    {
      id: "hanger",
      title: "Cart Hanger",
      subtitle: "Manufacturable physical design",
      description:
        "A hardware concept shaped by constraints: tolerances, assembly, and how objects teach use through form.",
      // TODO: add CAD renders / manufacturing notes
      category: "engineering",
      medium: "physical",
      tags: ["team", "prototyping", "agile", "ux-research", "engineering", "manufacturing", "cad"],
      thumbSrc: "/images/thumbs/hanger.png",
    },

    {
      id: "neuroscience-research",
      title: "Neuroscience Research",
      subtitle: "TODO: subtitle",
      description: "TODO: short description",
      // TODO: add methods / findings
      category: "engineering",
      medium: "digital",
      tags: ["solo", "data-analysis", "engineering", "programming"],
      thumbSrc: "/images/thumbs/neuro.png", // TODO: set thumb path
    },

    {
      id: "llm-research",
      title: "LLM Research",
      subtitle: "TODO: subtitle",
      description: "TODO: short description",
      // TODO: add methods / findings
      category: "engineering",
      medium: "digital",
      tags: ["solo", "data-analysis", "engineering"],
      thumbSrc: "/images/thumbs/llm.png", // TODO: set thumb path
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
  // toggle: clicking the active filter turns it off
  const resolved = (medium === next) ? "all" : next;

  setMedium(resolved);

  if (typeof window === "undefined") return;

  window.history.replaceState(null, "", `#${resolved}`);
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}, [medium]);


  const mediumStatement = React.useMemo(() => {
    if (medium === "physical") {
      return "My physical work is about creating a space where experiences are heightened- harnessing all of the senses to enhance whatever content is being delivered.";
    }
    if (medium === "digital") {
      return "My digital work is about forming experiences that are effective in any location to broad audiences: microactivity and systems are precise and tuned per the medium.";
    }
    return "";
  }, [medium]);

  // --- Grouped filters (multi-select per group) ---
const FILTER_GROUPS = [
  {
    id: "group",
    label: "Group",
    options: [
      { key: "solo", label: "Solo" },
      { key: "team", label: "Team" },
    ],
  },
  {
    id: "skills",
    label: "Skills",
    options: [
      { key: "management", label: "Management" },
      { key: "prototyping", label: "Prototyping" },
      { key: "agile", label: "Agile" },
      { key: "ux-research", label: "UX Research" },
      { key: "sensory-design", label: "Sensory Design" },
      { key: "data-analysis", label: "Data Analysis" },
    ],
  },
  {
    id: "medium",
    label: "Medium",
    options: [
      { key: "game", label: "Game" },
      { key: "film", label: "Film" },
      { key: "design", label: "Design" },
      { key: "engineering", label: "Engineering" },
      { key: "event", label: "Event" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    options: [
      { key: "miro", label: "Miro" },
      { key: "figma", label: "Figma" },
      { key: "unity", label: "Unity" },
      { key: "programming", label: "Programming" },
    ],
  },
];

const [filters, setFilters] = React.useState(() => ({
  group: new Set(),
  skills: new Set(),
  medium: new Set(),
  tools: new Set(),
}));

const toggleFilter = (groupId, key) => {
  setFilters((prev) => {
    const next = { ...prev };
    const set = new Set(next[groupId]);
    if (set.has(key)) set.delete(key);
    else set.add(key);
    next[groupId] = set;
    return next;
  });
};

const deselectAll = () => {
  setFilters({
    group: new Set(),
    skills: new Set(),
    medium: new Set(),
    tools: new Set(),
  });
};

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

    const tags = p.tags || [];

    // For each group: if nothing selected, ignore that group.
    // If selected, project must match at least one option from that group.
    for (const g of FILTER_GROUPS) {
      const selected = filters[g.id];
      if (!selected || selected.size === 0) continue;

      const hit = tags.some((t) => selected.has(t));
      if (!hit) return false;
    }

    return true;
  });
}, [projects, medium, filters]);

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
            Work across mediums—built around microinteractivity and cognitive framing, focusing on the feeling that a psychologically informed system leaves behind.
          </p>
          <br/>
          <a href="/process" className="bigButton">
              Or, read about <strong>how</strong> I work on the process page
            </a>
            <br/>
            <p className="projectsIntroV2">I see physical and digital as complementary— the same experiences expressed through different constraints and senses. But, if you're looking for one medium or means in particular:</p>
        </div>

        {/* Physical / OR / Digital selector */}
        <div className="podRow" aria-label="Physical or digital">
          <button
            className={`podChoice ${medium === "physical" ? "isActive" : ""}`}
            type="button"
            onClick={() => setMediumAndHash("physical")}
            aria-pressed={medium === "physical"}
          >
            PHYSICAL
          </button>

          <button
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
        {/* Tags */}
{/* Grouped filters row */}
<div className="tagDropdownRow" aria-label="Project filters">
  {/* far-left pill */}
  <button className="tagClear" type="button" onClick={deselectAll}>
    Deselect
  </button>

  {FILTER_GROUPS.map((g) => {
    const count = filters[g.id]?.size || 0;
    const isOpen = openDropdowns.has(g.id);

    return (
      <div key={g.id} className="tagDropdown">
        <button
          type="button"
          className={`tagDropdownPill ${count ? "hasSelection" : ""}`}
          onClick={() => toggleDropdown(g.id)}
          aria-expanded={isOpen}
          aria-controls={`tag-dd-${g.id}`}
        >
          <span className="tagDropdownLabel">
            {g.label}{count ? ` (${count})` : ""}
          </span>

          <span className={`timelineChevron ${isOpen ? "isOpen" : ""}`} aria-hidden="true">
            ▾
          </span>
        </button>

        <Collapsible isOpen={isOpen}>
          <div id={`tag-dd-${g.id}`} className="tagDropdownMenu">
            <div className="tagGrid">
              {g.options.map((opt) => {
                const isOn = filters[g.id]?.has(opt.key);
                return (
                  <button
                    key={opt.key}
                    className={`tagChip ${isOn ? "isOn" : ""}`}
                    type="button"
                    onClick={() => toggleFilter(g.id, opt.key)}
                    aria-pressed={isOn}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Collapsible>
      </div>
    );
  })}
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
