"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import MobileNav from "../../components/MobileNav";
import "./process.css";

const PROCESS_STEPS = [
  {
    id: 1,
    title: "Discovery",
    icon: "/images/process/discovery.png",
    centerContent: {
      type: "image",
      src: "/images/process/discovery-main.jpg",
      alt: "Discovery phase",
    },
    sections: [
      {
        position: "top-left",
        title: "Research",
        text: "Understanding user needs and market context through comprehensive research.",
      },
      {
        position: "top-right",
        title: "Analysis",
        text: "Analyzing data and insights to identify opportunities and constraints.",
      },
      {
        position: "bottom",
        title: "Strategy",
        text: "Developing strategic direction based on research findings.",
      },
    ],
  },
  {
    id: 2,
    title: "Ideation",
    icon: "/images/process/ideation.png",
    centerContent: {
      type: "text",
      content:
        "Generating creative solutions through collaborative brainstorming and rapid prototyping.",
    },
    sections: [
      {
        position: "top-left",
        title: "Brainstorming",
        text: "Exploring diverse ideas and concepts without constraints.",
      },
      {
        position: "top-right",
        title: "Sketching",
        text: "Visualizing concepts through quick sketches and diagrams.",
      },
      {
        position: "bottom",
        title: "Synthesis",
        text: "Combining the best ideas into cohesive concepts.",
      },
    ],
  },
  {
    id: 3,
    title: "Design",
    icon: "/images/process/design.png",
    centerContent: {
      type: "image",
      src: "/images/process/design-main.jpg",
      alt: "Design phase",
    },
    sections: [
      {
        position: "top-left",
        title: "Wireframes",
        text: "Creating structural blueprints for the experience.",
      },
      {
        position: "top-right",
        title: "Visual Design",
        text: "Developing the aesthetic and emotional qualities.",
      },
      {
        position: "bottom",
        title: "Prototyping",
        text: "Building interactive prototypes to test concepts.",
      },
    ],
  },
  {
    id: 4,
    title: "Development",
    icon: "/images/process/development.png",
    centerContent: {
      type: "image",
      src: "/images/process/development-main.jpg",
      alt: "Development phase",
    },
    sections: [
      {
        position: "top-left",
        title: "Architecture",
        text: "Building robust technical foundations and systems.",
      },
      {
        position: "top-right",
        title: "Implementation",
        text: "Translating designs into functional code.",
      },
      {
        position: "bottom",
        title: "Integration",
        text: "Connecting all components into a cohesive whole.",
      },
    ],
  },
  {
    id: 5,
    title: "Testing",
    icon: "/images/process/testing.png",
    centerContent: {
      type: "text",
      content: "Validating through rigorous user testing and iterative refinement.",
    },
    sections: [
      {
        position: "top-left",
        title: "User Testing",
        text: "Observing real users interact with the experience.",
      },
      {
        position: "top-right",
        title: "Feedback",
        text: "Gathering insights and identifying areas for improvement.",
      },
      {
        position: "bottom",
        title: "Iteration",
        text: "Refining based on testing results and feedback.",
      },
    ],
  },
  {
    id: 6,
    title: "Launch",
    icon: "/images/process/launch.png",
    centerContent: {
      type: "image",
      src: "/images/process/launch-main.jpg",
      alt: "Launch phase",
    },
    sections: [
      {
        position: "top-left",
        title: "Deployment",
        text: "Releasing the experience to the world.",
      },
      {
        position: "top-right",
        title: "Monitoring",
        text: "Tracking performance and user engagement.",
      },
      {
        position: "bottom",
        title: "Evolution",
        text: "Continuously improving based on real-world data.",
      },
    ],
  },
];

const SCROLL_HINT_KEY = "process_scroll_hint_dismissed_v1";

