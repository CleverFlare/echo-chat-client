import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { useRouter } from "@tanstack/react-router";
import { OTPInput } from "input-otp";
import { InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useOtpForm } from "../hooks/use-otp-form";
import { toast } from "sonner";
import type { BetterAuthError } from "better-auth";

export function OtpForm({
  className,
  searchParams,
  ...props
}: React.ComponentProps<"form"> & {
  searchParams: {
    method: "email" | "phone";
    intent: "login" | "register";
    contact: string;
  };
}) {
  const router = useRouter();

  const { otpForm } = useOtpForm({
    ...searchParams,
    onServerError: (error) => toast.error((error as BetterAuthError).message),
  });

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={(e) => {
        e.preventDefault();
        otpForm.handleSubmit();
      }}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">OTP</h1>
          <p className="text-sm text-balance text-muted-foreground">
            The verification code has been sent to your {searchParams.method}:{" "}
            {searchParams.contact}
          </p>
        </div>
        <otpForm.Field name="otp">
          {(field) => (
            <Field
              data-invalid={field.state.meta.errors.length > 0}
              data-required
            >
              <OTPInput
                maxLength={6}
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
                aria-invalid={field.state.meta.errors.length > 0}
              >
                <InputOTPGroup className="grid grid-cols-6 *:w-full *:aspect-4/3 *:h-auto">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </OTPInput>
            </Field>
          )}
        </otpForm.Field>
        <div className="flex flex-col gap-2">
          <Field>
            <Button type="submit">Verify</Button>
          </Field>
          <Field>
            <Button
              variant="secondary"
              type="button"
              onClick={() => router.history.back()}
            >
              Back
            </Button>
          </Field>
        </div>
      </FieldGroup>
    </form>
  );
}
