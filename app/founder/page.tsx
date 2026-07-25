import type { Metadata } from "next";
import { AboutCtaSection } from "@/components/sections/about";
import {
  FounderArticle,
  FounderLeaders,
  FounderQuote,
} from "@/components/sections/founder";
import {
  getLeadership,
  getSiteContent,
  mapFounderContent,
} from "@/lib/cms";
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
} from "@/lib/metadata";
import { SITE_NAME } from "@/lib/constants";
import { absoluteUrl } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const founder = mapFounderContent(content.founder);
  return createPageMetadata({
    title: "Meet Our Leaders",
    description:
      founder.intro ||
      `Meet the President and Secretary of ${SITE_NAME} — guiding a faith-driven mission to restore hope and dignity across Nigeria.`,
    path: "/founder",
    keywords: [
      "foundation leadership",
      "Rev'd Mrs Folake Ojo",
      "Bolanle Ojo",
      "gospel leadership Nigeria",
    ],
  });
}

/**
 * Meet Our Leaders — President & Secretary profiles, story, quote, and CTA.
 * Leader photos and bios are managed in Admin → Leadership.
 */
export default async function FounderPage() {
  const [content, leaders] = await Promise.all([
    getSiteContent(),
    getLeadership(),
  ]);
  const founder = mapFounderContent(content.founder);

  const {
    label,
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
  } = founder;

  const featuredLeaders = leaders.slice(0, 2);

  const jsonLd = getWebPageJsonLd({
    title: "Meet Our Leaders",
    description: `Meet the President and Secretary of ${SITE_NAME}.`,
    path: "/founder",
  });
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Meet Our Leaders", path: "/founder" },
  ]);
  const peopleJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: featuredLeaders.map((leader, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Person",
        name: leader.name,
        jobTitle: leader.role,
        image: leader.photo,
        description: leader.bio,
        worksFor: {
          "@type": "NGO",
          name: SITE_NAME,
          url: absoluteUrl("/"),
        },
        url: absoluteUrl("/founder"),
      },
    })),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(peopleJsonLd) }}
      />
      <FounderLeaders
        label={label}
        headline="Meet Our Leaders"
        intro={intro}
        leaders={featuredLeaders}
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
      />
    </>
  );
}
