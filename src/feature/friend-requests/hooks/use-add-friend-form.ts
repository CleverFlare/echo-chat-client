import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod/v4";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AddFriendMethod = "phone" | "email" | "handle";

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
  email: z.string().optional(),
  handle: z.string().optional(),
});

const emailSchema = z.object({
  phone: z.string().optional(),
  email: z.email({
    error: (value) =>
      value.input === undefined
        ? "Email address is required."
        : "Invalid email address.",
  }),
  handle: z.string().optional(),
});

const handleSchema = z.object({
  phone: z.string().optional(),
  email: z.string().optional(),
  handle: z
    .string({
      error: (value) =>
        value.input === undefined ? "Handle is required." : "Invalid handle.",
    })
    .min(1, "Handle is required.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Handle can only contain letters, numbers, and underscores.",
    ),
});

type SchemasUnion =
  | z.infer<typeof phoneSchema>
  | z.infer<typeof emailSchema>
  | z.infer<typeof handleSchema>;

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useAddFriendForm(param?: {
  onSubmit?: (method: AddFriendMethod, value: string) => Promise<void>;
  onServerError?: (error: unknown) => void;
}) {
  const [method, setMethod] = React.useState<AddFriendMethod>("phone");

  const schema =
    method === "phone"
      ? phoneSchema
      : method === "email"
        ? emailSchema
        : handleSchema;

  const form = useForm({
    defaultValues: { phone: "", email: "", handle: "" } as SchemasUnion,
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      const contact =
        method === "phone"
          ? value.phone!
          : method === "email"
            ? value.email!
            : value.handle!;

      try {
        await param?.onSubmit?.(method, contact);
        form.reset();
      } catch (error) {
        param?.onServerError?.(error);
      }
    },
  });

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  function switchMethod(next: AddFriendMethod) {
    setMethod(next);
    form.reset();
  }

  return {
    method,
    form,
    switchMethod,
  };
}
