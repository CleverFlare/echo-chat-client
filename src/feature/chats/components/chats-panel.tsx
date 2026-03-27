import { ChatCard } from "./chat-card";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useChats } from "../stores/chats";
import { SearchInput } from "../../../components/search-input";
import { useState } from "react";

export function ChatsPanel({ activeChatId }: { activeChatId?: string }) {
  const chats = useChats((state) => state.chats);
  const [searchState, setSearchState] = useState<string>("");
  return (
    <Sidebar collapsible="none" className="w-80 border-r">
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl">Chats</h2>
              <SearchInput value={searchState} onChange={setSearchState} />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex flex-col gap-4">
              {Object.values(chats)
                .filter(
                  (chat) =>
                    chat.firstName.startsWith(searchState) ||
                    chat.lastName.startsWith(searchState) ||
                    `${chat.firstName} ${chat.lastName}`.startsWith(
                      searchState,
                    ),
                )
                .map((chat) => (
                  <ChatCard
                    key={chat.id}
                    {...chat}
                    active={activeChatId === chat.id}
                  />
                ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
