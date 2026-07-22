import type { Metadata } from "next";
import {
  ContactForm,
  ContactHero,
  ContactQuote,
} from "@/components/sections/contact";
import {
  getSiteContent,
  getSiteSettings,
  mapContactDetailsFromSettings,
  mapSocialLinksFromSettings,
} from "@/lib/cms";
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
} from "@/lib/metadata";
import { contactPageContent } from "@/lib/mock-data";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return createPageMetadata({
    title: "Contact",
    description:
      content.contact.hero.subtext ||
      "Contact Divine Gospel Delight Foundation for partnerships, volunteering, prayer requests, or general inquiries.",
    path: "/contact",
    keywords: ["contact foundation", "volunteer", "partnership inquiry"],
  });
}

/**
 * Contact page — hero, message form with office details, and pull-quote.
 */
export default async function ContactPage() {
  const [content, settings] = await Promise.all([
    getSiteContent(),
    getSiteSettings(),
  ]);

  const jsonLd = getWebPageJsonLd({
    title: "Contact",
    description: content.contact.hero.subtext,
    path: "/contact",
  });
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  const { inquiryOptions, quote } = contactPageContent;
  const details = mapContactDetailsFromSettings(settings);
  const socialLinks = mapSocialLinksFromSettings(settings);

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
      <ContactHero
        content={{
          label: contactPageContent.label,
          headline: content.contact.hero.headline,
          body: content.contact.hero.subtext,
        }}
      />
      <ContactForm
        content={{ inquiryOptions, details }}
        socialLinks={socialLinks}
      />
      <ContactQuote quote={quote} />
    </>
  );
}
