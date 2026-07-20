import Image from "next/image";
import { Quote } from "lucide-react";
import { AnimatedSection } from "@/components/ui";
import type { Testimonial } from "@/lib/types";

export interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

/**
 * Featured single-testimonial section.
 */
export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  const featured = testimonials[0];

  if (!featured) return null;

  return (
    <section
      className="bg-muted py-20 sm:py-28"
      aria-labelledby="testimonials-heading"
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

        <blockquote className="mx-auto mt-6 max-w-3xl">
          <p className="font-display text-2xl italic leading-snug text-primary sm:text-3xl lg:text-[2.625rem] lg:leading-[1.25]">
            &ldquo;{featured.quote}&rdquo;
          </p>
          <footer className="mt-10 flex flex-col items-center">
            <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-full grayscale">
              <Image
                src={featured.avatar}
                alt={`Portrait of ${featured.name}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <cite className="not-italic font-sans text-sm font-semibold uppercase tracking-wider text-primary">
              {featured.name}
            </cite>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
              {featured.role}
            </p>
          </footer>
        </blockquote>
      </AnimatedSection>
    </section>
  );
}
