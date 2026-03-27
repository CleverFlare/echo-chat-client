import { MainSidebar } from "@/components/main-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { isSessionExpired } from "@/lib/is-expired-session";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const { data: session, error } = await authClient.getSession();

    if (error || !session) throw redirect({ to: "/login" });

    const isExpired = isSessionExpired(session.session);

    console.log("Expires At", session.session);

    if (isExpired) throw redirect({ to: "/login" });
  },
  onError: () => {
    throw redirect({ to: "/login" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex">
      <SidebarProvider>
        <MainSidebar />
        <Outlet />
      </SidebarProvider>
    </div>
  );
}
