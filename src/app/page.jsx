"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";
import FlowingCircleCarousel from "@/components/FlowingCircleCarousel";
import ResumeTimeline from "../components/ResumeTimeline";
import MobileNav from "../components/MobileNav";
import ParallaxTripleColumns from "../components/ParallaxTwo";
import { carouselProjects, categories as importedCategories } from "@/components/FlowingCircleCarousel";
import { video } from "framer-motion/m";

/** ---------- Fade-in helper ---------- */
function FadeIn({ children, className = "", threshold = 0.15 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        }
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`fadeIn ${visible ? "isVisible" : ""} ${className}`}>
      {children}
    </div>
  );
}

export default function App() {
  const tripleTiles = useMemo(
    () => [
      {
        id: "digital",
        title: "DIGITAL (PROGRAMMING | MEDIA | APPS)",
        href: "/projects/#digital",
        videoSrc: "/videos/colorguard.mp4",
        poster: "/videos/games-poster.jpg",
      },
      {
        id: "physical",
        title: "PHYSICAL (ENGINEERING | EVENTS | SPACES)",
        href: "/projects/#physical",
        videoSrc: "/videos/drumming.mov",
        poster: "/videos/film-poster.jpg",
      },
      {
        id: "all",
        title: "ALL PROJECTS",
        href: "/projects",
        videoSrc: "/videos/allprojects.mov",
        poster: "/videos/allprojects.jpg",
      },
    ],
    []
  );

  // Your local categories (kept as-is)
  const categories = useMemo(
    () => [
      { key: "games", label: "Games", imgSrc: "/images/games.png" },
      { key: "film", label: "Film", imgSrc: "/images/film.png" },
      { key: "design", label: "Design", imgSrc: "/images/design.png" },
      { key: "engineering", label: "Engineering", imgSrc: "/images/engineering.png" },
    ],
    []
  );

  // Featured projects (3 large circles)
  const featured = useMemo(
    () => [
      {
        id: "inside-risk",
        title: "InsideRisk",
        desc: "PM'ed a redesign of our 4-hour flagship into 30 minute, AI-integrated modules for top-100 global companies.",
        href: "/projects/inside-risk",
        image: "/images/feat-a.jpg",
      },
      {
        id: "color-guard",
        title: "Color Guard",
        desc: "Shipped iOS game. Average session over 20 minutes, players in 10 countries.",
        href: "/projects/color-guard",
        image: "/images/feat-b.jpg",
      },
      {
        id: "long-time-lets-see",
        title: "Long Time, Let’s See!",
        desc: "Social media designed like a dating app — getting users off the app for new experiences.",
        href: "/projects/long-time-lets-see",
        image: "/images/feat-c.jpg",
      },
    ],
    []
  );

  useEffect(() => {
    const items = document.querySelectorAll("[data-featured]");
    let armedItem = null;

    const onTap = (e) => {
      // desktop = normal behavior
      if (window.matchMedia("(hover: hover)").matches) return;

      const item = e.currentTarget;

      if (armedItem !== item) {
        e.preventDefault(); // stop navigation
        armedItem?.classList.remove("isArmed");
        item.classList.add("isArmed");
        armedItem = item;
      } else {
        // second tap → allow navigation
        armedItem = null;
      }
    };

    const clear = () => {
      armedItem?.classList.remove("isArmed");
      armedItem = null;
    };

    items.forEach((item) => item.addEventListener("click", onTap));
    document.addEventListener("touchstart", clear);

    return () => {
      items.forEach((item) => item.removeEventListener("click", onTap));
      document.removeEventListener("touchstart", clear);
    };
  }, []);
  // Carousel items (smaller circles with title + category icon)
  const carouselItems = useMemo(
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

  // Timeline items + render
  const timelineItems = useMemo(
    () => [
      {
        id: "t-now",
        date: "2023 — Spring 2027",
        title: "Yale University",
        subtitle: "3.83 GPA | Major in Cognitive Science of Subconscious and Interactive Experience",
        bullets: [
          "Certificates in Spanish and Medieval Studies",
          "M.Arch Coursework in Multisensory and Inclusive Spaces",
          "MBA Coursework in UX Research / Design, Consumer Behavior",
          "Undergrad incl. Psychology of Marketing and Media, Architecture, Computational Neuroscience, Mechanical Design, Cognitive Science of Large Language Models, Game Design, Digital IP, Formal Philosophy, Computer Science (Data Structures, Algorithms)",
        ],
        dotImage: { src: "/images/yale.png", alt: "hths" },
      },
      {
        id: "t-insiderisk",
        date: "2025",
        title: "InsideRisk",
        subtitle: "Project Manager and AI-Integration Lead",
        bullets: [
          "Co-designed and delivered live and digital immersive leadership & recruiting programs used by top-100 global companies.",
          "Managed end-to-end production of 15-20 minute behavioral assessment under strict constraints, aligning writers, designers, and data specialists to increase deployability and preserve psychometric validity of 400%+ longer modules.",
          "Led, as PM, redesign of flagship 4-hour program as 30-minute AI-integrated modules, enabling scalable delivery.",
        ],
        description: "Leader in novel psychometric assessments and immersive crisis trainings",
        dotImage: { src: "/images/ir.jpeg", alt: "hths" },
        tags: ["Design, Filmmaking"],
      },
      {
        id: "t-kojima",
        date: "Summer 2025",
        title: "Kojima Productions at Outernet",
        subtitle: "Experience Manager and Storefront Designer",
        bullets: [
          "Returned to the Outernet for Kojima Productions game release event",
          "Designed storefront and trained attendants, leading to near total sellthrough and >12 hour consumer engagement",
          "MCeed ceremony with top names in Game Development industry.",
        ],
        tags: ["Engineering, Design"],
      },
      {
        id: "t-colorguard",
        date: "2024",
        title: "Color Guard",
        subtitle: "Self Published iOS Game",
        description: "Most recent of my 10+ shipped games on iOS, Android, and Web",
        bullets: [
          "Shipped mobile game to players in more than 10 countries",
          "Iterated anti-fun mitigation behaviors via analytics / playtesting; redesigned resource curves to eliminate dominant strategies.",
          "20 minute average play session, marking a tremendous success of multiple rounds per open.",
        ],
        tags: ["Games, Design, Engineering"],
        dotImage: { src: "/images/feat-b.jpg", alt: "ColorGuard" },
      },
      {
        id: "t-ovl",
        date: "2023",
        title: "Outernet Venues Live",
        subtitle: "Production and Experience Intern",
        description:
          "Immersive events venue in London, featuring some of the largest screens in the world.",
        bullets: [
          "Developed management system for dynamic quoting, inventory, and logistics, used by rotating teams w. 2,000+ items.",
          "Designed flow and staging layouts to activate space, maximize engagement across multi-format events and product releases",
          "Project-managed and directed multi-event pre-show, including History of Denmark Street musical documentary.",
        ],
        tags: ["Engineering, Filmmaking, Design"],
        dotImage: { src: "/images/ovl.png", alt: "ovl" },
      },
      {
        id: "t-stewart",
        date: "2019-Now",
        title: "Stewart Talent and TM Talent",
        subtitle: "Professional Actor based in NYC - incl. 2M+ views as CatRat in Gabby's Dollhouse on Roblox",
        description: (
    <>
      <a>Act professionally in animation, film, tv, and theater. 30+ credits acting,
      singing, and hosting.Resume available</a> {" "}
      <a
        href="https://tinyurl.com/cpactingresume"
        target="_blank"
        rel="noreferrer"
        className="underline"
      >
        here.
      </a>
    </>),
        tags: ["Filmmaking"],
        dotImage: { src: "/images/stewart.jpeg", alt: "stw" },
      },
      {
        id: "t-abcya",
        date: "2022-2023",
        title: "ABCYa",
        subtitle: "Game Design and Development Mentee",
        description: "Educational game development company serving >100 million users yearly.",
        bullets: [
          "Developed full-stack for Designed 'Shakesperean Rap Battles' game following in-house Agile workflow.",
          "Supported CDN maintenance and crossfunctional team processes.",
        ],
        tags: ["Games, Engineering, Design"],
        dotImage: { src: "/images/abc.png", alt: "abcya" },
      },
      {
        id: "t-hths",
        date: "2019-2023",
        title: "High Technology High School",
        subtitle:
          "1580 SAT | Principal's Award, National Merit Scholar, and AP Scholar with Distinction",
        bullets: [
          "Graduated on Civil Engineering track with end-to-end development of Habitat for Humanity project.",
          "Designed StoryVox OCR reader as capstone Product Engineering project",
        ],
        tags: ["Engineering"],
        dotImage: { src: "/images/hths.png", alt: "hths" },
      },
    ],
    []
  );

  const categoryMeta = useMemo(() => {
    const m = {};
    for (const c of categories) m[c.key] = c;
    return m;
  }, [categories]);

  /**
   * --- Intro video logic ---
   * - First visit in a tab/session: play once.
   * - When it ends: freeze on last frame.
   * - Returning to home in same session: don't replay; show frozen last frame immediately.
   */
  const videoRef = useRef(null);
useEffect(() => {
  if (typeof window === "undefined") return;
  if (window.location.hash !== "#afterIntro") return;

  const el = document.getElementById("afterIntro");
  el?.scrollIntoView({ behavior: "smooth", block: "start" });

  const v = videoRef.current;
  if (!v) return;

  const epsilon = 0.05;

  const skipToEndAndPause = () => {
    try {
      // duration is only valid after metadata loads
      const d = v.duration;
      if (Number.isFinite(d) && d > 0) {
        v.currentTime = Math.max(0, d - epsilon);
      }
      v.pause();
    } catch {
      try { v.pause(); } catch {}
    }
  };

  // If metadata is already ready, do it now.
  if (v.readyState >= 1) {
    skipToEndAndPause();
    return;
  }

  // Otherwise wait for metadata (more reliable on production/CDN)
  const onMeta = () => skipToEndAndPause();
  v.addEventListener("loadedmetadata", onMeta, { once: true });

  // Some browsers/CDN timing edge cases: also try once it can play
  const onCanPlay = () => skipToEndAndPause();
  v.addEventListener("canplay", onCanPlay, { once: true });

  return () => {
    v.removeEventListener("loadedmetadata", onMeta);
    v.removeEventListener("canplay", onCanPlay);
  };
}, []);

  return (
    <div className="pageRoot">
      <MobileNav revealOnScroll />

      {/* Fixed hero video behind everything */}
      <header className="heroFixed" aria-label="Intro video">
        <video
          ref={videoRef}
          className="heroVideo"
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster="/video-poster.jpg"
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>

        <div className="heroOverlay">
          <button
            className="scrollArrow"
            type="button"
            aria-label="Scroll to content"
            onClick={() => {
              document.querySelector(".contentSheet")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="arrowStem" aria-hidden="true" />
            <span className="arrowHead" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* White sheet scrolls over fixed video */}
      <main className="contentSheet">
        <div className="sheetInner">
          <FadeIn className="section centerBlock">
            <p className="blurb" id="about">
              I am a Creative Technologist and Psychological Engineer,
              <br />
              creating user-focused, subconsciously powerful experiences.
            </p>
          </FadeIn>
          <FadeIn className="section centerBlock">
            <p className="vocation">
              <br /> My diverse enthusiasm reaches programming, architecture, professional acting, rock-and-roll drumming, and events management...
               <br/>
                <br/>Each passion is not only unified by my Cognitive-Science based design philosophy, but
              irrevocably contributes to it.
            </p>
            <br/>
            <a href="/process" className="bigButton">
              Experience my Process
            </a>
            <br/>
          </FadeIn>

          <FadeIn className="section">
            <div className="sectionHeader">
              <h2 className="sectionTitle">Featured projects</h2>
              <a href="/projects" className="seeAllLink">
                See all →
              </a>
            </div>

            <div className="featuredGrid">
              {featured.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="featuredCircle"
                  data-featured
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="featuredHover">
                    <div className="featuredTitle">{item.title}</div>
                    <div className="featuredDesc">{item.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="cta">
            <br/>
            <h2>I'm looking for my next steps. I want to design, manage, and deliver experiences with - and learn from - companies that make an impact and create culture. </h2>
            <br/>
          <button
            type="button"
            aria-label="Scroll to contact"
            className="bigButton2"
            label="Contact Me"
            onClick={() => {
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contact Me
          </button>
            <br/>
            <br/>
            <p>Here's what I've already done.</p>
          </FadeIn>

          {/* Resume Timeline section */}
          <div className="section" id="resume">
            <ResumeTimeline items={timelineItems} />
          </div>

          <FadeIn className="section" threshold={0.05}>
            <div className="sectionHeader" id="process">
              <div>
                <button
                  className="scrollArrow"
                  type="button"
                  aria-label="Scroll to content"
                  onClick={() => {
                    document
                      .getElementById("processRevealAnchor")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  <span className="arrowStem2" aria-hidden="true" />
                  <span className="arrowHead2" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* <FlowingCircleCarousel items={carouselItems} categoryMeta={categoryMeta} /> */}
          </FadeIn>
        </div>
      </main>

      <div id="processRevealAnchor" />
      <ParallaxTripleColumns tiles={tripleTiles} />
      <section id="contact"></section>
    </div>
  );
}
