import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { ReceivedFriendRequest } from "../types";

type ReceivedFriendRequestCardProps = ReceivedFriendRequest & {
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
};

export function ReceivedFriendRequestCard({
  id,
  senderFirstName,
  senderLastName,
  senderHandle,
  senderAvatar,
  onAccept,
  onDecline,
}: ReceivedFriendRequestCardProps) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-3 items-center px-2 py-2 rounded-md">
      <div className="h-full flex">
        <Avatar>
          <AvatarImage
            src={senderAvatar}
            alt={`${senderFirstName} ${senderLastName}`}
          />
          <AvatarFallback>
            {senderFirstName[0]}
            {senderLastName[0]}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="grid min-w-0 gap-2">
        <div className="min-w-0">
          <h4 className="font-medium truncate">
            {senderFirstName} {senderLastName}
          </h4>
          <p className="text-xs text-muted-foreground">@{senderHandle}</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1" onClick={() => onAccept(id)}>
            Accept
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="flex-1"
            onClick={() => onDecline(id)}
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
