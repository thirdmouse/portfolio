"use client";
import { useEffect } from "react";

import "./styles.css";
import ResumeTimeline from "../components/ResumeTimeline";
import MobileNav from "../components/MobileNav";

const HERO_TILES = [
  {
    id: "top-left",
    href: "/design",
    videoSrc: "/videos/colorguard.mp4",
    poster: "/videos/games-poster.jpg",
    title: "DESIGN",
    subtitle: "Methods across Games, Apps, and Films",
  },
  {
    id: "top-right",
    href: "/performance",
    videoSrc: "/videos/drumming.mov",
    poster: "/videos/film-poster.jpg",
    title: "PERFORMANCE",
    subtitle: "Work in Acting, Drumming, and Singing",
  },
  {
    id: "bottom-left",
    href: "/projects",
    videoSrc: "/videos/dipper.mov",
    poster: "/video-poster.jpg",
    title: "PROJECTS",
    subtitle: "Skills, Case Studies, and Links"
  },
  {
    id: "bottom-right",
    href: "/goals",
    videoSrc: "/videos/cultural.mov",
    poster: "/videos/allprojects.jpg",
    title: "GOALS",
    subtitle: "Philosophy and Impact Motivations",
  },
];

const TIMELINE_ITEMS = [
  {
    id: "t-now",
    date: "2023 — 2027",
    title: "Yale University",
    subtitle:
      "3.84 GPA | Major in Cognitive Science, concentrating in subconscious and interactive experience",
    bullets: [
      "Certificate in Medieval Studies",
      "M.Arch Coursework in Multisensory and Inclusive Space Design",
      "MBA Coursework in UX Research / Design, Consumer Behavior",
      "Undergrad incl. Psychology of Marketing and Media, Architecture, Computational Neuroscience, Mechanical Design, Cognitive Science of Large Language Models, Game Design, Intellectual Property, Formal Philosophy, Computer Science (Data Structures, Algorithms, UI)",
    ],
    dotImage: { src: "/images/yale.png", alt: "yale" },
  },
  {
    id: "t-umg",
    date: "Summer 2026",
    title: "Universal Music Group",
    subtitle: "Strategy and Insights Intern",
    description:
      "The largest music company in the world. Worked under the Brand Partnerships umbrella, connecting hundreds of artists to global markets.",
    bullets: [
"Researched, narrativized, and presented ‘Cultural A&R’ data and marketing campaigns for top global brands.",
"Assisted in prototyping tool suite expanding my team, Studio2, into bottom-up cultural support and analysis."
],
    dotImage: { src: "/images/umg.png", alt: "umg" },
  },
  {
    id: "t-insiderisk",
    date: "Spring-Summer 2025, Part time Summer 2026",
    title: "InsideRisk",
    subtitle: "Project Manager for AI Integration and Video Editor",
    description:
      "Leader in novel psychometric assessments and immersive crisis trainings.",
    bullets: [
      "Co-designed and delivered live and digital immersive leadership & recruiting programs used by top-100 global companies.",
      "Managed end-to-end production of 15-20 minute behavioral assessment under strict constraints, aligning writers, designers, and data specialists to increase deployability and preserve psychometric validity of 400%+ longer modules.",
      "Led, as PM, redesign of flagship 4-hour program as 30-minute AI-integrated modules, enabling scalable delivery.",
      "Returned part time in 2026 to audit new products based on formats I helped establish, assisting with AI consistency in report modules.",
    ],
    dotImage: { src: "/images/ir.jpeg", alt: "insiderisk" },
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
  },
  {
    id: "t-uab",
    date: "Summer 2025",
    title: "Universitat Autonoma de Barcelona",
    subtitle:
      "Studied abroad for urban planning and architecture",
    bullets: [
      "Designed tour path chronicling Gaudi's development from lamp-posts to parks and palaces",
      "Engaged with Catalan architectural history from medieval to modernisme (Art Nouveau), through fascism and modernism; both from art history and phenomenological experience perspectives.",
      "Developed reciprocal relationships with local architects and designers"
    ],
    dotImage: { src: "/images/uab.jpeg", alt: "yale" },
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
    dotImage: { src: "/images/feat-b.jpg", alt: "ColorGuard" },
  },
  {
    id: "t-ovl",
    date: "Summer 2023, Summer 2025 (see Kojima)",
    title: "Outernet Venues Live",
    subtitle: "Production and Experience Intern",
    description:
      "Immersive events venue in London, featuring some of the largest screens in the world.",
    bullets: [
      "Developed management system for dynamic quoting, inventory, and logistics, used by rotating teams w. 2,000+ items.",
      "Designed flow and staging layouts to activate space, maximize engagement across multi-format events and product releases",
      "Project-managed and directed multi-event pre-show, including History of Denmark Street musical documentary.",
    ],
    dotImage: { src: "/images/ovl.png", alt: "ovl" },
  },
  {
    id: "t-stewart",
    date: "2019-Now",
    title: "Stewart Talent and TM Talent",
    subtitle:
      "Professional Actor based in NYC - incl. 2M+ views as CatRat in Gabby's Dollhouse on Roblox",
    description: (
      <>
        Act professionally in animation, film, tv, and theater. 30+ credits acting,
        singing, and hosting. Resume available{" "}
        <a
          href="https://tinyurl.com/cpactingresume"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          here.
        </a>
      </>
    ),
    dotImage: { src: "/images/stewart.jpeg", alt: "stw" },
  },
  {
    id: "t-abcya",
    date: "2022-2023",
    title: "ABCYa",
    subtitle: "Educational Game Design Mentee",
    description:
      "Educational game development company serving >100 million users yearly.",
    bullets: [
      "Developed full-stack for Designed 'Shakespearean Rap Battles' game following in-house Agile workflow.",
      "Supported CDN maintenance and crossfunctional team processes.",
    ],
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
    dotImage: { src: "/images/hths.png", alt: "hths" },
  },
];

