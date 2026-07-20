"use client";

import type { ReactNode } from "react";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatedSection,
  Button,
  Card,
  CardContent,
  Input,
  Label,
  Textarea,
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

const fieldClassName =
  "h-auto rounded-none border-0 border-b border-border bg-transparent px-0 py-2 shadow-none focus-visible:border-primary focus-visible:ring-0";

/**
 * Two-column contact section — message form, office details, and social links.
 */
export function ContactForm({ content }: ContactFormProps) {
  const { inquiryOptions, details } = content;
  const {
    form,
    isSubmitting,
    isSuccess,
    error,
    handleChange,
    handleSubmit,
  } = useContactForm(inquiryOptions[0] ?? "General Inquiry");

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

                <form
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  noValidate
                >
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <FieldGroup
                      htmlFor="contact-name"
                      label="Full Name"
                    >
                      <Input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange("name")}
                        autoComplete="name"
                        className={fieldClassName}
                      />
                    </FieldGroup>

                    <FieldGroup
                      htmlFor="contact-email"
                      label="Email Address"
                    >
                      <Input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleChange("email")}
                        autoComplete="email"
                        className={fieldClassName}
                      />
                    </FieldGroup>
                  </div>

                  <FieldGroup
                    htmlFor="contact-inquiry"
                    label="Inquiry Type"
                  >
                    <select
                      id="contact-inquiry"
                      value={form.inquiryType}
                      onChange={handleChange("inquiryType")}
                      className={cn(
                        fieldClassName,
                        "w-full cursor-pointer appearance-none bg-transparent py-2 text-sm text-foreground focus:outline-none"
                      )}
                    >
                      {inquiryOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </FieldGroup>

                  <FieldGroup
                    htmlFor="contact-message"
                    label="Your Message"
                  >
                    <Textarea
                      id="contact-message"
                      required
                      rows={5}
                      placeholder="How can we help you today?"
                      value={form.message}
                      onChange={handleChange("message")}
                      className={cn(
                        fieldClassName,
                        "min-h-[140px] resize-none"
                      )}
                    />
                  </FieldGroup>

                  {error ? (
                    <p className="text-sm text-destructive" role="alert">
                      {error}
                    </p>
                  ) : null}
                  {isSuccess ? (
                    <p className="text-sm text-primary" role="status">
                      Thank you! Your message has been sent. We will be in
                      touch soon.
                    </p>
                  ) : null}

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      className="w-full uppercase tracking-widest md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
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
                {SOCIAL_LINKS.map((social) => {
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

function FieldGroup({
  htmlFor,
  label,
  children,
}: {
  htmlFor: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor} className={labelClassName}>
        {label}
      </Label>
      {children}
    </div>
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

function DetailLine({
  icon,
  line,
}: {
  icon: ContactDetailIcon;
  line: string;
}) {
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
