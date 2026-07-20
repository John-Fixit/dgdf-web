"use client";

import { useMemo, useState } from "react";
import {
  CreditCard,
  GraduationCap,
  HandHeart,
  Stethoscope,
} from "lucide-react";
import {
  AnimatedSection,
  Button,
  Card,
  CardContent,
  Input,
  Label,
  SectionLabel,
} from "@/components/ui";
import { DONATE_PRESET_AMOUNTS } from "@/lib/constants";
import type { DonateImpactItem, DonatePageContent } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";

export interface DonationFormProps {
  content: Pick<
    DonatePageContent,
    "impactTitle" | "impactItems" | "impactQuote"
  >;
}

type Frequency = "one-time" | "monthly";

const impactIconMap = {
  nourishment: HandHeart,
  education: GraduationCap,
  health: Stethoscope,
} as const;

/**
 * Two-column donate section — impact messaging and interactive gift form.
 */
export function DonationForm({ content }: DonationFormProps) {
  const [frequency, setFrequency] = useState<Frequency>("one-time");
  const [amount, setAmount] = useState<number>(DONATE_PRESET_AMOUNTS[2]);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedAmount = useMemo(() => {
    if (isCustom) {
      return Number(customAmount) || 0;
    }
    return amount;
  }, [amount, customAmount, isCustom]);

  function selectPreset(value: number) {
    setAmount(value);
    setIsCustom(false);
    setCustomAmount("");
  }

  function selectCustom() {
    setIsCustom(true);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSuccess(false);

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      selectedAmount <= 0
    ) {
      setError("Please enter a valid amount, name, and email.");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSuccess(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setCardNumber("");
      setCustomAmount("");
      setIsCustom(false);
      setAmount(DONATE_PRESET_AMOUNTS[2]);
      setIsAnonymous(false);
    } catch {
      setError("Unable to process your gift right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const submitLabel = isSuccess
    ? "Thank You for Your Generosity"
    : isSubmitting
      ? "Processing..."
      : isCustom && selectedAmount <= 0
        ? "Complete Custom Donation"
        : `Complete Donation of ${formatCurrency(selectedAmount)}`;

  return (
    <section
      className="bg-muted py-16 sm:py-20 lg:py-28"
      aria-labelledby="donation-form-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          <AnimatedSection className="flex flex-col justify-center lg:col-span-5">
            <div>
              <h2
                id="donation-form-heading"
                className="font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-5xl"
              >
                {content.impactTitle}
              </h2>
              <div className="mt-4 h-1 w-20 rounded-full bg-accent" aria-hidden="true" />
            </div>

            <ul className="mt-10 space-y-8">
              {content.impactItems.map((item) => (
                <ImpactItem key={item.id} item={item} />
              ))}
            </ul>

            <blockquote className="mt-10 border-t border-border pt-8">
              <p className="font-display text-2xl leading-snug text-primary sm:text-3xl lg:text-[2.5rem] lg:leading-tight">
                &ldquo;{content.impactQuote}&rdquo;
              </p>
            </blockquote>
          </AnimatedSection>

          <AnimatedSection delay={0.12} className="lg:col-span-7">
            <Card className="overflow-hidden">
              <CardContent className="p-6 sm:p-8 lg:p-10">
                <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                  <div
                    className="mx-auto flex w-fit rounded-xl bg-muted p-1"
                    role="group"
                    aria-label="Donation frequency"
                  >
                    {(["one-time", "monthly"] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFrequency(option)}
                        className={cn(
                          "rounded-lg px-6 py-2.5 text-sm font-semibold tracking-wide transition-all",
                          frequency === option
                            ? "bg-card text-primary shadow-soft"
                            : "text-muted-foreground hover:text-primary"
                        )}
                      >
                        {option === "one-time" ? "One-time" : "Monthly"}
                      </button>
                    ))}
                  </div>

                  <fieldset>
                    <legend>
                      <SectionLabel className="mb-3">
                        Select Amount (NGN)
                      </SectionLabel>
                    </legend>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                      {DONATE_PRESET_AMOUNTS.map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => selectPreset(value)}
                          className={cn(
                            "rounded-xl py-4 text-sm font-semibold transition-all",
                            !isCustom && amount === value
                              ? "border-2 border-accent bg-accent/10 text-primary shadow-glow"
                              : "border border-border text-primary hover:border-accent hover:bg-accent/5"
                          )}
                        >
                          {formatCurrency(value)}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={selectCustom}
                        className={cn(
                          "rounded-xl py-4 text-sm font-semibold transition-all",
                          isCustom
                            ? "border-2 border-accent bg-accent/10 text-primary shadow-glow"
                            : "border border-border text-primary hover:border-accent hover:bg-accent/5"
                        )}
                      >
                        Custom
                      </button>
                    </div>

                    {isCustom ? (
                      <Input
                        id="custom-amount"
                        type="number"
                        min={1000}
                        step={500}
                        value={customAmount}
                        onChange={(event) => setCustomAmount(event.target.value)}
                        className="mt-4"
                        placeholder="Enter custom amount"
                        aria-label="Custom donation amount"
                      />
                    ) : null}
                  </fieldset>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="donor-first-name">First Name</Label>
                      <Input
                        id="donor-first-name"
                        type="text"
                        required
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        placeholder="John"
                        autoComplete="given-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="donor-last-name">Last Name</Label>
                      <Input
                        id="donor-last-name"
                        type="text"
                        required
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        placeholder="Doe"
                        autoComplete="family-name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="donor-email">Email Address</Label>
                    <Input
                      id="donor-email"
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="john@example.com"
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="donor-card">Card Details</Label>
                    <div className="relative">
                      <CreditCard
                        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <Input
                        id="donor-card"
                        type="text"
                        inputMode="numeric"
                        value={cardNumber}
                        onChange={(event) => setCardNumber(event.target.value)}
                        className="pl-12"
                        placeholder="0000 0000 0000 0000"
                        autoComplete="cc-number"
                        aria-describedby="card-demo-note"
                      />
                    </div>
                    <p id="card-demo-note" className="text-xs text-muted-foreground">
                      Demo only — payment processing will connect via Paystack.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      id="donor-anonymous"
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(event) => setIsAnonymous(event.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-accent"
                    />
                    <Label
                      htmlFor="donor-anonymous"
                      className="font-normal text-muted-foreground"
                    >
                      Make this donation anonymous
                    </Label>
                  </div>

                  {error ? (
                    <p className="text-sm text-destructive" role="alert">
                      {error}
                    </p>
                  ) : null}

                  <Button
                    type="submit"
                    variant={isSuccess ? "primary" : "secondary"}
                    size="lg"
                    className="w-full transition-transform hover:-translate-y-0.5"
                    disabled={isSubmitting}
                  >
                    {submitLabel}
                  </Button>

                  <p className="pt-2 text-center text-xs leading-relaxed text-muted-foreground">
                    By donating, you agree to our Terms of Service and Privacy
                    Policy.
                    <br />
                    Your transaction is secured with 256-bit SSL encryption.
                  </p>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function ImpactItem({ item }: { item: DonateImpactItem }) {
  const Icon = impactIconMap[item.icon];

  return (
    <li className="flex gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
        <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
      </span>
      <div>
        <h3 className="text-sm font-semibold tracking-wide text-primary">
          {item.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      </div>
    </li>
  );
}
