"use client";
import { cn } from "@/lib/utils";
import { Connection, connectionsAtom } from "@/state/connections";
import { ComponentProps } from "react";
import ConditionalRenderer from "@/components/utils/conditional-renderer";
import ChatStatusBar, {
  StartSide,
  UserStatus,
} from "@/components/container/chat-status-bar";
import MessageWritingBar from "@/feature/messages/components/container/message-writing-bar";
import { useAtom } from "jotai";
import { activeChatIDAtom } from "@/state/ui";
import Image from "next/image";
import Messages from "@/feature/messages/components/container/messages";
import { messagesAtom } from "@/state/message";
import { userAtom } from "@/state/auth";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "@phosphor-icons/react";

type ChatWindowProps = ComponentProps<"div"> & {
  active: string | null;
  connections: Record<string, Connection> | null;
  pushMessages: (message: string) => void;
};

function ChatWindowUI({
  className,
  active,
  connections,
  pushMessages,
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
            priority
            className="opacity-50 mb-4 h-auto"
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
          <ChatStatusBar>
            <StartSide>
              <UserStatus connection={connection!} />
            </StartSide>
          </ChatStatusBar>
          <Messages />
          <MessageWritingBar onSend={pushMessages} />
        </div>
      </ConditionalRenderer>
    </div>
  );
}

function ChatWindow({ ...props }: ComponentProps<"div">) {
  const [active] = useAtom(activeChatIDAtom);
  const [connections] = useAtom(connectionsAtom);
  const [user] = useAtom(userAtom);
  const [messages, setMessages] = useAtom(messagesAtom);

  function pushMessages(message: string) {
    setMessages([
      ...messages,
      {
        id: crypto.randomUUID(),
        type: "text",
        sender: { id: user.id, name: user.name, avatarUrl: user.avatarUrl },
        state: "read",
        direction: "outgoing",
        content: message,
        timestamp: new Date().toISOString(),
      },
    ]);
  }
  return (
    <ChatWindowUI
      active={active}
      connections={connections}
      pushMessages={pushMessages}
      {...props}
    />
  );
}

ChatWindow.UI = ChatWindowUI;

export default ChatWindow;
