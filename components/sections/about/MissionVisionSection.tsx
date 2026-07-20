import { AnimatedSection, Card, CardContent } from "@/components/ui";

export interface MissionVisionSectionProps {
  missionTitle: string;
  missionBody: string;
  visionTitle: string;
  visionBody: string;
}

/**
 * Mission and vision statements in a refined two-column layout.
 */
export function MissionVisionSection({
  missionTitle,
  missionBody,
  visionTitle,
  visionBody,
}: MissionVisionSectionProps) {
  return (
    <section
      className="bg-muted py-20 sm:py-28"
      aria-labelledby="mission-vision-heading"
    >
      <h2 id="mission-vision-heading" className="sr-only">
        Mission and vision
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <AnimatedSection>
            <Card className="h-full p-8 sm:p-10">
              <CardContent className="p-0">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3l1.8 5.5H19l-4.4 3.2 1.7 5.3L12 13.8 7.7 17l1.7-5.3L5 8.5h5.2L12 3z"
                      />
                    </svg>
                  </span>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                    {missionTitle}
                  </h3>
                </div>
                <p className="text-base leading-loose text-muted-foreground sm:text-lg">
                  {missionBody}
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <Card className="h-full p-8 sm:p-10">
              <CardContent className="p-0">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12z"
                      />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                  </span>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
                    {visionTitle}
                  </h3>
                </div>
                <p className="text-base leading-loose text-muted-foreground sm:text-lg">
                  {visionBody}
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
