import Link from "next/link";
import { AnimatedSection, Button } from "@/components/ui";

export interface AboutCtaSectionProps {
  headline: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
  primaryHref?: string;
  secondaryHref?: string;
}

/**
 * Navy call-to-action inviting support and contact.
 */
export function AboutCtaSection({
  headline,
  body,
  primaryLabel,
  secondaryLabel,
  primaryHref = "/donate",
  secondaryHref = "/contact",
}: AboutCtaSectionProps) {
  return (
    <section
      className="relative overflow-hidden bg-primary py-20 sm:py-28"
      aria-labelledby="about-cta-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-10 dot-pattern"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:gap-12">
          <div className="max-w-2xl text-center lg:text-left">
            <h2
              id="about-cta-heading"
              className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {headline}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80">{body}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Button
              asChild
              size="lg"
              className="w-full bg-white px-8 text-primary shadow-lift hover:bg-accent hover:text-accent-foreground sm:w-auto"
            >
              <Link href={primaryHref}>{primaryLabel}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-white/35 px-8 text-white hover:border-white hover:bg-white hover:text-primary sm:w-auto"
            >
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
