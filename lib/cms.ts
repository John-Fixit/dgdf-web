import "server-only";

import type { SiteContentDocument, SiteSettings } from "@/lib/cms-types";
import {
  fetchGalleryItems,
  fetchLeadershipMembers,
  fetchSiteContent,
  fetchSiteSettings,
} from "@/lib/server-api";
import {
  CONTACT_INFO,
  SITE_NAME,
  SITE_TAGLINE,
  SOCIAL_LINKS,
} from "@/lib/constants";
import {
  aboutPageContent,
  contactPageContent,
  donatePageContent,
  foundationContent,
  founderPageContent,
  galleryItems as mockGalleryItems,
  galleryTestimonial,
  impactStats as mockImpactStats,
  leadership as mockLeadership,
} from "@/lib/mock-data";
import type {
  ContactDetailItem,
  FounderPageContent,
  GalleryItem,
  ImpactStats,
  LeadershipMember,
  SocialLink,
  Testimonial,
} from "@/lib/types";

export type { SiteContentDocument, SiteSettings };

/**
 * Loads CMS content on the server with mock-data fallback when the API is unavailable.
 */
export async function getSiteContent(): Promise<SiteContentDocument> {
  try {
    return await fetchSiteContent();
  } catch (err) {
    console.warn("[cms] Falling back to mock content:", err);
    return {
      home: {
        hero: {
          headline: foundationContent.heroHeadline,
          paragraph: foundationContent.missionText,
        },
        mission: {
          title: foundationContent.mandateHeadline,
          body: foundationContent.mandateQuote,
        },
        visionMandateImpact: {
          vision: foundationContent.vision,
          mandate: foundationContent.mandate,
          impactSummary: foundationContent.impactCalloutBody,
        },
        impactStats: mockImpactStats,
        donateCta: {
          headline: "Your Generosity Fuels Transformation",
          subtext:
            "Join partners across Nigeria in restoring hope through education, health, and community outreach.",
        },
      },
      about: {
        hero: {
          headline: `${aboutPageContent.headline} ${aboutPageContent.headlineAccent} ${aboutPageContent.headlineSuffix}`,
          subtext: aboutPageContent.intro,
        },
        story: {
          title: aboutPageContent.journeyHeadline,
          body: aboutPageContent.intro,
        },
        mandateQuote: { quote: aboutPageContent.quote },
        leadership: {
          heading: aboutPageContent.leadershipHeadline,
          subtext: aboutPageContent.leadershipLabel,
        },
      },
      founder: {
        profile: {
          label: founderPageContent.label,
          name: founderPageContent.name,
          role: founderPageContent.role,
          photoUrl: founderPageContent.photo,
          intro: founderPageContent.intro,
        },
        article: {
          label: founderPageContent.articleLabel,
          headline: founderPageContent.articleHeadline,
          body: founderPageContent.paragraphs.join("\n\n"),
        },
        quote: {
          quote: founderPageContent.quote,
          attribution: founderPageContent.quoteAttribution,
        },
        cta: {
          headline: founderPageContent.ctaHeadline,
          body: founderPageContent.ctaBody,
          primaryLabel: founderPageContent.ctaPrimary,
          secondaryLabel: founderPageContent.ctaSecondary,
        },
      },
      gallery: {
        hero: {
          label: "Our Visual Narrative",
          headline: "Capturing the Heart of Every Outreach",
          body: "A documentary-style journey through the communities we serve.",
        },
        testimonial: {
          quote: galleryTestimonial.quote,
          name: galleryTestimonial.name,
          role: galleryTestimonial.role,
          photoUrl: galleryTestimonial.avatar,
        },
        cta: {
          headline: "Be Part of the Next Chapter",
          body: "Your support allows us to continue documenting stories of transformation.",
          primaryLabel: "Donate Now",
          secondaryLabel: "Join as Volunteer",
        },
      },
      donate: {
        hero: {
          headline: `${donatePageContent.heroHeadline} ${donatePageContent.heroAccent}`,
          subtext: donatePageContent.heroBody,
        },
        impactStats: {
          peopleReached: mockImpactStats.livesImpacted,
          outreaches: mockImpactStats.outreaches,
        },
        testimonial: {
          quote: galleryTestimonial.quote,
          donorName: galleryTestimonial.name,
          donorRole: galleryTestimonial.role,
        },
      },
      contact: {
        hero: {
          headline: contactPageContent.headline,
          subtext: contactPageContent.body,
        },
        info: {
          phone: CONTACT_INFO.phone,
          email: CONTACT_INFO.email,
          address: CONTACT_INFO.address,
          officeHours: "Monday – Friday: 9:00 AM – 5:00 PM",
        },
        social: {
          facebook:
            SOCIAL_LINKS.find((l) => l.platform === "facebook")?.href ?? "",
          instagram:
            SOCIAL_LINKS.find((l) => l.platform === "instagram")?.href ?? "",
          youtube:
            SOCIAL_LINKS.find((l) => l.platform === "youtube")?.href ?? "",
        },
      },
      lastUpdatedAt: new Date().toISOString(),
    };
  }
}

