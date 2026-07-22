import type { Metadata } from "next";
import {
  AboutCtaSection,
  AboutHero,
  AboutQuote,
  HistoryTimeline,
  LeadershipSection,
  MissionVisionSection,
} from "@/components/sections/about";
import { getLeadership, getSiteContent } from "@/lib/cms";
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
} from "@/lib/metadata";
import { aboutPageContent } from "@/lib/mock-data";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return createPageMetadata({
    title: "About Us",
    description:
      content.about.hero.subtext ||
      "Discover the story, mandate, vision, and leadership of Divine Gospel Delight Foundation—a faith-driven nonprofit reaching communities with gospel hope.",
    path: "/about",
    keywords: ["about foundation", "ministry leadership", "gospel mandate"],
  });
}

/**
 * About page with heritage hero, mission, journey, leadership, and CTA.
 */
export default async function AboutPage() {
  const [content, leaders] = await Promise.all([
    getSiteContent(),
    getLeadership(),
  ]);

  const jsonLd = getWebPageJsonLd({
    title: "About Us",
    description: content.about.hero.subtext,
    path: "/about",
  });
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
  ]);

  const {
    label,
    headlineAccent,
    pillarsLabel,
    pillars,
    metrics,
    journeyLabel,
    timeline,
    ctaHeadline,
    ctaBody,
    ctaPrimary,
    ctaSecondary,
  } = aboutPageContent;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AboutHero
        content={{
          label,
          headline: content.about.hero.headline,
          headlineAccent,
          headlineSuffix: "",
          pillarsLabel,
          pillars,
          intro: content.about.hero.subtext,
        }}
        metrics={metrics}
      />
      <MissionVisionSection
        missionTitle={content.about.story.title}
        missionBody={content.about.story.body}
        visionTitle={aboutPageContent.visionTitle}
        visionBody={aboutPageContent.visionBody}
      />
      <AboutQuote quote={content.about.mandateQuote.quote} />
      <HistoryTimeline
        label={journeyLabel}
        headline={content.about.story.title}
        milestones={timeline}
      />
      <LeadershipSection
        label={content.about.leadership.subtext}
        headline={content.about.leadership.heading}
        leaders={leaders}
      />
      <AboutCtaSection
        headline={ctaHeadline}
        body={ctaBody}
        primaryLabel={ctaPrimary}
        secondaryLabel={ctaSecondary}
      />
    </>
  );
}
