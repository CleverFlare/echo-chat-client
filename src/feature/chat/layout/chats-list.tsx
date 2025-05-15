"use client";
import { cloneElement, useState } from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlass, UserPlus } from "@phosphor-icons/react";
import UserCard from "@/components/container/user-card";
import ConditionalRenderer from "@/components/utils/conditional-renderer";
import { Connection, connectionsAtom } from "@/state/connections";
import { useAtom } from "jotai";
import { activeChatIDAtom } from "@/state/ui";
import { Resizable } from "re-resizable";
import { EmptyChatState } from "@/feature/chat/components/ui/empty-chat-state";
import { ChatCards } from "@/feature/chat/components/container/chat-cards";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";

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

  const isSmall = useMediaQuery("only screen and (max-width: 768px)");

  const Component = isSmall ? (
    <div className="min-w-[300px] h-full flex px-4 max-md:w-full border-border" />
  ) : (
    <Resizable
      defaultSize={isSmall ? undefined : { width: 300 }}
      enable={{
        right: true,
        bottom: false,
      }}
      className="min-w-[300px] h-full flex px-4 max-md:w-full border-border"
    />
  );

  return cloneElement(
    Component,
    {},
    <div className="flex-1 py-4 flex flex-col gap-2">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Messages</h2>
        <div className="flex gap-2">
          <Button size="icon">
            <UserPlus size={20} />
          </Button>
        </div>
      </div>
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
    </div>,
  );
}

ChatsList.UI = ChatsListUI;

export default ChatsList;
