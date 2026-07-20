import type { Metadata } from "next";
import {
  AboutCtaSection,
  AboutHero,
  AboutQuote,
  HistoryTimeline,
  LeadershipSection,
  MissionVisionSection,
} from "@/components/sections/about";
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
} from "@/lib/metadata";
import { aboutPageContent, leadership } from "@/lib/mock-data";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "About Us",
    description:
      "Discover the story, mandate, vision, and leadership of Divine Gospel Delight Foundation—a faith-driven nonprofit reaching communities with gospel hope.",
    path: "/about",
    keywords: ["about foundation", "ministry leadership", "gospel mandate"],
  });
}

/**
 * About page with heritage hero, mission, journey, leadership, and CTA.
 */
export default function AboutPage() {
  const jsonLd = getWebPageJsonLd({
    title: "About Us",
    description:
      "Discover the story, mandate, vision, and leadership of Divine Gospel Delight Foundation.",
    path: "/about",
  });
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
  ]);

  const {
    label,
    headline,
    headlineAccent,
    headlineSuffix,
    pillarsLabel,
    pillars,
    intro,
    metrics,
    missionTitle,
    missionBody,
    visionTitle,
    visionBody,
    quote,
    journeyLabel,
    journeyHeadline,
    timeline,
    leadershipLabel,
    leadershipHeadline,
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
          headline,
          headlineAccent,
          headlineSuffix,
          pillarsLabel,
          pillars,
          intro,
        }}
        metrics={metrics}
      />
      <MissionVisionSection
        missionTitle={missionTitle}
        missionBody={missionBody}
        visionTitle={visionTitle}
        visionBody={visionBody}
      />
      <AboutQuote quote={quote} />
      <HistoryTimeline
        label={journeyLabel}
        headline={journeyHeadline}
        milestones={timeline}
      />
      <LeadershipSection
        label={leadershipLabel}
        headline={leadershipHeadline}
        leaders={leadership}
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
