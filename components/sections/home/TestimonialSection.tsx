"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { AnimatedSection } from "@/components/ui";
import type { Testimonial } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

const MAX_SLIDES = 3;
const AUTO_ADVANCE_MS = 7000;

/**
 * Horizontal slide carousel — keeps the featured testimonial design, up to 3 slides.
 */
export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  const slides = testimonials.slice(0, MAX_SLIDES);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (nextIndex: number, dir: number) => {
      if (slides.length <= 1) return;
      setDirection(dir);
      setIndex(((nextIndex % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  const goNext = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % slides.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const active = slides[index];

  return (
    <section
      className="bg-muted py-20 sm:py-28"
      aria-labelledby="testimonials-heading"
      aria-roledescription="carousel"
    >
      <AnimatedSection className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Quote
          className="mx-auto h-12 w-12 text-accent"
          strokeWidth={1.25}
          aria-hidden="true"
        />
        <h2 id="testimonials-heading" className="sr-only">
          Stories of hope
        </h2>

        <div className="relative mx-auto mt-6 max-w-3xl overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={active.id}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 48 : -48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -48 : 48 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              aria-live="polite"
            >
              <p className="font-display text-2xl italic leading-snug text-primary sm:text-3xl lg:text-[2.625rem] lg:leading-[1.25]">
                &ldquo;{active.quote}&rdquo;
              </p>
              <footer className="mt-10 flex flex-col items-center">
                <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-full grayscale">
                  <Image
                    src={active.avatar}
                    alt={`Portrait of ${active.name}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <cite className="not-italic font-sans text-sm font-semibold uppercase tracking-wider text-primary">
                  {active.name}
                </cite>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
                  {active.role}
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {slides.length > 1 ? (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-primary transition hover:border-accent hover:text-accent"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial slides">
              {slides.map((slide, slideIndex) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={slideIndex === index}
                  aria-label={`Show testimonial ${slideIndex + 1}`}
                  onClick={() => goTo(slideIndex, slideIndex > index ? 1 : -1)}
                  className={cn(
                    "h-2.5 rounded-full transition-all",
                    slideIndex === index
                      ? "w-8 bg-accent"
                      : "w-2.5 bg-primary/20 hover:bg-primary/40"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-primary transition hover:border-accent hover:text-accent"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </AnimatedSection>
    </section>
  );
}
