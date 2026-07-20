import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  AnimatedSection,
  Card,
  CardContent,
  SectionLabel,
} from "@/components/ui";
import type { Program } from "@/lib/types";

export interface ProgramsSectionProps {
  programs: Program[];
}

/**
 * Three-column humanitarian programs grid with premium cards.
 */
export function ProgramsSection({ programs }: ProgramsSectionProps) {
  return (
    <section
      className="bg-background py-20 sm:py-28"
      aria-labelledby="programs-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Our Pillars</SectionLabel>
            <h2
              id="programs-heading"
              className="mt-3 font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-5xl"
            >
              Focused Humanitarian Efforts
            </h2>
          </div>
          <Link
            href="/about"
            className="text-sm font-semibold tracking-wide text-primary underline decoration-primary/40 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent"
          >
            View All Programs
          </Link>
        </AnimatedSection>

        <ul className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {programs.map((program, index) => (
            <AnimatedSection key={program.id} delay={index * 0.1} as="li">
              <Card className="group h-full overflow-hidden hover:shadow-lift">
                <Link href={program.href} className="block h-full">
                  <div className="relative h-56 overflow-hidden sm:h-64">
                    <Image
                      src={program.imageUrl}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-7 sm:p-8">
                    <SectionLabel className="mb-3">{program.category}</SectionLabel>
                    <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-primary">
                      {program.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {program.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary transition-transform duration-300 group-hover:translate-x-1.5">
                      Read More
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </CardContent>
                </Link>
              </Card>
            </AnimatedSection>
          ))}
        </ul>
      </div>
    </section>
  );
}
