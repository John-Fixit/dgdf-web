import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

type SitemapRoute = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

/**
 * Generates the public sitemap for all indexable routes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: SitemapRoute[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/donate", changeFrequency: "weekly", priority: 0.9 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/founder", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
    { path: "/gallery", changeFrequency: "weekly", priority: 0.7 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
