"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatedSection, Button, SectionLabel } from "@/components/ui";
import type { LeadershipMember } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface LeadershipSectionProps {
  label: string;
  headline: string;
  leaders: LeadershipMember[];
}

/**
 * Horizontal executive leadership showcase with scroll assist and nav buttons.
 */
export function LeadershipSection({
  label,
  headline,
  leaders,
}: LeadershipSectionProps) {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
  }, []);

  const scrollByCard = useCallback((direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector("li");
    const amount = card
      ? card.getBoundingClientRect().width + 16
      : container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateScrollState();

    const onWheel = (event: WheelEvent) => {
      if (window.innerWidth < 1024) return;
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScrollLeft = scrollWidth - clientWidth;
      const atStart = scrollLeft <= 0;
      const atEnd = scrollLeft >= maxScrollLeft - 1;
      const scrollingLeft = event.deltaY < 0;
      const scrollingRight = event.deltaY > 0;

      if ((atStart && scrollingLeft) || (atEnd && scrollingRight)) return;

      event.preventDefault();
      container.scrollLeft += event.deltaY;
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, leaders.length]);

  return (
    <section
      className="overflow-hidden bg-background py-20 sm:py-28"
      aria-labelledby="leadership-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-6 sm:mb-14">
          <AnimatedSection>
            <SectionLabel>{label}</SectionLabel>
            <h2
              id="leadership-heading"
              className="mt-2 font-display text-3xl font-semibold text-primary sm:text-4xl lg:text-5xl"
            >
              {headline}
            </h2>
          </AnimatedSection>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label="Previous leaders"
              disabled={!canScrollLeft}
              onClick={() => scrollByCard("left")}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-primary transition-colors",
                canScrollLeft
                  ? "hover:border-accent hover:bg-accent hover:text-accent-foreground"
                  : "cursor-not-allowed opacity-40",
              )}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next leaders"
              disabled={!canScrollRight}
              onClick={() => scrollByCard("right")}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-primary transition-colors",
                canScrollRight
                  ? "hover:border-accent hover:bg-accent hover:text-accent-foreground"
                  : "cursor-not-allowed opacity-40",
              )}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul
          ref={scrollRef}
          className="flex flex-nowrap gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden"
        >
          {leaders.map((leader, index) => (
            <AnimatedSection
              key={leader.id}
              delay={index * 0.1}
              as="li"
              className="group w-[min(340px,80vw)] shrink-0 md:w-[400px]"
            >
              <article className="overflow-hidden">
                <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-soft">
                  <Image
                    src={leader.photo}
                    alt={`Portrait of ${leader.name}`}
                    fill
                    className="object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                    sizes="(max-width: 768px) 80vw, 400px"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/90 via-dark/70 to-transparent pt-24"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-accent">
                      {leader.role}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-semibold text-white sm:text-[28px]">
                      {leader.name}
                    </h3>
                  </div>
                </div>
                <div className="relative space-y-4 px-6 pt-1">
                  <div
                    className="absolute left-2.5 top-0 h-[2.5px] w-14 bg-accent"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute right-2.5 bottom-0 h-[2.5px] w-14 bg-accent"
                    aria-hidden="true"
                  />

                  <p className="relative max-w-[320px] text-sm leading-relaxed text-foreground/70">
                    {leader.bio}
                  </p>

                  {leader.href ? (
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="group/link -ml-2 h-auto px-2 py-1.5 text-accent hover:bg-transparent hover:text-primary"
                    >
                      <Link href={leader.href}>
                        Meet the Founder
                        <ArrowRight
                          className="ml-1.5 h-4 w-4 transition-transform group-hover/link:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                  ) : null}
                </div>
              </article>
            </AnimatedSection>
          ))}
        </ul>
      </div>
    </section>
  );
}
