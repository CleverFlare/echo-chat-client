"use client";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import ChatStatusBar, {
  StartSide,
  UserStatus,
} from "@/feature/chat/components/chat-status-bar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "@phosphor-icons/react";
import { useAuthStore } from "@/store/auth";
import MessageInputBox from "./message-input-box";
import { useChatStore } from "@/store/chat";
import { useContactsStore } from "@/store/contacts";
import MessagesList from "./messages-list";
import { toLocalISOString } from "@/lib/to-local-iso-string";
import { useParams, useRouter } from "next/navigation";

type ChatWindowProps = ComponentProps<"div"> & {};

function ChatRoom({ className, ...props }: ChatWindowProps) {
  // eslint-disable-next-line
  const { addMessage } = useChatStore();
  const { chat: activeChatId } = useParams<{ chat: string }>();
  const { user } = useAuthStore();
  const { getContact } = useContactsStore();

  function pushMessages(message: string) {
    addMessage(activeChatId!, toLocalISOString().split("T")[0], {
      id: crypto.randomUUID(),
      sender: {
        id: user!.id,
        firstName: user!.firstName,
        lastName: user!.firstName,
        avatarUrl: user!.avatarUrl,
        username: user!.username,
      },
      isEdited: false,
      status: "read",
      content: message,
      timestamp: toLocalISOString(),
    });
  }

  const activeContact = getContact(activeChatId!);

  const router = useRouter();

  return (
    <div
      className={cn(
        "h-full w-full md:rounded-2xl p-4 grid grid-rows-[auto_1fr_auto] relative bg-muted overflow-hidden",
        className,
      )}
      {...props}
    >
      <div
        className="absolute top-0 left-0 w-full h-full opacity-20 z-10"
        style={{
          backgroundImage: `url("/social-media-wallpaper-pattern-transparent.png")`,
          backgroundSize: "clamp(300px, 30%, 500px) auto",
          backgroundBlendMode: "overlay",
        }}
      />
      <ChatStatusBar className="z-20">
        <StartSide className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            className="md:hidden"
            onClick={() => router.push("/")}
          >
            <ArrowLeft />
          </Button>
          <UserStatus contact={activeContact!} />
        </StartSide>
      </ChatStatusBar>
      <MessagesList />
      <MessageInputBox onSend={pushMessages} />
    </div>
  );
}

export default ChatRoom;
