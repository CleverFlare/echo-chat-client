import ContactsList from "@/feature/contact/components/contacts-list";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useChatStore } from "@/store/chat";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useMediaQuery } from "@uidotdev/usehooks";

export const Route = createFileRoute("/_chat")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    const { token } = useAuthStore.getState();

    if (!token) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  const isSmall = useMediaQuery("only screen and (max-width: 768px)");

  const { activeChatId } = useChatStore();
  return (
    <div className="h-full max-h-[100vh] max-w-[100vw] overflow-hidden">
      <div
        className={cn(
          "grid md:grid-cols-[auto_1fr] grid-cols-[100vw_100vw] h-full transition-transform ease",
          activeChatId && isSmall ? "-translate-x-full" : "",
        )}
      >
        <ContactsList />
        <div className="flex md:p-4 max-h-full overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
