"use client";

import { useIsClient, useMediaQuery } from "@uidotdev/usehooks";
import { cn } from "@/lib/utils";
import ChatRoom from "./chat-room";
import ContactsList from "../../contact/components/contacts-list";
import { useChatStore } from "@/store/chat";

export default function ChatPage() {
  const isClient = useIsClient();

  if (!isClient) return null;

  return <ChatPageUI />;
}

export function ChatPageUI() {
  // eslint-disable-next-line
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
        <ChatRoom className="md:p-4 max-h-full overflow-hidden" />
      </div>
    </div>
  );
}
