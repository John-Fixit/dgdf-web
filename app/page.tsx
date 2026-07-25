import type { Metadata } from "next";
import {
  DonateCtaSection,
  HeroSection,
  ImpactStats,
  MissionSection,
  PartnersSection,
  ProgramsSection,
  TestimonialSection,
  VisionSection,
} from "@/components/sections/home";
import {
  PARTNERS,
  PROGRAMS,
  SITE_NAME,
  SITE_TAGLINE,
  VISION_VALUES,
} from "@/lib/constants";
import { getSiteContent, mapImpactStats } from "@/lib/cms";
import { createPageMetadata, getWebPageJsonLd } from "@/lib/metadata";
import { foundationContent, testimonials } from "@/lib/mock-data";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const description =
    content.home.hero.paragraph ||
    "Divine Gospel Delight Foundation restores hope and dignity by meeting the needs of the less privileged through humanitarian and empowerment support across Nigeria.";

  const metadata = createPageMetadata({
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description,
    path: "/",
    keywords: [
      "humanitarian foundation Nigeria",
      "gospel through service",
      "community empowerment",
      "restore hope and dignity",
    ],
  });

  return {
    ...metadata,
    title: {
      absolute: `${SITE_NAME} | ${SITE_TAGLINE}`,
    },
  };
}

/**
 * Home page composing all primary marketing sections (SSR).
 */
export default async function HomePage() {
  const content = await getSiteContent();
  const stats = mapImpactStats(content.home.impactStats);

  const jsonLd = getWebPageJsonLd({
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: content.home.hero.paragraph,
    path: "/",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection
        headline={content.home.hero.headline}
        missionText={content.home.hero.paragraph}
        establishedYear={foundationContent.establishedYear}
      />
      <MissionSection
        headline={content.home.mission.title}
        mandateQuote={content.home.mission.body}
      />
      <ImpactStats stats={stats} />
      <ProgramsSection programs={PROGRAMS} />
      <VisionSection
        headline={content.home.visionMandateImpact.vision}
        callout={content.home.visionMandateImpact.mandate}
        calloutBody={content.home.visionMandateImpact.impactSummary}
        values={VISION_VALUES}
      />
      <TestimonialSection testimonials={testimonials} />
      <DonateCtaSection
        headline={content.home.donateCta.headline}
        body={content.home.donateCta.subtext}
      />
      <PartnersSection partners={PARTNERS} />
    </>
  );
}
