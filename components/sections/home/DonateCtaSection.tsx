import Link from "next/link";
import { AnimatedSection, Button } from "@/components/ui";

interface DonateCtaSectionProps {
  headline?: string;
  body?: string;
}

/**
 * Navy donation call-to-action with dual partnership options.
 */
export function DonateCtaSection({
  headline = "Partner With Us in This Divine Mission",
  body = "Your contribution directly funds surgical interventions, school fees, and clean water infrastructure. Be the delight someone is praying for today.",
}: DonateCtaSectionProps) {
  return (
    <section
      className="relative overflow-hidden bg-primary py-20 text-primary-foreground sm:py-28"
      aria-labelledby="donate-cta-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-10 dot-pattern"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <h2
            id="donate-cta-heading"
            className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {headline}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/75">{body}</p>
          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="primary" className="w-full px-10 sm:w-auto">
              <Link href="/donate">One-Time Donation</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full border-white/40 px-10 text-white hover:border-white hover:bg-white hover:text-primary sm:w-auto"
            >
              <Link href="/donate">Monthly Partnership</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
