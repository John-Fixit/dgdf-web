"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { GraduationCap, HandHeart, Stethoscope } from "lucide-react";
import {
  AnimatedSection,
  Button,
  Card,
  CardContent,
  Input,
  Label,
  SectionLabel,
} from "@/components/ui";
import { initiateDonation, verifyDonation } from "@/lib/api";
import { DONATE_PRESET_AMOUNTS } from "@/lib/constants";
import type { DonateImpactItem, DonatePageContent } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";
import {
  DonationResultModal,
  type DonationResultState,
  type VerifiedDonationSummary,
} from "./DonationResultModal";

export interface DonationFormProps {
  content: Pick<
    DonatePageContent,
    "impactTitle" | "impactItems" | "impactQuote"
  >;
  /** Paystack return status already resolved in the URL */
  status?: string;
  /** Paystack reference to verify on return */
  reference?: string;
}

const impactIconMap = {
  nourishment: HandHeart,
  education: GraduationCap,
  health: Stethoscope,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  amount?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
};

/**
 * Two-column donate section — impact messaging and Paystack gift form.
 */
export function DonationForm({
  content,
  status,
  reference,
}: DonationFormProps) {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(DONATE_PRESET_AMOUNTS[2]);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resultState, setResultState] = useState<DonationResultState | null>(
    null
  );
  const [verifiedDonation, setVerifiedDonation] =
    useState<VerifiedDonationSummary | null>(null);

  const selectedAmount = useMemo(() => {
    if (isCustom) {
      return Number(customAmount) || 0;
    }
    return amount;
  }, [amount, customAmount, isCustom]);

  const closeResultModal = useCallback(() => {
    setResultState(null);
    router.replace("/donate");
  }, [router]);

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  useEffect(() => {
    if (status === "success" || status === "failed") {
      setResultState(status);
      return;
    }

    if (!reference) return;

    let cancelled = false;

    async function confirmPayment() {
      setResultState("verifying");
      setSubmitError(null);
      try {
        const result = await verifyDonation(reference!);
        if (cancelled) return;

        const nextStatus =
          result.donation.status === "success" ? "success" : "failed";
        setVerifiedDonation({
          amount: result.donation.amount,
          currency: result.donation.currency,
          donorName: result.donation.donorName,
          paystackRef: result.donation.paystackRef ?? reference,
          isAnonymous: result.donation.isAnonymous,
        });
        setResultState(nextStatus);
        router.replace(`/donate?status=${nextStatus}`);
      } catch {
        if (!cancelled) {
          setResultState("failed");
          router.replace("/donate?status=failed");
        }
      }
    }

    void confirmPayment();
    return () => {
      cancelled = true;
    };
  }, [reference, status, router]);

  function selectPreset(value: number) {
    setAmount(value);
    setIsCustom(false);
    setCustomAmount("");
    clearFieldError("amount");
  }

  function validateFields(): FieldErrors {
    const next: FieldErrors = {};

    if (isCustom && !customAmount.trim()) {
      next.amount = "Amount is required.";
    } else if (selectedAmount < 1000) {
      next.amount =
        selectedAmount > 0
          ? "Minimum donation is ₦1,000."
          : "Amount is required.";
    }

    if (!firstName.trim()) {
      next.firstName = "First name is required.";
    }

    if (!lastName.trim()) {
      next.lastName = "Last name is required.";
    }

    if (!email.trim()) {
      next.email = "Email is required.";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = "Enter a valid email address.";
    }

    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const errors = validateFields();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const donorName = `${firstName.trim()} ${lastName.trim()}`;

    setIsSubmitting(true);
    try {
      const result = await initiateDonation({
        donorName,
        email: email.trim(),
        amount: selectedAmount,
        isAnonymous,
      });

      if (!result.authorizationUrl) {
        throw new Error("Missing checkout URL");
      }
      window.location.assign(result.authorizationUrl);
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? (err.response?.data as { message?: string } | undefined)?.message
        : null;
      setSubmitError(
        message || "Unable to start payment right now. Please try again."
      );
      setIsSubmitting(false);
    }
  }

  const submitLabel = isSubmitting
    ? "Redirecting to Payment..."
    : selectedAmount >= 1000
      ? `Complete Donation of ${formatCurrency(selectedAmount)}`
      : "Complete Donation";

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
              <div
                className="mt-4 h-1 w-20 rounded-full bg-accent"
                aria-hidden="true"
              />
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
                  <fieldset>
                    <legend>
                      <SectionLabel className="mb-3">
                        Select Amount (NGN)
                      </SectionLabel>
                    </legend>
                    <div className="grid grid-cols-3 gap-3">
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
                    </div>

                    <div className="mt-5 space-y-2">
                      <Label htmlFor="custom-amount">
                        Or enter your own amount
                      </Label>
                      <div className="relative">
                        <span
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground"
                          aria-hidden="true"
                        >
                          ₦
                        </span>
                        <Input
                          id="custom-amount"
                          type="number"
                          min={1000}
                          step={100}
                          value={customAmount}
                          onFocus={() => setIsCustom(true)}
                          onChange={(event) => {
                            setIsCustom(true);
                            setCustomAmount(event.target.value);
                            clearFieldError("amount");
                          }}
                          className={cn(
                            "pl-9",
                            isCustom &&
                              !fieldErrors.amount &&
                              "border-accent ring-2 ring-accent/20 focus-visible:ring-accent/30",
                            fieldErrors.amount &&
                              "border-destructive focus-visible:ring-destructive/30"
                          )}
                          placeholder="e.g. 15000"
                          aria-invalid={Boolean(fieldErrors.amount)}
                          aria-describedby={
                            fieldErrors.amount ? "custom-amount-error" : undefined
                          }
                          aria-label="Custom donation amount in Naira"
                        />
                      </div>
                      {fieldErrors.amount ? (
                        <p
                          id="custom-amount-error"
                          className="text-xs text-destructive"
                          role="alert"
                        >
                          {fieldErrors.amount}
                        </p>
                      ) : null}
                    </div>
                  </fieldset>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="donor-first-name">First Name</Label>
                      <Input
                        id="donor-first-name"
                        type="text"
                        required
                        value={firstName}
                        onChange={(event) => {
                          setFirstName(event.target.value);
                          clearFieldError("firstName");
                        }}
                        placeholder="John"
                        autoComplete="given-name"
                        aria-invalid={Boolean(fieldErrors.firstName)}
                        aria-describedby={
                          fieldErrors.firstName
                            ? "donor-first-name-error"
                            : undefined
                        }
                        className={cn(
                          fieldErrors.firstName &&
                            "border-destructive focus-visible:ring-destructive/30"
                        )}
                      />
                      {fieldErrors.firstName ? (
                        <p
                          id="donor-first-name-error"
                          className="text-xs text-destructive"
                          role="alert"
                        >
                          {fieldErrors.firstName}
                        </p>
                      ) : null}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="donor-last-name">Last Name</Label>
                      <Input
                        id="donor-last-name"
                        type="text"
                        required
                        value={lastName}
                        onChange={(event) => {
                          setLastName(event.target.value);
                          clearFieldError("lastName");
                        }}
                        placeholder="Doe"
                        autoComplete="family-name"
                        aria-invalid={Boolean(fieldErrors.lastName)}
                        aria-describedby={
                          fieldErrors.lastName
                            ? "donor-last-name-error"
                            : undefined
                        }
                        className={cn(
                          fieldErrors.lastName &&
                            "border-destructive focus-visible:ring-destructive/30"
                        )}
                      />
                      {fieldErrors.lastName ? (
                        <p
                          id="donor-last-name-error"
                          className="text-xs text-destructive"
                          role="alert"
                        >
                          {fieldErrors.lastName}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="donor-email">Email Address</Label>
                    <Input
                      id="donor-email"
                      type="email"
                      required
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        clearFieldError("email");
                      }}
                      placeholder="john@example.com"
                      autoComplete="email"
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={
                        fieldErrors.email ? "donor-email-error" : undefined
                      }
                      className={cn(
                        fieldErrors.email &&
                          "border-destructive focus-visible:ring-destructive/30"
                      )}
                    />
                    {fieldErrors.email ? (
                      <p
                        id="donor-email-error"
                        className="text-xs text-destructive"
                        role="alert"
                      >
                        {fieldErrors.email}
                      </p>
                    ) : null}
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

                  {submitError ? (
                    <p className="text-sm text-destructive" role="alert">
                      {submitError}
                    </p>
                  ) : null}

                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    className="w-full transition-transform hover:-translate-y-0.5"
                    disabled={isSubmitting || resultState === "verifying"}
                  >
                    {submitLabel}
                  </Button>

                  <p className="pt-2 text-center text-xs leading-relaxed text-muted-foreground">
                    You will complete payment securely on Paystack.
                    <br />
                    By donating, you agree to our Terms of Service and Privacy
                    Policy.
                  </p>
                </form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>

      <DonationResultModal
        state={resultState}
        donation={verifiedDonation}
        onClose={closeResultModal}
      />
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
