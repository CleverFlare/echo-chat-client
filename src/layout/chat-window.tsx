"use client";
import { cn } from "@/lib/utils";
import { Connection, connectionsAtom } from "@/state/connections";
import { ComponentProps } from "react";
import ConditionalRenderer from "@/components/utils/conditional-renderer";
import ChatStatusBar from "@/components/container/chat-status-bar";
import MessageWritingBar from "@/components/container/message-writing-bar";
import { useAtom } from "jotai";
import { activeChatIDAtom } from "@/state/ui";
import Image from "next/image";
import Messages from "@/components/container/messages";

type ChatWindowProps = ComponentProps<"div"> & {
  active: string | null;
  connections: Record<string, Connection> | null;
};

function ChatWindowUI({
  className,
  active,
  connections,
  ...props
}: ChatWindowProps) {
  const connection = connections?.[active!] ?? null;

  return (
    <div className={cn("flex", className)} {...props}>
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
        <div
          className="h-full w-full rounded-2xl p-4 grid grid-rows-[auto_1fr_auto] relative"
          style={{
            backgroundImage: `url("/social-media-wallpaper-pattern.png")`,
            backgroundSize: "30%",
            backgroundBlendMode: "overlay",
          }}
        >
          <ChatStatusBar connection={connection!} />
          <Messages />
          <MessageWritingBar onSend={(value) => console.log(value)} />
        </div>
      </ConditionalRenderer>
    </div>
  );
}

function ChatWindow({ ...props }: ComponentProps<"div">) {
  const [active] = useAtom(activeChatIDAtom);
  const [connections] = useAtom(connectionsAtom);
  return <ChatWindowUI active={active} connections={connections} {...props} />;
}

ChatWindow.UI = ChatWindowUI;

export default ChatWindow;
