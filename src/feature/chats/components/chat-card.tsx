import { formatLastMessageDate } from "@/lib/format-last-message-date";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useNow } from "@/hooks/use-now";
import { Toggle } from "@/components/ui/toggle";
import { MessageReceiptStatus } from "@/components/message-receipt-status";
import type { LastMessage, Presence, UnreadCount } from "../types";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function ChatCard({
  firstName = "Muhammad",
  lastName = "Maher",
  avatar = "https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&head=afro,bangs,bangs2&face=calm",
  lastMessage = {
    id: "1234",
    type: "text",
    sentAt: new Date("4/10/2026, 10:31:18 PM"),
    body: "Hey there! adfasdfasdfasdfasdfasdfasdfdasfsa",
    isMine: false,
    receipt: "read",
  },
  unreadCount = 100000000,
  active = false,
  id,
  presence,
}: ChatCardProps) {
  const now = useNow();
  return (
    <Toggle
      pressed={active}
      className="grid grid-cols-[auto_1fr] gap-2 justify-start h-max px-2 py-2 font-normal text-start"
      render={(props) => (
        <Link to="/chats/$id" params={{ id }} {...props}>
          <Avatar>
            <AvatarImage src={avatar} alt="avatar" />
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
          <div className="grid w-full">
            <div className="flex gap-2">
              <h4 className="font-medium">
                {firstName} {lastName}
              </h4>
              <p className="text-xs text-muted-foreground ms-auto">
                {formatLastMessageDate(lastMessage.sentAt, now)}
              </p>
            </div>
            <div
              className="grid data-[show-receipt=true]:grid-cols-[auto_1fr_auto] data-[show-receipt=false]:grid-cols-[1fr_auto] gap-1 items-center"
              data-show-receipt={lastMessage.isMine}
            >
              {lastMessage.isMine && lastMessage.receipt && (
                <MessageReceiptStatus status={lastMessage.receipt} />
              )}
              <p className="truncate">
                {lastMessage.isMine && (
                  <span className="text-muted-foreground">Me: </span>
                )}
                {lastMessage.type === "text"
                  ? lastMessage.body
                  : "Weird message format"}
              </p>
              {unreadCount > 0 && (
                <p className="min-w-5 h-5 rounded-full bg-blue-500 text-xs flex items-center justify-center px-1 text-white">
                  {unreadCount < 1000 ? unreadCount : "999+"}
                </p>
              )}
            </div>
          </div>
        </Link>
      )}
    ></Toggle>
  );
}

// ---- Root ChatCard props ----

type ChatCardProps = {
  id: string;

  // Identity
  avatar: string;
  firstName: string;
  lastName: string;

  // Last message — optional because a brand-new conversation may have none
  lastMessage?: LastMessage;

  // Unread — undefined means "no badge", 0 also suppresses the badge
  unreadCount?: UnreadCount;

  active?: boolean;

  presence: Presence;

  // Interaction
  isSelected?: boolean;
  isMuted?: boolean;
  isPinned?: boolean;
  onClick?: (id: string) => void;
};
