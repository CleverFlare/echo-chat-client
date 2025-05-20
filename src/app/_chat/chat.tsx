import ChatRoom from "@/feature/chat/components/chat-room";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_chat/chat")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ChatRoom />;
}
