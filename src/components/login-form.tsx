import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as PasswordInput from "./password-input";
import { getRouteApi, Link, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/queries/login";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth";
import { GoogleLogoIcon } from "@phosphor-icons/react";
import type { AxiosError } from "axios";

const getApi = getRouteApi("/");

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { redirect } = getApi.useSearch();

  const router = useRouter();

  const { setToken } = useAuthStore();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["auth"],
    mutationFn: async (credentials: LoginSchema) => login(credentials),
    onSuccess: (token) => {
      setToken(token);
      router.history.replace(redirect ?? "/chat");
    },
  });

  async function submit(data: LoginSchema) {
    try {
      await mutateAsync(data);
      reset();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your username below to login
        </p>
      </div>
      <div className="grid gap-6">
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
          <div className="flex items-center">
            <Label htmlFor="password-input">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
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
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <GoogleLogoIcon weight="bold" />
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
