import { ChatsPanel } from "@/feature/chats/components/chats-panel";
import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_chats")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ strict: false });
  return (
    <div className="flex flex-1">
      <ChatsPanel activeChatId={id} />
      <Outlet />
    </div>
  );
}
