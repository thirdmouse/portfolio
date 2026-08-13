"use client";

import "./styles.css";
import MobileNav from "../../components/MobileNav";

const DESIGN_PROJECTS = [
  {
    id: "world",
    videoSrc: "/videos/design/ltls_test.mp4",
    title: "Define the world: the 'set of conditions for the possibility of success.'",
    description: (<>Start with a problem or opportunity and brainstorm how to work within it <strong>asking UX&apos;s &apos;How might we...?&apos;</strong> This is a phase where a lot is literally put on the wall to find what sticks.</>),
    example: (<>For Long Time, Let&apos;s See, my team fixated on <strong>assisting with impersonal addiction in social media</strong>. That took dozens of possible forms from plugins to events to our end-result, a standalone app inspired by dating apps to get people off the app. That wasn&apos;t an idle decision- we <strong>prototyped and tested rapidly to see if the empathetic and subconscious effects we expected</strong> from each solution were actually happening.</>),
  },
  {
    id: "proto",
    videoSrc: "/videos/technical/wcal.mp4",
    poster: "/videos/allprojects.jpg",
    title: "Produce as low fidelity of a prototype or wireframe as provides the key experience.",
    description: (<>
      VR can be cardboard. Intense data analytics can be vibe-coded with mock data and &apos;lorem ipsum.&apos; <strong>An experience that requires robust UI/UX from the first moment makes too many assumptions</strong>, and any reaction is just smoke and mirrors. I don&apos;t polish yet: <strong>I try to perfect what&apos;s at the core of the result.</strong></>),
    example: (<>Want Cake, Am Lazy was a simple game. Inspired by Please, Don&apos;t Touch Anything, and the reality of forging a Rube-Goldberg like excuse to not stand up from a comfortable chair, <strong>users had to feel a grounded sense of explorative humor</strong>. My final 3D prototype worked, but better for testing was a simple cardboard mockup. Testers could point, and I could move interactive elements of the model without speaking to serve as an adaptive AI. <strong>I found solutions alongside users that I individually couldn&apos;t have generated, staying true to the idea&apos;s commitment to human ingenuity. </strong></>),
  },
  {
    id: "thought",
    videoSrc: "/videos/colorguard.mp4",
    poster: "/video-poster.jpg",
    title: "Listen to what users said. More importantly, what they did.",
    description: (<>User testing results in strong opinions and ideas. Those are great! But, the better insights are in subconscious responses: <strong>where users said they&apos;d do something and never did. </strong>I iterate to make my designs natural, so those disconnects don&apos;t happen.</>),
    example: (<>Color Guard, my iOS game, needed to <strong>reward the tension between long-term strategy, like traditional tower defense, and short-term tactics inspired by abstract art and mobile use tendencies</strong>. Users said they loved short-term gameplay early on, but <strong>analytics showed that they optimized away the fun</strong> when it became possible to fully upgrade <strong>only one</strong> guard for a longer term strategy later on. So, I added a late game enemy that targets your highest-upgraded guard, adding the tension that users loved <strong>back</strong> just when it seemed like it might fade. I also made Game-Feel decisions making explosions of higher-upgraded guards feel awesome, so <strong>the core mechanic of the experience was the most fun part.</strong></>)
  },
  {
    id: "feel",
    videoSrc: "/videos/design/hci.mp4",
    poster: "/videos/allprojects.jpg",
    title: "Beautify what should now be a unit of experiential vocabulary.",
    description: (
  <>
    The experience should work now, even in black-and-white or cardboard. The{" "}
    <strong>thing is not the graphics or the flashy bits, it&apos;s the
    effect it has on the user.</strong>
  </>
),example: (
  <>
  Pac-Man is just a circle until you give him a name. Similarly, at InsideRisk we learned that people were engaging with our AI-conversations in the direction that we wanted, but not necessarily in the magnitude. Our experiences depended on revealing how people act in high-pressure situations, not just how they are in ordinary circumstances. Video editing like flashing lights to make a street corner feel real, or audio that gently provokes emotional responses are crucial here. <strong>A finished experience becomes cognitively powerful through sensory details. </strong>For confidentiality reasons, shown to the left is a contrast between early Figma designs and a higher-fidelity prototype of a travel app I designed alongside a team.
  </>
),}
];

export default function App() {
  return (
    <div className="pageRoot">

      <title>Design Methodology || Charlie Patton</title>
      <MobileNav />

      <header className="designHero" aria-labelledby="design-page-title">
        <div className="designTitleSection">
          <h1 id="design-page-title" className="designPageTitle">
            DESIGN
          </h1>
          <p className="designPageDesc">Great results can be luck. So, my design depends on a great process to get me there.</p>
          <p className="designPageCaveat">For a deeper dive into case-studies, check out <a
          href="/projects"
        >
          the projects page
        </a>.</p>
        </div>

        <div className="designProjectList" aria-label="Selected design work">
          {DESIGN_PROJECTS.map((project, index) => (
            <article
              key={project.id}
              className={`designProjectRow${index % 2 ? " isReversed" : ""}`}
              style={{ "--row-delay": `${120 + index * 90}ms` }}
            >
              <div className="designVideoBlock">
                <video
                  className="designProjectVideo"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={project.poster}
                  aria-label={`${project.title} video`}
                >
                  <source src={project.videoSrc} />
                </video>
                <span className="designVideoScrim" aria-hidden="true" />
              </div>

              <div className="designTextBlock">
                <div className="designTextInner">
                  <h2>{project.title}</h2>
                  <p className="designProjectDescription">{project.description}</p>
                  <p className="designProjectExample">{project.example}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </header>

      <main className="resumeSheet" id="resume">
        <div className="resumeSheetInner">
          <div className="resumeIntro">
            <p className="p2">This process drives everything I make.</p>
            <p>
             Check out{" "}
              <a
                href="/projects"
                rel="noreferrer"
                className="perfLink"
              >
                my projects page,
              </a>{" "}
              or read about my <a
                href="/goals"
                rel="noreferrer"
                className="perfLink"
              >
                philosophy and goals
              </a>{" "}
              or {" "} 
              <a
                href="/performance"
                rel="noreferrer"
                className="perfLink"
              >
                 my performances.
              </a>{" "}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}