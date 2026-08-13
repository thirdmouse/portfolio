"use client";

import { useEffect, useRef, useState } from "react";
import "./styles.css";
import MobileNav from "../../components/MobileNav";

const HERO_TILES = [
  {
    id: "1-l",
    videoSrc: "/videos/performance/falala.mov",
    poster: "/videos/games-poster.jpg",
    title: "Fa-La-La-Lannel",
    subtitle: "My band's annual acoustic holiday party.",
  },
  {
    id: "1-r",
    videoSrc: "/videos/performance/flannel1.mov",
    poster: "/videos/film-poster.jpg",
    title: "Flannel",
    subtitle: "Drumming with my band, here playing Britney Spears' Toxic",
  },
  {
    id: "2-l",
    videoSrc: "/videos/performance/leo.mp4",
    poster: "/videos/allprojects.jpg",
    title: "Tobie Lolness",
    subtitle: "Upcoming animated show- my character, in the blue, is a major character and antagonist.",
  },
  {
    id: "2-r",
    videoSrc: "/videos/performance/evilliveshere.mp4",
    poster: "/video-poster.jpg",
    title: "Evil Lives Here",
    subtitle: "Appearing in Evil Lives Here on Amazon Prime.",
  },
  {
    id: "3-l",
    videoSrc: "/videos/performance/once1.mp4",
    poster: "/video-poster.jpg",
    title: "Once",
    subtitle: "Performing in the musical Once, here singing Rattlin' Bog as crowdwork in the pre-show",
  },
  {
    id: "3-r",
    videoSrc: "/videos/performance/crowdSurf.mp4",
    poster: "/videos/allprojects.jpg",
    title: "Crowd Surfing",
    subtitle: "Sometimes, it's about instincts!",
  },
  {
    id: "4-l",
    videoSrc: "/videos/performance/fastlane.mov",
    poster: "/videos/performance/fastlane.mov",
    title: "Singing and Drumming",
    subtitle: "My favorite thing to do. Here, I'm leading Life in the Fast Lane!",
  },
  {
    id: "4-r",
    videoSrc: "/videos/performance/birthday.mov",
    poster: "/video-poster.jpg",
    title: "Happy Birthday barbershop quartet",
    subtitle: "A birthday quartet for a close friend of mine, just for fun!",
  },
];

/*
 * Text-card controls:
 * - top / left / right: starting position over the video grid
 * - size: title, medium, small, or tiny
 * - tilt: rotation in degrees
 * - speed: 0 moves normally; values nearer 1 scroll more slowly
 */
const FLOATING_TEXT_CARDS = [
  {
    id: "page-title",
    text: "PERFORMANCE",
    size: "title",
    width: "min(88vw, 1100px)",
    top: "4vh",
    left: "50%",
    centered: true,
    tilt: 0,
    speed: -0.5,
    delay: 420,
  },
  {
    id: "ideas",
    text: "As an actor,",
    size: "medium",
    top: "35vh",
    left: "clamp(18px, 8vw, 120px)",
    tilt: 0,
    speed: -.2,
    delay: 650,
  },
  {
    id: "motion",
    text: "a drummer-singer,",
    size: "small",
    top: "52vh",
    right: "clamp(18px, 7vw, 110px)",
    tilt: 4,
    speed: -.2,
    delay: 760,
  },
  {
    id: "culture",
    text: "or a host:",
    size: "tiny",
    top: "82vh",
    left: "clamp(24px, 13vw, 190px)",
    tilt: -3.5,
    speed: -.2,
    delay: 900,
  },
  {
    id: "prototype",
    text: "I'm always focused on the audience.",
    size: "medium",
    top: "135vh",
    right: "clamp(10px, 8vw, 160px)",
    tilt: 0,
    speed: -0.65,
    delay: 1040,
  },
  {
    id: "stewart",
    text: "I'm signed to Stewart Talent, with 30+ professional acting credits ranging both animated and live-action TV shows and movies. My projects have garnered up to 2M+ views, ranging character, accent and singing work.",
    size: "small",
    width: "60%",
    top: "140vh",
    right: "5%",
    tilt: 0,
    speed: -0.25,
    delay: 1180,
  },
  {
    id: "yale",
    text: "With my band, I've played for audiences of 5k+. With my acapella group, I've toured in 5+ international countries and 10+ states, singing in five languages.",
    size: "small",
    width: "60%",
    top: "160vh",
    left: "5%",
    tilt: 0,
    speed: -0.2,
    delay: 1180,
  },
];

const HERO_ROWS = Array.from(
  { length: Math.ceil(HERO_TILES.length / 2) },
  (_, rowIndex) => HERO_TILES.slice(rowIndex * 2, rowIndex * 2 + 2),
);

