// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

import { authClient } from "@/lib/auth-client";

export interface EmailSignUpOptions {
  email: string;
  otp: string;
  // --- Custom fields ---
  firstName: string;
  lastName: string;
  /** Unique @handle / username */
  handle: string;
}

export interface AuthResult<T = unknown> {
  data: T | null;
  error: string | null;
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validateSignUpOptions(opts: EmailSignUpOptions): string | null {
  if (!opts.email?.trim()) return "Email is required.";
  if (!opts.otp?.trim()) return "OTP code is required.";
  if (!opts.firstName?.trim()) return "First name is required.";
  if (!opts.lastName?.trim()) return "Last name is required.";
  if (!opts.handle?.trim()) return "Handle is required.";
  return null;
}

// ---------------------------------------------------------------------------
// Core wrapper
// ---------------------------------------------------------------------------

/**
 * Signs a new user up with a verified email address and custom profile fields.
 *
 * Flow:
 *  1. Client-side validation (fast, no network).
 *  2. `emailOtp.signIn` — verifies the OTP and creates the session.
 *  3. `updateUser` — persists the custom profile fields after sign-up.
 *
 * @example
 * const { data, error } = await signUpWithEmail({
 *   email: "layla@example.com",
 *   otp: "123456",
 *   firstName: "Layla",
 *   lastName: "Hassan",
 *   handle: "layla_h",
 *   avatar: "https://example.com/avatar.jpg",
 *   bio: "Coffee enthusiast & developer.",
 * });
 */
export async function signUpWithEmail(
  options: EmailSignUpOptions,
): Promise<AuthResult> {
  const validationError = validateSignUpOptions(options);
  if (validationError) return { data: null, error: validationError };

  const { email, otp, firstName, lastName, handle } = options;

  try {
    const { data, error } = await authClient.signIn.emailOtp({
      email,
      otp,
      firstName,
      lastName,
      handle,
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

// ---------------------------------------------------------------------------
// Module augmentation (optional — enables strict typing for custom fields)
// ---------------------------------------------------------------------------
// Uncomment once you have `user.additionalFields` configured server-side.
//
// declare module "better-auth/client" {
//   interface Session {
//     user: {
//       firstName: string;
//       lastName: string;
//       handle: string;
//       avatar?: string;
//       bio?: string;
//     };
//   }
// }
