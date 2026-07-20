"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button, SectionLabel } from "@/components/ui";

export interface HeroSectionProps {
  headline: string;
  missionText: string;
  establishedYear: string;
}

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&h=1600&fit=crop";

/**
 * Split home hero — copy on the left, editorial image on the right.
 */
export function HeroSection({
  headline,
  missionText,
  establishedYear,
}: HeroSectionProps) {
  const words = headline.split(" ");

  return (
    <section
      className="mx-auto grid min-h-[min(100vh,819px)] max-w-7xl items-stretch sm:px-6 md:grid-cols-2 lg:px-8"
      aria-labelledby="home-hero-heading"
    >
      <div className="order-2 flex flex-col justify-center py-10 md:order-1 md:py-24 md:pr-8 lg:pr-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <SectionLabel>Established {establishedYear}</SectionLabel>
        </motion.div>

        <h1
          id="home-hero-heading"
          className="mt-4 max-w-xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-primary sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className="mr-[0.28em] inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 + index * 0.06 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.45 }}
        >
          {missionText}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.45 }}
        >
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="px-8 shadow-lift"
          >
            <Link href="/donate">Donate Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="px-8">
            <Link href="/about">About Us</Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="relative order-1 min-h-[360px] overflow-hidden rounded-b-3xl md:order-2 md:min-h-full md:rounded-none"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src={HERO_IMAGE}
          alt="Community outreach scene with volunteers serving families in Nigeria"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
    </section>
  );
}
