"use client";

import "./styles.css";
import MobileNav from "../../components/MobileNav";

const SITE_URL = "https://www.charliepattonmedia.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/charliecpatton";
const IMDB_URL = "https://www.imdb.com/name/nm15651681/";

// I couldn't safely infer your Instagram handle.
// Replace this with the exact public profile URL.
const INSTAGRAM_URL = "https://www.instagram.com/charliepatton.17/";

const SOCIAL_LINKS = [
  {
    id: "linkedin",
    title: "LinkedIn",
    subtitle: "Connect with me professionally.",
    href: LINKEDIN_URL,
    externalWord: "CONNECT",
    featured: true,
  },
  {
    id: "instagram",
    title: "Instagram",
    subtitle: "See what I'm up to.",
    href: INSTAGRAM_URL,
    externalWord: "FOLLOW",
  },
  {
    id: "imdb",
    title: "IMDb",
    subtitle: "Film and performance credits.",
    href: IMDB_URL,
    externalWord: "VIEW",
  },
];

function SocialTile({ link }) {
  const content = (
    <>
      <span className="aboutSocialHeadingRow">
        <span className="aboutSocialTitle">{link.title}</span>
        <span className="aboutSocialAction">{link.externalWord}</span>
      </span>
      <span className="aboutSocialSubtitle">{link.subtitle}</span>
      <span className="aboutSocialArrow" aria-hidden="true">↗</span>
    </>
  );

  if (!link.href) {
    return (
      <div className="aboutSocialTile isMissing" aria-label={`${link.title} URL needs to be added`}>
        {content}
      </div>
    );
  }

  return (
    <a
      className={`aboutSocialTile${link.featured ? " isFeatured" : ""}`}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open Charlie Patton on ${link.title}`}
    >
      {content}
    </a>
  );
}

export default function App() {
  const sameAs = [LINKEDIN_URL, IMDB_URL, INSTAGRAM_URL].filter(Boolean);

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/about#profile-page`,
    url: `${SITE_URL}/about`,
    name: "About Charlie Patton",
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}`,
      name: "Charlie Patton",
      url: `${SITE_URL}`,
      image: `${SITE_URL}/images/headshot.jpg`,
      jobTitle: "Creative Strategist & Experience Designer",
      description:
        "Charlie Patton is a creative technologist and experience designer combining cognitive science, creative technology, and cultural strategy to build interactive experiences.",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Yale University",
      },
      sameAs,
    },
  };

  return (
    <>
      <title>About || Charlie Patton</title>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />

      <div className="pageRoot aboutPage">
        <MobileNav />

        <header className="aboutHero" aria-labelledby="about-page-title">
          <div className="aboutHeroMedia" aria-hidden="true">
            <img
              className="aboutHeroImage"
              src="/images/headshot.jpg"
              alt=""
            />
            <span className="aboutHeroScrim" />
          </div>

          <h1 id="about-page-title" className="aboutPageTitle">
            ABOUT
          </h1>
        </header>

        <main>
          <section className="aboutPhilosophy" aria-labelledby="about-intro-title">
            <div className="aboutPhilosophyInner">

              <h2 id="about-intro-title">
                I&apos;m a Creative Technologist and Experience Designer.
              </h2>

              <p>
                I&apos;ve worked in cultural analysis and creative strategy at Universal Music Group, experience design and strategy at InsideRisk, and production at the Outernet. 
                I&apos;m a project-oriented person, having directed dozens of games and films independently.
              </p>

              <p>
                I believe that experiences are only so valuable as the effect they have on people both consciously and subconsciously. I studied Cognitive Science at Yale alongside a certificate in Medieval Studies and a minor-equivalent courseload in Architecture, all of which informs my work today.
              </p>

              <p>Contact me at <a href="mailto:contact@charliepattonmedia.com">contact@charliepattonmedia.com</a></p>
            </div>
          </section>

          <section className="aboutLinks" aria-labelledby="about-links-title">

            <h2 id="about-links-title" className="srOnly">
              Charlie Patton social and professional profiles
            </h2>

            <div className="aboutSocialGrid">
              {SOCIAL_LINKS.map((link) => (
                <SocialTile key={link.id} link={link} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}