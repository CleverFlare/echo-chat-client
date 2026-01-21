import { SocketProvider } from "@/components/socket-provider";
import ContactsList from "@/feature/contact/components/contacts-list";
import ProfilePanel from "@/feature/profile/components/profile-panel";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useChatStore } from "@/store/chat";
import { useProfileStore } from "@/store/profile";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useMediaQuery } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "motion/react";

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
  const openProfile = useProfileStore((state) => state.open);

  return (
    <SocketProvider>
      <div className="h-full max-h-[100vh] max-w-[100vw] overflow-hidden">
        <div
          className={cn(
            "grid md:grid-cols-[auto_1fr_auto] grid-cols-[100vw_100vw_100vw] h-full transition-transform ease",
            activeChatId && isSmall ? "-translate-x-full" : "",
            openProfile && isSmall ? "-translate-x-[200%]" : "",
          )}
        >
          <ContactsList />
          <div className="flex md:p-4 max-h-full overflow-hidden">
            <Outlet />
          </div>
          <AnimatePresence>
            {openProfile && (
              <motion.div
                exit={{ width: !isSmall ? 0 : "auto" }}
                initial={{ width: !isSmall ? 0 : "auto" }}
                animate={{ width: "auto" }}
              >
                <div className="md:w-[350px] w-full py-4 h-full overflow-hidden">
                  <ProfilePanel />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SocketProvider>
  );
}
