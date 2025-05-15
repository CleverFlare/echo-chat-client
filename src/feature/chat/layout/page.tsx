"use client";

import { useIsClient, useMediaQuery } from "@uidotdev/usehooks";
import ChatWindow from "./chat-window";
import ChatsList from "./chats-list";
import { useAtom } from "jotai";
import { activeChatIDAtom } from "@/state/ui";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const isClient = useIsClient();

  if (!isClient) return null;

  return <ChatPageUI />;
}

export function ChatPageUI() {
  // eslint-disable-next-line
  const isSmall = useMediaQuery("only screen and (max-width: 768px)");

  const [activeChat] = useAtom(activeChatIDAtom);

  return (
    <div className="h-full max-h-[100vh] max-w-[100vw] overflow-hidden">
      <div
        className={cn(
          "grid md:grid-cols-[auto_1fr] grid-cols-[100vw_100vw] h-full",
          activeChat && isSmall ? "-translate-x-full" : "",
        )}
      >
        <ChatsList />
        <ChatWindow className="md:p-4 max-h-full overflow-hidden" />
      </div>
    </div>
  );
}
