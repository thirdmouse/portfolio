"use client";

import { useMemo, useState } from "react";
import "./styles.css";
import MobileNav from "../../components/MobileNav";

const SKILLS = [
  "Programming / AI",
  "Data / User Analysis",
  "Physical Design",
  "Video Production",
  "Presentation",
];

/*
 * Replace these sample titles, subtitles, links, and media paths with your work.
 * `skills` drives the filter bar. A project is shown when it contains at least
 * one currently-enabled skill.
 * Optional `externalLink` + `externalWord` add a top-right external action.
 */
const TECH_PROJECTS = [
  {
    id: "colorguard",
    title: "Color Guard",
    subtitle: "Mobile Game, 20m+ average session with players across 10+ countries.",
    href: "#signal-room",
    videoSrc: "/videos/design/colorguard.mp4",
    poster: "/videos/allprojects.jpg",
    skills: ["Programming / AI", "Data / User Analysis", "Video Production"],
    externalLink: "https://apps.apple.com/us/app/color-guard-tower-defense/id6505026907",
    externalWord: "CASE STUDY"
  },
  {
    id: "umg",
    title: "UMG Capstone",
    subtitle: "My final project, a cultural analysis deck yielding a proposed brand-artist partnership to develop emerging subcultures.",
    href: "#prototype-system",
    videoSrc: "/videos/technical/prototype-system.mp4",
    poster: "/videos/allprojects.jpg",
    skills: ["Data / User Analysis", "Presentation"],
    externalLink: "xxx",
    externalWord: "READ"
  },
  {
    id: "ltls",
    title: "Long Time, Let's See",
    subtitle: "Group UX project  reframing social media's addictive principles towards pro-social and pro-cognitive usage. Shown is a journey map I completed, revealing how we might contextualize user's thoughts vs. actions.",
    href: "#prototype-system",
    videoSrc: "/videos/technical/journey.mov",
    poster: "/videos/allprojects.jpg",
    skills: ["Data / User Analysis", "Presentation"],
  },
  {
    id: "panathenaea",
    title: "Sensory Athens Tour",
    subtitle: "Historical and architectural research yielded a tour recontextualizing antiquity through all five senses. It's better suited to a live experience with sensory elements, but enjoy the audiovisual component!",
    href: "#four-records",
    videoSrc: "/videos/technical/athens.mp4",
    poster: "/videos/film-poster.jpg",
    skills: ["Video Production", "Presentation"],
    externalLink: "https://youtu.be/IveW-A_NCRU",
    externalWord: "WATCH"
  },
  {
    id: "closet",
    title: "Closet",
    subtitle: "Cinematography class final, highlighting my creative vision.",
    href: "#toolkit",
    videoSrc: "/videos/technical/closet.mov",
    poster: "/videos/film-poster.jpg",
    skills: ["Video Production", "Physical Design"],
    externalLink: "https://youtu.be/Z1PgMDV0460",
    externalWord: "WATCH"
  },
  {
    id: "denmark",
    title: "Denmark Street",
    subtitle: "Project at Outernet, where I directed a music-history documentary short on the history of London's historical center of rock music",
    href: "#toolkit",
    videoSrc: "/videos/technical/denmark.mp4",
    poster: "/videos/film-poster.jpg",
    skills: ["Video Production", "Data / User Research"],
    externalLink: "https://youtu.be/zE0vZlUIwBw",
    externalWord: "WATCH"
  },
  {
    id: "curses",
    title: "Curses!",
    subtitle: "Card game, 'playing' frustration and prohibitive rules in a party setting.",
    href: "#audience-dashboard",
    videoSrc: "/videos/technical/curses.mp4",
    poster: "/videos/games-poster.jpg",
    skills: ["Physical Design", "Data / User Analysis"],
    externalLink: "https://drive.google.com/file/d/1tZPT2_B-O2DFR2O4MfxscJY1xjKK9IGG/view",
    externalWord: "PLAY"
  },
  {
    id: "detour",
    title: "Detour",
    subtitle: "Group HCI project used as a travel service rewarding authenticity.",
    href: "#toolkit",
    videoSrc: "/videos/design/hci.mp4",
    poster: "/videos/film-poster.jpg",
    skills: ["Data / User Research", "Programming / AI"],
    externalLink: "https://www.figma.com/proto/uhYQc5AHOuRHpjeGfH0unK/Detour-HCI---Mockup?node-id=2-163&starting-point-node-id=2%3A163&t=sDuHcYnAZCvbJ8GY-1",
    externalWord: "LO-FI FIGMA"
  },
  {
    id: "wcal",
    title: "Want Cake, Am Lazy",
    subtitle: "Game prototype and demo designed around emergent solutions.",
    href: "#data-performance",
    videoSrc: "/videos/technical/wcal.mp4",
    poster: "/videos/allprojects.jpg",
    skills: ["Programming / AI", "Presentation", "Physical Design"],
    externalLink: "https://miro.com/app/board/uXjVJl-U6CY=/?share_link_id=520286821732",
    externalWord: "VIEW MIRO"
  },
  {
    id: "neuro",
    title: "Computational Behavior Research",
    subtitle: "Human study analyzed via MatLab, identifying UI/UX effects on happiness and motivation.",
    href: "#toolkit",
    videoSrc: "/videos/technical/neuro.mp4",
    poster: "/videos/film-poster.jpg",
    skills: ["Data / User Analysis", "Programming / AI", "Presentation"],
  },
  {
    id: "ir",
    title: "InsideRisk",
    subtitle: "Cross-functional work at an immersive assessment firm serving top-500 global clients.",
    href: "#toolkit",
    videoSrc: "/videos/technical/ir.mov",
    poster: "/videos/film-poster.jpg",
    skills: ["Video Production", "Data / User Research", "Programming / AI"],
  },
  {
    id: "storyvox",
    title: "StoryVox",
    subtitle: "Product Design deliverable OCR reader.",
    href: "#venue-control",
    videoSrc: "/videos/technical/sv.mp4",
    poster: "/video-poster.jpg",
    skills: ["Physical Design", "Programming / AI"],
  },
  {
    id: "dipper",
    title: "Lil' Dipper",
    subtitle: "Mechanical Design group project, simulated Mars rover development.",
    href: "#instrument-interface",
    videoSrc: "/videos/dipper.mov",
    poster: "/videos/games-poster.jpg",
    skills: ["Physical Design", "Presentation"],
  },
  {
    id: "albums",
    title: "Albums",
    subtitle: "I've helped manage 3 albums with a fourth coming. I led two historical recovery projects, then as a team we released one for each of my band and acapella group.",
    href: "#toolkit",
    videoSrc: "/videos/technical/albums.mov",
    poster: "/videos/film-poster.jpg",
    skills: ["Presentation"],
    externalLink: "https://open.spotify.com/album/0GNaUE5KLuo6T92UvVi2BV",
    externalWord: "LISTEN"
  },
  {
    id: "ovl",
    title: "Outernet Venues Live",
    subtitle: "I served as a production intern at one of London's top cultural venues. Then, I returned to design a storefront for Kojima's release of DS2, receiving live crowds for over twelve hours.",
    href: "#toolkit",
    videoSrc: "/videos/cultural.mov",
    poster: "/videos/film-poster.jpg",
    skills: ["Physical Design", "Presentation"]
  },
];

