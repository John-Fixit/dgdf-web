import Image from "next/image";
import { BadgeCheck, LineChart, UsersRound } from "lucide-react";
import { AnimatedSection, SectionLabel } from "@/components/ui";
import type { VisionValue } from "@/lib/types";

export interface VisionSectionProps {
  headline: string;
  callout: string;
  calloutBody: string;
  values: VisionValue[];
  imageUrl?: string;
}

const iconMap = {
  verified: BadgeCheck,
  inclusive: UsersRound,
  growth: LineChart,
} as const;

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&h=1200&fit=crop";

/**
 * Asymmetric vision block with portrait, callout, and value list.
 */
export function VisionSection({
  headline,
  callout,
  calloutBody,
  values,
  imageUrl = DEFAULT_IMAGE,
}: VisionSectionProps) {
  return (
    <section
      className="overflow-hidden bg-card py-20 sm:py-28"
      aria-labelledby="vision-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <AnimatedSection className="relative w-full lg:w-1/2">
            <div className="relative h-[420px] w-full sm:h-[520px] lg:h-[600px]">
              <Image
                src={imageUrl}
                alt="Portrait representing the dignity of the communities we serve"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <aside className="absolute -bottom-10 md:-bottom-8 right-3  md:-right-4 hidde max-w-xs bg-primary p-10 text-white md:block lg:-right-8 rounded-xl">
              <p className="font-display text-2xl leading-snug">{callout}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                {calloutBody}
              </p>
            </aside>
          </AnimatedSection>

          <AnimatedSection
            delay={0.15}
            className="w-full pt-4 lg:w-1/2 lg:pt-0"
          >
            <SectionLabel>Our Vision</SectionLabel>
            <h2
              id="vision-heading"
              className="mt-4 font-display text-3xl font-semibold text-primary sm:text-4xl lg:text-5xl"
            >
              {headline}
            </h2>

            <ul className="mt-10 space-y-8">
              {values.map((value) => {
                const Icon = iconMap[value.icon];
                return (
                  <li key={value.id} className="flex gap-4">
                    <Icon
                      className="mt-0.5 h-8 w-8 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-sans text-base font-semibold text-primary">
                        {value.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                        {value.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Mobile callout (desktop uses absolute overlay) */}
            {/* <aside className="mt-10 bg-primary p-8 text-white md:hidden">
              <p className="font-display text-2xl leading-snug">{callout}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                {calloutBody}
              </p>
            </aside> */}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
