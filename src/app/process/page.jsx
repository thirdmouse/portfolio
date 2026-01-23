"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import "../styles.css"; // shared tokens + components styling
import "./process.css";
import MobileNav from "../../components/MobileNav";

/**
 * Process steps (content unchanged)
 */
const steps = [
  {
    no:1,
    id: "Define",
    title: "Worldbuilding",
    subtitle: "Defining the 'set of conditions for the possibility of success'",
    description: "Carefully understanding the problem or opportunity from multiple angles.",
    image: "/images/tektonik.jpg",
  credit: "Architect Zaha Hadid's Thesis, based on Malevich's Tektonik- an abstract floor plan as a representative model, rather than a literal one.",
    examples: [
      {
        title: "Color Guard",
        type: "game",
        image: "/images/feat-b.jpg",
        detail:
          "Researched mobile gaming habits and player psychology to understand attention spans. Analyzed successful casual games to identify core engagement loops. Defined success as creating a game that feels rewarding in 2-minute bursts but encourages 20+ minute sessions.",
      },
      {
        title: "InsideRisk",
        type: "product redesign",
        image: "/images/ir.jpeg",
        detail:
          "Mapped stakeholder needs across Fortune 100 clients, internal teams, and end users. Identified constraints: psychometric validity, production timelines, and scalability. Established that success meant maintaining assessment quality while reducing time by 87.5%.",
      },
    ],
  },
  {
    no:2,
    id: "Discover",
    title: "Think about Thinking",
    subtitle: "Using Cognitive Science's 'what's it like?' principle",
    description:
      "Research existing solutions, and apply archetypical maxims to the problem itself. Discover a gap where standard conventions cognitively fall short: this is what makes a solution novel.",
    image: "/images/bat.jpg",
  credit: "Cover of Thomas Nagel's 'What's It Like To Be A Bat?' (1974), a foundational book in the philosophy of cognitive science.",
    examples: [
      {
        title: "Kojima Productions",
        type: "live event",
        image: "/images/ovl.png",
        detail:
          "Studied how fans experience game releases—anticipation, community, and tactile connection to IP. Identified gap: most pop-up stores feel transactional. Novel approach: designed storefront as an extension of game world itself, creating 12+ hour engagement through environmental storytelling.",
      },
      {
        title: "Long Time, Let's See",
        type: "social app",
        image: "/images/feat-c.jpg",
        detail:
          "Analyzed why social media feels draining—infinite scroll, comparison anxiety, passive consumption. Applied dating app's 'intentional connection' model to friendships. The novel gap: social apps keep you scrolling; this one pushes you to meet up and log off.",
      },
    ],
  },
  {
    no:3,
    id: "Prototype",
    title: "Move Fast and Break Things",
    subtitle: "Per Jobs, prototype rapidly and kill your darlings",
    description:
      "Prototypes need to evoke that final experience, regardless of early versus final medium. Cardboard can be a videogame, or a conference room a concert hall.",
    image: "/images/martini.png",
  credit: "Guy Manuel's 'The Making of a Perfect Martini,' a representation of the controlled chaos and creativity of good prototyping.",
    examples: [
      {
        title: "Color Guard",
        type: "game",
        image: "/images/feat-b.jpg",
        detail:
          "Built 5+ paper prototypes testing different grid sizes and movement rules before touching code. Killed a complex 'combo system' that tested well but broke the core loop. Cardboard tiles revealed the joy was in spatial puzzle-solving, not flashy effects.",
      },
      {
        title: "Outernet Venues",
        type: "event production",
        image: "/images/ovl.png",
        detail:
          "Created foam-core spatial mockups of staging layouts at 1:20 scale. Tested flow with stand-in audience members. Scrapped initial 'theater-style' seating that felt impressive but created dead zones. Rapid iteration led to dynamic, activating configurations.",
      },
    ],
  },
  {
    no:4,
    id: "Test",
    title: "Simulate and Test",
    subtitle: "With some experience, give it to the audience as early as possible",
    description:
      "Make sure base usage, like moving or enacting some command, does not require instruction beyond diegesis, and is joyful. Listen to what users tell you, but more importantly listen to their actions as they test.",
    image: "/images/brunelleschi.png",
  credit: "Brunelleschi's model of the Duomo in Florence... just an egg, used to represent the geometry which made the curvature possible.",
    examples: [
      {
        title: "Color Guard",
        type: "game",
        image: "/images/feat-b.jpg",
        detail:
          "Released TestFlight build to 20 players with zero instructions. Watched screen recordings: players who got past tutorial played 3x longer. What they said: 'cool game!' What they did: 60% quit during onboarding. The actions spoke louder—tutorial needed a redesign.",
      },
      {
        title: "InsideRisk",
        type: "product redesign",
        image: "/images/ir.jpeg",
        detail:
          "Ran modules with test groups before full rollout. Users said they 'understood the scenarios.' Analytics showed 40% made choices inconsistent with their stated values. Their actions revealed we needed clearer consequence framing, not simpler language.",
      },
    ],
  },
  {
    no:5,
    id: "Iterate",
    title: "Bridge Building",
    subtitle: "Analyze what the user tried to do versus what they did",
    description:
      "Design microinteractivity to make evaluating what can be done easier. Redesign macrointeractivity to make executing what you want to do better.",
    image: "/images/airport.jpg",
  credit: "The Houston Airport reduced complaints that it's baggage claim took too long by moving it further away- then, people weren't waiting, they were walking.",
    examples: [
      {
        title: "Color Guard",
        type: "game",
        image: "/images/feat-b.jpg",
        detail:
          "Players tried to chain moves but couldn't see valid paths. Added subtle highlight glow on available tiles (microinteractivity). They tried to plan 3 moves ahead but couldn't track. Added optional 'ghost preview' mode (macrointeractivity). Sessions jumped from 8 to 23 minutes.",
      },
      {
        title: "Kojima Productions",
        type: "live event",
        image: "/images/ovl.png",
        detail:
          "Attendees tried to photograph everything but lighting made it hard. Redesigned key product displays with photo-friendly lighting (micro). They wanted to stay but didn't know when events started. Created visible countdown displays throughout space (macro). Engagement time doubled.",
      },
    ],
  },
  {
    no:6,
    id: "Deliver",
    title: "Fresh Produce",
    subtitle: "You have to deliver eventually",
    description:
      "Communicate what you have. Don't wait for perfection but get to great, then brand a simple yellow circle as pac-man. Polish microinteractivity: it'll make the macro- actions worth it.",
    image: "/images/pacman.png",
  credit: "Pac-Man, early revolutionary of Game Feel and sensory UX design. Excellent analysis in Noah Wardrup-Fruin's 'How Pac-Man Eats.'",
    examples: [
      {
        title: "Color Guard",
        type: "game",
        image: "/images/feat-b.jpg",
        detail:
          "Shipped with known edge case: rare tile configurations could soft-lock. Instead of delaying, added a 'shuffle board' button that turned the bug into a feature—players could reset without penalty. Clear tutorial slide explained it. Zero complaints, 4.2 star rating.",
      },
      {
        title: "ABCYa",
        type: "educational game",
        image: "/images/abc.png",
        detail:
          "Shakespearean Rap Battles had animation glitches on older iPads. Embraced it: added intentional 'glitch aesthetic' to all animations, made it feel like vinyl scratching. Wrote clear browser compatibility guide. Teachers loved the style; legacy device issues became a feature.",
      },
    ],
  },
];
function Collapsible({ isOpen, children }) {
  const innerRef = React.useRef(null);
  const [height, setHeight] = React.useState(0);

  React.useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const measure = () => setHeight(el.scrollHeight);
    measure();

    // Re-measure if content changes (images/fonts, etc.)
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  return (
    <div
      className={`processExampleCollapsible ${isOpen ? "isOpen" : ""}`}
      style={{ maxHeight: isOpen ? height : 0 }}
      aria-hidden={!isOpen}
    >
      <div ref={innerRef} className="processExampleCollapsibleInner">
        {children}
      </div>
    </div>
  );
}

