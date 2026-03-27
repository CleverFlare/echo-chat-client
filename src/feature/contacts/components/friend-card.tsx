import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Friend } from "../types";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

type FriendCardProps = Friend & {
  onClick?: (id: string) => void;
};

export function FriendCard({
  id,
  firstName,
  lastName,
  avatar,
  handle,
  presence,
  bio,
  chatId,
  onClick,
}: FriendCardProps) {
  return (
    <Toggle
      className="grid grid-cols-[auto_1fr] gap-3 items-center px-2 py-2 w-full text-start h-max"
      onClick={() => onClick?.(id)}
      render={(props) => (
        <Link to={`/chats/$id`} params={{ id: chatId }} {...props}>
          <Avatar>
            <AvatarImage src={avatar} alt={`${firstName} ${lastName}`} />
            <AvatarFallback>
              {firstName[0]}
              {lastName[0]}
            </AvatarFallback>
            <AvatarBadge
              className={cn(
                "dark:bg-neutral-600 bg-neutral-400",
                "data-[presence=online]:bg-green-500 data-[presence=online]:dark:bg-green-500",
                "transition-colors",
              )}
              data-presence={presence}
            />
          </Avatar>
          <div className="grid min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-medium truncate">
                {firstName} {lastName}
              </h4>
              <p className="text-xs text-muted-foreground ms-auto shrink-0">
                @{handle}
              </p>
            </div>
            {bio && (
              <p className="text-sm text-muted-foreground truncate">{bio}</p>
            )}
          </div>
        </Link>
      )}
    ></Toggle>
  );
}
