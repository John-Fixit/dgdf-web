import type { Metadata } from "next";
import {
  DonateHero,
  DonationForm,
  DonateTransparency,
} from "@/components/sections/donate";
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getDonateActionJsonLd,
  getWebPageJsonLd,
} from "@/lib/metadata";
import { donatePageContent } from "@/lib/mock-data";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Donate",
    description:
      "Support Divine Gospel Delight Foundation. Your gift fuels gospel outreaches, compassion care, and empowerment programs that change lives.",
    path: "/donate",
    keywords: ["donate", "give", "support ministry", "charity donation"],
  });
}

/**
 * Donate page — hero, gift form with impact messaging, and transparency.
 */
export default function DonatePage({
  searchParams,
}: {
  searchParams: { status?: string; reference?: string; trxref?: string };
}) {
  const jsonLd = getWebPageJsonLd({
    title: "Donate",
    description:
      "Support Divine Gospel Delight Foundation with a gift that fuels outreach and care.",
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
      <DonateHero content={donatePageContent} />
      <DonationForm
        content={donatePageContent}
        status={searchParams.status}
        reference={reference}
      />
      <DonateTransparency content={donatePageContent} />
    </>
  );
}