export default function ProcessPage() {
  const [activeView, setActiveView] = useState("process"); // "process" | "dictionary"
  const [currentStep, setCurrentStep] = useState(0);

  // 0..MAX_REVEAL: we intentionally use "gaps" so users get more scroll room between reveals.
  // Sections become visible at revealCount 1, 3, 5 respectively.
  const MAX_REVEAL = 5;
  const REVEAL_THRESHOLDS = [1, 3, 5];

  const [revealCount, setRevealCount] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const containerRef = useRef(null);
  const lockRef = useRef(false);
  const touchStartY = useRef(null);

  const step = useMemo(() => PROCESS_STEPS[currentStep], [currentStep]);

  // Load scroll hint state once (persisted)
  useEffect(() => {
    try {
      const dismissed = window.localStorage.getItem(SCROLL_HINT_KEY) === "1";
      setShowScrollHint(!dismissed);
    } catch {
      setShowScrollHint(true);
    }
  }, []);

  const dismissScrollHint = () => {
    if (!showScrollHint) return;
    setShowScrollHint(false);
    try {
      window.localStorage.setItem(SCROLL_HINT_KEY, "1");
    } catch {
      // ignore
    }
  };

  const lockBriefly = () => {
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, 560);
  };

  const goToStep = (index, opts = {}) => {
    const { showAll = false } = opts;
    setActiveView("process");
    setCurrentStep(index);
    setRevealCount(showAll ? MAX_REVEAL : 0);
    lockBriefly();
  };

  const goToDictionary = () => {
    setActiveView("dictionary");
    setRevealCount(0);
    lockBriefly();
  };

  const applyDelta = (direction) => {
    // direction: 1 (down/next) or -1 (up/prev)
    if (lockRef.current) return;

    dismissScrollHint();

    // Dictionary behavior
    if (activeView === "dictionary") {
      // Scroll down from dictionary enters step 1; scroll up does nothing
      if (direction === 1) goToStep(0, { showAll: false });
      return;
    }

    // Process behavior
    if (direction === 1) {
      // Reveal sub-blocks first, then advance step
      if (revealCount < MAX_REVEAL) {
        setRevealCount((c) => Math.min(MAX_REVEAL, c + 1));
        lockBriefly();
        return;
      }
      if (currentStep < PROCESS_STEPS.length - 1) {
        setCurrentStep((s) => s + 1);
        setRevealCount(0);
        lockBriefly();
      }
      return;
    }

    // direction === -1
    if (revealCount > 0) {
      setRevealCount((c) => Math.max(0, c - 1));
      lockBriefly();
      return;
    }
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      setRevealCount(MAX_REVEAL); // when going "back", show the whole previous step
      lockBriefly();
    } else {
      // At very top: allow going to dictionary
      goToDictionary();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const onWheel = (e) => {
      e.preventDefault();
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const delta = e.deltaY;
        if (delta > 0) applyDelta(1);
        else if (delta < 0) applyDelta(-1);
        ticking = false;
      });
    };

    const onKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        applyDelta(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        applyDelta(-1);
      }
    };

    // Swipe support for mobile
    const onTouchStart = (e) => {
      if (!e.touches || e.touches.length !== 1) return;
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      if (touchStartY.current == null) return;
      const endY = e.changedTouches?.[0]?.clientY;
      if (typeof endY !== "number") return;

      const delta = touchStartY.current - endY; // positive = swipe up (next)
      touchStartY.current = null;

      if (Math.abs(delta) < 24) return; // deadzone
      applyDelta(delta > 0 ? 1 : -1);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeView, currentStep, revealCount, showScrollHint]);

  const handleStepClick = (index) => {
    // Click should reveal all three sub-blocks (“scroll to the end of that block”)
    goToStep(index, { showAll: true });
  };

  const isSectionVisible = (idx) => revealCount >= REVEAL_THRESHOLDS[idx];

  return (
    <>
      <MobileNav pageKey="process" alwaysVisible />

      <div className="processPage" ref={containerRef}>
        <h1 className="processTitle">PROCESS</h1>

        {/* Scroll hint (dismisses forever after first scroll/swipe/arrow) */}
        {showScrollHint && (
          <div className="processScrollHint" aria-hidden="true">
            scroll to see
          </div>
        )}

        {/* Navigation (Dictionary separated from steps) */}
        <div className="processNav" aria-label="Process navigation">
          {/* Dictionary bubble (its own pill) */}
          <div className="processDictionaryBubble">
            <button
              type="button"
              className={`processBarItem processBarItem--dictionary ${
                activeView === "dictionary" ? "isActive" : ""
              }`}
              onClick={goToDictionary}
              aria-label="Dictionary"
              title="Dictionary"
            >
              <span className="processBarLetter">D</span>
              <div className="processBarOverlay" />
            </button>
          </div>

          {/* Steps pill */}
          <div className="processBar processBar--steps" aria-label="Process steps">
            {PROCESS_STEPS.map((s, idx) => (
              <button
                type="button"
                key={s.id}
                className={`processBarItem ${
                  activeView === "process" && idx === currentStep ? "isActive" : ""
                }`}
                onClick={() => handleStepClick(idx)}
                aria-label={s.title}
                title={s.title}
              >
                <img src={s.icon} alt="" className="processBarIcon" />
                <div className="processBarOverlay" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="processContent">
          {activeView === "dictionary" ? (
            <div className="processDictionary">
              <h2 className="processDictionaryTitle">Dictionary</h2>
              <p className="processDictionaryLead">
                A place to define the terms I use throughout my work.
              </p>

              <div className="processDictionaryGrid">
                <div className="processDictionaryCard">
                  <h3>Experience</h3>
                  <p>The end-to-end journey across screens, moments, and emotions.</p>
                </div>
                <div className="processDictionaryCard">
                  <h3>System</h3>
                  <p>The repeatable rules and components that keep a product coherent.</p>
                </div>
                <div className="processDictionaryCard">
                  <h3>Prototype</h3>
                  <p>A testable artifact used to learn quickly and reduce uncertainty.</p>
                </div>
              </div>

              <p className="processDictionaryFoot">
                (Swap these placeholders with your real definitions.)
              </p>
            </div>
          ) : (
            <>
              {/* Top Left Section */}
              <div
                className={`processSection topLeft ${
                  isSectionVisible(0) ? "isVisible" : "isHidden"
                }`}
              >
                <h3 className="processSectionTitle">{step.sections[0].title}</h3>
                <p className="processSectionText">{step.sections[0].text}</p>
              </div>

              {/* Top Right Section */}
              <div
                className={`processSection topRight ${
                  isSectionVisible(1) ? "isVisible" : "isHidden"
                }`}
              >
                <h3 className="processSectionTitle">{step.sections[1].title}</h3>
                <p className="processSectionText">{step.sections[1].text}</p>
              </div>

              {/* Center Content */}
              <div className="processCenter">
                {step.centerContent.type === "image" ? (
                  <img
                    src={step.centerContent.src}
                    alt={step.centerContent.alt}
                    className="processCenterImage"
                  />
                ) : (
                  <div className="processCenterText">{step.centerContent.content}</div>
                )}
              </div>

              {/* Bottom Section */}
              <div
                className={`processSection bottom ${
                  isSectionVisible(2) ? "isVisible" : "isHidden"
                }`}
              >
                <h3 className="processSectionTitle">{step.sections[2].title}</h3>
                <p className="processSectionText">{step.sections[2].text}</p>
              </div>
            </>
          )}
        </div>

        {/* Indicator */}
        <div className="processIndicator" aria-label="Current position">
          {activeView === "dictionary"
            ? `D / ${PROCESS_STEPS.length}`
            : `${currentStep + 1} / ${PROCESS_STEPS.length}`}
          <span className="processIndicatorSub">
            {activeView === "dictionary" ? "dictionary" : step.title}
          </span>
        </div>
      </div>
    </>
  );
}
