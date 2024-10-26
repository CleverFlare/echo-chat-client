"use client";
import { EMPTY_AVATAR_IMAGE } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps } from "react";
import { Check, Checks } from "@phosphor-icons/react";
import moment from "moment";

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
        "w-full bg-white p-2 rounded-lg shadow flex gap-2 h-max transition-all",
        active && "bg-gray-200 shadow-none",
      )}
      data-testid="chat-card"
      {...props}
    >
      <Image
        alt="Avatar"
        src={image ?? EMPTY_AVATAR_IMAGE}
        width={40}
        height={40}
        className="rounded-full h-full aspect-square object-cover"
      />
      <div className="flex flex-col flex-1">
        <div className="grid grid-cols-[1fr_auto] justify-between w-full">
          <p className="font-bold text-sm text-start truncate">{name}</p>
          {lastMessage && (
            <p
              className={cn(
                "text-xs text-gray-500",
                unread && "text-red-500 font-bold",
              )}
            >
              {moment(lastMessage.date).startOf("minute").fromNow()}
            </p>
          )}
        </div>
        {lastMessage && (
          <div
            className={cn(
              "grid grid-cols-[1fr_auto] gap-1 items-center",
              lastMessage.state && "grid-cols-[auto_1fr_auto]",
            )}
          >
            {lastMessage.state === "sent" && (
              <Check className="text-gray-500" size={16} />
            )}
            {lastMessage.state === "read" && (
              <Checks className="text-sky-500" size={20} />
            )}
            <p className="text-sm text-start text-gray-500 truncate">
              {lastMessage.content}
            </p>
            {unread && (
              <p className="w-[20px] h-[20px] rounded-full bg-red-500 text-white text-xs flex justify-center items-center">
                {unread}
              </p>
            )}
          </div>
        )}
      </div>
    </button>
  );
}
