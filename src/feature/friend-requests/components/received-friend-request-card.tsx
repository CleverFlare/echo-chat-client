import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, X } from "lucide-react";
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
    <div className="grid grid-cols-[auto_1fr_auto] gap-3 items-center px-2 py-2 rounded-md">
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
      <div className="min-w-0">
        <h4 className="font-medium truncate">
          {senderFirstName} {senderLastName}
        </h4>
        <p className="text-xs text-muted-foreground">@{senderHandle}</p>
      </div>
      <div className="flex gap-1">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                size="icon"
                variant="default"
                onClick={() => onAccept(id)}
              >
                <Check className="size-4" />
              </Button>
            }
          ></TooltipTrigger>
          <TooltipContent>Accept</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                size="icon"
                variant="secondary"
                onClick={() => onDecline(id)}
              >
                <X className="size-4" />
              </Button>
            }
          ></TooltipTrigger>
          <TooltipContent>Decline</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
