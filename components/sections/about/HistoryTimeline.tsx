import { AnimatedSection, SectionLabel } from "@/components/ui";
import type { TimelineMilestone } from "@/lib/types";

export interface HistoryTimelineProps {
  label: string;
  headline: string;
  milestones: TimelineMilestone[];
}

/**
 * Alternating editorial timeline of foundation milestones.
 */
export function HistoryTimeline({
  label,
  headline,
  milestones,
}: HistoryTimelineProps) {
  return (
    <section
      className="bg-card py-20 sm:py-28"
      aria-labelledby="journey-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-14 sm:mb-16">
          <SectionLabel>{label}</SectionLabel>
          <h2
            id="journey-heading"
            className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl lg:text-5xl"
          >
            {headline}
          </h2>
        </AnimatedSection>

        <div className="relative">
          <div
            className="absolute bottom-0 left-4 top-0 w-px bg-border md:left-1/2 md:-ml-px"
            aria-hidden="true"
          />

          <ol className="relative space-y-16 sm:space-y-20 md:space-y-24">
            {milestones.map((milestone, index) => {
              const isYearRight = index % 2 === 1;

              return (
                <AnimatedSection
                  key={milestone.id}
                  delay={index * 0.08}
                  as="li"
                  className="relative grid grid-cols-[auto_1fr] gap-x-6 md:grid-cols-[1fr_auto_1fr] md:gap-x-0 md:items-center"
                >
                  {/* Mobile marker */}
                  <div
                    className="relative z-10 mt-2 h-3 w-3 shrink-0 rounded-full bg-accent outline outline-8 outline-surface md:hidden"
                    aria-hidden="true"
                  />

                  {/* Left column (desktop) */}
                  <div className="col-start-2 md:col-start-1 md:pr-16 md:text-right">
                    {isYearRight ? (
                      <p className="hidden leading-relaxed text-foreground/70 md:block">
                        {milestone.description}
                      </p>
                    ) : (
                      <MilestoneHeading
                        year={milestone.year}
                        title={milestone.title}
                      />
                    )}
                  </div>

                  {/* Desktop center marker */}
                  <div
                    className="relative z-10 mx-auto hidden h-3 w-3 shrink-0 rounded-full bg-accent outline outline-8 outline-surface md:block"
                    aria-hidden="true"
                  />

                  {/* Right column (desktop) + mobile body */}
                  <div className="col-start-2 mt-3 md:col-start-3 md:mt-0 md:pl-16">
                    {isYearRight ? (
                      <MilestoneHeading
                        year={milestone.year}
                        title={milestone.title}
                      />
                    ) : (
                      <p className="leading-relaxed text-foreground/70">
                        {milestone.description}
                      </p>
                    )}

                    {/* On mobile, year-right items still need description below heading */}
                    {isYearRight && (
                      <p className="mt-3 leading-relaxed text-foreground/70 md:hidden">
                        {milestone.description}
                      </p>
                    )}
                  </div>
                </AnimatedSection>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function MilestoneHeading({ year, title }: { year: string; title: string }) {
  return (
    <>
      <span className="font-display text-3xl font-semibold text-primary sm:text-4xl">
        {year}
      </span>
      <h3 className="mt-1 text-sm font-semibold uppercase tracking-widest text-accent">
        {title}
      </h3>
    </>
  );
}
