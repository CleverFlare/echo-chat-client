import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import {
  PhoneInput,
  PhoneInputCountrySelect,
  PhoneInputField,
} from "@/components/ui/phone-input";
import { useLoginForm } from "../hooks/use-login-form";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { method, form, switchMethod } = useLoginForm({
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
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            You can use either your phone number or email to login to your
            account
          </p>
        </div>
        <Tabs
          defaultValue="phone"
          className="flex flex-col gap-8"
          value={method}
          onValueChange={(value) => switchMethod(value)}
        >
          <TabsList className="mx-auto w-full">
            <TabsTrigger value="phone">Using Phone</TabsTrigger>
            <TabsTrigger value="email">Using Email</TabsTrigger>
          </TabsList>
          <TabsContent value="phone">
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
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value.replaceAll(" ", ""))
                      }
                      aria-invalid={field.state.meta.errors.length > 0}
                    />
                  </PhoneInput>
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                </Field>
              )}
            </form.Field>
          </TabsContent>
          <TabsContent value="email">
            <form.Field name="email">
              {(field) => (
                <Field
                  data-invalid={field.state.meta.errors.length > 0}
                  data-required={method === "email"}
                >
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    type="email"
                    placeholder="m@example.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                  <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
                </Field>
              )}
            </form.Field>
          </TabsContent>
        </Tabs>
        <Field>
          <Button type="submit">Login</Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
