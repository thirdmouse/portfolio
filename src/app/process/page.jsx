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
        title: "Long Time, Let's See!",
        type: "social media design",
        image: "/images/feat-c.jpg",
        detail:
          "HMW research based on social media problem statements revealed opportunity to capitalize on user desires for actually social forms of media. Before any ideas were drawn, we talked about ideal results and mapped existing solutions.",
      },
      {
        title: "Outernet",
        type: "venue design",
        image: "/images/ovl.png",
        detail:
          "Before any fancy design work, performers have needs and audiences have capacities. My inventory management system was customizable to each event's scale and staff experience, ensuring smooth operations whether for 50 or 5000 attendees.",
      },
    ],
  },
  {
    no:2,
    id: "Discover",
    title: "Think about Thinking",
    subtitle: "'Empathetic Design' using Cognitive Science's 'what's it like?' principle",
    description: (
  <>
    Good experiential design addresses Step 1&apos;s &quot;world,&quot; through careful study
    of users&apos; expectations of that medium and cognitive subversion of that. It&apos;s why my work is
    inherently interdisciplinary, and is focused on making the audience <strong>feel</strong>, atop
    the traditional &quot;show don&apos;t tell.&quot;
  </>
),image: "/images/bat.jpg",
  credit: "Cover of Thomas Nagel's 'What's It Like To Be A Bat?' (1974), a foundational book in the philosophy of cognitive science.",
    examples: [
      {
        title: "Color Guard",
        type: "game",
        image: "/images/feat-b.jpg",
        detail:
          "Recognizing the tower defense genre's long-term strategy focus, I designed Color Guard to press on short-term tactics. That idea began and pervaded the design, from the core 'explode' mechanic to the shop economics, as a cognitive reframing of audience familiarity.",
      },
      {
        title: "ABCYa",
        type: "Shakesperean Rap Battles",
        image: "/images/abc.png",
        detail:
          "After identifying literature-based educational games as a gap, I leveraged modern associations of lyric verse in rap and educational psychology to begin crafting a game with a teach-then-rapid-fire-reinforce mechanic.",
      },
    ],
  },
  {
    no:3,
    id: "Prototype",
    title: "Move Fast and Break Things",
    subtitle: "Per Steve Jobs, prototype rapidly and kill your darlings",
    description:
      "Prototypes need to evoke that final experience and evoke that feeling, regardless of medium-matching. Cardboard can be a videogame, or a conference room a concert hall.",
    image: "/images/martini.png",
  credit: "Guy Manuel's 'The Making of a Perfect Martini,' a representation of the controlled chaos and creativity of good prototyping.",
    examples: [
      {
        title: "Touchscreen Experiments",
        type: "engineering",
        image: "/images/thumbs/ts.png",
        detail:
          "I've iterated on novel methods of touchscreen interaction to understand their impacts on users and avoid growing comfortable with arbitrary convention while understanding its utility.",
      },
      {
        title: "Kojima at OVL",
        type: "event production and design",
        image: "/images/ovl.png",
        detail:
          "After creating an initial storefront designed for throughline ingress/egress, rapid complete layout alterations were necessary due to high demand. By reemphasizing different products through tailor-made solutions, we maintained cohesion while achieving near total sellout and engagement of over twelve continuous hours.",
      },
    ],
  },
  {
    no:4,
    id: "Test",
    title: "Simulate and Test",
    subtitle: "With some experience, give it to the audience as early as possible",
    description: (
  <>
    Base usage needs to be intuitive, diegetic, and <strong>joyful</strong>. At this stage, my biggest inspirations are Mario, Disneyland, and Apple. Listen to what the audience <strong>says</strong>, but pay even more attention to what they <strong>do</strong>.
  </>
    ),
    image: "/images/brunelleschi.png",
  credit: "Brunelleschi's model of the Duomo in Florence... just an egg, used to represent the geometry which made the curvature possible.",
    examples: [
      {
        title: "Want Cake, Am Lazy",
        type: "game",
        image: "/images/thumbs/wcal.png",
        detail:
          "Simulated a game requiring object based A-B interaction with paper prototypes, bypassing development time towards the core creative concept- almost an improvised workshop, showing what people wanted to interact with when they looked into the room, and later developing the most creative and funniest solutions.",
      },
      {
        title: "InsideRisk",
        type: "product redesign",
        image: "/images/ir.jpeg",
        detail:
          "Staged live conversations and psychological evaluations to understand what made immersion with AI agents possible. Iterated on live event methodologies to create true immersion both inside and outside of ideal spaces- and, improved where audiences claimed to get a lot out of conversations, but their moment-to-moment said otherwise.",
      },
    ],
  },
  {
    no:5,
    id: "Iterate",
    title: "Bridge Building",
    subtitle: "Analyze what the user tried to do versus what they did",
    description: (
  <>
      Design microinteractivity to make <strong>evaluating what can be done</strong> easier. Redesign macrointeractivity to make <strong>executing what you want to do</strong> better. Don't address questions by explaining, make sure they never arise.
  </>
    ),
    image: "/images/airport.jpg",
  credit: "The Houston Airport reduced complaints that it's baggage claim took too long by moving it further away- then, people weren't waiting, they were walking.",
    examples: [
      {
        title: "Color Guard",
        type: "game",
        image: "/images/feat-b.jpg",
        detail:
          "The core problem I found was players were optimizing away fun in the late-game by upgrading one guard and never exploding it, rather than diversifying and adapting as intended. This was counteracted in simple ways: first, making game-feel for lower upgraded explosions feel more powerful; second, adding a 'pentagon' enemy who destroys high-level guards; and third, flipping the shop economy to make cheap upgrades the most useful- encouraging all guards to be upgraded.",
      },
      {
        title: "Curses!",
        type: "physical card game",
        image: "/images/curses.png",
        detail:
          "With a core gameplay loop of forbidding then coaxing behaviors (like the titular cursing), edge-case players got stuck in negative feedback loops of refusing to engage with the group. I added the 'quest' mechanic, leveraging the fantastical and ridiculous vibe, which required environmental and social engagement- beyond breaking quiet loops, this added memorable moments and further coaxed laughter and cursed exclamations.",
      },
    ],
  },
  {
    no:6,
    id: "Deliver",
    title: "Fresh Produce",
    subtitle: "You have to deliver eventually",
    description:
      "Communicate what you have. Don't wait for perfection but get to great, then brand a simple yellow circle as pac-man. Polish microinteractivity: it's those tiny decisions that make the professional-feeling versus the 'incomplete'.",
    image: "/images/pacman.png",
  credit: "Pac-Man, early revolutionary of Game Feel and sensory UX design. Excellent analysis in Noah Wardrup-Fruin's 'How Pac-Man Eats.'",
    examples: [
      {
        title: "InsideRisk",
        type: "game",
        image: "/images/ir.jpeg",
        detail:
          "In our goal to achieve live-matching immersion in a digital experience, microinteractions took from documentaries to compliment the medium rather than try to make it feel live towards an inevitable stripped-back results. When we couldn't have AI video conversations, we fell back on phone calls- creating a more business like and in-the-moment ecosystem that heightened immersion and psychometric validity rather than insisting on an impossible goal.",
      },
      {
        title: "Outernet",
        type: "venue design",
        image: "/images/ovl.png",
        detail:
          "In the modern premium-experience based economy, knowing when to just dim the lights and fog a stage front is critical. Emphasizing a multisensory approach and knowing what makes an experience feel premium beyond only cost, end-to-end work from client quotes to event layouts and live feeds was optimized for cohesion. VIP and accessible spaces were scalable and adaptable, allowing for a multi-tier experience sheerly through framing.",
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
              or from backend production for events and venues to 30+ acting credits and performances to audiences of 5k+;
              <br />
              <br />
              my <strong>Cognitive Design Process</strong> remains the same as an experience designer.
            </p>
            <p className = "processDisclaimer"><br/><br/><br/><br/>It's constantly evolved in my interdisciplinary exploration- and I'm enthusiastic to see what it becomes next as I learn and continue my young career.</p>
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
                {String(step.no).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
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
