import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  PhoneInput,
  PhoneInputCountrySelect,
  PhoneInputField,
} from "@/components/ui/phone-input";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MailIcon, SmartphoneIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRegisterForm } from "../hooks/use-register-form";
import { toast } from "sonner";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { method, form, switchMethod } = useRegisterForm({
    onServerError: (error) => {
      toast.error(error as string);
    },
  });

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Register a new account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the fields below and choose the verification method to
            create a new account
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <form.Field name="firstName">
            {(field) => (
              <Field
                data-invalid={field.state.meta.errors.length > 0}
                data-required
              >
                <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                <Input
                  id={field.name}
                  type="text"
                  placeholder="John"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
              </Field>
            )}
          </form.Field>
          <form.Field name="lastName">
            {(field) => (
              <Field
                data-invalid={field.state.meta.errors.length > 0}
                data-required
              >
                <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                <Input
                  id={field.name}
                  type="text"
                  placeholder="Doe"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
              </Field>
            )}
          </form.Field>
          <form.Field name="handle">
            {(field) => (
              <Field
                data-invalid={field.state.meta.errors.length > 0}
                data-required
              >
                <FieldLabel htmlFor={field.name}>Handle</FieldLabel>
                <Input
                  id={field.name}
                  type="text"
                  placeholder="@example_123"
                  aria-invalid={field.state.meta.errors.length > 0}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
              </Field>
            )}
          </form.Field>
          <form.Field name="phone">
            {(field) => (
              <Field
                data-invalid={field.state.meta.errors.length > 0}
                data-required={method === "phone"}
              >
                <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                <PhoneInput>
                  <PhoneInputCountrySelect />
                  <PhoneInputField
                    id={field.name}
                    placeholder="(555) 123-4567"
                    aria-invalid={field.state.meta.errors.length > 0}
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value.replaceAll(" ", ""))
                    }
                  />
                </PhoneInput>
                <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
              </Field>
            )}
          </form.Field>
          <form.Field name="email">
            {(field) => (
              <Field
                data-invalid={field.state.meta.errors.length > 0}
                data-required={method === "email"}
              >
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  placeholder="m@example.com"
                  aria-invalid={field.state.meta.errors.length > 0}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
              </Field>
            )}
          </form.Field>
          <Field>
            <FieldLabel htmlFor="otp-receipt">Registration Method</FieldLabel>
            <Card className="w-full max-w-xs p-0 border-none">
              <RadioGroup
                value={method}
                onValueChange={(value) => switchMethod(value)}
              >
                <FieldGroup className="gap-0">
                  <Field>
                    <FieldLabel className="justify-between px-4 py-3 not-disabled:cursor-pointer">
                      <FieldTitle className="flex items-center gap-2">
                        <SmartphoneIcon
                          aria-hidden="true"
                          className="size-4 opacity-60"
                        />
                        Phone OTP
                      </FieldTitle>
                      <RadioGroupItem value="phone" id="contact-phone" />
                    </FieldLabel>
                  </Field>
                  <Separator />
                  <Field>
                    <FieldLabel className="justify-between px-4 py-3 not-disabled:cursor-pointer">
                      <FieldTitle className="flex items-center gap-2">
                        <MailIcon
                          aria-hidden="true"
                          className="size-4 opacity-60"
                        />
                        Email OTP
                      </FieldTitle>
                      <RadioGroupItem value="email" id="contact-email" />
                    </FieldLabel>
                  </Field>
                </FieldGroup>
              </RadioGroup>
            </Card>
          </Field>
        </div>
        <Field>
          <Button type="submit">Register</Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
