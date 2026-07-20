import { AnimatedSection, SectionLabel } from "@/components/ui";

export interface PartnersSectionProps {
  partners: readonly string[];
}

/**
 * Trusted partners logo strip.
 */
export function PartnersSection({ partners }: PartnersSectionProps) {
  return (
    <section
      className="border-b border-border bg-card py-14 sm:py-16"
      aria-labelledby="partners-heading"
    >
      <AnimatedSection className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionLabel
          tone="navy"
          className="mx-auto mb-10 block text-center text-foreground/50"
        >
          Trusted Partners &amp; Supporters
        </SectionLabel>
        <h2 id="partners-heading" className="sr-only">
          Our partners
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-60 grayscale sm:gap-x-16">
          {partners.map((partner) => (
            <li key={partner}>
              <span className="font-display text-xl font-semibold text-primary sm:text-[1.75rem]">
                {partner}
              </span>
            </li>
          ))}
        </ul>
      </AnimatedSection>
    </section>
  );
}
