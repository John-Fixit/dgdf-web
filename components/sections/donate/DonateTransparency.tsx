import Image from "next/image";
import { AnimatedSection, SectionLabel } from "@/components/ui";
import type { DonatePageContent } from "@/lib/types";

export interface DonateTransparencyProps {
  content: Pick<
    DonatePageContent,
    | "transparencyLabel"
    | "transparencyHeadline"
    | "transparencyBody"
    | "transparencyImageUrl"
    | "transparencyImageAlt"
    | "transparencyStats"
  >;
}

/**
 * Transparency messaging with documentary imagery and key impact figures.
 */
export function DonateTransparency({ content }: DonateTransparencyProps) {
  return (
    <section
      className="bg-background py-16 sm:py-20 lg:py-28"
      aria-labelledby="transparency-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <AnimatedSection>
            <div className="relative h-80 overflow-hidden rounded-2xl editorial-shadow sm:h-96">
              <Image
                src={content.transparencyImageUrl}
                alt={content.transparencyImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.12} className="space-y-4 sm:px-2 lg:px-4">
            <SectionLabel>{content.transparencyLabel}</SectionLabel>
            <h2
              id="transparency-heading"
              className="font-display text-3xl font-semibold text-primary sm:text-4xl lg:text-5xl"
            >
              {content.transparencyHeadline}
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-foreground/70 sm:text-lg">
              {content.transparencyBody}
            </p>

            <dl className="flex flex-wrap gap-8 pt-4 sm:gap-12">
              {content.transparencyStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-3xl font-bold text-primary sm:text-4xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
