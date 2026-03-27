import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { AddFriendWindow } from "@/feature/friend-requests/components/add-friend-window";
import { FriendRequestsPanel } from "@/feature/friend-requests/components/friend-requests-panel";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MessagesSquare, UserPlus2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/friend-requests")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-1">
      <FriendRequestsPanel />
      <div className="flex-1 h-full flex justify-center items-center">
        <Empty>
          <EmptyHeader>
            <EmptyMedia>
              <UserPlus2
                className="text-muted-foreground"
                size={100}
                absoluteStrokeWidth
                strokeWidth={5}
              />
            </EmptyMedia>
          </EmptyHeader>
          <EmptyContent>
            <EmptyTitle className="text-2xl">Friend Requests</EmptyTitle>
            <EmptyDescription className="text-lg">
              Add friends, manage received requests, and track sent invites.
            </EmptyDescription>
          </EmptyContent>
        </Empty>
      </div>
    </div>
  );
}
