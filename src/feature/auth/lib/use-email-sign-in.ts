// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

import { authClient } from "@/lib/auth-client";

export interface SendEmailOtpOptions {
  email: string;
}

export interface VerifyEmailOtpOptions {
  email: string;
  otp: string;
}

export interface AuthResult<T = unknown> {
  data: T | null;
  error: string | null;
}

// ---------------------------------------------------------------------------
// Wrappers
// ---------------------------------------------------------------------------

/**
 * Sends a one-time password to the given email address.
 *
 * @example
 * const { error } = await sendEmailOtp({ email: "layla@example.com" });
 * if (error) showToast(error);
 */
export async function sendEmailOtp(
  options: SendEmailOtpOptions,
): Promise<AuthResult> {
  if (!options.email?.trim())
    return { data: null, error: "Email is required." };

  try {
    const { data, error } = await authClient.emailOtp.sendVerificationOtp({
      email: options.email,
      type: "sign-in",
    });

    if (error)
      return { data: null, error: error.message ?? "Failed to send OTP." };
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
 * const { data, error } = await verifyEmailOtp({
 *   email: "layla@example.com",
 *   otp: "123456",
 * });
 * if (error) showToast(error);
 * else router.push("/dashboard");
 */
export async function verifyEmailOtp(
  options: VerifyEmailOtpOptions,
): Promise<AuthResult> {
  if (!options.email?.trim())
    return { data: null, error: "Email is required." };
  if (!options.otp?.trim())
    return { data: null, error: "OTP code is required." };

  try {
    const { data, error } = await authClient.signIn.emailOtp({
      email: options.email,
      otp: options.otp,
    });

    if (error)
      return { data: null, error: error.message ?? "Invalid or expired OTP." };
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unexpected error.",
    };
  }
}
