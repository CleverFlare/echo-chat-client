import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFriendRequests } from "../stores/friend-requests";
import { ReceivedFriendRequestCard } from "./received-friend-request-card";
import { SentFriendRequestCard } from "./sent-friend-request-card";
import { AddFriendDialog } from "./add-friend-dialog";

export function FriendRequestsPanel() {
  const received = useFriendRequests((state) => state.received);
  const sent = useFriendRequests((state) => state.sent);
  const acceptRequest = useFriendRequests((state) => state.acceptRequest);
  const declineRequest = useFriendRequests((state) => state.declineRequest);
  const cancelRequest = useFriendRequests((state) => state.cancelRequest);

  const pendingReceived = Object.values(received).filter(
    (r) => r.status === "pending",
  );
  const pendingSent = Object.values(sent);

  return (
    <Sidebar collapsible="none" className="w-80 border-r">
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl">Friend Requests</h2>
              <AddFriendDialog />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <Tabs defaultValue="received" className="flex flex-col gap-4">
              <div className="px-2">
                <TabsList className="w-full">
                  <TabsTrigger value="received" className="flex-1 gap-1.5">
                    Received
                    {pendingReceived.length > 0 && (
                      <span className="min-w-5 h-5 rounded-full bg-blue-500 text-xs flex items-center justify-center px-1 text-white">
                        {pendingReceived.length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="sent" className="flex-1">
                    Sent
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="received">
                <div className="flex flex-col gap-4 mt-2">
                  {pendingReceived.length > 0 ? (
                    pendingReceived.map((request) => (
                      <ReceivedFriendRequestCard
                        key={request.id}
                        {...request}
                        onAccept={acceptRequest}
                        onDecline={declineRequest}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No pending requests.
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="sent">
                <div className="flex flex-col gap-4 mt-2">
                  {pendingSent.length > 0 ? (
                    pendingSent.map((request) => (
                      <SentFriendRequestCard
                        key={request.id}
                        {...request}
                        onCancel={cancelRequest}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No sent requests.
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
