import { ChatWindow } from "@/feature/chats/components/chat-window";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_chats/chats/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/_authenticated/_chats/chats/$id" });
  return (
    <div className="flex-1">
      <ChatWindow activeChatId={id}></ChatWindow>
    </div>
  );
}
