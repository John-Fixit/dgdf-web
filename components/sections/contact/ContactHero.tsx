"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui";

export interface ContactHeroProps {
  content: {
    label: string;
    headline: string;
    body: string;
  };
}

/**
 * Typographic contact hero — centered editorial intro.
 */
export function ContactHero({ content }: ContactHeroProps) {
  const { label, headline, body } = content;

  return (
    <section
      className="bg-background px-4 pb-12 pt-28 text-center sm:px-6 sm:pb-16 sm:pt-32 lg:px-8"
      aria-labelledby="contact-hero-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <SectionLabel className="mb-4">{label}</SectionLabel>
        </motion.div>

        <motion.h1
          id="contact-hero-heading"
          className="mx-auto max-w-4xl font-display text-4xl font-semibold tracking-tight text-primary sm:text-5xl lg:text-6xl xl:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          {headline}
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 sm:mt-8 sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          {body}
        </motion.p>
      </div>
    </section>
  );
}
