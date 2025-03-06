"use client";
import { cn } from "@/lib/utils";
import { ComponentProps, useEffect, useState } from "react";
import { Check, Checks } from "@phosphor-icons/react";
import ConditionalRenderer from "@/components/utils/conditional-renderer";
import { Avatar, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";

type ChatCardProps = {
  image?: string;
  name: string;
  active?: boolean;
  unread?: number;
  lastMessage?: {
    date: string;
    content: string;
    state?: "sent" | "received" | "read" | null;
  };
} & ComponentProps<"button">;

export function ChatCard({
  image,
  name,
  active = false,
  lastMessage,
  unread,
  ...props
}: ChatCardProps) {
  const hasLastMessageDate = !!lastMessage?.date;
  const lastMessageRelativeDate =
    hasLastMessageDate &&
    formatDistanceToNow(lastMessage?.date, { addSuffix: true });

  const [timeAgo, setTimeAgo] = useState<string | null>(
    lastMessageRelativeDate || null,
  );

  useEffect(() => {
    if (!hasLastMessageDate) return;

    const lastMessageRelativeDate = formatDistanceToNow(
      new Date(lastMessage.date),
      { addSuffix: true },
    );

    const updateRelativeTime = () => {
      setTimeAgo(lastMessageRelativeDate);
    };

    // Initial update
    updateRelativeTime();

    // Update every 60 seconds
    const interval = setInterval(updateRelativeTime, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [lastMessage?.date, hasLastMessageDate]);

  return (
    <button
      className={cn(
        "w-full p-3 rounded-xl flex gap-2 h-max transition-all shadow-none bg-white",
        active && "bg-gray-200",
      )}
      data-testid="chat-card"
      {...props}
    >
      <Avatar>
        <AvatarImage src={image}></AvatarImage>
      </Avatar>
      <div className="flex flex-col flex-1">
        <div className="grid grid-cols-[1fr_auto] justify-between w-full gap-2">
          <p className="font-bold text-sm text-start truncate">{name}</p>
          <ConditionalRenderer shouldRender={lastMessage && lastMessage.date}>
            <p
              className={cn(
                "text-xs text-gray-500",
                unread && "text-purple-600 font-bold",
              )}
            >
              {timeAgo}
            </p>
          </ConditionalRenderer>
        </div>
        <ConditionalRenderer shouldRender={lastMessage}>
          <div
            className={cn(
              "grid grid-cols-[1fr_auto] gap-1 items-center",
              lastMessage?.state && "grid-cols-[auto_1fr_auto]",
            )}
          >
            <ConditionalRenderer shouldRender={lastMessage?.state === "sent"}>
              <Check className="text-gray-500" size={16} />
            </ConditionalRenderer>
            <ConditionalRenderer
              shouldRender={lastMessage?.state === "received"}
            >
              <Checks className="text-gray-500" size={20} />
            </ConditionalRenderer>
            <ConditionalRenderer shouldRender={lastMessage?.state === "read"}>
              <Checks className="text-sky-500" size={20} />
            </ConditionalRenderer>
            <p className="text-sm text-start text-gray-500 truncate">
              {lastMessage?.content}
            </p>
            <ConditionalRenderer shouldRender={unread}>
              <p className="w-[20px] h-[20px] rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white text-xs flex justify-center items-center">
                {unread}
              </p>
            </ConditionalRenderer>
          </div>
        </ConditionalRenderer>
      </div>
    </button>
  );
}
