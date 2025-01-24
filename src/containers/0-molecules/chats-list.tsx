"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ChatCard } from "@/components/chat-card";
import { ChatsCircle, MagnifyingGlass } from "@phosphor-icons/react";
import UserCard from "@/components/user-card";
import { useCustomRouter } from "@/hooks/use-custom-router";
import { useSearchParams } from "next/navigation";
import ConditionalRenderer from "@/components/ui/conditional-renderer";
import { AnimatePresence, motion } from "motion/react";
import { compareDesc, parseISO } from "date-fns";
import { Connection, useConnections } from "@/state/use-connections";

export function ChatsList({
  connections: connectionsProp = {},
}: {
  connections: Record<string, Connection>;
}) {
  const router = useCustomRouter();
  const searchParams = useSearchParams();
  const state = useConnections();

  useEffect(() => {
    if (!state.data) state.setData(connectionsProp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionsProp]);

  const connections = state.data ?? connectionsProp;

  const [search, setSearch] = useState<string>("");

  return (
    <div className="w-[300px] h-full flex flex-col gap-2 p-4">
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
      <ConditionalRenderer shouldRender={Object.keys(connections).length <= 0}>
        <EmptyState />
      </ConditionalRenderer>
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        <ChatCards
          search={search}
          connections={Object.values(connections)}
          active={searchParams.get("active") ?? ""}
          onActiveClick={(value: string) =>
            router.searchParams.set("active", value)
          }
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
  connections: connectionsProp,
  active,
  onActiveClick,
  search = "",
}: {
  connections: Connection[];
  active?: string | null;
  onActiveClick: (value: string) => void;
  search: string;
}) {
  const isEmptyConnections = connectionsProp.length <= 0;
  if (isEmptyConnections) return;

  let connections = connectionsProp.filter((connection) =>
    connection.name.toLowerCase().startsWith(search.toLowerCase()),
  );

  connections = connections.sort((a, b) =>
    compareDesc(parseISO(a.lastMessage.date), parseISO(b.lastMessage.date)),
  );

  const isEmptySearchResults = connections.length <= 0;

  if (isEmptySearchResults) return <EmptySearch search={search} />;

  return (
    <AnimatePresence>
      {connections.map((connection) => (
        <motion.div key={connection.id} layout>
          <ChatCard
            active={active === connection.id}
            onClick={() => onActiveClick(connection.id)}
            {...connection}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

function EmptyState() {
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
