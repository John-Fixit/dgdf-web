import "server-only";

import { cache } from "react";
import type {
  ApiGalleryItem,
  SiteContentDocument,
  SiteSettings,
} from "./cms-types";
import type {
  ApiResponse,
  GalleryItem,
  ImpactStats,
  LeadershipMember,
} from "./types";

export type { ApiGalleryItem, SiteContentDocument, SiteSettings };

/** Revalidate CMS payloads so SEO HTML stays fresh without rebuilding. */
const CMS_REVALIDATE_SECONDS = 60;

function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5002";
}

/**
 * Server-side JSON GET with Next.js Data Cache (ISR-style revalidation).
 */
async function serverGet<T>(path: string): Promise<T> {
  const url = `${getApiBaseUrl()}${path}`;
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: CMS_REVALIDATE_SECONDS, tags: ["cms"] },
  });

  if (!response.ok) {
    throw new Error(`CMS request failed (${response.status}): ${path}`);
  }

  const payload = (await response.json()) as ApiResponse<T>;
  if (!payload?.success || payload.data === undefined) {
    throw new Error(payload?.message || `Invalid CMS response: ${path}`);
  }

  return payload.data;
}

type ApiLeadershipMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  isFounder?: boolean;
  href?: string;
};

/**
 * Fetches the nested CMS content document (request-deduped).
 */
export const fetchSiteContent = cache(async (): Promise<SiteContentDocument> => {
  return serverGet<SiteContentDocument>("/content");
});

/**
 * Fetches published leadership members (request-deduped).
 */
export const fetchLeadershipMembers = cache(
  async (): Promise<(LeadershipMember & { isFounder?: boolean })[]> => {
    const members = await serverGet<ApiLeadershipMember[]>("/leadership");
    return (members ?? []).map((member) => ({
      id: member.id,
      name: member.name,
      role: member.role,
      bio: member.bio,
      photo: member.photoUrl,
      href: member.isFounder ? "/founder" : member.href,
      isFounder: member.isFounder,
    }));
  }
);

/**
 * Fetches global site settings (request-deduped).
 */
export const fetchSiteSettings = cache(async (): Promise<SiteSettings> => {
  return serverGet<SiteSettings>("/settings");
});

/**
 * Fetches gallery items from the API (active only, request-deduped).
 */
export const fetchGalleryItems = cache(async (): Promise<GalleryItem[]> => {
  const items = await serverGet<ApiGalleryItem[]>("/gallery");
  return (items ?? []).map((item, index) => ({
    id: item.id,
    imageUrl: item.imageUrl,
    caption: item.title,
    date: item.createdAt?.slice(0, 10) ?? "",
    category: item.category,
    aspect: index % 3 === 0 ? "portrait" : "wide",
  }));
});

/**
 * Fetches impact statistics from CMS home section.
 */
export const fetchImpactStats = cache(async (): Promise<ImpactStats> => {
  const content = await fetchSiteContent();
  return content.home.impactStats;
});
