"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import type { GalleryAspect, GalleryItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface GalleryGridProps {
  items: GalleryItem[];
}

const ASPECT_CLASSES: Record<GalleryAspect, string> = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  tall: "aspect-[3/4]",
  wide: "aspect-[16/9]",
  extraTall: "aspect-[3/5]",
};

/**
 * Formats category with year for gallery captions.
 */
function formatCategoryLabel(category: string, date: string): string {
  const year = new Date(date).getFullYear();
  return `${category} · ${year}`;
}

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  isInView: boolean;
}

/**
 * Single masonry gallery card with desktop hover overlay and mobile caption.
 */
function GalleryCard({ item, index, isInView }: GalleryCardProps) {
  const [hovered, setHovered] = useState(false);
  const aspect = item.aspect ?? "square";
  const label = formatCategoryLabel(item.category, item.date);

  return (
    <motion.li
      className="mb-6 break-inside-avoid md:mb-8"
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <article
        className="group outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        tabIndex={0}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl bg-muted shadow-soft",
            ASPECT_CLASSES[aspect]
          )}
        >
          <Image
            src={item.imageUrl}
            alt={item.caption}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-focus-within:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Desktop: content slides up over the image on hover/focus */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-primary via-primary/90 to-primary/20 p-5 pt-16 lg:block"
            initial={false}
            animate={{ y: hovered ? "0%" : "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden={!hovered}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
              {label}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
              {item.caption}
            </h3>
          </motion.div>
        </div>

        {/* Mobile / tablet: caption always visible below the image */}
        <div className="mt-4 lg:hidden">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
            {label}
          </p>
          <h3 className="mt-1.5 font-display text-xl text-primary">{item.caption}</h3>
        </div>
      </article>
    </motion.li>
  );
}

/**
 * CSS-columns masonry gallery with staggered entrance animation.
 */
export function GalleryGrid({ items }: GalleryGridProps) {
  const ref = useRef<HTMLUListElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="bg-background pb-16 sm:pb-20 lg:pb-24"
      aria-labelledby="gallery-grid-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="gallery-grid-heading" className="sr-only">
          Gallery of ministry moments
        </h2>
        <ul
          ref={ref}
          className="columns-1 gap-6 md:columns-2 md:gap-8 lg:columns-3"
        >
          {items.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              isInView={isInView}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
