// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

import { authClient } from "@/lib/auth-client";

export interface SendOtpOptions {
  /** E.164 format recommended, e.g. "+201012345678" */
  phoneNumber: string;
}

export interface VerifyOtpOptions {
  phoneNumber: string;
  /** The OTP code the user entered */
  code: string;
}

export interface AuthResult<T = unknown> {
  data: T | null;
  error: string | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Sends a one-time password to the given phone number.
 *
 * @example
 * const { error } = await sendPhoneOtp({ phoneNumber: "+201012345678" });
 * if (error) showToast(error);
 */
export async function sendPhoneOtp(
  options: SendOtpOptions,
  existOnly: boolean = false,
): Promise<AuthResult> {
  const { phoneNumber } = options;

  if (!phoneNumber?.trim()) {
    return { data: null, error: "Phone number is required." };
  }

  try {
    const { data, error } = await authClient.phoneNumber.sendOtp({
      phoneNumber,
      fetchOptions: {
        headers: {
          "x-exist-only": existOnly ? "true" : "false",
        },
      },
    });

    if (error) {
      return { data: null, error: error.message ?? "Failed to send OTP." };
    }

    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unexpected error.",
    };
  }
}

/**
 * Verifies the OTP and signs the user in.
 * On success the session is set automatically by better-auth.
 *
 * @example
 * const { data, error } = await verifyPhoneOtp({
 *   phoneNumber: "+201012345678",
 *   code: "123456",
 * });
 * if (error) showToast(error);
 * else router.push("/dashboard");
 */
export async function verifyPhoneOtp(
  options: VerifyOtpOptions,
): Promise<AuthResult> {
  const { phoneNumber, code } = options;

  if (!phoneNumber?.trim()) {
    return { data: null, error: "Phone number is required." };
  }
  if (!code?.trim()) {
    return { data: null, error: "OTP code is required." };
  }

  try {
    const { data, error } = await authClient.phoneNumber.verify({
      phoneNumber,
      code,
    });

    if (error) {
      return { data: null, error: error.message ?? "Invalid or expired OTP." };
    }

    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unexpected error.",
    };
  }
}

/**
 * Convenience wrapper: send → verify in a single call.
 * Useful when you already have both values (e.g. in tests or automated flows).
 */
export async function signInWithPhone(
  options: VerifyOtpOptions,
): Promise<AuthResult> {
  const sendResult = await sendPhoneOtp({ phoneNumber: options.phoneNumber });
  if (sendResult.error) return sendResult;
  return verifyPhoneOtp(options);
}
