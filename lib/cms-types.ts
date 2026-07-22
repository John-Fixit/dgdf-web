/**
 * Shared CMS / API document shapes used by server fetchers and UI mappers.
 * Keep this file free of server-only imports so client code can type-import if needed.
 */

export interface SiteContentDocument {
  home: {
    hero: { headline: string; paragraph: string };
    mission: { title: string; body: string };
    visionMandateImpact: {
      vision: string;
      mandate: string;
      impactSummary: string;
    };
    impactStats: {
      livesImpacted: number;
      outreaches: number;
      volunteers: number;
      successRate: number;
    };
    donateCta: { headline: string; subtext: string };
  };
  about: {
    hero: { headline: string; subtext: string };
    story: { title: string; body: string };
    mandateQuote: { quote: string };
    leadership: { heading: string; subtext: string };
  };
  founder: {
    profile: {
      label: string;
      name: string;
      role: string;
      photoUrl: string;
      intro: string;
    };
    article: { label: string; headline: string; body: string };
    quote: { quote: string; attribution: string };
    cta: {
      headline: string;
      body: string;
      primaryLabel: string;
      secondaryLabel: string;
    };
  };
  gallery: {
    hero: { label: string; headline: string; body: string };
    testimonial: {
      quote: string;
      name: string;
      role: string;
      photoUrl: string;
    };
    cta: {
      headline: string;
      body: string;
      primaryLabel: string;
      secondaryLabel: string;
    };
  };
  donate: {
    hero: { headline: string; subtext: string };
    impactStats: { peopleReached: number; outreaches: number };
    testimonial: { quote: string; donorName: string; donorRole: string };
  };
  contact: {
    hero: { headline: string; subtext: string };
    info: {
      phone: string;
      email: string;
      address: string;
      officeHours: string;
    };
    social: {
      facebook: string;
      instagram: string;
      youtube: string;
    };
  };
  lastUpdatedAt: string;
}

export interface SiteSettings {
  organization: { name: string; tagline: string; logoUrl: string };
  contact: {
    phone: string;
    email: string;
    address: string;
    officeHours: string;
  };
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
  };
  lastUpdatedAt: string;
}

export interface ApiGalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  status: string;
  sortOrder: number;
  mediaType: string;
  location?: string;
  createdAt: string;
}
