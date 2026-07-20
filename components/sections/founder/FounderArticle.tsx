import { AnimatedSection, SectionLabel } from "@/components/ui";

export interface FounderArticleProps {
  label: string;
  headline: string;
  paragraphs: string[];
}

/**
 * Long-form founder biography in a focused reading layout.
 */
export function FounderArticle({
  label,
  headline,
  paragraphs,
}: FounderArticleProps) {
  return (
    <section
      className="bg-muted py-20 sm:py-28"
      aria-labelledby="founder-article-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <AnimatedSection>
            <SectionLabel>{label}</SectionLabel>
            <h2
              id="founder-article-heading"
              className="mt-2 font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-5xl"
            >
              {headline}
            </h2>
            <div
              className="mt-6 h-[2.5px] w-14 bg-accent"
              aria-hidden="true"
            />
          </AnimatedSection>

          <div className="mt-10 space-y-6 sm:mt-12 sm:space-y-8">
            {paragraphs.map((paragraph, index) => (
              <AnimatedSection key={paragraph.slice(0, 32)} delay={index * 0.08}>
                <p className="text-base leading-loose text-foreground/75 sm:text-lg">
                  {paragraph}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
