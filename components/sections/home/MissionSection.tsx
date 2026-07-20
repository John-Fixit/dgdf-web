import { AnimatedSection, SectionLabel } from "@/components/ui";

export interface MissionSectionProps {
  headline: string;
  mandateQuote: string;
}

/**
 * Centered mandate overview with editorial pull quote.
 */
export function MissionSection({ headline, mandateQuote }: MissionSectionProps) {
  return (
    <section
      className="bg-muted py-20 sm:py-28"
      aria-labelledby="mandate-heading"
    >
      <AnimatedSection className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <SectionLabel>Our Mandate</SectionLabel>
        <h2
          id="mandate-heading"
          className="mx-auto mt-3 max-w-3xl font-display text-3xl font-semibold text-primary sm:text-4xl lg:text-5xl"
        >
          {headline}
        </h2>
        <div
          className="mx-auto mt-6 h-1 w-24 bg-accent"
          aria-hidden="true"
        />
        <blockquote className="mx-auto mt-8 max-w-4xl">
          <p className="font-display text-2xl italic leading-snug text-foreground sm:text-3xl lg:text-[2.625rem] lg:leading-[1.25]">
            &ldquo;{mandateQuote}&rdquo;
          </p>
        </blockquote>
      </AnimatedSection>
    </section>
  );
}
