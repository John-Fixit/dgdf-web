/**
 * Shared TypeScript types for the public website.
 */

export type GalleryAspect = "portrait" | "square" | "tall" | "wide" | "extraTall";

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  date: string;
  category: string;
  aspect?: GalleryAspect;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  /** Optional profile page link (e.g. founder). */
  href?: string;
}

export interface FounderPageContent {
  label: string;
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
  intro: string;
  articleLabel: string;
  articleHeadline: string;
  paragraphs: string[];
  quote: string;
  quoteAttribution: string;
  ctaHeadline: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface ImpactStats {
  livesImpacted: number;
  outreaches: number;
  volunteers: number;
  successRate: number;
}

export interface AboutMetric {
  value: string;
  label: string;
}

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface AboutPageContent {
  label: string;
  headline: string;
  headlineAccent: string;
  headlineSuffix: string;
  pillarsLabel: string;
  pillars: string[];
  intro: string;
  metrics: AboutMetric[];
  missionTitle: string;
  missionBody: string;
  visionTitle: string;
  visionBody: string;
  quote: string;
  journeyLabel: string;
  journeyHeadline: string;
  timeline: TimelineMilestone[];
  leadershipLabel: string;
  leadershipHeadline: string;
  ctaHeadline: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface FoundationContent {
  vision: string;
  mandate: string;
  aboutText: string;
  heroHeadline: string;
  missionText: string;
  establishedYear: string;
  mandateHeadline: string;
  mandateQuote: string;
  visionHeadline: string;
  impactCallout: string;
  impactCalloutBody: string;
}

export interface MinistryPillar {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Program {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

export interface VisionValue {
  id: string;
  title: string;
  description: string;
  icon: "verified" | "inclusive" | "growth";
}

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  label: string;
  platform: "facebook" | "twitter" | "instagram" | "youtube";
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}

export type ContactDetailIcon = "location" | "mail" | "phone" | "schedule";

export interface ContactDetailItem {
  id: string;
  icon: ContactDetailIcon;
  title: string;
  lines: string[];
}

export interface ContactPageContent {
  label: string;
  headline: string;
  body: string;
  inquiryOptions: string[];
  details: ContactDetailItem[];
  quote: string;
}

export interface DonationFormData {
  amount: number;
  name: string;
  email: string;
}

export interface DonateImpactItem {
  id: string;
  title: string;
  description: string;
  icon: "nourishment" | "education" | "health";
}

export interface DonatePageContent {
  heroLabel: string;
  heroHeadline: string;
  heroAccent: string;
  heroBody: string;
  heroImageUrl: string;
  heroImageAlt: string;
  impactTitle: string;
  impactItems: DonateImpactItem[];
  impactQuote: string;
  transparencyLabel: string;
  transparencyHeadline: string;
  transparencyBody: string;
  transparencyImageUrl: string;
  transparencyImageAlt: string;
  transparencyStats: AboutMetric[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