function FloatingTextLayer() {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    const hero = layer?.closest(".portfolioHero");

    if (!layer || !hero) return undefined;
const page = layer.closest(".pageRoot");

if (!page) return undefined;

const parallaxItems = Array.from(
  page.querySelectorAll("[data-parallax-speed]"),
);
    let frameId = 0;

    const findScrollContainer = (element) => {
      let parent = element.parentElement;

      while (parent && parent !== document.body) {
        const { overflowY } = window.getComputedStyle(parent);
        const canScroll = /(auto|scroll|overlay)/.test(overflowY);

        if (canScroll && parent.scrollHeight > parent.clientHeight) {
          return parent;
        }

        parent = parent.parentElement;
      }

      return window;
    };

    const scrollContainer = findScrollContainer(hero);

    const updateCards = () => {
      frameId = 0;

      const heroRect = hero.getBoundingClientRect();
      const scrollViewportTop =
        scrollContainer === window
          ? 0
          : scrollContainer.getBoundingClientRect().top;

      // This measures how far the video grid has moved past the top edge of
      // whichever element is actually scrolling—not just window.scrollY.
      const scrollDistance = Math.min(
        Math.max(scrollViewportTop - heroRect.top, 0),
        hero.scrollHeight,
      );

      parallaxItems.forEach((item) => {
  const speed = Number(item.dataset.parallaxSpeed ?? 0);
  const parallaxOffset = scrollDistance * speed;

  item.style.setProperty("--parallax-y", `${parallaxOffset}px`);
});
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateCards);
    };

    updateCards();

    // Capture scroll events from nested app shells as well as the document.
    document.addEventListener("scroll", requestUpdate, {
      capture: true,
      passive: true,
    });
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(hero);

    return () => {
      document.removeEventListener("scroll", requestUpdate, true);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      resizeObserver.disconnect();

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div ref={layerRef} className="floatingTextLayer">
      {FLOATING_TEXT_CARDS.map((card) => (
        <div
          key={card.id}
          className={`floatingTextCard floatingTextCard--${card.size}`}
          data-parallax-speed={card.speed}
          style={{
            "--card-top": card.top,
            "--card-left": card.left ?? "auto",
            "--card-right": card.right ?? "auto",
            "--card-width": card.width ?? "fit-content",
            "--card-x": card.centered ? "-50%" : "0px",
            "--card-tilt": `${card.tilt}deg`,
            "--card-delay": `${card.delay}ms`,
          }}
        >
          <span className="floatingTextCardInner">{card.text}</span>
        </div>
      ))}
    </div>
  );
}

function HoverLabelLayer({ activeTileId }) {
  return (
    <div className="portfolioHoverLabelLayer" aria-hidden="true">
      {HERO_ROWS.map((row, rowIndex) => (
        <div key={`label-row-${rowIndex}`} className="portfolioHoverLabelRow">
          {row.map((tile) => (
            <div key={tile.id} className="portfolioHoverLabelCell">
              <span
                className={`portfolioTileLabel${
                  activeTileId === tile.id ? " isVisible" : ""
                }`}
              >
                <span className="portfolioTileTitle">{tile.title}</span>
                {tile.subtitle && (
                  <span className="portfolioTileSubtitle">{tile.subtitle}</span>
                )}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [activeTileId, setActiveTileId] = useState(null);

  return (
    <div className="pageRoot">
    <title>Performance || Charlie Patton</title>
      <MobileNav />

      <header className="portfolioHero" aria-label="Selected work">
        <div className="portfolioHeroGrid">
          {HERO_ROWS.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="portfolioHeroRow"
              style={{ "--row-delay": `${120 + rowIndex * 320}ms` }}
            >
              {row.map((tile) => (
                <a
                  key={tile.id}
                  className="portfolioHeroTile"
                  href={tile.href}
                  aria-label={tile.label ?? tile.title}
                  onMouseEnter={() => setActiveTileId(tile.id)}
                  onMouseLeave={() => setActiveTileId(null)}
                  onFocus={() => setActiveTileId(tile.id)}
                  onBlur={() => setActiveTileId(null)}
                >
                  <video
                    className="portfolioHeroVideo"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={tile.poster}
                    aria-hidden="true"
                  >
                    <source src={tile.videoSrc} />
                  </video>

                  <span className="portfolioHeroScrim" aria-hidden="true" />
                </a>
              ))}
            </div>
          ))}
        </div>

        <FloatingTextLayer />
        <HoverLabelLayer activeTileId={activeTileId} />
      </header>
          
      <main className="resumeSheet" id="resume" 
      data-parallax-speed="-0.1">
        <div className="resumeSheetInner">
          <div className="resumeIntro">
            <h2>The cultural and cognitive impacts of art can only be understood when you&apos;re a part of it.</h2>
            <br/>
            <p className = "p2">
              Performance is a major aspect of that: discovering how to communicate some human truth by depending on the empathy of your audience.
            </p><a
          href="https://tinyurl.com/cpactingresume"
          target="_blank"
          rel="noreferrer"
          className="perfLink"
        >
          Check out my acting resume here.
        </a>
            <p className = "p2">
              But I well know that I&apos;m not a solo act: my casts and crews are my teams. I&apos;m there to support as much as I&apos;m in the spotlight. 
            </p>
            <br/>
            <p>
              So, check out my more background roles: <a
          href="/design"
          rel="noreferrer"
          className="perfLink"
        >
          my design methodology
        </a> or <a
          href="/projects"
          rel="noreferrer"
          className="perfLink"
        >
          the technical skills
        </a> I use to make it happen, from videogames focused on interactive experience or films I&apos;ve directed.
            </p>
          </div>
        </div>
      </main>
    </div>
    
  );
}