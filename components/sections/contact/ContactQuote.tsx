import { AnimatedSection } from "@/components/ui";

export interface ContactQuoteProps {
  quote: string;
}

/**
 * Soft pull-quote break below the contact form.
 */
export function ContactQuote({ quote }: ContactQuoteProps) {
  return (
    <section
      className="border-t border-border/60 bg-muted py-20 sm:py-28"
      aria-label="Foundation quote"
    >
      <AnimatedSection className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <blockquote className="font-display text-3xl italic leading-tight text-muted-foreground/50 sm:text-4xl md:text-[42px] md:leading-[1.25]">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </AnimatedSection>
    </section>
  );
}
