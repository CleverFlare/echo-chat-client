"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { ChatCard } from "./chat-card";

type Connection = {
  id: string;
  image?: string;
  name: string;
  unread?: number;
  lastMessage: {
    date: string;
    content: string;
    state?: "sent" | "read" | null;
  };
};

export function ChatsList({ connections = [] }: { connections: Connection[] }) {
  const [active, setActive] = useState<number | string>(0);
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
