import type { Metadata } from "next";
import {
  DonateHero,
  DonationForm,
  DonateTransparency,
} from "@/components/sections/donate";
import { getSiteContent } from "@/lib/cms";
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getDonateActionJsonLd,
  getWebPageJsonLd,
} from "@/lib/metadata";
import { donatePageContent } from "@/lib/mock-data";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return createPageMetadata({
    title: "Donate",
    description:
      content.donate.hero.subtext ||
      "Support Divine Gospel Delight Foundation. Your gift fuels gospel outreaches, compassion care, and empowerment programs that change lives.",
    path: "/donate",
    keywords: ["donate", "give", "support ministry", "charity donation"],
  });
}

/**
 * Donate page — hero, gift form with impact messaging, and transparency.
 */
export default async function DonatePage({
  searchParams,
}: {
  searchParams: { status?: string; reference?: string; trxref?: string };
}) {
  const content = await getSiteContent();
  // CMS stores a single headline; keep accent empty so the full line renders cleanly.
  const merged = {
    ...donatePageContent,
    heroHeadline: content.donate.hero.headline,
    heroAccent: "",
    heroBody: content.donate.hero.subtext,
  };

  const jsonLd = getWebPageJsonLd({
    title: "Donate",
    description: content.donate.hero.subtext,
    path: "/donate",
  });
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Donate", path: "/donate" },
  ]);
  const donateJsonLd = getDonateActionJsonLd();
  const reference = searchParams.reference || searchParams.trxref;

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donateJsonLd) }}
      />
      <DonateHero content={merged} />
      <DonationForm
        content={merged}
        status={searchParams.status}
        reference={reference}
      />
      <DonateTransparency content={merged} />
    </>
  );
}
