import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { verifyPhoneOtp } from "../lib/use-phone-sign-in";
import { verifyEmailOtp } from "../lib/use-email-sign-in";
import { signUpWithPhone } from "../lib/use-phone-sign-up";
import { signUpWithEmail } from "../lib/use-email-sign-up";
import { useRegisterStore } from "../store/register";
import { useShallow } from "zustand/react/shallow";
import { useRouter } from "@tanstack/react-router";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface OtpFormParams {
  method: "phone" | "email";
  contact: string;
  intent: "login" | "register";
  onServerError?: (error: unknown) => void;
}

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const otpSchema = z.object({
  otp: z.string().min(1, "OTP code is required."),
});

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useOtpForm({
  method,
  contact,
  intent,
  onServerError,
}: OtpFormParams) {
  const profile = useRegisterStore(
    useShallow((s) => ({
      firstName: s.firstName,
      lastName: s.lastName,
      handle: s.handle,
      avatar: s.avatar,
      bio: s.bio,
    })),
  );
  const clearProfile = useRegisterStore((s) => s.clear);
  const router = useRouter();

  const otpForm = useForm({
    defaultValues: { otp: "" },
    validators: {
      onSubmit: otpSchema,
    },
    onSubmit: async ({ value }) => {
      if (intent === "login") {
        const { error } =
          method === "phone"
            ? await verifyPhoneOtp({ phoneNumber: contact, code: value.otp })
            : await verifyEmailOtp({ email: contact, otp: value.otp });

        if (error && onServerError) {
          onServerError(error);
          return;
        }

        router.navigate({ to: "/" });
      } else if (intent === "register") {
        const { error } =
          method === "phone"
            ? await signUpWithPhone({
                phoneNumber: contact,
                code: value.otp,
                firstName: profile.firstName,
                lastName: profile.lastName,
                handle: profile.handle,
              })
            : await signUpWithEmail({
                email: contact,
                otp: value.otp,
                firstName: profile.firstName,
                lastName: profile.lastName,
                handle: profile.handle,
              });

        if (error && onServerError) {
          onServerError(error);
          return;
        }

        clearProfile();

        router.navigate({ to: "/" });
      }

      // Session is set by better-auth — navigate in your component.
      // e.g. router.navigate({ to: "/chats" });
    },
  });

  return { otpForm };
}
