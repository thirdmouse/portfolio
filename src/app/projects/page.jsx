"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../styles.css";
import "./projects.css";
import MobileNav from "../../components/MobileNav";
import { transpileModule } from "typescript";

/**
 * Projects page revamp:
 * - Physical / OR / Digital selector with hash IDs: #physical, #digital, #all
 * - Tag filters with "Deselect all"
 * - Grid cards with subtitle + 2-line description
 * - Cards with href get a subtle blue "hasLink" highlight
 * - Cards without href open a fullscreen modal (inspired by Process example boxes)
 */

const TAGS = [
  /*
  { key: "figma", label: "Figma" },
  { key: "miro", label: "Miro" },
  { key: "demo", label: "Playable Demo" },
  { key: "video-editing", label: "Video Editing (Premiere, Final Cut)" },
  { key: "game-engine", label: "Game Engine (Unity, Unreal)" },
  { key: "physical-design", label: "Physical Design" },
  { key: "event-design", label: "Event Design" },
  { key: "sensory-design", label: "Sensory Design" },
  { key: "engineering", label: "Engineering" },
  { key: "programming", label: "Programming (C#, Python, React, Matlab)" },
  { key: "data-analysis", label: "Data Analysis" },
  { key: "prototyping", label: "Prototyping" },
  { key: "manufacturing", label: "Manufacturing" },
  { key: "performance", label: "Performance" },
  { key: "user", label: "User Testing" },*/
      { key: "solo", label: "Solo" },
      { key: "group", label: "Group" },
      { key: "management", label: "Management" },
      { key: "prototyping", label: "Prototyping" },
      { key: "agile", label: "Agile" },
      { key: "uxr", label: "UX Research" },
      { key: "sensory-design", label: "Sensory Design" },
      { key: "data", label: "Data Analysis" },
      { key: "video", label: "Video Editing" },
      { key: "game", label: "Game" },
      { key: "film", label: "Film" },
      { key: "design", label: "Design" },
      { key: "engineering", label: "Engineering" },
      { key: "event", label: "Event" },
      { key: "miro", label: "Miro" },
      { key: "figma", label: "Figma" },
      { key: "unity", label: "Unity" },
      { key: "programming", label: "Programming" },
      { key: "cad", label: "Manufacturing / CAD" },
      { key: "sensory", label: "Sensory Design" },
      { key: "music", label: "Music" },
];
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
  const [openDropdown, setOpenDropdown] = React.useState(null);
