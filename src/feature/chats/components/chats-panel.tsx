import { ChatCard } from "./chat-card";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useChats } from "../stores/chats";

export function ChatsPanel({ activeChatId }: { activeChatId?: string }) {
  const chats = useChats((state) => state.chats);
  return (
    <Sidebar collapsible="none" className="w-80 border-r">
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl">Chats</h2>
              <Input placeholder="Search..." />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex flex-col gap-4">
              {chats.map((chat) => (
                <ChatCard {...chat} active={activeChatId === chat.id} />
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
