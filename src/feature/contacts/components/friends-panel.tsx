import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { useFriends } from "../stores/friends";
import { FriendCard } from "./friend-card";
import { SearchInput } from "@/components/search-input";

export function FriendsPanel({
  onFriendClick,
}: {
  onFriendClick?: (id: string) => void;
}) {
  const friends = useFriends((state) => state.friends);
  const [searchState, setSearchState] = useState<string>("");

  const filtered = Object.values(friends).filter(
    (friend) =>
      friend.firstName.toLowerCase().startsWith(searchState.toLowerCase()) ||
      friend.lastName.toLowerCase().startsWith(searchState.toLowerCase()) ||
      `${friend.firstName} ${friend.lastName}`
        .toLowerCase()
        .startsWith(searchState.toLowerCase()) ||
      friend.handle.toLowerCase().startsWith(searchState.toLowerCase()),
  );

  return (
    <Sidebar collapsible="none" className="w-80 border-r">
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl">Friends</h2>
              <SearchInput value={searchState} onChange={setSearchState} />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex flex-col gap-1">
              {filtered.length > 0 ? (
                filtered.map((friend) => (
                  <FriendCard
                    key={friend.id}
                    {...friend}
                    onClick={onFriendClick}
                  />
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No friends found.
                </p>
              )}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
