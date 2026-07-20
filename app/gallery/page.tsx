import type { Metadata } from "next";
import {
  GalleryCta,
  GalleryGrid,
  GalleryHero,
  GalleryTestimonial,
} from "@/components/sections/gallery";
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
} from "@/lib/metadata";
import { galleryItems, galleryTestimonial } from "@/lib/mock-data";

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: "Gallery",
    description:
      "Browse photos from Divine Gospel Delight Foundation outreaches, compassion programs, and community empowerment moments.",
    path: "/gallery",
    keywords: ["outreach gallery", "ministry photos", "community events"],
  });
}

/**
 * Gallery page — typographic hero, masonry grid, testimonial, and CTA.
 */
export default function GalleryPage() {
  const jsonLd = getWebPageJsonLd({
    title: "Gallery",
    description:
      "Browse photos from Divine Gospel Delight Foundation outreaches and community programs.",
    path: "/gallery",
  });
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
  ]);

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
      <GalleryHero />
      <GalleryGrid items={galleryItems} />
      <GalleryTestimonial testimonial={galleryTestimonial} />
      <GalleryCta />
    </>
  );
}
