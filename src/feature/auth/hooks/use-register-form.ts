import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod/v4";
import { sendPhoneOtp } from "../lib/use-phone-sign-in";
import { sendEmailOtp } from "../lib/use-email-sign-in";
import { useRegisterStore } from "../store/register";
import { useRouter } from "@tanstack/react-router";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type RegisterMethod = "phone" | "email";

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const baseProfileSchema = {
  firstName: z
    .string({
      error: (value) =>
        value.input === undefined
          ? "First name is required."
          : "Invalid value for first name.",
    })
    .min(1, "First name is required."),
  lastName: z
    .string({
      error: (value) =>
        value.input === undefined
          ? "Last name is required."
          : "Invalid value for last name.",
    })
    .min(1, "Last name is required."),
  handle: z
    .string({
      error: (value) =>
        value.input === undefined
          ? "Handle is required."
          : "Invalid value for handle.",
    })
    .min(1, "Handle is required."),
};

const phoneContactSchema = z.object({
  phone: z.e164({
    error: (value) =>
      value.input === undefined
        ? "Phone number is requried."
        : "Invalid phone number.",
  }),
  email: z.email("Invalid email address.").optional(),
  ...baseProfileSchema,
});

const emailContactSchema = z.object({
  phone: z.e164("Invalid phone number.").optional(),
  email: z.email({
    error: (value) =>
      value.input ? "Email address is required." : "Invalid email address.",
  }),
  ...baseProfileSchema,
});

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useRegisterForm(param?: {
  onServerError?: (error: unknown) => void;
}) {
  const [method, setMethod] = React.useState<RegisterMethod>("phone");

  const setProfile = useRegisterStore((s) => s.setProfile);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      phone: "",
      firstName: "",
      handle: "",
      lastName: "",
      email: "",
    } as
      | z.infer<typeof phoneContactSchema>
      | z.infer<typeof emailContactSchema>,
    validators: {
      onSubmit: method === "phone" ? phoneContactSchema : emailContactSchema,
    },
    onSubmit: async ({
      value,
    }: {
      value:
        | z.infer<typeof phoneContactSchema>
        | z.infer<typeof emailContactSchema>;
    }) => {
      const contact = method === "phone" ? value.phone! : value.email!;

      const { error } =
        method === "phone"
          ? await sendPhoneOtp({ phoneNumber: contact })
          : await sendEmailOtp({ email: contact });

      if (error && param?.onServerError) {
        param.onServerError(error);
        return;
      }

      setProfile({
        firstName: value.firstName,
        lastName: value.lastName,
        handle: value.handle,
      });

      router.navigate({
        to: "/otp",
        search: { contact, method, intent: "register" },
      });
    },
  });

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  function switchMethod(next: RegisterMethod) {
    setMethod(next);
    form.reset();
  }

  return {
    method,
    form,
    switchMethod,
  };
}
