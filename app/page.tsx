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
import { createPageMetadata, getWebPageJsonLd } from "@/lib/metadata";
import {
  foundationContent,
  impactStats,
  testimonials,
} from "@/lib/mock-data";

export function generateMetadata(): Metadata {
  const metadata = createPageMetadata({
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      "Divine Gospel Delight Foundation restores hope and dignity through sustainable health, education, and spiritual guidance across Nigeria.",
    path: "/",
    keywords: [
      "humanitarian foundation Nigeria",
      "community empowerment",
      "healthcare outreach",
      "donate to charity",
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
export default function HomePage() {
  const jsonLd = getWebPageJsonLd({
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      "Divine Gospel Delight Foundation restores hope and dignity through sustainable health, education, and spiritual guidance across Nigeria.",
    path: "/",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection
        headline={foundationContent.heroHeadline}
        missionText={foundationContent.missionText}
        establishedYear={foundationContent.establishedYear}
      />
      <MissionSection
        headline={foundationContent.mandateHeadline}
        mandateQuote={foundationContent.mandateQuote}
      />
      <ImpactStats stats={impactStats} />
      <ProgramsSection programs={PROGRAMS} />
      <VisionSection
        headline={foundationContent.visionHeadline}
        callout={foundationContent.impactCallout}
        calloutBody={foundationContent.impactCalloutBody}
        values={VISION_VALUES}
      />
      <TestimonialSection testimonials={testimonials} />
      <DonateCtaSection />
      <PartnersSection partners={PARTNERS} />
    </>
  );
}
