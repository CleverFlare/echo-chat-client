import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            You can use either your phone number or email to login to your
            account
          </p>
        </div>
        <Tabs defaultValue="phone" className="flex flex-col gap-8">
          <TabsList className="mx-auto" variant="line">
            <TabsTrigger value="phone">Using Phone</TabsTrigger>
            <TabsTrigger value="email">Using Email</TabsTrigger>
          </TabsList>
          <TabsContent value="phone">
            <div>
              <Field>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input
                  id="phone"
                  type="text"
                  placeholder="(555) 123-4567"
                  required
                />
              </Field>
            </div>
          </TabsContent>
          <TabsContent value="email">
            <div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
            </div>
          </TabsContent>
        </Tabs>
        <Field>
          <Button type="submit">Login</Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
