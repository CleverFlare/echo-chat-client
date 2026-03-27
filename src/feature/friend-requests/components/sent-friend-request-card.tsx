import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { SentFriendRequest } from "../types";

type SentFriendRequestCardProps = SentFriendRequest & {
  onCancel: (id: string) => void;
};

export function SentFriendRequestCard({
  id,
  receiverFirstName,
  receiverLastName,
  receiverHandle,
  receiverAvatar,
  onCancel,
}: SentFriendRequestCardProps) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-3 items-center px-2 py-2 rounded-md">
      <Avatar>
        <AvatarImage
          src={receiverAvatar}
          alt={`${receiverFirstName} ${receiverLastName}`}
        />
        <AvatarFallback>
          {receiverFirstName[0]}
          {receiverLastName[0]}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <h4 className="font-medium truncate">
          {receiverFirstName} {receiverLastName}
        </h4>
        <p className="text-xs text-muted-foreground">@{receiverHandle}</p>
      </div>
      <Button size="sm" variant="secondary" onClick={() => onCancel(id)}>
        Cancel
      </Button>
    </div>
  );
}
