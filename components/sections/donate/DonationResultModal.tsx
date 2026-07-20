"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, HeartHandshake, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";

export type DonationResultState = "verifying" | "success" | "failed";

export interface VerifiedDonationSummary {
  amount?: number;
  currency?: string;
  donorName?: string;
  paystackRef?: string;
  isAnonymous?: boolean;
}

interface DonationResultModalProps {
  state: DonationResultState | null;
  donation?: VerifiedDonationSummary | null;
  onClose: () => void;
}

/**
 * Full-screen attention modal for donation verification outcomes.
 */
export function DonationResultModal({
  state,
  donation,
  onClose,
}: DonationResultModalProps) {
  useEffect(() => {
    if (!state) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [state]);

  useEffect(() => {
    if (!state || state === "verifying") return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [state, onClose]);

  if (typeof document === "undefined") return null;

  const isSuccess = state === "success";
  const isFailed = state === "failed";
  const isVerifying = state === "verifying";
  const displayName =
    donation?.isAnonymous || !donation?.donorName
      ? "Friend"
      : donation.donorName.split(" ")[0];

  return createPortal(
    <AnimatePresence>
      {state ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Dismiss"
            className="absolute inset-0 bg-primary/55 backdrop-blur-md"
            onClick={isVerifying ? undefined : onClose}
            disabled={isVerifying}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="donation-result-title"
            aria-describedby="donation-result-body"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-card shadow-luxury"
          >
            {isVerifying ? (
              <div className="flex flex-col items-center px-8 py-14 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/8 text-primary">
                  <Loader2 className="h-8 w-8 animate-spin" aria-hidden />
                </span>
                <h2
                  id="donation-result-title"
                  className="mt-6 font-display text-2xl font-semibold text-primary"
                >
                  Confirming your gift
                </h2>
                <p
                  id="donation-result-body"
                  className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground"
                >
                  Please wait a moment while we securely verify your payment
                  with Paystack.
                </p>
              </div>
            ) : null}

            {isSuccess ? (
              <div className="relative">
                <div className="bg-gradient-to-b from-accent/20 via-accent/8 to-transparent px-8 pb-6 pt-10 text-center">
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                      delay: 0.08,
                    }}
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-glow"
                  >
                    <Check
                      className="h-10 w-10"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  </motion.span>

                  <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                    Payment confirmed
                  </p>
                  <h2
                    id="donation-result-title"
                    className="mt-2 font-display text-3xl font-semibold tracking-tight text-primary"
                  >
                    Thank you, {displayName}
                  </h2>
                  <p
                    id="donation-result-body"
                    className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground"
                  >
                    Your generosity fuels gospel outreaches, compassion care,
                    and empowerment across communities we serve.
                  </p>

                  {donation?.amount ? (
                    <div className="mt-8 rounded-2xl border border-border/80 bg-card/80 px-5 py-5 backdrop-blur">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                        Amount given
                      </p>
                      <p className="mt-1 font-display text-4xl font-semibold text-primary">
                        {formatCurrency(donation.amount)}
                      </p>
                      {donation.paystackRef ? (
                        <p className="mt-2 break-all text-xs text-muted-foreground">
                          Ref: {donation.paystackRef}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <div className="space-y-4 px-8 pb-8 pt-2">
                  <div className="flex items-start gap-3 rounded-2xl bg-muted/70 px-4 py-3 text-left">
                    <HeartHandshake
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                      aria-hidden
                    />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      A receipt confirmation has been recorded. You may close
                      this window.
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    onClick={onClose}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            ) : null}

            {isFailed ? (
              <div className="px-8 py-10 text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <X className="h-8 w-8" strokeWidth={2.25} aria-hidden />
                </span>
                <h2
                  id="donation-result-title"
                  className="mt-6 font-display text-2xl font-semibold text-primary"
                >
                  Payment not confirmed
                </h2>
                <p
                  id="donation-result-body"
                  className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground"
                >
                  We could not verify this transaction. No charge may have gone
                  through — you can safely try again below.
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="mt-8 w-full"
                  onClick={onClose}
                >
                  Try again
                </Button>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
