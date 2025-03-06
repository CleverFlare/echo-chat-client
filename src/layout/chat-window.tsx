"use client";
import { cn } from "@/lib/utils";
import { connectionsAtom } from "@/state/connections";
import { ComponentProps } from "react";
import ConditionalRenderer from "@/components/utils/conditional-renderer";
import ChatStatusBar from "@/components/container/chat-status-bar";
import MessageWritingBar from "@/components/container/message-writing-bar";
import { useAtom } from "jotai";
import { activeChatIDAtom } from "@/state/ui";
import Image from "next/image";
import ChatMessages from "./chat-messages";

export default function ChatWindow({
  className,
  ...props
}: ComponentProps<"div">) {
  const [active] = useAtom(activeChatIDAtom);
  const [connections] = useAtom(connectionsAtom);

  const connection = connections?.[active!] ?? null;

  return (
    <div
      className={cn(
        "bg-gray-100 flex-1 rounded-2xl p-4 grid grid-rows-[auto_1fr_auto]",
        className,
      )}
      {...props}
    >
      <ConditionalRenderer shouldRender={!connection}>
        <div className="w-full row-span-3 h-full flex flex-col justify-center items-center gap-4">
          <Image
            src="/echoes-logo.png"
            alt="Logo"
            width={200}
            height={200}
            className="opacity-50 mb-4"
          />
          <p className="text-4xl font-medium opacity-50">EchoApp Web</p>
          <p className="w-[500px] text-center text-balance opacity-30">
            Bringing the best of real-time messaging and dynamic communities
            together—connect, chat, and grow, all in one seamless experience. 🚀
          </p>
        </div>
      </ConditionalRenderer>
      <ConditionalRenderer shouldRender={connection}>
        <ChatStatusBar connection={connection!} />
        <ChatMessages />
        <MessageWritingBar onSend={(value) => console.log(value)} />
      </ConditionalRenderer>
    </div>
  );
}
