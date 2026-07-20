import type { Metadata } from "next";
import {
  CONTACT_INFO,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_TAGLINE,
  SOCIAL_LINKS,
} from "./constants";
import { absoluteUrl } from "./utils";

export interface CreatePageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** Override OG image path (defaults to site OG image). */
  image?: string;
  /** Set false to discourage indexing (e.g. utility pages). */
  index?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Builds a complete Metadata object for a public page.
 * Includes Open Graph, Twitter card, canonical URL, and keywords.
 */
export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  index = true,
}: CreatePageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);
  const ogTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    keywords: [
      SITE_NAME,
      "Divine Gospel Delight",
      "gospel foundation Nigeria",
      "Christian charity Nigeria",
      "humanitarian nonprofit",
      "community outreach",
      "gospel",
      "compassion ministry",
      "Nigeria",
      ...keywords,
    ],
    authors: [{ name: SITE_NAME, url: absoluteUrl("/") }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "Nonprofit",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_NG",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index,
      follow: index,
      googleBot: {
        index,
        follow: index,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

/**
 * Returns JSON-LD NonprofitOrganization schema for the root layout.
 */
export function getOrganizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "NGO"],
    name: SITE_NAME,
    legalName: SITE_NAME,
    alternateName: ["DGD Foundation", "Divine Gospel Delight"],
    url: absoluteUrl("/"),
    description: `${SITE_NAME} reaches communities with the gospel, compassion care, and empowerment programs that change lives across Nigeria.`,
    slogan: SITE_TAGLINE,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/logo-512.png"),
      width: 512,
      height: 341,
    },
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    email: CONTACT_INFO.email,
    telephone: CONTACT_INFO.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT_INFO.address,
      addressLocality: "Lagos",
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
    areaServed: {
      "@type": "Country",
      name: "Nigeria",
    },
    foundingLocation: {
      "@type": "Place",
      name: "Lagos, Nigeria",
    },
    sameAs: SOCIAL_LINKS.map((link) => link.href),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: CONTACT_INFO.email,
        telephone: CONTACT_INFO.phone,
        availableLanguage: ["English"],
        areaServed: "NG",
      },
    ],
  };
}

/**
 * Returns JSON-LD WebSite schema (helps sitelinks / brand identity).
 */
export function getWebsiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "DGD Foundation",
    url: absoluteUrl("/"),
    description: `${SITE_NAME} — ${SITE_TAGLINE}`,
    inLanguage: "en-NG",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
  };
}

/**
 * Returns JSON-LD WebPage schema for a given page.
 */
export function getWebPageJsonLd({
  title,
  description,
  path,
}: CreatePageMetadataOptions): Record<string, unknown> {
  const pageType =
    path === "/contact"
      ? "ContactPage"
      : path === "/about"
        ? "AboutPage"
        : "WebPage";

  return {
    "@context": "https://schema.org",
    "@type": pageType,
    name: title,
    description,
    url: absoluteUrl(path),
    inLanguage: "en-NG",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    about: {
      "@type": "NGO",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(DEFAULT_OG_IMAGE),
    },
  };
}

/**
 * Returns BreadcrumbList JSON-LD for nested pages.
 */
export function getBreadcrumbJsonLd(
  items: BreadcrumbItem[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * Returns DonateAction / fundraising schema for the donate page.
 */
export function getDonateActionJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    name: `Donate to ${SITE_NAME}`,
    description:
      "Support gospel outreaches, compassion care, and empowerment programs across Nigeria.",
    target: {
      "@type": "EntryPoint",
      urlTemplate: absoluteUrl("/donate"),
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    recipient: {
      "@type": "NGO",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
  };
}