const HERO_VIDEO = TECH_PROJECTS[0];

function SkillToggle({ skill, active, onToggle }) {
  return (
    <button
      type="button"
      className={`skillToggle${active ? " isActive" : ""}`}
      aria-pressed={active}
      onClick={() => onToggle(skill)}
    >
      <span className="skillToggleDot" aria-hidden="true" />
      {skill}
    </button>
  );
}
function ProjectTile({ project }) {
  const playPreview = (event) => {
    const tile = event.currentTarget;
    const video = tile.querySelector("video");

    if (!video) return;

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Once the video has successfully played, we know it has
          // a real decoded frame we can keep showing when paused.
          tile.dataset.previewed = "true";
        })
        .catch(() => {});
    }
  };

  const stopPreview = (event) => {
    const video = event.currentTarget.querySelector("video");

    if (!video) return;

    // Keep the current frame. Don't rewind.
    video.pause();
  };

  const followExternalLink = (event) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(project.externalLink, "_blank", "noopener,noreferrer");
  };

  const handleExternalKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    followExternalLink(event);
  };

  return (
    <a
      className="techProjectTile"
      onMouseEnter={playPreview}
      onMouseLeave={stopPreview}
      onFocus={playPreview}
      onBlur={stopPreview}
    >
      <span
        className="techProjectPoster"
        style={{ backgroundImage: `url(${project.poster})` }}
        aria-hidden="true"
      />

      <video
        className="techProjectVideo"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={project.videoSrc} />
      </video>

      <span className="techProjectVideoScrim" aria-hidden="true" />

      <span className="techProjectCopy">
        <span className="techProjectHeadingRow">
          <span className="techProjectTitle">{project.title}</span>
          {project.externalLink && project.externalWord && (
            <span
              className="techProjectExternalButton"
              role="link"
              tabIndex={0}
              onClick={followExternalLink}
              onKeyDown={handleExternalKeyDown}
            >
              {project.externalWord}
            </span>
          )}
        </span>
        <span className="techProjectSubtitle">{project.subtitle}</span>
      </span>

      <span className="techProjectSkills" aria-label="Project skills">
        {project.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </span>
    </a>
  );
}
export default function App() {
  const [enabledSkills, setEnabledSkills] = useState(() => new Set(SKILLS));

  const visibleProjects = useMemo(() => {
    if (enabledSkills.size === 0) return [];

    return TECH_PROJECTS.filter((project) =>
      project.skills.some((skill) => enabledSkills.has(skill)),
    );
  }, [enabledSkills]);

  const toggleSkill = (skill) => {
    setEnabledSkills((current) => {
      const next = new Set(current);
      if (next.has(skill)) next.delete(skill);
      else next.add(skill);
      return next;
    });
  };

  return (
    <div className="pageRoot technicalPage">
      <MobileNav />

      <header className="technicalHero" aria-labelledby="technical-page-title">
        <div className="technicalHeroReel" aria-hidden="true">
          <div
            className="technicalHeroTile"
            style={{ "--hero-delay": "100ms" }}
          >
            <video
              className="technicalHeroVideo"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={HERO_VIDEO.poster}
            >
              <source src="/videos/technical/snork.mp4" />
            </video>
            <span className="technicalHeroScrim" />
          </div>
        </div>

        <h1 id="technical-page-title" className="technicalPageTitle">
          TECHNICAL
        </h1>
      </header>

      <main>
        <section className="technicalPhilosophy" aria-labelledby="technical-philosophy-title">
          <div className="technicalPhilosophyInner">
            <h2 id="technical-philosophy-title">
              Even when ideas matter more than ever, the skills that enable my methods are crucial.
            </h2>
            <p>
              My technical work serves the designed idea. There&apos;s an experience I want a user to have, something I want them to learn, or something they should feel: this is how I get them there. Each is founded in the &apos;why&apos;, making them transferrable and durable in a changing creative ecosystem. Shown above is my test of a Renaissance era snorkel design... rigorous, as always.
            </p>
            <p className = "systems">
              Proficiency in... DESIGN: Figma, Miro, Unity, Unreal; VIDEO: PremierePro, FinalCut; GRAPHICS: PhotoShop, Canva; AUDIO: Logic Pro, Audacity; CAD: Revit, Inventor, SolidWorks; PROGRAMMING: C#, Python, React, Java, HTML, MatLab, Vibe-Coding
            </p>
          </div>
        </section>

        <section className="technicalWork" aria-labelledby="technical-work-title">
          <div className="technicalFilterBlock">
            <div className="technicalFilterHeading">
              <p className="technicalEyebrow">FILTER BY SKILL</p>
              <p className="technicalFilterCount" aria-live="polite">
                {visibleProjects.length} / {TECH_PROJECTS.length} projects
              </p>
            </div>

            <div className="skillToggleGrid" aria-label="Technical skill filters">
              {SKILLS.map((skill) => (
                <SkillToggle
                  key={skill}
                  skill={skill}
                  active={enabledSkills.has(skill)}
                  onToggle={toggleSkill}
                />
              ))}
            </div>
          </div>

          <h2 id="technical-work-title" className="srOnly">
            Technical projects
          </h2>

          <div className="techProjectGrid">
            {visibleProjects.map((project) => (
              <ProjectTile key={project.id} project={project} />
            ))}
          </div>

          {visibleProjects.length === 0 && (
            <div className="technicalEmptyState">
              <p>No active skills-</p>
              <button
                type="button"
                onClick={() => setEnabledSkills(new Set(SKILLS))}
              >
                Show all projects?
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}