export default function ProcessPage() {
  const scrollContainerRef = useRef(null);
  const stepRefs = useRef([]); // DOM refs for each step section

  // progress dots
  const [activeStep, setActiveStep] = useState(0);

  // accordion
const [openExampleByStep, setOpenExampleByStep] = useState({});

const toggleExample = useCallback((stepIndex, exIdx) => {
  setOpenExampleByStep((prev) => {
    const current = prev[stepIndex];
    // if clicking the open one, close it; otherwise open the clicked one
    return { ...prev, [stepIndex]: current === exIdx ? null : exIdx };
  });
}, []);

  const isSnappingRef = useRef(false);
  const snapReleaseTimer = useRef(null);
const scrollToStepMiddle = (index) => {
  const container = scrollContainerRef.current;
  const el = stepRefs.current[index];
  if (!container || !el) return;

  const maxScroll = container.scrollHeight - container.clientHeight;

  // Midpoint of the section in container scroll coordinates
  const elMid = el.offsetTop + el.offsetHeight / 2;

  // How much "fixed UI" covers the top of the scroll container visually.
  // You have a sticky title bar (~72px) and a fixed MobileNav. If MobileNav overlaps,
  // bump this up a bit. Start with 72 and adjust if needed.
  const TOP_INSET = -50;

  // Visible midpoint (center of what's actually visible, not counting the covered top area)
  const visibleMid = (container.clientHeight - TOP_INSET) / 2;

  // Scroll so elMid lands at that visibleMid line
  const target = Math.min(maxScroll, Math.max(0, elMid - visibleMid));

  container.scrollTo({ top: target, behavior: "smooth" });
};

const handleDotClick = (index) => scrollToStepMiddle(index);

  // ✅ Active dot tracking based on NEAREST step midpoint (more accurate than ratios)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let raf = 0;

    const updateActive = () => {
      const containerMid = container.scrollTop + container.clientHeight / 2;

      let bestIdx = 0;
      let bestDist = Infinity;

      for (let i = 0; i < steps.length; i++) {
        const el = stepRefs.current[i];
        if (!el) continue;
        const elMid = el.offsetTop + el.offsetHeight / 2;
        const d = Math.abs(elMid - containerMid);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      }

      setActiveStep(bestIdx);
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActive);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    updateActive();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      container.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ✅ Touch "quick swipe" snapping (wheel remains free)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let startY = 0;
    let lastY = 0;
    let startT = 0;

    // Tune these to taste:
    const MIN_DISTANCE_PX = 70; // how far
    const MAX_DURATION_MS = 260; // how fast
    const COOLDOWN_MS = 520; // prevent chain snaps

    const getNearestStepIndex = () => {
      const containerMid = container.scrollTop + container.clientHeight / 2;

      let bestIdx = 0;
      let bestDist = Infinity;

      for (let i = 0; i < steps.length; i++) {
        const el = stepRefs.current[i];
        if (!el) continue;
        const elMid = el.offsetTop + el.offsetHeight / 2;
        const d = Math.abs(elMid - containerMid);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      }
      return bestIdx;
    };

    const onTouchStart = (e) => {
      if (isSnappingRef.current) return;
      startY = e.touches[0].clientY;
      lastY = startY;
      startT = performance.now();
    };

    const onTouchMove = (e) => {
      lastY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      if (isSnappingRef.current) return;

      const dy = lastY - startY; // +down, -up
      const dt = performance.now() - startT;

      const absDy = Math.abs(dy);

      // snap only on quick flicks
      if (absDy < MIN_DISTANCE_PX) return;
      if (dt > MAX_DURATION_MS) return;

      const current = getNearestStepIndex();

      // swipe up => next; swipe down => prev
      const nextIndex =
        dy < 0 ? Math.min(current + 1, steps.length - 1) : Math.max(current - 1, 0);

      if (nextIndex === current) return;

      isSnappingRef.current = true;
      scrollToStepMiddle(nextIndex);

      // extra cooldown to avoid multi-snap
      if (snapReleaseTimer.current) window.clearTimeout(snapReleaseTimer.current);
      snapReleaseTimer.current = window.setTimeout(() => {
        isSnappingRef.current = false;
      }, COOLDOWN_MS);
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      if (snapReleaseTimer.current) window.clearTimeout(snapReleaseTimer.current);
    };
  }, [scrollToStepMiddle]);

  return (
    <div className="processPageWrapper">
      <MobileNav revealOnScroll />

      <header className="processTitleBar" aria-label="Cognitive Design Process">
        <div className="processTitleBarInner">
          <h1 className="processTitleH1">COGNITIVE DESIGN PROCESS</h1>
        </div>
      </header>

      <div ref={scrollContainerRef} className="processScrollContainer">
        <section className="processHero" id="process-hero">
          <div className="processHeroContent">
            <p className="processHeroText">
              From 10+ shipped videogames and apps to 5+ years of professional development;
              <br />
              <br />
              or from backend production for events and venues to 30+ acting credits and performances to 5k+
              audiences;
              <br />
              <br />
              even as a volunteer STEM curriculum designer or music instructor;
              my <strong>Cognitive Design Process</strong> remains the same.
            </p>
          </div>
        </section>

        {steps.map((step, index) => (
          <section
            key={step.no}
            id={`step-${step.no}`}
            ref={(el) => (stepRefs.current[index] = el)}
            className={`processStep processStep--${index % 2 === 0 ? "even" : "odd"}`}
          >
            <div className="processStepInner">
              <div
                className={`processStepText ${
                  index % 2 === 0 ? "processStepText--left" : "processStepText--right"
                }`}
              >
                <div className="processStepBadge">{step.id}</div>

                <h2 className="processStepTitle">{step.title}</h2>

                <h3 className="processStepSubtitle">{step.subtitle}</h3>

                {/* Example Boxes */}
                <div className="processExamples">
  {step.examples.map((example, exIdx) => {
    const isOpen = openExampleByStep[index] === exIdx;

    return (
      <div key={exIdx} className="processExampleBox">
        <button
          className="processExampleHeader"
          onClick={() => toggleExample(index, exIdx)}
          aria-expanded={isOpen}
          type="button"
        >
          <div className="processExampleHeaderContent">
            <img
              src={example.image}
              alt={example.title}
              className="processExampleImage"
              loading="lazy"
            />
            <div className="processExampleInfo">
              <div className="processExampleTitle">{example.title}</div>
              <div className="processExampleType">{example.type}</div>
            </div>
          </div>

          <span
            className={`timelineChevron processExampleChevron ${isOpen ? "isOpen" : ""}`}
            aria-hidden="true"
          >
            ▾
          </span>
        </button>

        <Collapsible isOpen={isOpen}>
          <div className="processExampleDetail">{example.detail}</div>
        </Collapsible>
      </div>
    );
  })}
</div>


                <p className="processStepDescription">{step.description}</p>
              </div>

              <div
                className={`processStepVisual ${
                  index % 2 === 0 ? "processStepVisual--right" : "processStepVisual--left"
                }`}
              >
                <div className="processStepImageWrapper">
  <img
    src={step.image}
    alt={`${step.title} visual`}
    className="processStepImage"
    loading="lazy"
  />

  {/* overlay is ONLY for number + gradient */}
  <div className="processStepOverlay" aria-hidden="true">
    <span className="processStepNumber">{step.no}</span>
  </div>

  {/* full-width caption bar */}
  {step.credit && (
    <div className="processStepCaption">
      {step.creditUrl ? (
        <a
          href={step.creditUrl}
          target="_blank"
          rel="noreferrer"
          className="processStepCaptionLink"
        >
          {step.credit}
        </a>
      ) : (
        <span className="processStepCaptionText">{step.credit}</span>
      )}
    </div>
  )}
</div>

              </div>
            </div>

            <div className="processStepCounter">
              <div className="processStepCounterText">
                {String(step.id).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </div>
            </div>
          </section>
        ))}

        <section className="processCTA" id="process-cta">
          <div className="processCTAContent">
            <h2 className="processCTATitle">See the Process in Action</h2>
            <p className="processCTAText">
              Explore my portfolio to see how this methodology creates user-focused, subconsciously powerful
              experiences.
            </p>
            <div className="processCTAButtons">
              <a href="/projects" className="processCTAButton processCTAButton--primary">
                View Projects
              </a>
              <a href="/#resume" className="processCTAButton processCTAButton--secondary">
                View Experience
              </a>
            </div>
          </div>
        </section>
      </div>

      <div className="processProgressDots" aria-label="Process navigation">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => handleDotClick(index)}
            className={`processProgressDot ${activeStep === index ? "processProgressDot--active" : ""}`}
            aria-label={`Go to step ${step.id}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
