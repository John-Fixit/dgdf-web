"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { LeadershipMember } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface FounderLeadersProps {
  label: string;
  headline: string;
  intro: string;
  leaders: LeadershipMember[];
}

/**
 * Meet Our Leaders — alternating full-width profiles (President image right, Secretary image left).
 */
export function FounderLeaders({
  label,
  headline,
  intro,
  leaders,
}: FounderLeadersProps) {
  if (leaders.length === 0) return null;

  return (
    <section
      className="overflow-hidden bg-background pt-6 sm:pt-10"
      aria-labelledby="founder-leaders-heading"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex items-center justify-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-accent">
              {label}
            </span>
            <span className="h-px w-12 bg-accent/40" aria-hidden="true" />
          </div>
          <h1
            id="founder-leaders-heading"
            className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl"
          >
            {headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {intro}
          </p>
        </motion.div>

        <ul className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
          {leaders.map((leader, index) => {
            const imageOnRight = index % 2 === 0;

            return (
              <motion.li
                key={leader.id}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: 0.05 }}
              >
                <div
                  className={cn(
                    "relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-soft sm:aspect-[5/6]",
                    imageOnRight ? "lg:order-2" : "lg:order-1"
                  )}
                >
                  <Image
                    src={leader.photo}
                    alt={`Portrait of ${leader.name}, ${leader.role}`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div
                  className={cn(
                    imageOnRight ? "lg:order-1" : "lg:order-2"
                  )}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
                    {leader.role}
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                    {leader.name}
                  </h2>
                  <div
                    className="mt-5 h-[2.5px] w-14 bg-accent"
                    aria-hidden="true"
                  />
                  <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-loose">
                    {leader.bio}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
