// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

import { authClient } from "@/lib/auth-client";

export interface PhoneSignUpOptions {
  /** E.164 format recommended, e.g. "+201012345678" */
  phoneNumber: string;
  /** OTP code received by the user */
  code: string;
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

function validateSignUpOptions(opts: PhoneSignUpOptions): string | null {
  if (!opts.phoneNumber?.trim()) return "Phone number is required.";
  if (!opts.code?.trim()) return "OTP code is required.";
  if (!opts.firstName?.trim()) return "First name is required.";
  if (!opts.lastName?.trim()) return "Last name is required.";
  if (!opts.handle?.trim()) return "Handle is required.";
  return null;
}

// ---------------------------------------------------------------------------
// Core wrapper
// ---------------------------------------------------------------------------

/**
 * Signs a new user up with a verified phone number and custom profile fields.
 *
 * Flow:
 *  1. Client-side validation (fast, no network).
 *  2. `phoneNumber.verifyOtp` — verifies the OTP and creates the session.
 *  3. `updateUser` — persists the custom profile fields atomically after sign-up.
 *
 * @example
 * const { data, error } = await signUpWithPhone({
 *   phoneNumber: "+201012345678",
 *   code: "123456",
 *   firstName: "Layla",
 *   lastName: "Hassan",
 *   handle: "layla_h",
 *   avatar: "https://example.com/avatar.jpg",
 *   bio: "Coffee enthusiast & developer.",
 * });
 */
export async function signUpWithPhone(
  options: PhoneSignUpOptions,
): Promise<AuthResult> {
  const validationError = validateSignUpOptions(options);
  if (validationError) return { data: null, error: validationError };

  const { phoneNumber, code, firstName, lastName, handle } = options;

  try {
    const { data, error } = await authClient.phoneNumber.verify({
      phoneNumber,
      code,
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
// Uncomment and extend once you have `user.additionalFields` configured on
// the server. This teaches TypeScript about your extra columns.
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
