"use client";

import { HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui";

/**
 * Typographic gallery hero — centered editorial intro.
 */
export function GalleryHero() {
  return (
    <section
      className="bg-background px-4 pb-12 pt-28 text-center sm:px-6 sm:pb-16 sm:pt-32 lg:px-8"
      aria-labelledby="gallery-hero-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <SectionLabel className="mb-4">Our Visual Narrative</SectionLabel>
        </motion.div>

        <motion.h1
          id="gallery-hero-heading"
          className="mx-auto max-w-4xl font-display text-4xl font-semibold tracking-tight text-primary sm:text-5xl lg:text-6xl xl:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          Capturing the Heart of Every Outreach
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 sm:mt-8 sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          A documentary-style journey through the communities we serve. These are
          the faces of hope, the hands of change, and the spirit of a community
          united in faith and service.
        </motion.p>

        <motion.div
          className="mt-10 flex items-center justify-center gap-6 sm:mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.5 }}
          aria-hidden="true"
        >
          <span className="h-px w-16 bg-border sm:w-24" />
          <HeartHandshake className="h-6 w-6 text-primary" strokeWidth={1.5} />
          <span className="h-px w-16 bg-border sm:w-24" />
        </motion.div>
      </div>
    </section>
  );
}
