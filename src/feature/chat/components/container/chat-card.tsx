"use client";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { useAtom } from "jotai";
import {
  CachedMessages,
  cachedMessagesAtom,
  Message,
  missedMessagesAtom,
} from "@/state/message";
import { formatDistanceToNow } from "date-fns";
import ConditionalRenderer from "../../../../components/utils/conditional-renderer";
import { Check, Checks } from "@phosphor-icons/react";
import { userAtom } from "@/state/auth";

type ChatCardProps = {
  image?: string;
  name: string;
  active?: boolean;
  id: string;
} & ComponentProps<"button">;

export function ChatCard({
  image,
  name,
  active = false,
  id,
  onClick,
  ...props
}: ChatCardProps) {
  const [user] = useAtom(userAtom);
  const [cachedMessages]: [CachedMessages, unknown] =
    useAtom(cachedMessagesAtom);
  const [missedMessages] = useAtom(missedMessagesAtom);

  const unreadNumber = missedMessages[id];

  const messages: Message[] = cachedMessages[id];

  const lastMessage = messages.at(-1);

  const doesLastMessageTimestampExist = lastMessage?.timestamp;

  const areYouTheSender = lastMessage?.sender.id === user.id;

  const isLastMessageSent = lastMessage?.state === "sent";
  const isLastMessageDelivered = lastMessage?.state === "delivered";
  const isLastMessageRead = lastMessage?.state === "read";

  return (
    <button
      className={cn(
        "w-full p-3 rounded-xl flex gap-2 h-max transition-all shadow-none bg-white",
        active && "bg-gray-200",
      )}
      data-testid="chat-card"
      onClick={(...args) => {
        if (onClick) onClick(...args);

        // router.push("/chat");
      }}
      {...props}
    >
      <Avatar>
        <AvatarImage src={image}></AvatarImage>
      </Avatar>
      <div className="flex flex-col flex-1">
        <div className="grid grid-cols-[1fr_auto] justify-between w-full gap-2">
          <p className="font-bold text-sm text-start truncate">{name}</p>
          <ConditionalRenderer shouldRender={doesLastMessageTimestampExist}>
            <p
              className={cn(
                "text-xs text-gray-500",
                unreadNumber && "text-purple-600 font-bold",
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
            lastMessage?.state && "grid-cols-[auto_1fr_auto]",
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
              {lastMessage?.content}
            </p>
            <ConditionalRenderer shouldRender={unreadNumber}>
              <p className="w-[20px] h-[20px] rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white text-xs flex justify-center items-center ms-auto">
                {unreadNumber}
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
