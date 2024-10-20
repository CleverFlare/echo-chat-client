"use client";
import { EMPTY_AVATAR_IMAGE } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps, useState } from "react";
import { Input } from "./ui/input";
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

const connections: {
  id: string;
  image?: string;
  name: string;
  unread?: number;
  lastMessage: {
    date: string;
    content: string;
    state?: "sent" | "read" | null;
  };
}[] = [
  {
    id: "1",
    name: "Muhammad Maher",
    image:
      "https://qph.cf2.quoracdn.net/main-qimg-5eb631ae6f587af2631f6d3348047693.webp",
    lastMessage: {
      date: "2024-10-09T21:00:00.000Z",
      content: "How are you doing?",
      state: "sent",
    },
  },
  {
    id: "2",
    name: "Omaima Maher",
    image:
      "https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_960_720.jpg",
    unread: 1,
    lastMessage: {
      date: "2024-10-19T21:00:00.000Z",
      content: "Bro!",
    },
  },
];

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

export function ChatsList() {
  const [active, setActive] = useState<number | string>(connections[0].id);
  const [search, setSearch] = useState<string>("");
  return (
    <div className="w-[300px] h-full p-4 bg-gray-50 flex flex-col gap-2">
      <h2 className="text-3xl font-bold">Chats</h2>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      {connections.map((connection) => (
        <ChatCard
          key={connection.id}
          active={active === connection.id}
          onClick={() => setActive(connection.id)}
          {...connection}
        />
      ))}
    </div>
  );
}
