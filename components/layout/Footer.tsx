import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import {
  CONTACT_INFO,
  SITE_NAME,
  SOCIAL_LINKS,
} from "@/lib/constants";

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
} as const;

const QUICK_LINKS = [
  { href: "/about", label: "About Our Mission" },
  { href: "/gallery", label: "Our Outreach Gallery" },
  { href: "/donate", label: "Impact Reports" },
  { href: "/contact", label: "Contact Us" },
] as const;

/**
 * Site footer with quick links, contact details, and social icons.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-muted">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-2xl font-semibold tracking-tight text-primary">
            {SITE_NAME}
          </p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A premium humanitarian foundation registered in Nigeria, committed
            to high-impact interventions across Africa.
          </p>
          <ul className="mt-6 flex gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = socialIcons[social.platform];
              return (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-card text-primary shadow-soft transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-primary">
            Quick Links
          </h2>
          <ul className="mt-6 space-y-4">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-foreground/70 transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-primary">
            Contact Us
          </h2>
          <address className="mt-6 space-y-4 text-sm not-italic text-foreground/70">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{CONTACT_INFO.address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/[^\d+]/g, "")}`}
                className="transition-colors hover:text-primary"
              >
                {CONTACT_INFO.phone}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="transition-colors hover:text-primary"
              >
                {CONTACT_INFO.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-foreground/50 sm:px-6 md:text-left lg:px-8">
          © {year} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
