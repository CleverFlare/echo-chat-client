"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlass } from "@phosphor-icons/react";
import UserCard from "@/components/container/user-card";
import ConditionalRenderer from "@/components/utils/conditional-renderer";
import { Connection, connectionsAtom } from "@/state/connections";
import { useAtom } from "jotai";
import { activeChatIDAtom } from "@/state/ui";
import { Resizable } from "re-resizable";
import { EmptyChatState } from "@/feature/chat/components/ui/empty-chat-state";
import { ChatCards } from "@/feature/chat/components/container/chat-cards";

function ChatsListUI({
  connections = {},
  active,
  setActive,
}: {
  connections: Record<string, Connection> | null;
  active: string | null;
  setActive: (id: string) => void;
}) {
  const [search, setSearch] = useState<string>("");

  const isEmpty = connections ? Object.keys(connections).length <= 0 : false;

  return (
    <Resizable
      defaultSize={{ width: 300 }}
      enable={{
        right: true,
        bottom: false,
      }}
      className="min-w-[300px] h-full flex px-4"
    >
      <div className="flex-1 py-4 flex flex-col gap-2">
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
          <EmptyChatState />
        </ConditionalRenderer>
        <ConditionalRenderer shouldRender={!isEmpty}>
          <div
            className="flex flex-col gap-2 flex-1 overflow-y-auto"
            data-testid="chat-card-list"
          >
            <ChatCards
              search={search}
              connections={connections ? Object.values(connections) : []}
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
    </Resizable>
  );
}

function ChatsList() {
  const [connections] = useAtom(connectionsAtom);
  const [active, setActive] = useAtom(activeChatIDAtom);

  return (
    <ChatsListUI
      connections={connections}
      active={active}
      setActive={setActive}
    />
  );
}

ChatsList.UI = ChatsListUI;

export default ChatsList;
