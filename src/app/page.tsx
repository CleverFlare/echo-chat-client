import ChatWindow from "@/layout/chat-window";
import ChatsList from "@/layout/chats-list";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="h-full max-h-screen md:grid md:grid-cols-[auto_1fr]">
      <Suspense>
        <ChatsList />
        <ChatWindow className="my-4 me-4 max-h-full overflow-hidden" />
      </Suspense>
    </div>
  );
}
