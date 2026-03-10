import { formatLastMessageDate } from "@/lib/format-last-message-date";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNow } from "@/hooks/use-now";
import { Toggle } from "./ui/toggle";
import { MessageReadStatus } from "./message-read-status";

export function ChatCard({
  firstName = "Muhammad",
  lastName = "Maher",
  avatar = "https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&head=afro,bangs,bangs2&face=calm",
  lastMessage = {
    createdAt: new Date("3/10/2026, 10:31:18 PM"),
    content: "Hey there! adfasdfasdfasdfasdfasdfasdfdasfsa",
    author: "me",
    status: "read",
  },
  unreadCount = 100000000,
}: {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  lastMessage?: {
    createdAt: Date | string;
    content: string;
    author: "me" | "other";
    status: "sent" | "received" | "read" | null | undefined;
  };
  unreadCount?: number;
}) {
  const now = useNow();
  return (
    <Toggle
      pressed={false}
      className="grid grid-cols-[auto_1fr] gap-2 justify-start h-max px-2 py-2 font-normal text-start"
    >
      <Avatar>
        <AvatarImage src={avatar} alt="avatar" />
        <AvatarFallback>
          {firstName[0]}
          {lastName[0]}
        </AvatarFallback>
      </Avatar>
      <div className="grid w-full">
        <div className="flex gap-2">
          <h4 className="font-medium">
            {firstName} {lastName}
          </h4>
          <p className="text-xs text-muted-foreground ms-auto">
            {formatLastMessageDate(lastMessage.createdAt, now)}
          </p>
        </div>
        <div className="grid grid-cols-[auto_1fr_auto] gap-1 items-center">
          {lastMessage.author === "me" && lastMessage.status && (
            <MessageReadStatus status={lastMessage.status} />
          )}
          <p className="truncate">
            {lastMessage.author === "me" && (
              <span className="text-muted-foreground">Me: </span>
            )}
            {lastMessage.content}
          </p>
          {unreadCount > 0 && (
            <p className="min-w-5 h-5 rounded-full bg-blue-500 text-xs flex items-center justify-center px-1">
              {unreadCount < 1000 ? unreadCount : "999+"}
            </p>
          )}
        </div>
      </div>
    </Toggle>
  );
}
