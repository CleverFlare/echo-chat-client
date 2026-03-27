import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { sendPhoneOtp } from "../lib/use-phone-sign-in";
import { sendEmailOtp } from "../lib/use-email-sign-in";
import { useRouter } from "@tanstack/react-router";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type LoginMethod = "phone" | "email";

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const phoneSchema = z.object({
  phone: z
    .e164({
      error: (value) =>
        value.input === undefined
          ? "Phone number is required."
          : "Invalid phone number.",
    })
    .min(1, "Phone number is required."),
  email: z.string(),
});

const emailSchema = z.object({
  phone: z.string(),
  email: z.email({
    error: (value) =>
      value.input === undefined
        ? "Email address is required."
        : "Invalid email address.",
  }),
});

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useLoginForm(param?: {
  onServerError?: (error: unknown) => void;
}) {
  const [method, setMethod] = React.useState<LoginMethod>("phone");
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      phone: "",
    } as z.infer<typeof phoneSchema> | z.infer<typeof emailSchema>,
    validators: {
      onSubmit: method === "phone" ? phoneSchema : emailSchema,
    },
    onSubmit: async ({
      value,
    }: {
      value: z.infer<typeof phoneSchema> | z.infer<typeof emailSchema>;
    }) => {
      console.log("SUBMIT", value);
      const contact = method === "phone" ? value.phone! : value.email!;

      const { error } =
        method === "phone"
          ? await sendPhoneOtp({ phoneNumber: contact }, true)
          : await sendEmailOtp({ email: contact });

      if (error && param?.onServerError) {
        param.onServerError(error);
        return;
      }

      router.navigate({
        to: "/otp",
        search: {
          method,
          contact,
          intent: "login",
        },
      });
    },
  });

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  function switchMethod(next: LoginMethod) {
    setMethod(next);
    form.reset();
  }

  return {
    method,
    form,
    switchMethod,
  };
}
