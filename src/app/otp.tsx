import { OtpPage } from "@/feature/auth/components/otp-page";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod/v4";

export const Route = createFileRoute("/otp")({
  component: RouteComponent,
  validateSearch: z.object({
    contact: z.string(),
    method: z.enum(["phone", "email"]),
    intent: z.enum(["login", "register"]),
  }),
});

function RouteComponent() {
  const searchParams = Route.useSearch();
  return <OtpPage {...searchParams} />;
}
