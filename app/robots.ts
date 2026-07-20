import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

/**
 * Robots configuration allowing public pages and pointing crawlers at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  const host =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://dgdelightfound.org";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host,
  };
}
