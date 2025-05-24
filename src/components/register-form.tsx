import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as PasswordInput from "./password-input";
import { getRouteApi, Link, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogoIcon } from "@phosphor-icons/react";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { register as registerCall } from "@/queries/register";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { AxiosError } from "axios";

const getApi = getRouteApi("/register");

const registerSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(8),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { redirect } = getApi.useSearch();

  const router = useRouter();

  const { setToken } = useAuthStore();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["auth"],
    mutationFn: async (data: RegisterSchema) => registerCall(data),
    onSuccess: (token) => {
      setToken(token);
      router.history.replace(redirect ?? "/chat");
    },
  });

  async function submit(data: RegisterSchema) {
    try {
      await mutateAsync(data);
      reset();
    } catch (error) {
      toast.error((error as Error).message ?? "Failed to register");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Fill in the following fields to register an account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
          <div className="grid gap-3">
            <Label htmlFor="firstName-input">First Name</Label>
            <Input
              id="firstName-input"
              type="text"
              placeholder="First Name"
              {...register("firstName")}
            />
            <p className="text-xs text-destructive">
              {errors.firstName?.message}
            </p>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="lastName-input">Last Name</Label>
            <Input
              id="lastName-input"
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
            />
            <p className="text-xs text-destructive">
              {errors.lastName?.message}
            </p>
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email-input">Email</Label>
          <Input
            id="email-input"
            type="email"
            placeholder="email@example.com"
            {...register("email")}
          />
          <p className="text-xs text-destructive">{errors.email?.message}</p>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="username-input">Username</Label>
          <Input
            id="username-input"
            type="text"
            placeholder="@username"
            {...register("username")}
          />
          <p className="text-xs text-destructive">{errors.username?.message}</p>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password-input">Password</Label>
          <PasswordInput.Root>
            <PasswordInput.Input
              placeholder="••••••••"
              id="password-input"
              {...register("password")}
            />
            <PasswordInput.ShowHideButton />
          </PasswordInput.Root>
          <p className="text-xs text-destructive">{errors.password?.message}</p>
        </div>
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending && <Loader2 className="animate-spin" />}
          Register
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <GoogleLogoIcon weight="bold" />
          Register with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </form>
  );
}
