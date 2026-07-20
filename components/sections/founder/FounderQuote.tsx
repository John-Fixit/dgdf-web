import { AnimatedSection } from "@/components/ui";

export interface FounderQuoteProps {
  quote: string;
  attribution: string;
}

/**
 * Pull-quote attributed to the founder.
 */
export function FounderQuote({ quote, attribution }: FounderQuoteProps) {
  return (
    <section
      className="bg-background py-20 sm:py-28"
      aria-label="Founder quote"
    >
      <AnimatedSection className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 h-px w-16 bg-accent" aria-hidden="true" />
        <blockquote className="font-display text-3xl italic leading-tight text-primary sm:text-4xl md:text-[42px] md:leading-[1.25]">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <cite className="mt-8 block text-sm font-semibold not-italic uppercase tracking-[0.2em] text-muted-foreground">
          — {attribution}
        </cite>
        <div className="mx-auto mt-10 h-px w-16 bg-accent" aria-hidden="true" />
      </AnimatedSection>
    </section>
  );
}
