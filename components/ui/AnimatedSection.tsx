"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "header" | "footer" | "li";
}

/** Stable motion tags — never recreate with motion.create() during render. */
const motionTags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  li: motion.li,
} as const;

/**
 * Fades in and slides up when scrolled into view.
 * Uses initial={false} so SSR content is never painted invisible.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  as = "div",
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={cn(className)}>{children}</Tag>;
  }

  const MotionTag = motionTags[as];

  return (
    <MotionTag
      className={cn(className)}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </MotionTag>
  );
}
