import type { Metadata } from "next";
import { AboutCtaSection } from "@/components/sections/about";
import {
  FounderArticle,
  FounderHero,
  FounderQuote,
} from "@/components/sections/founder";
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
} from "@/lib/metadata";
import { founderPageContent } from "@/lib/mock-data";
import { SITE_NAME } from "@/lib/constants";
import { absoluteUrl } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Our Founder",
    description: `Meet ${founderPageContent.name}, ${founderPageContent.role} of ${SITE_NAME}—the vision behind a faith-driven mission of hope and dignity.`,
    path: "/founder",
    keywords: [
      "foundation founder",
      founderPageContent.name,
      "gospel leadership Nigeria",
    ],
  });
}

/**
 * Founder profile page — portrait, biography, quote, and CTA.
 */
export default function FounderPage() {
  const {
    label,
    name,
    role,
    photo,
    photoAlt,
    intro,
    articleLabel,
    articleHeadline,
    paragraphs,
    quote,
    quoteAttribution,
    ctaHeadline,
    ctaBody,
    ctaPrimary,
    ctaSecondary,
  } = founderPageContent;

  const jsonLd = getWebPageJsonLd({
    title: "Our Founder",
    description: `Meet ${name}, ${role} of ${SITE_NAME}.`,
    path: "/founder",
  });
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Founder", path: "/founder" },
  ]);
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: role,
    image: photo,
    description: intro,
    worksFor: {
      "@type": "NGO",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    url: absoluteUrl("/founder"),
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <FounderHero
        label={label}
        name={name}
        role={role}
        photo={photo}
        photoAlt={photoAlt}
        intro={intro}
      />
      <FounderArticle
        label={articleLabel}
        headline={articleHeadline}
        paragraphs={paragraphs}
      />
      <FounderQuote quote={quote} attribution={quoteAttribution} />
      <AboutCtaSection
        headline={ctaHeadline}
        body={ctaBody}
        primaryLabel={ctaPrimary}
        secondaryLabel={ctaSecondary}
        secondaryHref="/about"
      />
    </>
  );
}
