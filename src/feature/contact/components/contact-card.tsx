import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import ConditionalRenderer from "../../../components/utils/conditional-renderer";
import { Check, Checks } from "@phosphor-icons/react";
import { useAuthStore } from "@/store/auth";
import { type Message, useChatStore } from "@/store/chat";

type ContactCardProps = {
  avatarUrl?: string;
  name: string;
  active?: boolean;
  id: string;
  unread: number;
} & ComponentProps<"button">;

export function ContactCard({
  avatarUrl,
  name,
  active = false,
   
  id,
  unread,
  onClick,
  ...props
}: ContactCardProps) {
  const { user } = useAuthStore();
  const { messages } = useChatStore();

  const lastMessage: Message = messages[id]
    ? Object.values(messages[id])?.[0]?.[0]
    : ({} as Message);

  const areYouTheSender = lastMessage?.sender?.id === user!.id;

  const isLastMessageSent = lastMessage?.status === "sent";
  const isLastMessageDelivered = lastMessage?.status === "delivered";
  const isLastMessageRead = lastMessage?.status === "read";

  return (
    <button
      className={cn(
        "w-full p-3 rounded-xl flex gap-2 h-max transition-all shadow-none bg-white",
        active && "bg-muted",
      )}
      data-testid="chat-card"
      onClick={onClick}
      {...props}
    >
      <Avatar>
        <AvatarImage src={avatarUrl}></AvatarImage>
      </Avatar>
      <div className="flex flex-col flex-1">
        <div className="grid grid-cols-[1fr_auto] justify-between w-full gap-2">
          <p className="font-semibold text-sm text-start truncate">{name}</p>
          <ConditionalRenderer shouldRender={!!lastMessage?.timestamp}>
            <p
              className={cn(
                "text-xs font-medium text-gray-500",
                unread && "text-purple-600",
              )}
            >
              {formatDistanceToNow(
                lastMessage?.timestamp ?? new Date().toISOString(),
              )}
            </p>
          </ConditionalRenderer>
        </div>
        <div
          className={cn(
            "grid grid-cols-[1fr_auto] gap-1 items-center",
            lastMessage?.status && "grid-cols-[auto_1fr_auto]",
          )}
        >
          <ConditionalRenderer shouldRender={lastMessage}>
            <ConditionalRenderer shouldRender={areYouTheSender}>
              <ConditionalRenderer shouldRender={isLastMessageSent}>
                <Check className="text-gray-500" size={16} />
              </ConditionalRenderer>
              <ConditionalRenderer shouldRender={isLastMessageDelivered}>
                <Checks className="text-gray-500" size={20} />
              </ConditionalRenderer>
              <ConditionalRenderer shouldRender={isLastMessageRead}>
                <Checks className="text-sky-500" size={20} />
              </ConditionalRenderer>
            </ConditionalRenderer>
            <p className="text-sm text-start text-gray-500 truncate">
              {lastMessage?.content ?? "..."}
            </p>
            <ConditionalRenderer shouldRender={unread}>
              <p className="w-[20px] h-[20px] rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white text-xs flex justify-center items-center ms-auto">
                {unread}
              </p>
            </ConditionalRenderer>
          </ConditionalRenderer>
          <ConditionalRenderer shouldRender={!lastMessage}>
            <p className="text-sm text-start text-gray-500">...</p>
          </ConditionalRenderer>
        </div>
      </div>
    </button>
  );
}
