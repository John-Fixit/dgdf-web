import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: `The page you are looking for could not be found on ${SITE_NAME}.`,
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

/**
 * Friendly 404 page with a link back home.
 */
export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-display text-7xl font-semibold text-accent">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base text-muted-foreground">
        The page you are looking for may have moved, or it never existed. Let us
        guide you back to {SITE_NAME}.
      </p>
      <div className="mt-8">
        <Button asChild variant="primary" size="lg">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </section>
  );
}
