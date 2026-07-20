"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";

export interface FounderHeroProps {
  label: string;
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
  intro: string;
}

/**
 * Editorial founder hero — dominant portrait with name, role, and intro.
 */
export function FounderHero({
  label,
  name,
  role,
  photo,
  photoAlt,
  intro,
}: FounderHeroProps) {
  return (
    <section
      className="overflow-hidden bg-background pt-6 sm:pt-10"
      aria-labelledby="founder-hero-heading"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-soft lg:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <Image
              src={photo}
              alt={photoAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </motion.div>

          <div className="lg:col-span-7">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.4em] text-accent">
                {label}
              </span>
              <span className="h-px w-12 bg-accent/40" aria-hidden="true" />
            </motion.div>

            <motion.p
              className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
            >
              {role}
            </motion.p>

            <motion.h1
              id="founder-hero-heading"
              className="mt-3 max-w-2xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
            >
              {name}
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              {intro}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.48 }}
            >
              <Button asChild size="lg" className="px-8">
                <Link href="/donate">Support the Mission</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8">
                <Link href="/about">About the Foundation</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
