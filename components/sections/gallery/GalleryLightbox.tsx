"use client";

import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { GalleryItem } from "@/lib/types";

interface GalleryLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

/**
 * Formats category with year for lightbox captions.
 */
function formatCategoryLabel(category: string, date: string): string {
  if (!date) return category;
  const year = new Date(date).getFullYear();
  if (Number.isNaN(year)) return category;
  return `${category} · ${year}`;
}

/**
 * Full-screen lightbox for viewing a gallery image without cropping.
 */
export function GalleryLightbox({
  item,
  onClose,
}: GalleryLightboxProps): React.ReactElement | null {
  useEffect(() => {
    if (!item) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [item]);

  useEffect(() => {
    if (!item) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [item, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {item ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 lg:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={item.caption}
        >
          <button
            type="button"
            aria-label="Close gallery preview"
            className="absolute inset-0 bg-primary/70 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 flex max-h-[min(92vh,920px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-background shadow-luxury"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border/60 px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                  {formatCategoryLabel(item.category, item.date)}
                </p>
                <h2 className="mt-1 truncate font-display text-lg font-semibold text-primary sm:text-xl">
                  {item.caption}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-primary transition-colors hover:bg-primary hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center bg-muted/40 p-3 sm:p-5">
              <div className="relative h-[min(70vh,720px)] w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.caption}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 960px"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
