import { RegisterPage } from "@/feature/auth/components/register-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RegisterPage />;
}
