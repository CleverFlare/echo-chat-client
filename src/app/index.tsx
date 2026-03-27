import { createFileRoute, redirect } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { isSessionExpired } from "@/lib/is-expired-session";

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
});
