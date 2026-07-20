"use client";

import { useCallback, useState } from "react";
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
  isSuccess: boolean;
  error: string | null;
  handleChange: (
    field: keyof ContactFormData
  ) => (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  reset: () => void;
}

/**
 * Manages contact form state, validation, and mock submission.
 */
export function useContactForm(
  defaultInquiryType = "General Inquiry"
): UseContactFormReturn {
  const [form, setForm] = useState<ContactFormData>(() =>
    createInitialForm(defaultInquiryType)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback(
    (field: keyof ContactFormData) =>
      (
        event: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
        setError(null);
        setIsSuccess(false);
      },
    []
  );

  const reset = useCallback(() => {
    setForm(createInitialForm(defaultInquiryType));
    setIsSubmitting(false);
    setIsSuccess(false);
    setError(null);
  }, [defaultInquiryType]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      setIsSuccess(false);

      if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
        setError("Please fill in your name, email, and message.");
        return;
      }

      setIsSubmitting(true);

      try {
        // Mock submission until the backend contact endpoint is available.
        await new Promise((resolve) => setTimeout(resolve, 900));
        setIsSuccess(true);
        setForm(createInitialForm(defaultInquiryType));
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
    isSuccess,
    error,
    handleChange,
    handleSubmit,
    reset,
  };
}
