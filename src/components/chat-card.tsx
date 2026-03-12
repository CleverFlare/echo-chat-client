import { formatLastMessageDate } from "@/lib/format-last-message-date";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNow } from "@/hooks/use-now";
import { Toggle } from "./ui/toggle";
import {
  MessageReceiptStatus,
  type ReceiptStatus,
} from "./message-receipt-status";

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
}: ChatCardProps) {
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
            <p className="min-w-5 h-5 rounded-full bg-blue-500 text-xs flex items-center justify-center px-1">
              {unreadCount < 1000 ? unreadCount : "999+"}
            </p>
          )}
        </div>
      </div>
    </Toggle>
  );
}

// ---- Primitives & enums ----

type MediaMessageType =
  | "image"
  | "video"
  | "audio"
  | "file"
  | "sticker"
  | "gif";

type SpecialMessageType =
  | "link"
  | "reaction"
  | "poll"
  | "location"
  | "deleted"
  | "missed_call"
  | "voice_note";

// ---- Last message shape ----

type BaseLastMessage = {
  id: string;
  sentAt: Date; // raw Date; formatting ("now", "yesterday", etc.) is UI logic
  isMine: boolean; // drives "Me:" prefix and receipt display
  receipt?: ReceiptStatus; // only meaningful when isMine === true
};

type TextLastMessage = BaseLastMessage & {
  type: "text";
  body: string;
};

type MediaLastMessage = BaseLastMessage & {
  type: MediaMessageType;
  caption?: string; // e.g. shown as "📷 Photo" or the caption itself
};

type LinkLastMessage = BaseLastMessage & {
  type: "link";
  url: string;
  previewTitle?: string;
};

type ReactionLastMessage = BaseLastMessage & {
  type: "reaction";
  emoji: string;
  reactedToSnippet?: string; // e.g. "Reacted 👍 to "sounds good""
};

type SpecialLastMessage = BaseLastMessage & {
  type: Exclude<SpecialMessageType, "link" | "reaction">;
  label?: string; // human-readable fallback e.g. "📍 Location", "You missed a call"
};

type LastMessage =
  | TextLastMessage
  | MediaLastMessage
  | LinkLastMessage
  | ReactionLastMessage
  | SpecialLastMessage;

// ---- Unread badge shape ----

// Raw number — the "999+" capping logic lives in the component, not in props
type UnreadCount = number;

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

  // Interaction
  isSelected?: boolean;
  isMuted?: boolean;
  isPinned?: boolean;
  onClick?: (id: string) => void;
};
