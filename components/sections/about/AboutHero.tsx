"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { AboutMetric, AboutPageContent } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface AboutHeroProps {
  content: Pick<
    AboutPageContent,
    | "label"
    | "headline"
    | "headlineAccent"
    | "headlineSuffix"
    | "pillarsLabel"
    | "pillars"
    | "intro"
  >;
  metrics: AboutMetric[];
}

const GROUNDING_IMAGE =
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1920&h=800&fit=crop";

/**
 * Editorial About hero: light heritage layout, impact metrics, and grounding image.
 */
export function AboutHero({ content, metrics }: AboutHeroProps) {
  return (
    <>
      <section className="overflow-hidden bg-background pt-6 sm:pt-10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-accent">
                  {content.label}
                </span>
                <span className="h-px w-12 bg-accent/40" aria-hidden="true" />
              </motion.div>

              <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl xl:text-7xl">
                <motion.span
                  className="inline"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {content.headline}{" "}
                </motion.span>
                <br className="hidden md:block" />
                <motion.span
                  className="italic text-accent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.22 }}
                >
                  {content.headlineAccent}
                </motion.span>{" "}
                <motion.span
                  className="inline"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.32 }}
                >
                  {content.headlineSuffix}
                </motion.span>
              </h1>
            </div>

            <motion.aside
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="border-l-2 border-accent/20 py-2 pl-6">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {content.pillarsLabel}
                </p>
                <ul className="space-y-1.5 text-sm font-semibold uppercase tracking-wider text-foreground">
                  {content.pillars.map((pillar) => (
                    <li key={pillar}>{pillar}</li>
                  ))}
                </ul>
              </div>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                {content.intro}
              </p>
            </motion.aside>
          </div>

          <motion.div
            className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-10 text-center md:mt-20 md:grid-cols-4 md:gap-0 md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            aria-labelledby="about-metrics-heading"
          >
            <h2 id="about-metrics-heading" className="sr-only">
              Our impact in numbers
            </h2>
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={cn(
                  "flex flex-col",
                  index > 0 && "md:border-l md:border-border md:pl-8",
                )}
              >
                <span className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  {metric.value}
                </span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-accent">
                  {metric.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:-mt-4 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
        <motion.div
          className="aspect-[21/9] overflow-hidden rounded-sm shadow-lift lg:grayscale transition-all duration-1000 hover:grayscale-0"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <Image
            src={GROUNDING_IMAGE}
            alt="Editorial humanitarian photography from foundation outreach"
            width={1920}
            height={800}
            priority
            className="h-full w-full object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </motion.div>
      </section>
    </>
  );
}
