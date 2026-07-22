"use client";

import {
  Clock,
  Facebook,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  Twitter,
  UserRound,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatedSection,
  Button,
  Card,
  CardContent,
  FieldInput,
  FieldSelect,
  FieldTextarea,
} from "@/components/ui";
import { useContactForm } from "@/hooks";
import { SOCIAL_LINKS } from "@/lib/constants";
import type {
  ContactDetailIcon,
  ContactDetailItem,
  ContactPageContent,
  SocialLink,
} from "@/lib/types";
import { cn } from "@/lib/utils";

export interface ContactFormProps {
  content: Pick<ContactPageContent, "inquiryOptions" | "details">;
  /** Social profiles from site settings (falls back to constants) */
  socialLinks?: SocialLink[];
}

const iconMap: Record<ContactDetailIcon, LucideIcon> = {
  location: MapPin,
  mail: Mail,
  phone: Phone,
  schedule: Clock,
};

const socialIcons: Record<SocialLink["platform"], LucideIcon> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
};

const labelClassName =
  "text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(42_85%_28%)]";

/**
 * Two-column contact section — modern form fields, office details, and social links.
 */
export function ContactForm({ content, socialLinks }: ContactFormProps) {
  const { inquiryOptions, details } = content;
  const links =
    socialLinks && socialLinks.length > 0 ? socialLinks : SOCIAL_LINKS;

  const { form, isSubmitting, error, setField, handleSubmit } = useContactForm(
    inquiryOptions[0] ?? "General Inquiry"
  );

  return (
    <section
      className="bg-background pb-20 sm:pb-28"
      aria-labelledby="contact-form-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
          <AnimatedSection className="lg:col-span-7">
            <Card className="border-border/60 shadow-soft">
              <CardContent className="p-8 sm:p-10">
                <h2 id="contact-form-heading" className="sr-only">
                  Send us a message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <FieldInput
                      id="contact-name"
                      label="Full Name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(event) => setField("name", event.target.value)}
                      isRequired
                      autoComplete="name"
                      startContent={<UserRound className="h-4 w-4" />}
                    />

                    <FieldInput
                      id="contact-email"
                      type="email"
                      label="Email Address"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(event) =>
                        setField("email", event.target.value)
                      }
                      isRequired
                      autoComplete="email"
                      startContent={<Mail className="h-4 w-4" />}
                    />
                  </div>

                  <FieldSelect
                    id="contact-inquiry"
                    label="Inquiry Type"
                    value={form.inquiryType}
                    onChange={(event) =>
                      setField("inquiryType", event.target.value)
                    }
                    options={inquiryOptions}
                  />

                  <FieldTextarea
                    id="contact-message"
                    label="Your Message"
                    placeholder="How can we help you today?"
                    value={form.message}
                    onChange={(event) =>
                      setField("message", event.target.value)
                    }
                    isRequired
                    rows={5}
                    startContent={<MessageSquareText className="h-4 w-4" />}
                  />

                  {error ? (
                    <p className="text-sm text-destructive" role="alert">
                      {error}
                    </p>
                  ) : null}

                  <div className="pt-1">
                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      className="h-12 w-full rounded-xl font-semibold uppercase tracking-[0.14em] sm:w-auto sm:min-w-[200px]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2
                            className="mr-2 h-4 w-4 animate-spin"
                            aria-hidden
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" aria-hidden />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>

          <AnimatedSection delay={0.12} className="lg:col-span-5 lg:pl-4">
            <ul className="space-y-10">
              {details.map((detail) => (
                <ContactDetailRow key={detail.id} detail={detail} />
              ))}
            </ul>

            <div className="mt-12 rounded-2xl bg-primary p-8 text-primary-foreground sm:p-10">
              <h3 className="font-sans text-xl font-bold tracking-tight text-white sm:text-2xl">
                Connect With Us
              </h3>
              <ul className="mt-6 flex flex-wrap gap-3">
                {links.map((social) => {
                  const Icon = socialIcons[social.platform];
                  return (
                    <li key={social.platform}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function ContactDetailRow({ detail }: { detail: ContactDetailItem }) {
  const Icon = iconMap[detail.icon];

  return (
    <li className="flex gap-4">
      <Icon
        className="mt-1 h-7 w-7 shrink-0 text-accent"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <div>
        <h3 className={cn("mb-2", labelClassName)}>{detail.title}</h3>
        <p className="text-base leading-relaxed text-foreground">
          {detail.lines.map((line, index) => (
            <span key={line}>
              <DetailLine icon={detail.icon} line={line} />
              {index < detail.lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
      </div>
    </li>
  );
}

function DetailLine({ icon, line }: { icon: ContactDetailIcon; line: string }) {
  if (icon === "mail") {
    return (
      <a
        href={`mailto:${line}`}
        className="transition-colors hover:text-primary"
      >
        {line}
      </a>
    );
  }

  if (icon === "phone") {
    return (
      <a
        href={`tel:${line.replace(/[^\d+]/g, "")}`}
        className="transition-colors hover:text-primary"
      >
        {line}
      </a>
    );
  }

  return line;
}
