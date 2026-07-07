"use client";

import { useCallback, useState } from "react";
import type {
  ContactFormData,
  ContactFormErrors,
  ContactFormStatus,
} from "@/types/portfolio";

const INITIAL_FORM: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

function validateForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required.";
  }

  return errors;
}

interface UseContactFormResult {
  form: ContactFormData;
  errors: ContactFormErrors;
  status: ContactFormStatus;
  updateField: (field: keyof ContactFormData, value: string) => void;
  submit: () => Promise<void>;
  reset: () => void;
}

export function useContactForm(): UseContactFormResult {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");

  const updateField = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (status === "success" || status === "error") {
        setStatus("idle");
      }
    },
    [status],
  );

  const reset = useCallback(() => {
    setForm(INITIAL_FORM);
    setErrors({});
    setStatus("idle");
  }, []);

  const submit = useCallback(async () => {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    setErrors({});

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  }, [form]);

  return { form, errors, status, updateField, submit, reset };
}