/**
 * Loads site settings with constants fallback.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    return await fetchSiteSettings();
  } catch (err) {
    console.warn("[cms] Falling back to constant settings:", err);
    return {
      organization: {
        name: SITE_NAME,
        tagline: SITE_TAGLINE,
        logoUrl: "",
      },
      contact: {
        phone: CONTACT_INFO.phone,
        email: CONTACT_INFO.email,
        address: CONTACT_INFO.address,
        officeHours: "Monday – Friday: 9:00 AM – 5:00 PM",
      },
      social: {
        facebook:
          SOCIAL_LINKS.find((l) => l.platform === "facebook")?.href ?? "",
        instagram:
          SOCIAL_LINKS.find((l) => l.platform === "instagram")?.href ?? "",
        youtube: SOCIAL_LINKS.find((l) => l.platform === "youtube")?.href ?? "",
        twitter: SOCIAL_LINKS.find((l) => l.platform === "twitter")?.href ?? "",
      },
      lastUpdatedAt: new Date().toISOString(),
    };
  }
}

/**
 * Loads published leadership with mock fallback.
 */
export async function getLeadership(): Promise<LeadershipMember[]> {
  try {
    const members = await fetchLeadershipMembers();
    if (members.length === 0) return mockLeadership;
    return members.map((member) => ({
      id: member.id,
      name: member.name,
      role: member.role,
      bio: member.bio,
      photo: member.photo,
      href: member.isFounder ? "/founder" : member.href,
    }));
  } catch (err) {
    console.warn("[cms] Falling back to mock leadership:", err);
    return mockLeadership;
  }
}

/**
 * Loads gallery media with mock fallback.
 */
export async function getGalleryMedia(): Promise<GalleryItem[]> {
  try {
    const items = await fetchGalleryItems();
    return items.length > 0 ? items : mockGalleryItems;
  } catch (err) {
    console.warn("[cms] Falling back to mock gallery:", err);
    return mockGalleryItems;
  }
}

/**
 * Maps CMS founder section to the Founder page content shape.
 */
export function mapFounderContent(
  content: SiteContentDocument["founder"]
): FounderPageContent {
  return {
    label: content.profile.label,
    name: content.profile.name,
    role: content.profile.role,
    photo: content.profile.photoUrl,
    photoAlt: `Portrait of ${content.profile.name}`,
    intro: content.profile.intro,
    articleLabel: content.article.label,
    articleHeadline: content.article.headline,
    paragraphs: content.article.body
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
    quote: content.quote.quote,
    quoteAttribution: content.quote.attribution,
    ctaHeadline: content.cta.headline,
    ctaBody: content.cta.body,
    ctaPrimary: content.cta.primaryLabel,
    ctaSecondary: content.cta.secondaryLabel,
  };
}

/**
 * Maps CMS gallery testimonial to Testimonial shape.
 */
export function mapGalleryTestimonial(
  content: SiteContentDocument["gallery"]["testimonial"]
): Testimonial {
  return {
    id: "gallery-testimonial",
    name: content.name,
    role: content.role,
    quote: content.quote,
    avatar: content.photoUrl,
  };
}

/**
 * Home impact stats from CMS.
 */
export function mapImpactStats(
  content: SiteContentDocument["home"]["impactStats"]
): ImpactStats {
  return content;
}

/**
 * Prefer a non-empty server value; otherwise use the mock fallback lines.
 */
function linesFromValue(
  value: string | undefined,
  fallback: string[]
): string[] {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return fallback;
  const parts = trimmed
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : fallback;
}

/**
 * Builds contact detail rows from site settings, falling back to mock details.
 */
export function mapContactDetailsFromSettings(
  settings: SiteSettings
): ContactDetailItem[] {
  const fallback = contactPageContent.details;

  return fallback.map((detail) => {
    if (detail.id === "phone" || detail.icon === "phone") {
      return {
        ...detail,
        lines: linesFromValue(settings.contact.phone, detail.lines),
      };
    }
    if (detail.id === "email" || detail.icon === "mail") {
      return {
        ...detail,
        lines: linesFromValue(settings.contact.email, detail.lines),
      };
    }
    if (detail.id === "sanctuary" || detail.id === "address" || detail.icon === "location") {
      return {
        ...detail,
        lines: linesFromValue(settings.contact.address, detail.lines),
      };
    }
    if (detail.id === "hours" || detail.icon === "schedule") {
      return {
        ...detail,
        lines: linesFromValue(settings.contact.officeHours, detail.lines),
      };
    }
    return detail;
  });
}

/**
 * Builds social links from site settings, falling back to constant SOCIAL_LINKS.
 */
export function mapSocialLinksFromSettings(
  settings: SiteSettings
): SocialLink[] {
  const fromSettings: SocialLink[] = (
    [
      {
        platform: "facebook" as const,
        href: settings.social.facebook,
        label: "Facebook",
      },
      {
        platform: "twitter" as const,
        href: settings.social.twitter,
        label: "Twitter",
      },
      {
        platform: "instagram" as const,
        href: settings.social.instagram,
        label: "Instagram",
      },
      {
        platform: "youtube" as const,
        href: settings.social.youtube,
        label: "YouTube",
      },
    ] as const
  ).filter((link) => Boolean(link.href?.trim()));

  return fromSettings.length > 0 ? fromSettings : SOCIAL_LINKS;
}
