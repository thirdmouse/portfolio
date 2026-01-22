"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import "../styles.css"; // shared tokens + components styling
import "./process.css";
import MobileNav from "../../components/MobileNav";

/**
 * Process steps (content unchanged)
 */
const steps = [
  {
    id: 1,
    title: "Worldbuilding",
    subtitle: "Defining the 'set of conditions for the possibility of success'",
    description: "Carefully understanding the problem or opportunity from multiple angles",
    image: "/images/step1.jpg",
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
    id: 2,
    title: "Think about Thinking",
    subtitle: "Using Cognitive Science's 'what's it like?' principle",
    description:
      "Research existing solutions, and apply archetypical maxims to the problem itself. Discover a gap where standard conventions cognitively fall short: this is what makes a solution novel.",
    image: "/images/step2.jpg",
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
    id: 3,
    title: "Move Fast and Break Things",
    subtitle: "Per Jobs, prototype rapidly and kill your darlings",
    description:
      "Prototypes need to evoke that final experience, regardless of early versus final medium. Cardboard can be a videogame. Come back to this step after step 5.",
    image: "/images/step3.jpg",
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
    id: 4,
    title: "Simulate and Test",
    subtitle: "With some experience, give it to the audience as early as possible",
    description:
      "Make sure base usage, like moving or enacting some command, does not require instruction beyond diegesis, and is joyful. Listen to what users tell you, but more importantly listen to their actions as they test.",
    image: "/images/step4.jpg",
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
    id: 5,
    title: "Bridge Building",
    subtitle: "Analyze what the user tried to do versus what they did",
    description:
      "Design microinteractivity to make evaluating what can be done easier. Redesign macrointeractivity to make executing what you want to do better.",
    image: "/images/step5.jpg",
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
    id: 6,
    title: "Fresh Produce",
    subtitle: "You have to deliver eventually",
    description:
      "Imperfections and flaws should be equal parts minimized and embraced. Turn a yellow circle into pac-man: microinteractivity and activations are crucial. Communications need to be clear. Even if you can, assume updates are impossible for the MVP.",
    image: "/images/step6.jpg",
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

export default function ProcessPage() {
  const scrollContainerRef = useRef(null);

  // progress dots
  const [activeStep, setActiveStep] = useState(0);

  // accordion
  const [expandedExample, setExpandedExample] = useState(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;

      const stepIndex = Math.min(Math.floor(progress * steps.length), steps.length - 1);
      setActiveStep(stepIndex);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDotClick = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const targetScroll =
      (container.scrollHeight - container.clientHeight) * ((index + 1) / (steps.length + 1));

    container.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const toggleExample = (stepId, exampleIndex) => {
    const key = `${stepId}-${exampleIndex}`;
    setExpandedExample((prev) => (prev === key ? null : key));
  };

  return (
    <div className="processPageWrapper">
      {/* ✅ consistent nav (replaces "← Back") */}
      <MobileNav revealOnScroll />

      
      <header className="processTitleBar" aria-label="Cognitive Design Process">
        <div className="processTitleBarInner">
          <h1 className="processTitleH1">COGNITIVE DESIGN PROCESS</h1>
        </div>
      </header>
<div ref={scrollContainerRef} className="processScrollContainer">
        {/* Title block (uses shared .sectionTitle styling) */}

        <section className="processHero">
          <div className="processHeroContent">
            <p className="processHeroText">
              From 10+ shipped videogames and apps to 5+ years of professional development;
              <br />
              <br />
              or from backend production for events and venues to 30+ acting credits and performances to 5k+
              audiences;
              <br />
              <br />
              my <strong>Cognitive Design Process</strong> remains the same.
            </p>
          </div>
        </section>

        {steps.map((step, index) => (
          <section
            key={step.id}
            className={`processStep processStep--${index % 2 === 0 ? "even" : "odd"}`}
          >
            <div className="processStepInner">
              <div
                className={`processStepText ${
                  index % 2 === 0 ? "processStepText--left" : "processStepText--right"
                }`}
              >
                <div className="processStepBadge">Step {step.id}</div>

                <h2 className="processStepTitle">{step.title}</h2>

                <h3 className="processStepSubtitle">{step.subtitle}</h3>

                {/* Example Boxes */}
                <div className="processExamples">
                  {step.examples.map((example, exIdx) => {
                    const isOpen = expandedExample === `${step.id}-${exIdx}`;

                    return (
                      <div key={exIdx} className="processExampleBox">
                        <button
                          className="processExampleHeader"
                          onClick={() => toggleExample(step.id, exIdx)}
                          aria-expanded={isOpen}
                        >
                          <div className="processExampleHeaderContent">
                            <img
                              src={example.image}
                              alt={example.title}
                              className="processExampleImage"
                            />
                            <div className="processExampleInfo">
                              <div className="processExampleTitle">{example.title}</div>
                              <div className="processExampleType">{example.type}</div>
                            </div>
                          </div>

                          {/* ✅ chevron matches ResumeTimeline */}
                          <span
                            className={`timelineChevron processExampleChevron ${isOpen ? "isOpen" : ""}`}
                            aria-hidden="true"
                          >
                            ▾
                          </span>
                        </button>

                        {isOpen && <div className="processExampleDetail">{example.detail}</div>}
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
                  <div className="processStepPlaceholder">
                    <span className="processStepNumber">{step.id}</span>
                  </div>
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

        <section className="processCTA">
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
            className={`processProgressDot ${
              activeStep === index ? "processProgressDot--active" : ""
            }`}
            aria-label={`Go to step ${step.id}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
