import Link from "next/link";
import { AnimatedSection, Button } from "@/components/ui";

/**
 * Closing CTA for the gallery page — invite to donate or volunteer.
 */
export function GalleryCta() {
  return (
    <section
      className="relative overflow-hidden bg-primary py-20 text-white sm:py-28"
      aria-labelledby="gallery-cta-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-10 dot-pattern"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <h2
            id="gallery-cta-heading"
            className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Be Part of the Next Chapter
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/75 sm:text-lg">
            Your support allows us to continue documenting and creating these
            stories of transformation. Every donation directly funds our next
            outreach.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-4">
            <Button asChild size="lg" variant="primary" className="w-full px-8 sm:w-auto">
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-white/40 px-8 text-white hover:border-white hover:bg-white hover:text-primary sm:w-auto"
            >
              <Link href="/contact">Join as Volunteer</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
