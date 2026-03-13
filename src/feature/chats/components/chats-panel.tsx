import { ChatCard } from "./chat-card";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function ChatsPanel() {
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
              <ChatCard
                id="1234"
                firstName="Muhammad"
                lastName="Maher"
                avatar="https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Andrea"
              />
              <ChatCard
                id="1234"
                firstName="Andrea"
                lastName="Avery"
                avatar="https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Andrea"
                unreadCount={1}
              />
              <ChatCard
                id="1234"
                firstName="Jocelyn"
                lastName="George"
                avatar="https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Jocelyn"
                unreadCount={0}
              />
              <ChatCard
                id="1234"
                firstName="Leo"
                lastName="Emery"
                avatar="https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Leo"
                unreadCount={2}
              />
              <ChatCard
                id="1234"
                firstName="Leah"
                lastName="Brian"
                avatar="https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Leah"
                unreadCount={0}
              />
              <ChatCard
                id="1234"
                firstName="Liam"
                lastName="Jack"
                avatar="https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Liam"
                unreadCount={0}
              />
              <ChatCard
                id="1234"
                firstName="Eliza"
                lastName="Amaya"
                avatar="https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Eliza"
                unreadCount={0}
              />
              <ChatCard
                id="1234"
                firstName="Liliana"
                lastName="Jameson"
                avatar="https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Amaya"
                unreadCount={0}
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
