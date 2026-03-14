// ---- Primitives & enums ----

import type { ReceiptStatus } from "@/components/message-receipt-status";

export type MediaMessageType =
  | "image"
  | "video"
  | "audio"
  | "file"
  | "sticker"
  | "gif";

export type SpecialMessageType =
  | "link"
  | "reaction"
  | "poll"
  | "location"
  | "deleted"
  | "missed_call"
  | "voice_note";

// ---- Last message shape ----

export type BaseLastMessage = {
  id: string;
  sentAt: Date; // raw Date; formatting ("now", "yesterday", etc.) is UI logic
  isMine: boolean; // drives "Me:" prefix and receipt display
  receipt?: ReceiptStatus; // only meaningful when isMine === true
};

export type TextLastMessage = BaseLastMessage & {
  type: "text";
  body: string;
};

export type MediaLastMessage = BaseLastMessage & {
  type: MediaMessageType;
  caption?: string; // e.g. shown as "📷 Photo" or the caption itself
};

export type LinkLastMessage = BaseLastMessage & {
  type: "link";
  url: string;
  previewTitle?: string;
};

export type ReactionLastMessage = BaseLastMessage & {
  type: "reaction";
  emoji: string;
  reactedToSnippet?: string; // e.g. "Reacted 👍 to "sounds good""
};

export type SpecialLastMessage = BaseLastMessage & {
  type: Exclude<SpecialMessageType, "link" | "reaction">;
  label?: string; // human-readable fallback e.g. "📍 Location", "You missed a call"
};

export type LastMessage =
  | TextLastMessage
  | MediaLastMessage
  | LinkLastMessage
  | ReactionLastMessage
  | SpecialLastMessage;

// ---- Unread badge shape ----

// Raw number — the "999+" capping logic lives in the component, not in props
export type UnreadCount = number;

export type Presence = "online" | "offline";
