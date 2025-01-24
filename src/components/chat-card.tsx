"use client";
import { EMPTY_AVATAR_IMAGE } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps } from "react";
import { Check, Checks } from "@phosphor-icons/react";
import moment from "moment";
import ConditionalRenderer from "@/components/ui/conditional-renderer";
import { Avatar, AvatarImage } from "./ui/avatar";

type ChatCardProps = {
  image?: string;
  name: string;
  active?: boolean;
  unread?: number;
  lastMessage?: {
    date: string;
    content: string;
    state?: "sent" | "read" | null;
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
  return (
    <button
      className={cn(
        "w-full p-3 rounded-xl flex gap-2 h-max transition-all shadow-none",
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
          <ConditionalRenderer shouldRender={lastMessage}>
            <p
              className={cn(
                "text-xs text-gray-500",
                unread && "text-green-600 font-bold",
              )}
            >
              {moment(lastMessage?.date).startOf("minute").fromNow()}
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
            <ConditionalRenderer shouldRender={lastMessage?.state === "read"}>
              <Checks className="text-sky-500" size={20} />
            </ConditionalRenderer>
            <p className="text-sm text-start text-gray-500 truncate">
              {lastMessage?.content}
            </p>
            <ConditionalRenderer shouldRender={unread}>
              <p className="w-[20px] h-[20px] rounded-full bg-green-600 text-white text-xs flex justify-center items-center">
                {unread}
              </p>
            </ConditionalRenderer>
          </div>
        </ConditionalRenderer>
      </div>
    </button>
  );
}
