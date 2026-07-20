"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import type { ImpactStats as ImpactStatsType } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface ImpactStatsProps {
  stats: ImpactStatsType;
}

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  asThousands?: boolean;
  delay?: number;
  className?: string;
}

/**
 * Animates a number counting up when scrolled into view.
 */
function CountUp({
  value,
  label,
  suffix = "",
  asThousands = false,
  delay = 0,
  className,
}: StatItemProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const controls = animate(0, value, {
      duration: 1.6,
      delay,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          const rounded = Math.round(latest);
          ref.current.textContent = asThousands
            ? `${rounded}k+`
            : `${rounded}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [isInView, value, suffix, asThousands, delay]);

  return (
    <div className={cn("px-4 py-8 text-center sm:px-6 sm:py-10", className)}>
      <span
        ref={ref}
        className="font-display text-4xl font-semibold text-primary sm:text-5xl"
      >
        {asThousands ? "0k+" : `0${suffix}`}
      </span>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
        {label}
      </p>
    </div>
  );
}

/**
 * Light impact statistics row with count-up animation.
 */
export function ImpactStats({ stats }: ImpactStatsProps) {
  return (
    <section
      className="bg-card py-16 sm:py-24"
      aria-labelledby="impact-heading"
    >
      <h2 id="impact-heading" className="sr-only">
        Our impact in numbers
      </h2>
      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4">
          <CountUp
            value={Math.round(stats.livesImpacted / 1000)}
            label="Lives Impacted"
            asThousands
            delay={0}
            className="border-b border-r border-border md:border-b-0"
          />
          <CountUp
            value={stats.outreaches}
            label="Outreach Programs"
            delay={0.1}
            className="border-b border-border md:border-b-0 md:border-r"
          />
          <CountUp
            value={stats.volunteers}
            label="Volunteers"
            suffix="+"
            delay={0.2}
            className="border-r border-border"
          />
          <CountUp
            value={stats.successRate}
            label="Efficiency Rate"
            suffix="%"
            delay={0.3}
          />
        </div>
      </motion.div>
    </section>
  );
}
