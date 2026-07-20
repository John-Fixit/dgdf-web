"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui";
import type { DonatePageContent } from "@/lib/types";

export interface DonateHeroProps {
  content: Pick<
    DonatePageContent,
    | "heroLabel"
    | "heroHeadline"
    | "heroAccent"
    | "heroBody"
    | "heroImageUrl"
    | "heroImageAlt"
  >;
}

/**
 * Split editorial donate hero — copy left, documentary image right.
 */
export function DonateHero({ content }: DonateHeroProps) {
  return (
    <section
      className="overflow-hidden bg-background pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-28"
      aria-labelledby="donate-hero-heading"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="space-y-6 lg:col-span-7 lg:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <SectionLabel>{content.heroLabel}</SectionLabel>
          </motion.div>

          <h1
            id="donate-hero-heading"
            className="max-w-2xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            <motion.span
              className="inline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              {content.heroHeadline}{" "}
            </motion.span>
            <motion.span
              className="inline font-light italic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
            >
              {content.heroAccent}
            </motion.span>
          </h1>

          <motion.p
            className="max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.42 }}
          >
            {content.heroBody}
          </motion.p>
        </div>

        <motion.div
          className="relative h-[360px] overflow-hidden rounded-2xl editorial-shadow sm:h-[420px] lg:col-span-5 lg:h-[500px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image
            src={content.heroImageUrl}
            alt={content.heroImageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
