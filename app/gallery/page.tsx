import type { Metadata } from "next";
import {
  GalleryCta,
  GalleryGrid,
  GalleryHero,
  GalleryTestimonial,
} from "@/components/sections/gallery";
import {
  getGalleryMedia,
  getSiteContent,
  mapGalleryTestimonial,
} from "@/lib/cms";
import {
  createPageMetadata,
  getBreadcrumbJsonLd,
  getWebPageJsonLd,
} from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return createPageMetadata({
    title: "Gallery",
    description:
      content.gallery.hero.body ||
      "Browse photos from Divine Gospel Delight Foundation outreaches, compassion programs, and community empowerment moments.",
    path: "/gallery",
    keywords: ["outreach gallery", "ministry photos", "community events"],
  });
}

/**
 * Gallery page — typographic hero, masonry grid, testimonial, and CTA.
 */
export default async function GalleryPage() {
  const [content, items] = await Promise.all([
    getSiteContent(),
    getGalleryMedia(),
  ]);
  const testimonial = mapGalleryTestimonial(content.gallery.testimonial);

  const jsonLd = getWebPageJsonLd({
    title: "Gallery",
    description: content.gallery.hero.body,
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
      <GalleryHero
        label={content.gallery.hero.label}
        headline={content.gallery.hero.headline}
        body={content.gallery.hero.body}
      />
      <GalleryGrid items={items} />
      <GalleryTestimonial testimonial={testimonial} />
      <GalleryCta
        headline={content.gallery.cta.headline}
        body={content.gallery.cta.body}
        primaryLabel={content.gallery.cta.primaryLabel}
        secondaryLabel={content.gallery.cta.secondaryLabel}
      />
    </>
  );
}
