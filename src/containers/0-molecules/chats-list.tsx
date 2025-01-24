"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { ChatCard } from "@/components/chat-card";
import { ChatsCircle, MagnifyingGlass } from "@phosphor-icons/react";
import UserCard from "@/components/user-card";

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
  const [active, setActive] = useState<string>("");

  const [search, setSearch] = useState<string>("");

  return (
    <div className="w-[300px] h-full p-4 flex flex-col gap-2">
      <h2 className="text-3xl font-bold">Chats</h2>
      <div className="relative">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="pe-8"
          data-testid="chats-list-search-input"
        />
        <MagnifyingGlass
          weight="bold"
          color="#aaa"
          className="absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>
      <EmptyState connections={connections} />
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        <ChatCards
          search={search}
          connections={connections}
          active={active}
          setActive={setActive}
        />
      </div>
      <UserCard
        name="Muhammad Maher"
        image="https://qph.cf2.quoracdn.net/main-qimg-5eb631ae6f587af2631f6d3348047693.webp"
        username="@flare"
      />
    </div>
  );
}

function ChatCards({
  connections,
  active,
  setActive,
  search = "",
}: {
  connections: Connection[];
  active?: string | null;
  setActive: Dispatch<SetStateAction<string>>;
  search: string;
}) {
  const isEmptyConnections = connections.length <= 0;
  if (isEmptyConnections) return;

  const filteredConnections = connections.filter((connection) =>
    connection.name.toLowerCase().startsWith(search.toLowerCase()),
  );

  const isEmptySearchResults = filteredConnections.length <= 0;

  if (isEmptySearchResults) return <EmptySearch search={search} />;

  return filteredConnections.map((connection) => (
    <ChatCard
      key={connection.id}
      active={active === connection.id}
      onClick={() => setActive(connection.id)}
      {...connection}
    />
  ));
}

function EmptyState({ connections }: { connections: Connection[] }) {
  if (connections.length > 0) return;

  return (
    <div
      className="flex flex-col justify-center items-center mt-4"
      data-testid="empty-state"
    >
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

function EmptySearch({ search }: { search: string }) {
  const shouldTrancate = search.length > 15;
  return (
    <div
      className="flex flex-col justify-center items-center mt-4"
      data-testid="empty-search-results"
    >
      <div className="rounded-full p-4 bg-black/5">
        <MagnifyingGlass size={40} color="#00000080" />
      </div>
      <p className="font-bold text-lg text-center mt-2">No results</p>
      <p className="font-bold text-sm text-center text-gray-500">
        No connection found that matches{" "}
        {search.match(/^.{1,15}/gi)?.[0]?.trim() ?? ""}
        {shouldTrancate && "..."}
      </p>
    </div>
  );
}
