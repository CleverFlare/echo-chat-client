"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ChatCard } from "@/components/container/chat-card";
import { ChatsCircle, MagnifyingGlass } from "@phosphor-icons/react";
import UserCard from "@/components/container/user-card";
import ConditionalRenderer from "@/components/utils/conditional-renderer";
import { AnimatePresence, motion } from "motion/react";
import { compareDesc, parseISO } from "date-fns";
import { Connection, connectionsAtom } from "@/state/connections";
import { useAtom } from "jotai";
import { activeChatIDAtom } from "@/state/ui";

export function ChatsList({
  connections: connectionsProp = {},
}: {
  connections?: Record<string, Connection>;
}) {
  const [active, setActive] = useAtom(activeChatIDAtom);
  const [state, setState] = useAtom(connectionsAtom);

  useEffect(() => {
    if (!state) setState(connectionsProp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionsProp]);

  const connections = state ?? connectionsProp;

  const [search, setSearch] = useState<string>("");

  const isEmpty = Object.keys(connections).length <= 0;

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
      <ConditionalRenderer shouldRender={isEmpty}>
        <EmptyState />
      </ConditionalRenderer>
      <ConditionalRenderer shouldRender={!isEmpty}>
        <div
          className="flex flex-col gap-2 flex-1 overflow-y-auto"
          data-testid="chat-card-list"
        >
          <ChatCards
            search={search}
            connections={Object.values(connections)}
            active={active}
            onActiveClick={(value: string) => setActive(value)}
          />
        </div>
      </ConditionalRenderer>
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
      className="flex flex-col items-center mt-4 flex-1"
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
