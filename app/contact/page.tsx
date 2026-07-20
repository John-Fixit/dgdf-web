import type { Metadata } from "next";
import {
  ContactForm,
  ContactHero,
  ContactQuote,
} from "@/components/sections/contact";
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
} from "@/lib/metadata";
import { contactPageContent } from "@/lib/mock-data";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Contact",
    description:
      "Contact Divine Gospel Delight Foundation for partnerships, volunteering, prayer requests, or general inquiries.",
    path: "/contact",
    keywords: ["contact foundation", "volunteer", "partnership inquiry"],
  });
}

/**
 * Contact page — hero, message form with office details, and pull-quote.
 */
export default function ContactPage() {
  const jsonLd = getWebPageJsonLd({
    title: "Contact",
    description:
      "Contact Divine Gospel Delight Foundation for partnerships, volunteering, or inquiries.",
    path: "/contact",
  });
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  const { label, headline, body, inquiryOptions, details, quote } =
    contactPageContent;

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
      <ContactHero content={{ label, headline, body }} />
      <ContactForm content={{ inquiryOptions, details }} />
      <ContactQuote quote={quote} />
    </>
  );
}
