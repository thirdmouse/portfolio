"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import "./styles.css";
import MobileNav from "../../components/MobileNav";

const CULTURAL_BUBBLES = [
  {
    id: "title",
    text: "CULTURE",
    size: "title",
    x: "50%",
    y: "12%",
    delay: "180ms",
    duration: "12s",
  },
  {
    id: "audience",
    text: "I want to understand and influence people where they are: trying to define and reveal culture as it exists or historicall existed so that conversation can happen.",
    size: "small",
    x: "78%",
    y: "30%",
    delay: "450ms",
    duration: "13s",
  },
  {
    id: "culture",
    text: "In an impersonal, addictive media landscape, good experiences help users slow down and understand their context.",
    size: "medium",
    x: "20%",
    y: "40%",
    delay: "320ms",
    duration: "11s",
  },
  {
    id: "experience",
    text: "My medium is 'interactivity'- the subconscious or social response, however we get there.",
    size: "large",
    x: "50%",
    y: "53%",
    delay: "810ms",
    duration: "15s",
  },
  {
    id: "medium",
    text: "I want to move towards this frontier as AI and addictive media threaten to obscure it.",
    size: "medium",
    x: "73%",
    y: "65%",
    delay: "570ms",
    duration: "14s",
  },
  {
    id: "human",
    text: "I've started, with work like my Sensory Tour of ancient Athens, or my Denmark Street documentary. But, there's a long way to go and mediums to discover along the way.",
    size: "small",
    x: "27%",
    y: "78%",
    delay: "690ms",
    duration: "12.5s",
  },
  {
    id: "pages",
    text: (<> Discover my work on <a
          href="/technical"
        >
          the technical page
        </a>, the methods that get me there <a
          href="/design"
        >
          in design
        </a>, or its cultural embedding in <a
          href="/performance"
        >
          performance.
        </a></>),
    size: "medium",
    x: "50%",
    y: "90%",
    delay: "690ms",
    duration: "12.5s",
  },
];


/*
 * Starts with the normal CSS font size.
 * If the copy is too large for its bubble, it progressively
 * reduces the font until everything fits.
 */
function FittedBubble({
  as: Tag = "p",
  id,
  className = "",
  children,
}) {
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const element = textRef.current;

    if (!element) return undefined;

    let frameId = 0;

    const fitText = () => {
      window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        /*
         * Remove the previous fitted value first so CSS gets
         * to establish the ideal size for the current viewport.
         */
        element.style.removeProperty("font-size");

        const styles = window.getComputedStyle(element);

        const idealSize = parseFloat(styles.fontSize);
        const minimumSize =
          parseFloat(styles.getPropertyValue("--bubble-font-min")) || 10;

        const isOverflowing = () =>
          element.scrollWidth > element.clientWidth + 1 ||
          element.scrollHeight > element.clientHeight + 1;

        /*
         * Most bubbles need no intervention at all.
         * Desktop therefore keeps the exact CSS composition.
         */
        if (!isOverflowing()) {
          return;
        }

        let low = minimumSize;
        let high = idealSize;

        /*
         * Binary search gives us the largest size that fits
         * instead of just shrinking everything arbitrarily.
         */
        for (let i = 0; i < 10; i += 1) {
          const middle = (low + high) / 2;

          element.style.fontSize = `${middle}px`;

          if (isOverflowing()) {
            high = middle;
          } else {
            low = middle;
          }
        }

        element.style.fontSize = `${Math.max(minimumSize, low)}px`;
      });
    };

    fitText();

    window.addEventListener("resize", fitText);

    /*
     * Re-fit after the site's font has finished loading.
     */
    document.fonts?.ready.then(fitText);

    return () => {
      window.removeEventListener("resize", fitText);
      window.cancelAnimationFrame(frameId);
    };
  }, [children]);

  return (
    <Tag
      ref={textRef}
      id={id}
      className={`culturalBubble ${className}`}
    >
      {children}
    </Tag>
  );
}


export default function App() {
  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow =
        previousHtmlOverflow;
    };
  }, []);

  return (
    <div className="pageRoot culturalPage">
      <MobileNav />

      <main
        className="culturalHero"
        aria-labelledby="cultural-page-title"
      >
        <div
          className="culturalHeroMedia"
          aria-hidden="true"
        >
          <video
            className="culturalHeroVideo"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source
              src="/videos/technical/snork.mp4"
              type="video/mp4"
            />
          </video>

          <span className="culturalHeroScrim" />
        </div>

        <div className="culturalBubbleField">
          {CULTURAL_BUBBLES.map((bubble) => {
            const isTitle = bubble.id === "title";

            return (
              <div
                key={bubble.id}
                className={`culturalBubblePosition culturalBubblePosition--${bubble.size}`}
                style={{
                  "--bubble-x": bubble.x,
                  "--bubble-y": bubble.y,
                  "--bubble-delay": bubble.delay,
                  "--bubble-duration": bubble.duration,
                }}
              >
                <FittedBubble
                  as={isTitle ? "h1" : "p"}
                  id={
                    isTitle
                      ? "cultural-page-title"
                      : undefined
                  }
                >
                  {bubble.text}
                </FittedBubble>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}