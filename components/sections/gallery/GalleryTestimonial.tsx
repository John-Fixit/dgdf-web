import Image from "next/image";
import { AnimatedSection, Card, CardContent } from "@/components/ui";
import type { Testimonial } from "@/lib/types";

export interface GalleryTestimonialProps {
  testimonial: Testimonial;
}

/**
 * Featured quote card with overlapping circular portrait — gallery page.
 */
export function GalleryTestimonial({ testimonial }: GalleryTestimonialProps) {
  return (
    <section
      className="bg-background py-16 sm:py-20 lg:py-24"
      aria-labelledby="gallery-testimonial-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="gallery-testimonial-heading" className="sr-only">
          Voices from the community
        </h2>

        <AnimatedSection>
          <div className="relative mx-auto max-w-3xl pt-14 md:max-w-4xl md:pl-16 md:pt-0 lg:pl-20">
            <div className="absolute z-10 top-0 left-1/2 h-28 w-28 -translate-x-1/2 sm:h-32 sm:w-32 md:left-0 md:right-auto md:top-1/2 md:h-36 md:w-36 md:translate-x-0 md:-translate-y-1/2 lg:h-40 lg:w-40">
              <div className="relative h-full w-full overflow-hidden rounded-full border-[6px] border-card shadow-lift sm:border-8">
                <Image
                  src={testimonial.avatar}
                  alt={`Portrait of ${testimonial.name}`}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
            </div>

            <Card className="border-none bg-primary text-primary-foreground shadow-lift">
              <CardContent className="px-8 pb-10 pt-16 sm:px-12 sm:pb-12 sm:pt-20 md:py-14 md:pl-28 md:pr-12 lg:pl-32 lg:pr-14">
                <blockquote>
                  <span
                    className="font-display text-5xl leading-none text-accent sm:text-6xl"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  <p className="mt-2 font-display text-xl leading-snug text-white/90 sm:text-2xl lg:text-[1.75rem] lg:leading-snug">
                    {testimonial.quote}
                  </p>
                  <footer className="mt-8">
                    <cite className="not-italic text-base font-bold text-white">
                      {testimonial.name}
                    </cite>
                    <p className="mt-1 text-sm text-white/70">
                      {testimonial.role}
                    </p>
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
