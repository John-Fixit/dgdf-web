import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import { Footer, Navbar } from "@/components/layout";
import { PageTransition } from "@/components/ui";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { getOrganizationJsonLd, getWebsiteJsonLd } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/utils";
import "@/styles/globals.css";

const display = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const siteDescription =
  "Divine Gospel Delight Foundation reaches communities with the gospel, compassion care, and empowerment programs that change lives across Nigeria.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://dgdelightfound.org"
  ),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: siteDescription,
  applicationName: SITE_NAME,
  keywords: [
    SITE_NAME,
    "Divine Gospel Delight",
    "gospel foundation",
    "charity Nigeria",
    "Christian nonprofit Nigeria",
    "community outreach",
    "humanitarian foundation",
    "donate to charity Nigeria",
  ],
  authors: [{ name: SITE_NAME, url: absoluteUrl("/") }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Nonprofit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      "Reaching communities with the gospel and practical care that restores hope across Nigeria.",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      "Reaching communities with the gospel and practical care that restores hope across Nigeria.",
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  other: {
    "geo.region": "NG-LA",
    "geo.placename": "Lagos",
  },
};

/**
 * Root layout with fonts, navigation, footer, and Organization JSON-LD.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = getOrganizationJsonLd();
  const websiteJsonLd = getWebsiteJsonLd();

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <Navbar />
        <PageTransition>
          <main id="main-content">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
