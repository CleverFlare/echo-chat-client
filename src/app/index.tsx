import { authClient } from "@/lib/auth-client";
import { isSessionExpired } from "@/lib/is-expired-session";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const { data: session, error } = await authClient.getSession();

    if (error || !session) throw redirect({ to: "/login" });

    const isExpired = isSessionExpired(session.session);

    console.log("Expired session", isExpired);

    if (isExpired) throw redirect({ to: "/login" });

    throw redirect({ to: "/chats" });
  },
  onError: () => {
    throw redirect({ to: "/login" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
