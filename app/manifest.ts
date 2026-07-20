import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

/**
 * Web app manifest for installability and richer browser metadata.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "DGD Foundation",
    description: `${SITE_NAME} — ${SITE_TAGLINE}. Gospel outreach, compassion care, and community empowerment across Nigeria.`,
    start_url: "/",
    display: "standalone",
    background_color: "#FAF9F7",
    theme_color: "#1A3A5B",
    lang: "en",
    categories: ["lifestyle", "social"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
