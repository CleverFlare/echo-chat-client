import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PhoneInput,
  PhoneInputCountrySelect,
  PhoneInputField,
} from "@/components/ui/phone-input";
import {
  useAddFriendForm,
  type AddFriendMethod,
} from "../hooks/use-add-friend-form";
import { toast } from "sonner";

export function AddFriendWindow() {
  const { method, form, switchMethod } = useAddFriendForm({
    onSubmit: async (method, value) => {
      // TODO: wire up to your API
      console.log("Add friend via", method, value);
      toast.success("Friend request sent!");
    },
    onServerError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    },
  });

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">Add a Friend</h2>
        <p className="text-sm text-muted-foreground">
          Send a friend request via phone number, email address, or handle.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <Tabs
            value={method}
            onValueChange={(v) => switchMethod(v as AddFriendMethod)}
            className="flex flex-col gap-6"
          >
            <TabsList>
              <TabsTrigger value="phone">Phone</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="handle">Handle</TabsTrigger>
            </TabsList>

            <TabsContent value="phone">
              <form.Field name="phone">
                {(field) => (
                  <Field
                    data-invalid={field.state.meta.errors.length > 0}
                    data-required={method === "phone"}
                  >
                    <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                    <PhoneInput>
                      <PhoneInputCountrySelect />
                      <PhoneInputField
                        id={field.name}
                        placeholder="(555) 123-4567"
                        value={field.state.value}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/[^\d+]/g, "");
                          field.handleChange(raw);
                        }}
                        aria-invalid={field.state.meta.errors.length > 0}
                      />
                    </PhoneInput>
                    <FieldError>
                      {field.state.meta.errors[0]?.message}
                    </FieldError>
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
                    <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                    <Input
                      id={field.name}
                      type="email"
                      placeholder="friend@example.com"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={field.state.meta.errors.length > 0}
                    />
                    <FieldError>
                      {field.state.meta.errors[0]?.message}
                    </FieldError>
                  </Field>
                )}
              </form.Field>
            </TabsContent>

            <TabsContent value="handle">
              <form.Field name="handle">
                {(field) => (
                  <Field
                    data-invalid={field.state.meta.errors.length > 0}
                    data-required={method === "handle"}
                  >
                    <FieldLabel htmlFor={field.name}>Handle</FieldLabel>
                    <Input
                      id={field.name}
                      type="text"
                      placeholder="@example_123"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={field.state.meta.errors.length > 0}
                    />
                    <FieldError>
                      {field.state.meta.errors[0]?.message}
                    </FieldError>
                  </Field>
                )}
              </form.Field>
            </TabsContent>
          </Tabs>

          <Field>
            <Button type="submit" className="w-full">
              Send Friend Request
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
