import { atom } from "jotai";

export type MessageState = "sent" | "delivered" | "read" | "failed";

export type MessageType = "text" | "image" | "video" | "audio" | "file";

export type MessageDirection = "incoming" | "outgoing";

export type SenderInfo = {
  id: string;
  avatarUrl?: string;
  name?: string;
};

export type Message = {
  id: string | number;
  content: string;
  sender: SenderInfo;
  direction: MessageDirection;
  receiverId: string;
  timestamp: string;
  state: MessageState;
  type: MessageType;
  mediaUrl?: string;
  replyTo?: string;
  edited?: boolean;
};

export const messagesAtom = atom<Message[]>([]);

export const messagesLoadingAtom = atom<boolean>(false);
