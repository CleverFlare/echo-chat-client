import { ChatsPanel } from "@/feature/chats/components/chats-panel";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_chats")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex">
      <ChatsPanel />
      <Outlet />
    </div>
  );
}
