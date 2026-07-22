"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { submitContactForm } from "@/lib/api";
import type { ContactFormData } from "@/lib/types";

function createInitialForm(inquiryType: string): ContactFormData {
  return {
    name: "",
    email: "",
    inquiryType,
    message: "",
  };
}

export interface UseContactFormReturn {
  form: ContactFormData;
  isSubmitting: boolean;
  error: string | null;
  setField: (field: keyof ContactFormData, value: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  reset: () => void;
}

/**
 * Manages contact form state, validation, and API submission.
 */
export function useContactForm(
  defaultInquiryType = "General Inquiry"
): UseContactFormReturn {
  const [form, setForm] = useState<ContactFormData>(() =>
    createInitialForm(defaultInquiryType)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setField = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setError(null);
    },
    []
  );

  const reset = useCallback(() => {
    setForm(createInitialForm(defaultInquiryType));
    setIsSubmitting(false);
    setError(null);
  }, [defaultInquiryType]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);

      if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
        setError("Please fill in your name, email, and message.");
        return;
      }

      setIsSubmitting(true);

      try {
        await submitContactForm(form);
        setForm(createInitialForm(defaultInquiryType));
        toast.success("Message sent", {
          description:
            "Thank you! Your message has been sent. We will be in touch soon.",
        });
      } catch {
        setError("Something went wrong. Please try again shortly.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, defaultInquiryType]
  );

  return {
    form,
    isSubmitting,
    error,
    setField,
    handleSubmit,
    reset,
  };
}
