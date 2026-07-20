import { AnimatedSection } from "@/components/ui";

export interface AboutQuoteProps {
  quote: string;
}

/**
 * Editorial pull-quote break between mission and history.
 */
export function AboutQuote({ quote }: AboutQuoteProps) {
  return (
    <section
      className="bg-background py-20 sm:py-28"
      aria-label="Foundation quote"
    >
      <AnimatedSection className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 h-px w-16 bg-accent" aria-hidden="true" />
        <blockquote className="font-display text-3xl italic leading-tight text-primary sm:text-4xl md:text-[42px] md:leading-[1.25]">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="mx-auto mt-10 h-px w-16 bg-accent" aria-hidden="true" />
      </AnimatedSection>
    </section>
  );
}
