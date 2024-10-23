"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { ChatCard } from "./chat-card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChatsCircle } from "@phosphor-icons/react";

export type Connection = {
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
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const active = searchParams.get("active") ?? null;
  function setActive(value: string) {
    const params = new URLSearchParams(searchParams);

    params.set("active", value);

    router.replace(`${pathname}?${params.toString()}`);
  }

  const [search, setSearch] = useState<string>("");

  const isEmpty = connections.length < 1;

  return (
    <div className="w-[300px] h-full p-4 bg-gray-50 flex flex-col gap-2">
      <h2 className="text-3xl font-bold">Chats</h2>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <EmptyState connections={connections} />
      <ChatCards
        connections={connections}
        active={active}
        setActive={setActive}
      />
    </div>
  );
}

function EmptyState({ connections }: { connections: Connection[] }) {
  if (connections.length > 0) return;

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <div className="rounded-full p-4 bg-black/5">
        <ChatsCircle size={40} color="#00000080" />
      </div>
      <p className="font-bold text-lg text-center mt-2">No chats, yet.</p>
      <p className="font-bold text-sm text-center text-gray-500">
        Here, you&apos;ll find all your chat history.
      </p>
    </div>
  );
}

function ChatCards({
  connections,
  active,
  setActive,
}: {
  connections: Connection[];
  active?: string | null;
  setActive: (value: string) => void;
}) {
  return connections.map((connection) => (
    <ChatCard
      key={connection.id}
      active={active === connection.id}
      onClick={() => setActive(connection.id)}
      {...connection}
    />
  ));
}