const CAREER_TARGETS = {
  cognitiveResearcher: "t-now",
  culturalAnalyst: "t-umg",
  videogameProgrammer: "t-colorguard",
  sensoryArchitect: "t-ovl",
  filmmaker: "t-insiderisk",
  drummerSinger: "t-now",
  actor: "t-stewart",
};

function scrollToResume() {
  document
    .getElementById("resume")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openTimelineCareer(id) {
  const target =
    document.getElementById(id) ||
    document.querySelector(`[data-timeline-id="${id}"], [data-item-id="${id}"]`);

  let row = target?.closest(".timelineRow") || target;

  if (!row) {
    const title = TIMELINE_ITEMS.find((item) => item.id === id)?.title;
    row = Array.from(document.querySelectorAll(".timelineRow")).find(
      (candidate) =>
        candidate.querySelector(".timelineTitle")?.textContent?.trim() === title,
    );
  }

  if (!row) return;

  const cardSelector = ".timelineCardBtn, button.timelineCard, [aria-expanded]";
  const cardButton = row.matches(cardSelector)
    ? row
    : row.querySelector(cardSelector);
  const isOpen =
    row.classList.contains("isExpanded") ||
    row.classList.contains("isActive") ||
    cardButton?.getAttribute("aria-expanded") === "true";

  if (!isOpen) cardButton?.click();

  requestAnimationFrame(() => {
    setTimeout(() => {
      row.scrollIntoView({ behavior: "smooth", block: "center" });
      row.classList.add("isCareerTarget");
      setTimeout(() => row.classList.remove("isCareerTarget"), 1200);
    }, 40);
  });
}

function CareerLink({ target, children }) {
  return (
    <button
      className="careerLink"
      type="button"
      onClick={() => openTimelineCareer(target)}
    >
      {children}
    </button>
  );
}

export default function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document
        .querySelectorAll(".portfolioHeroTile")
        .forEach((tile) => tile.classList.add("labelsReady"));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="pageRoot">
      <MobileNav revealOnScroll />

      <header className="portfolioHero" aria-label="Selected work">
        <div className="portfolioHeroGrid">
          {HERO_TILES.map((tile, index) => (
            <a
              key={tile.id}
              className="portfolioHeroTile"
              href={tile.href}
              aria-label={tile.label}
              style={{ "--tile-delay": `${180 + index * 260}ms` }}
              onMouseEnter={(event) => {
                event.currentTarget.classList.add("hasHovered");
              }}
              onFocus={(event) => {
                event.currentTarget.classList.add("hasHovered");
              }}
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
              <span className="portfolioTileLabel">
              <span className="portfolioTileTitle">{tile.title}</span>

              {tile.subtitle && (
                <span className="portfolioTileSubtitle">{tile.subtitle}</span>
              )}
            </span>
            </a>
          ))}
        </div>

        <div
          className="portfolioIdentity"
          aria-label="Charlie Patton, Experience Designer and Creative Technologist"
        >
          <div className="portfolioIdentityCopy">
            <h1>Hey!</h1>
            <p>I&apos;m Charlie. I use behavioral cognitive science and creative technology to connect people.</p>
            <p className="contact">
              Click videos or scroll to my resume below.
            </p>
          </div>

          <button
            className="portfolioScrollCue"
            type="button"
            aria-label="Scroll to interactive resume"
            onClick={scrollToResume}
          >
            <span className="portfolioArrowStem" aria-hidden="true" />
            <span className="portfolioArrowHead" aria-hidden="true" />
          </button>
        </div>
      </header>

      <main className="resumeSheet" id="resume">
        <div className="resumeSheetInner">
          <div className="resumeIntro">
            <h2>Who am I and Why am I Here?</h2>
            <p>
              I design novel experiences by leveraging human behavior, cultural analysis, and medium-specific methods of interactivity.
            </p>
            <div className="p2">
              That&apos;s meant many different stages of the process:
              <br />
              <br />
              as a{" "}
              <CareerLink target={CAREER_TARGETS.cognitiveResearcher}>
                cognitive science researcher
              </CareerLink>{" "}
              or{" "}
              <CareerLink target={CAREER_TARGETS.culturalAnalyst}>
                cultural analyst
              </CareerLink>
              ,
              <br />
              <br />
              or as a{" "}
              <CareerLink target={CAREER_TARGETS.videogameProgrammer}>
                videogame programmer
              </CareerLink>{" "}
              and{" "}
              <CareerLink target={CAREER_TARGETS.sensoryArchitect}>
                sensory-architectural designer
              </CareerLink>
              ,
              <br />
              <br />
              and as a{" "}
              <CareerLink target={CAREER_TARGETS.filmmaker}>
                filmmaker
              </CareerLink>
              ,{" "}
              <CareerLink target={CAREER_TARGETS.drummerSinger}>
                drummer-singer
              </CareerLink>
              , or{" "}
              <CareerLink target={CAREER_TARGETS.actor}>actor</CareerLink>.
            </div>
            <p>
              But they all motivate towards the same goal: understanding
              people, culture, and how they interact. I want to work in
              experiences that help people connect, counteracting the impersonal
              and addictive world we&apos;re in.
            </p>
          </div>
          <div className="p2">After exploring my resume, check out <a
          href="/design"
          rel="noreferrer"
          className="perfLink"
        >
          my design process
        </a> or <a
          href="/projects"
          rel="noreferrer"
          className="perfLink"
        >
          projects.
        </a></div>

          <ResumeTimeline items={TIMELINE_ITEMS} />

              <p className ="end">Contact me at <a href="mailto:contact@charliepattonmedia.com" className="endLink">contact@charliepattonmedia.com</a> or my <a href="/about" className="endLink">about page</a></p>
        </div>
      </main>
    </div>
  );
}