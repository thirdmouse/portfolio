"use client";

import "./styles.css";
import MobileNav from "../../components/MobileNav";

const DESIGN_PROJECTS = [
  {
    id: "world",
    videoSrc: "/videos/design/ltls_test.mp4",
    title: "Define the world: the 'set of conditions for the possibility of success.'",
    description: "Start with a problem or opportunity and brainstorm how to work within it asking UX's 'How might we...?' This is a phase where a lot is literally put on the wall to find what sticks.",
    example:"For Long Time, Let's See, my team fixated on assisting with impersonal addiction in social media. That took dozens of possible forms from plugins to events to our end-result, a standalone app inspired by dating apps to get people off the app. That wasn't an idle decision- we prototyped and tested rapidly to see if the empathetic and subconscious effects we expected from each solution were actually happening.",
  },
  {
    id: "proto",
    videoSrc: "/videos/technical/wcal.mp4",
    poster: "/videos/allprojects.jpg",
    title: "Produce as low fidelity of a prototype or wireframe as provides the key experience.",
    description:
      "VR can be cardboard. Intense data analytics can be vibe-coded with mock data and 'lorem ipsum.' An experience that requires robust UI/UX from the first moment makes too many assumptions, and any reaction is just smoke and mirrors. I don't polish yet: I try to perfect what's at the core of the result.",
    example:"Want Cake, Am Lazy was a simple game. Inspired by Please, Don't Touch Anything, and the reality of forging a Rube-Goldberg like excuse to not stand up from a comfortable chair, users had to feel a grounded sense of humor. My final 3D prototype was great, but better for testing was a simple cardboard mockup. Testers could point, and I could move interactive elements of the model without speaking to serve as an adaptive AI. I found solutions alongside users that I individually couldn't have generated, staying true to the idea's commitment to human ingenuity."
  },
  {
    id: "thought",
    videoSrc: "/videos/colorguard.mp4",
    poster: "/video-poster.jpg",
    title: "Listen to what users said. More importantly, what they did.",
    description: "User testing results in strong opinions and ideas. Those are great! But, the better insights are in subconscious responses: where users said they'd do something and never did. I iterate to make my designs natural, so those disconnects don't happen.",
    example: "Color Guard, my iOS game, needed to reward the tension between long-term strategy, like traditional tower defense, and short-term tactics inspired by abstract art and mobile use tendencies. Users said they loved short-term gameplay early on, but analytics showed that they optimized away that fun when it became possible to fully upgrade only *one* guard for a longer term strategy later on. So, I added a late game enemy that targets your highest-upgraded guard, adding the tension that users loved *back* just when it seemed like it might fade. I also made Game-Feel decisions making explosions of higher-upgraded guards feel *awesome,* so the core sacrifice of the experience was the most fun part."
  },
  {
    id: "feel",
    videoSrc: "/videos/design/hci.mp4",
    poster: "/videos/allprojects.jpg",
    title: "Beautify what should now be a unit of experiential vocabulary.",
    description: "The experience should work now, even in black-and-white or cardboard. The *thing* is not the graphics or the flashy bits, it's the effect it has on the user. But, now's the chance to really sell it.",
    example: "Pac-Man is just a circle until you give him a name. Similarly, at InsideRisk we learned that people were engaging with our AI-conversations in the direction that we wanted, but not necessarily in the magnitude. Our experiences depended on revealing how people act in high-pressure situations, not just how they are in ordinary circumstances. Video editing like flashing lights to make a street corner feel real, or audio that gently provokes emotional responses are crucial here. For confidentiality reasons, shown to the left is a contrast between early Figma designs and a higher-fidelity prototype of a travel app I designed alongside a team."
  },
];

export default function App() {
  return (
    <div className="pageRoot">
      <MobileNav />

      <header className="designHero" aria-labelledby="design-page-title">
        <div className="designTitleSection">
          <h1 id="design-page-title" className="designPageTitle">
            DESIGN
          </h1>
          <p className="designPageDesc">Great results can be luck. So, my design depends on a great process to get me there. See it in action below, and explore end-to-end case studies.</p>
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
                  <p className="designProjectNumber">
                   {project.id}
                  </p>
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
             For case studies, check out{" "}
              <a
                href="/technical"
                rel="noreferrer"
                className="perfLink"
              >
                my technical page,
              </a>{" "}
              where my projects are listed. Or, read about my philosophy within <a
                href="/culture"
                rel="noreferrer"
                className="perfLink"
              >
                cultural work,
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