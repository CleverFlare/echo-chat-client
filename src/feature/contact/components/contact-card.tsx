import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import ConditionalRenderer from "../../../components/utils/conditional-renderer";
import { useAuthStore } from "@/store/auth";
import type { ContactLastMessage } from "@/store/contacts";
import { MessageStatusIcon } from "@/components/message-status-icon";
import { Badge } from "@/components/ui/badge";

type ContactCardProps = {
  avatarUrl?: string;
  name: string;
  active?: boolean;
  unread: number;
  lastMessage: ContactLastMessage | undefined;
  isTyping: boolean;
  isOnline: boolean;
} & ComponentProps<"button">;

export function ContactCard({
  avatarUrl,
  name,
  active = false,
  lastMessage,
  unread,
  onClick,
  isTyping = false,
  isOnline = false,
  ...props
}: ContactCardProps) {
  const { user } = useAuthStore();

  if (!user) return null;

  const areYouTheSender = lastMessage?.senderId === user!.id;

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
      <div className="relative">
        <Avatar>
          <AvatarImage src={avatarUrl}></AvatarImage>
          <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <Badge
          className={cn(
            "size-2.5 p-0 rounded-full transition-colors ring-3 ring-white absolute bottom-0.5 right-0.5",
            isOnline ? "bg-purple-500" : "bg-neutral-300",
          )}
        />
      </div>
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
            areYouTheSender && "grid-cols-[auto_auto_1fr_auto]",
          )}
        >
          <ConditionalRenderer shouldRender={lastMessage}>
            <ConditionalRenderer shouldRender={isTyping}>
              <p className="text-sm text-start col-span-3 text-purple-500">
                typing...
              </p>
            </ConditionalRenderer>
            <ConditionalRenderer shouldRender={!isTyping}>
              <ConditionalRenderer shouldRender={areYouTheSender}>
                <MessageStatusIcon status={lastMessage?.status ?? "pending"} />
              </ConditionalRenderer>
              <ConditionalRenderer shouldRender={areYouTheSender}>
                <p className="text-sm text-start text-gray-500 truncate">
                  You:
                </p>
              </ConditionalRenderer>
              <p className="text-sm text-start text-gray-500 truncate">
                {lastMessage?.content ?? "..."}
              </p>
            </ConditionalRenderer>
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