const toggleDropdown = (id) => {
  setOpenDropdown((prev) => (prev === id ? null : id));
};
  const [tagsOpen, setTagsOpen] = React.useState(false);

    const CATEGORY_META = React.useMemo(
    () => ({
      games: { label: "Games", imgSrc: "./images/games.png" },
      film: { label: "Film", imgSrc: "./images/film.png" },
      design: { label: "Design", imgSrc: "./images/design.png" },
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
        "Leadership analysis and training company serving top-100 gloabl companies; worked as experience designer and on AI-integration",
      medium: "digital",
      category: "engineering",
      tags: [
        "group",
        "management",
        "prototyping",
        "agile",
        "uxr",
        "data",
        "video",
        "design",
        "engineering",
        "event",
        "miro",
        "figma",
        "programming",
      ],
      thumbSrc: "./images/ir.jpeg",
      caseStudy: {
          role: "Experience Designer and AI Integration",
          outcome:
            (
  <>
Worked on live events and digital programs for InsideRisk, producing industry-leading AI-integrated leadership seminars and programs. <strong>Pictures limited for confidentiality.</strong>
<br/></>),
caseStudy:(<>

I was tasked with reformatting our 4 our live flagship into AI-integrated virtual modules for scalability and digital benefit. This was achieved through <strong>observation of user and HR requirements for length, learning continuity, and micro-observations informing behavioral opportunities.</strong> After the success of this project (read below), I was <strong>project-lead on a client project from the ground-up for a 15 minute demo experience.</strong>

<br/>
<br/>
Conducting user research and AI functionality tests, as well as carefully mapping existing content, the team and I iterated versions through multiple lengths and timeframes. I was in charge of many of the edits, as well as designing, testing, and iterating the AI agents for conversational segments.

<br/>
<br/>
A key necessity was preserving psychometric validity, requiring utmost immersion. This was achieved, despite the digital environment, through <strong>microinteractivity designs offering a balance of novelty and consistency per psychological notions like choice overload and framing techniques</strong>; capturing attention throughout sessions reaching lengths of up to an hour.

<br/>
<br/>
AI-agent Conversations also had to be relentlessly fine-tuned based on careful behavioral test insights. Questions had to press users to learn, but also analyze their shortcomings rather than making opportunities obvious. Clients were tremendously satisfied, <strong>leading to near-decade long contracts.</strong>
  </>
)
        },
    },

    {
      id: "color-guard",
      title: "Color Guard",
      subtitle: "iOS game design + analytics iteration",
      description:
        "Shipped to players in 10+ countries. Iterated economy + anti-fun mitigation using playtests and telemetry.",
      category: "games",
      medium: "digital",
      demoHref: "https://apps.apple.com/cz/app/color-guard-tower-defense/id6505026907",
      tags: [
        "solo",
        "prototyping",
        "agile",
        "uxr",
        "video",
        "game",
        "design",
        "unity",
        "programming",
      ],
      thumbSrc: "./images/feat-b.jpg",
      demo: true,
      caseStudy:{
        role: "Sole Developer",
        outcome:(<>
          Inspired by the intersection of Kandinsky's abstract art and Jazz rhythms ala Charlie Parker; hoping to instigate tactical short-term thinking in a Tower Defense game, usually known for longer-term strategy. This was achieved through the "explode" mechanic and enemy / level designs befitting it, promenintly featured <strong>in the game's marketing campaign which I self-directed.</strong> Shipped to players in 10+ countries, average session lengths exceeding 20 minutes.
        </>),
        caseStudy:(<>Though I observed my ideal thought patterns in the early-game, late-game behavioral analysis revealed that players optimized away the fun of the experience.
        <div className="caseImageWrapper">
      <img className="caseimage" src="./images/cg.png" alt="" aria-hidden="true" />
      <div className="caseImageCaption">
        <span className="caseImageCaptionText">
          A "boring screen" in Color Guard- this many similarly upgraded guards signaled a problem.
        </span>
      </div>
    </div>
    <br/>
    This requires a balancing act: ideally, not punishing undesired long-term behavior and thereby removing fun, but rather <strong>rewarding the behavior which I as the designer know to be the most interesting</strong> through careful tweaks.
    <br/><br/>
    Difficulty spikes need to be readible, and challenges surmountable. Prodding more fun behavior was done in three ways:
    <br/><br/>
    First, I added the <strong>Pentagon enemies, who would target and destroy high level guards.</strong> Up to that point, guards were only "exploded" by players- new players got a surprise, and old players were offered a full-circle final challenge as is the goal of a well-designed game.
    <br/><br/>
    Secondly, I <strong>enhanced the game-feel of low-level explosions.</strong> With rewarding jazz blasts, screen rotation and shake, and a circle effect mimicking the art of the game's inspiration, players were satisfied with their guards' sacrifice and felt less need to "save" them.
    <br/><br/>
    Lastly, the in-game economy was altered. Rather than pricing the best upgrades the highest, I made them the cheapest. <strong>This way, players would spread the upgrades among the towers rather than saving to get the "best" upgrade for one.</strong> This also allowed an increase in general difficulty to increase thought-provoking challenge.
    <div className="caseImageWrapper">
      <img className="caseimage" src="./images/cgamefeel.png" alt="" aria-hidden="true" />
      <div className="caseImageCaption">
        <span className="caseImageCaptionText">
          An example of the upgraded game-feel, on a screen where pro-fun behavior is observed.
        </span>
      </div>
    </div></>)
    
      }
    },

{
  id: "flannel",
  title: "FLANNEL.",
  subtitle: "Drummer and Singer in signed rock band",
  description:
    "Yale Battle of the Bands winners, signed by indie label 17o1 records, play to audiences of 2.5k+",
  category: "design",
  medium: "physical",
  tags: [
    "group",
    "management",
    "design",
    "event",
  ],
  thumbSrc: "./images/flannel.jpg",
  caseStudy: {
          role: "Drummer and Vocalist",
          outcome:
            (
  <>
 I'm a founding member of <strong>Yale University's most popular band, FLANNEL. </strong>I drum and sing in genres ranging from the classic rock of Fleetwood Mac to modern hits like Paramore, Geese, or Clairo.    <div className="caseImageWrapper">
      <img className="caseimage" src="./images/yso.jpg" alt="" aria-hidden="true" />
      <div className="caseImageCaption">
        <span className="caseImageCaptionText">
          Playing at the Yale Symphony Orchestra show, as taken from the official @yale instagram.
        </span>
      </div>
    </div>
    <br/>
    We opened for two of the biggest annual events on campus, Spring Fling and the Symphony Orchestra Halloween show: per the Yale Daily News, <strong>the first band to do so</strong>.
    <br/>
    <br/>
    As a member, I'm often in charge of setlisting and play an integral role in managing performance logistics and styles, as well as curating group creative strategy and branding efforts.
    <div className="caseImageWrapper">
      <img className="caseimage" src="./images/gig.jpg" alt="" aria-hidden="true" />
    </div>
  </>
)
        },
},{
  id: "kojima-ovl",
  title: "Kojima @ OVL",
  subtitle: "Live experiential installation",
  description:
    "Designed and staged a live experiential event emphasizing sensory pacing, spatial flow, and audience engagement.",
  category: "design",
  medium: "physical",
  tags: [
    "group",
    "management",
    "sensory",
    "design",
    "event",
  ],
  thumbSrc: "./images/kojima.jpg",
  caseStudy: {
    role: "Assistant Manager and Experience Designer",
    outcome: (<>
  Live-managed event featuring the some of the largest names in media. Mapped audience flow patterns to <strong>design storefront experience that maximized dwell time and emotional brand engagement,</strong> contributing to near-total sell-through and extended on-site interactions.
    <div className="caseImageWrapper">
      <img className="caseimage" src="./images/kjovl.jpg" alt="" aria-hidden="true" />
      <div className="caseImageCaption">
        <span className="caseImageCaptionText">
          Pre-show work in the booth for a performance.
        </span>
      </div>
    </div></>),
    caseStudy:(<>Designed storefront flow for optimal flow based on audience behavior- per the demographic, consumers lingered for some time to analyze collectibles. So, the layout followed the Apple Store mentality of <strong>bidirectionality and broad product access.</strong><br/><br/>
    The event happened in HERE, a below ground venue, so ingress-egress was particularly oriented for through-store and to-event motion. Audience retention lasted over 12 hours, and post-event buzz carried a near-total sellout.
    <br/>
    <br/>
    During the event itself, I was in the booth as the Voice of God, as well as assisting in general technical processes to ensure smooth event execution.</>)
  }
},
    {
      id: "wcal",
      title: "Want Cake, Am Lazy",
      demo: true,
      subtitle: "Puzzle-Box Game",
      description:
        "Emergent gameplay through puzzle-box design and physical prototyping.",
      category: "games",
      medium: "digital",
      demoHref: "https://charlie-patton.itch.io/want-cake-am-lazy",
      tags: [
        "solo",
        "prototyping",
        "uxr",
        "game",
        "design",
        "engineering",
        "miro",
        "unity",
        "programming",
        "cad",
      ],thumbSrc: "./images/thumbs/wcal.png",
        caseStudy: {
          role: "Designer (independent)",
          outcome:
            (
  <>
    WCAL was inspired by Rube Goldberg machines and 'Please, Don't Touch Anything.' It required players to develop adventurous solutions in a completely normal room to reach cake across it.
    <div className="caseImageWrapper">
      <img className="caseimage" src="./images/thumbs/wcal.png" alt="" aria-hidden="true" />
      <div className="caseImageCaption">
        <span className="caseImageCaptionText">
          Title screen and view of the room in the demo.
        </span>
      </div>
    </div>
    <br/>
    To prototype, I realized that any digital version would require a complex AI-integrated physics system- or, I could actually harness <strong>user creativity.</strong>

    <br/>
    <br/>
    I built a physical model with as many odd appliances as could be made apparent, and let people run wild- I documented it on
      <a
        href="https://miro.com/app/board/uXjVJl-U6CY=/?share_link_id=520286821732"
        target="_blank"
        rel="noreferrer"
        className="underline"
      >
       a Miro board
      </a>, and it resulted in <a
        href="https://charlie-patton.itch.io/want-cake-am-lazy"
        target="_blank"
        rel="noreferrer"
        className="underline"
      >
        this demo
      </a>. Try starting a fire and making a boat; or using a vent to blow a slice of cake to you!   
      <div className="caseImageWrapper">
        <img className="caseimage" src="./images/wcalpm1.png" alt="" aria-hidden="true" />
        <div className="caseImageCaption">
          <span className="caseImageCaptionText">
            My paper model, full of miniature objects for testers to latch onto and lead off of.
          </span>
        </div>
      </div>   
  </>
)
        },
      },{
  id: "ovl",
  title: "Outernet Venues Live",
  subtitle: "Production Intern at Live Music and Experiential Venue",
  description:
    "Designed and staged world-class live events at three London SoHo venues, featuring some of the largest screens in the world.",
  category: "engineering",
  medium: "physical",
  tags: [
    "group",
    "management",
    "sensory",
    "design",
    "event",
  ],
  thumbSrc: "./images/thumbs/ovl.png",
  caseStudy: {
    role: "Production Intern",
    outcome: (<>OVL manages three venues at different depths in the city block it encompasses- worked on intermediary and venue-specific projects. See Kojima @ OVL project for most recent work. Interned on live event design and staging with production team; <strong>Project-led inventory management and quoting system able to streamline and enable client and performer adaptation</strong>.
    </>),
    caseStudy:(<><strong>Directed 'History of Denmark Street' musical history documentary,</strong> as part of a strategy campaign to develop sentiment for the venue in the area, in reaction to the perspective of OVL as hyper-corporatized and a culture-remover rather than opportunity for local growth.
    <br/>
    <br/> 
    Collated historical footage and edited tailor-made for the HERE screen, at the time the largest in the world. Developed connected event featuring licensed historic concert footage and retro merchandise sales as part of a multi-sensory experience able to fill schedule gaps at low notice.
    <div className="caseImageWrapper">
      <img className="caseimage" src="./images/here.png" alt="" aria-hidden="true" />
      <div className="caseImageCaption">
        <span className="caseImageCaptionText">
          A view of the HERE venue, featuring a screen spanning over 45 feet.
        </span>
      </div>
    </div>
    <br/>
    This, coupled with using above ground venues for traditional rock and band concerts, allowed a reframing of OVL and HERE's goals to align with the cultural and public perspective.
    </>)
  },
},
{
  id: "curses",
  title: "Curses!",
  subtitle: "Party card game",
  description:
    "Developed card game centered around forbidding certain words or actions, then coaxing them - like 'cursing' a curse word and then frustrating someone into saying it!",
  category: "games",
  medium: "physical",
  demo: true,
  demoHref: "https://drive.google.com/file/d/1tZPT2_B-O2DFR2O4MfxscJY1xjKK9IGG/view",
  tags: [
    "solo",
    "prototyping",
    "uxr",
    "game",
    "design",
  ],
  thumbSrc: "./images/curses.jpg",
  caseStudy:{
    role: "Sole Designer",
    outcome: (<>Designed, prototyped, and soft-launched the game. Iterated 'curse' mechanics to ensure players didn't just get completely quiet, added 'quest' mechanic as response to anti-fun behaviors. Downloadable version available!
    <br/><br/>
    Players each start with a custom curse card, on which they can write any word or phrase to forbid it at the cost of life. Then, through quest cards, requiring tasks; spell cards, minigames; and curse cards more generally forbidding actions like saying anyone's name; players can coax others into getting cursed and steal their life. </>)
  }
},
{
  id: "neuroscience-research",
  title: "Neuroscience Research",
  subtitle: "Data-driven cognitive modeling",
  description:
    "Conducted neuroscience research focused on experimental design, data collection, and analytical interpretation.",
  category: "engineering",
  medium: "digital",
  tags: [
    "solo",
    "data",
    "engineering",
    "programming",
  ],
  thumbSrc: "./images/thumbs/neuro.jpg",
  caseStudy: {
    role: "Research Assistant",
    outcome:(<>Produced novel research as seminar final project, adapting the Yale Rutledge Lab's methods towards testing game-like feedback effects on happiness.
    <br/>
    <br/>
    <strong>Analyzed data and fit to a model using linear regression.</strong> Testing four novel hypothesis with modeling techniques, producing a statistically significant result for computerized taunts on user happiness and motivation.</>)
  }
},
    {
      id: "long-time-lets-see",
      title: "Long Time, Let’s See!",
      subtitle: "Social media designed to promote off-app exploration",
      description:
        "A social platform designed like a dating app- optimized to get users off the app and into new experiences.",
      category: "design",
      medium: "digital",
      tags: [
        "group",
        "prototyping",
        "uxr",
        "design",
        "engineering",
        "miro",
        "figma",
        "programming",
      ],
      thumbSrc: "./images/ltls.jpg",
      caseStudy: {
        role: "UX Research Team Member, Co-Lead Conceptual Designer",
        outcome: (<>Produced <a href="https://docs.google.com/file/d/1JF5VJYW4z3KcEQiUvlPzUnsjHf5MIp0X/view">lo-fi</a> and < a href="https://docs.google.com/file/d/1MU9CGKLCVWJr5Y97MteZu1mGAd0dIi64/preview">med-fi</a> models of the app, <strong>testing through simulation</strong> event planning through a combination of calendar integration, AI tag-based searching, and friend-matching systems. 
        <br/>
        <div className="caseImageWrapper">
          <img className="caseimage" src="./images/test.png" alt="" aria-hidden="true" />
          <div className="caseImageCaption">
            <span className="caseImageCaptionText">
              Testing the model with end-to-end interaction simulated through existing modular products and verbal prompts.
            </span>
          </div>
        </div>
        <br/>
        The product was spun off into a proposed plugin for Instagram wherein algorithms could be shared and posts would have a "share" functionality to create a calendar event for actions.
        </>),
      }
    },
    {
      id: "closet",
      title: "Closet",
      subtitle: "Cinematography + editing study",
      watchHref: "https://youtu.be/Z1PgMDV0460?si=fel1tSH3-P4Ulhna",
      description:
        "Video-editing and cinematography experiment seeking to create horror through the uncanny.",
      category: "film",
      medium: "digital",
      tags: [
        "solo", "video", "film"],
      thumbSrc: "./images/thumbs/closet.png",
      caseStudy:{
        role: "Director",
        outcome: "View my short film, 'Closet', on my YouTube channel. Inspired by and designed to imitate my relationship to inspiration and creativity."
      }
    },

    {
      id: "touchscreen",
      title: "Touchscreen Experiments",
      subtitle: "Novel interaction affordances",
      description:
        "Iterated on unconventional touch input patterns to explore play and precision.",
      category: "design",
      medium: "digital",
      tags: [
        "solo",
        "uxr",
        "sensory",
        "data",
        "design",
        "engineering",
        "unity",
        "programming",
        "game",
      ],
      thumbSrc: "./images/thumbs/ts.png",
      caseStudy: {
        role: "Designer and Researcher",
        outcome: (<>Designed, tested, and iterated interaction methods with multitouch screens through Unity on iOS.
        <br/><br/>
        Methods include: 
        <br/> - a geometric touch-slide system for single-agent group control in a strategy game
        <br/> - a mobile platformer controller based on box grids in either corner for slides
        <br/> - an isometric strategy game, a la excomm, with shortest-path finding movement and environmental destruction
        <br/> - 2D platformer which turns to 3D platformer upon enemy hits - think Mario shells going from Super Mario Bros. to 3D Land</>)
      }
    },

    {
      id: "acropolis",
      title: "Live from the Acropolis",
      subtitle: "Historical Analysis + Sensory Staging",
      description:
        "Designed a live experience focused on audience flow and sensory moments through the Panathenaic Procession documented from the bottom-up.",
      category: "design",
      medium: "physical",
      tags: [
        "solo","sensory", "design", "event", "film"],
      thumbSrc: "./images/thumbs/athens.png",
      caseStudy: {
        role: "Experience Designer and Performer",
        outcome: "Performed a sensory live experience including all five senses based on the lived Ancient Greek experience during the Panathenaia. Conceived as a novel method of tour guiding for greater retention based on pedagogical psychology, the project was guided by Architect and Designer Joel Sanders."
      }
    },
    {
      id: "guerra",
      title: "Guerra de Discretos",
      subtitle: "Board Game playing Hermeneutics",
      description:
        "Experientially studies the interpretation of manuscripts, particularly in inquisition-era Spain.",
      category: "games",
      medium: "physical",
      tags: ["group","game", "design"],
      thumbSrc: "./images/thumbs/guerra.png",
      caseStudy: {
        role: "Game Designer",
        outcome: (<>Designed a game to explore hermenuetic interpretation of Spanish manuscripts. Inspired by Risk and Secret Hitler, each player is given one of the templar orders to support, as well as a hidden <loyalty->
          <br/><br/>
          On your turn, you read a manuscript card and must identify a contiguous segment of land wherein the author might have been from based on their symbols. Then, you claim that land- but, players can lie or steal land from one another.</loyalty-></>)
      }
    },

{
  id: "yale-historical",
  title: "Yale Historical Society",
  subtitle: "Treasurer and Executive Board member for Yale club, managing 15k+ budget.",
  description:
    "Organized and managed events throughout the year, including hosting two black tie galas and designing twice weekly orientation activities.",
  category: "design",
  medium: "physical",
  tags: [
    "group",
    "management",
    "data",
    "design",
    "event",
  ],
  thumbSrc: "./images/yale.jpg",
  caseStudy:{
    role: "Treasurer and Executive Board Member",
    outcome: (<>Managed group dedicated to preserving Yale's history from a non-institutional perspective.
    <br/>
    <br/>Organized social and educational events for a group of around fifty active members.</>)
  }
},
    {
      id: "heat",
      title: "Heat",
      subtitle: "Refilming of a classic scene from Heat (1995)",
      description:
        "A remake calling on the original exterior scripting of the scene, meant to understand the meaning of exterior and interior, and solitude versus crowds, in film.",
      category: "film",
      watchHref: "https://youtu.be/0irOis8LlNo?si=7ORBuIp1YCFpvsZw",
      medium: "digital",
      tags: ["solo", "video", "film"],
      thumbSrc: "./images/thumbs/heat.png",
      caseStudy:{
        role: "Director",
        outcome: "View my short, adapted from 'Heat', on my YouTube channel. Inspired by and designed to imitate my relationship to inspiration and creativity."
      }
    },
    {
      id: "sisyphus",
      title: "Requiem for Sisyphus",
      subtitle: "Slapstick comedy silent film",
      description:
        "Silent combat as a narrative device.",
      category: "film",
      medium: "digital",
      tags: ["solo","video", "film"],
      thumbSrc: "./images/thumbs/sisyphus.png",
      watchHref:"https://youtu.be/LTF8OGhc6hk?si=78MSlnrUEo6NYVRU",
      caseStudy:{
        role: "Director",
        outcome: "View my short film on my YouTube channel. Performed as an evaluative final for a stage combat class."
      }
    },
/*
    {
      id: "hanger",
      title: "Cart Hanger",
      subtitle: "Manufacturable physical design",
      description:
        "Hardware concept shaped by fabrication constraints.",
      category: "engineering",
      medium: "physical",
      tags: [
        "group",
        "prototyping",
        "agile",
        "uxr",
        "engineering",
        "cad",
      ],
      thumbSrc: "./images/thumbs/hanger.png",
    },

    {
      id: "storyvox",
      title: "Storyvox",
      subtitle: "Assistive OCR reader",
      description:
        "Capstone product engineering project focused on accessible text output.",
      category: "engineering",
      medium: "digital",
      tags: [
        "group",
        "management",
        "uxr",
        "engineering",
        "programming",
        "cad",
      ],
      thumbSrc: "./images/thumbs/storyvox.png",
    },
    {
      id: "rover",
      title: "Lil' Dipper Rover",
      subtitle: "Prototyping a physical system",
      description:
        "Built and iterated a small rover concept under fabrication constraints.",
      category: "engineering",
      medium: "physical",
      tags: [
        "group",
        "management",
        "agile",
        "engineering",
        "programming",
        "cad",
      ],
      thumbSrc: "./images/dipper.jpg",
    },

    {
      id: "habitat",
      title: "PLTW Habitat for Humanity",
      subtitle: "End-to-end civil engineering project",
      description:
        "From planning to execution—engineering with real constraints.",
      category: "engineering",
      medium: "physical",
      tags: [
        "solo","engineering", "cad"],
      thumbSrc: "./images/thumbs/habitat.png",
    },*/
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
      { key: "group", label: "Team" },
    ],
  },
  {
    id: "skills",
    label: "Skills",
    options: [
      { key: "management", label: "Management" },
      { key: "prototyping", label: "Prototyping" },
      { key: "agile", label: "Agile" },
      { key: "uxr", label: "UX Research" },
      { key: "sensory", label: "Sensory Design" },
      { key: "data", label: "Data Analysis" },
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
      { key: "cad", label: "Manufacturing / CAD" },
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
    const isOpen = openDropdown === g.id;

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
                    <div className="projectTitleV2">{p.title}</div>  <div className="projectPillGroup">
    {p.demo ? <div className="projectDemoPill">DEMO</div> : null}
    {p.watchHref ? <div className="projectDemoPill">WATCH</div> : null}
    <div className="projectMediumPill">{p.medium}</div>
  </div>
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
            <div className="projectModalActions">
              {openProject.demoHref ? (
                <a
                  className="projectModalDemoBtn"
                  href={openProject.demoHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Demo ↗
                </a>
              ) : null}

              {openProject.watchHref ? (
                <a
                  className="projectModalDemoBtn"
                  href={openProject.watchHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch ↗
                </a>
              ) : null}

              <button
                className="projectModalClose"
                type="button"
                onClick={() => setOpenProjectId(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
              </div>

              <div className="projectModalBody">
                <p className="projectModalDesc">{openProject.description}</p> 

                {openProject.tags?.length ? (
                  <div className="projectModalTagList">
                    {openProject.tags.map((t) => (
                      <span key={t} className="projectModalTag">
                        {TAGS.find((x) => x.key === t)?.label ?? t}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="projectModalCase">
  {openProject.caseStudy.role ? (
    <p><strong>Role:</strong> {openProject.caseStudy.role}</p>
  ) : null}

  {openProject.caseStudy.outcome ? (
    <div className="projectModalBlock">
      <strong>Outcome:</strong>
      <div className="projectModalContent">{openProject.caseStudy.outcome}</div>
    </div>
  ) : null}

  {openProject.caseStudy.caseStudy ? (
    <div className="projectModalBlock">
      <br/>
      <strong>Case Study:</strong>
      <div className="projectModalContent">{openProject.caseStudy.caseStudy}</div>
    </div>
  ) : null}
</div>


              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
