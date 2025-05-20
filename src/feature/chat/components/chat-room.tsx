import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";
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

type ChatWindowProps = ComponentProps<"div"> & {};

function ChatRoom({ className, ...props }: ChatWindowProps) {
  const { addMessage, activeChatId, setActiveChat } = useChatStore();
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

  if (!activeContact) {
    return (
      <div className="w-full row-span-3 h-full flex flex-col justify-center items-center gap-4 md:rounded-2xl bg-muted">
        <img
          src="/echoes-logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="opacity-50 mb-4 h-auto"
        />
        <p className="text-4xl font-medium opacity-50">EchoApp Web</p>
        <p className="w-[500px] text-center text-balance opacity-30">
          Bringing the best of real-time messaging and dynamic communities
          together—connect, chat, and grow, all in one seamless experience. 🚀
        </p>
      </div>
    );
  }

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
            onClick={() => {
              setActiveChat(null);
            }}
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
