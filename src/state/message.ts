import { atom } from "jotai";
import { activeChatIDAtom } from "./ui";

export type MessageState = "pending" | "sent" | "delivered" | "read" | "failed";

export type MessageType = "text" | "image" | "video" | "audio" | "file";

export type MessageDirection = "incoming" | "outgoing";

export type SenderInfo = {
  id: string;
  avatarUrl?: string;
  name: string;
};

export type Message = {
  id: string | number;
  content: string;
  sender: SenderInfo;
  direction: MessageDirection;
  timestamp: string;
  state: MessageState;
  type: MessageType;
  mediaUrl?: string;
  replyTo?: {
    id: string | number;
    content: string;
    sender: SenderInfo;
  };
  edited?: boolean;
};

const messages: Message[] = [
  {
    id: "msg-001",
    content: "Hey, how's it going?",
    sender: {
      id: "user-123",
      name: "Alice",
      avatarUrl: "https://example.com/alice.jpg",
    },
    direction: "outgoing",
    timestamp: "2025-03-11T10:05:00Z",
    state: "read",
    type: "text",
  },
  {
    id: "msg-002",
    content: "Hey Alice! I'm doing well. How about you?",
    sender: {
      id: "user-456",
      name: "Bob",
      avatarUrl: "https://example.com/bob.jpg",
    },
    direction: "incoming",
    timestamp: "2025-03-11T10:06:30Z",
    state: "read",
    type: "text",
  },
  {
    id: "msg-003",
    content: "Glad to hear that! Check out this pic 📸",
    sender: {
      id: "user-123",
      name: "Alice",
      avatarUrl: "https://example.com/alice.jpg",
    },
    direction: "outgoing",
    timestamp: "2025-03-11T10:08:00Z",
    state: "read",
    type: "image",
    mediaUrl: "https://example.com/photo.jpg",
  },
  {
    id: "msg-004",
    content: "Wow, looks amazing! Where is this?",
    sender: {
      id: "user-456",
      name: "Bob",
      avatarUrl: "https://example.com/bob.jpg",
    },
    direction: "incoming",
    timestamp: "2025-03-11T10:09:15Z",
    state: "read",
    type: "text",
    replyTo: {
      id: "msg-003",
      content: "Glad to hear that! Check out this pic 📸",
      sender: { id: "user-123", name: "Alice" },
    },
  },
  {
    id: "msg-005",
    content: "I took it during my trip to the mountains last weekend! 🌄",
    sender: {
      id: "user-123",
      name: "Alice",
      avatarUrl: "https://example.com/alice.jpg",
    },
    direction: "outgoing",
    timestamp: "2025-03-11T10:10:45Z",
    state: "pending",
    type: "text",
    replyTo: {
      id: "msg-004",
      content: "Wow, looks amazing! Where is this?",
      sender: { id: "user-456", name: "Bob" },
    },
  },
  {
    id: "msg-006",
    content: "Here's a voice message 🎙️",
    sender: {
      id: "user-456",
      name: "Bob",
      avatarUrl: "https://example.com/bob.jpg",
    },
    direction: "incoming",
    timestamp: "2025-03-11T10:12:00Z",
    state: "failed",
    type: "audio",
    mediaUrl: "https://example.com/voice.mp3",
  },
  {
    id: "msg-007",
    content: "Oops! I think the audio didn't send properly.",
    sender: {
      id: "user-456",
      name: "Bob",
      avatarUrl: "https://example.com/bob.jpg",
    },
    direction: "incoming",
    timestamp: "2025-03-11T10:12:45Z",
    state: "read",
    type: "text",
  },
  {
    id: "msg-008",
    content: "Yeah, it seems like it failed. Try sending again?",
    sender: {
      id: "user-123",
      name: "Alice",
      avatarUrl: "https://example.com/alice.jpg",
    },
    direction: "outgoing",
    timestamp: "2025-03-11T10:13:30Z",
    state: "read",
    type: "text",
  },
  {
    id: "msg-009",
    content: "Resending the voice message... 🎤",
    sender: {
      id: "user-456",
      name: "Bob",
      avatarUrl: "https://example.com/bob.jpg",
    },
    direction: "incoming",
    timestamp: "2025-03-11T10:14:00Z",
    state: "read",
    type: "audio",
    mediaUrl: "https://example.com/voice_resend.mp3",
  },
  {
    id: "msg-010",
    content: "Got it! Your voice sounds great 😊",
    sender: {
      id: "user-123",
      name: "Alice",
      avatarUrl: "https://example.com/alice.jpg",
    },
    direction: "outgoing",
    timestamp: "2025-03-11T10:15:20Z",
    state: "read",
    type: "text",
  },
  {
    id: "msg-011",
    content: "By the way, did you check out the document I sent earlier?",
    sender: {
      id: "user-456",
      name: "Bob",
      avatarUrl: "https://example.com/bob.jpg",
    },
    direction: "incoming",
    timestamp: "2025-03-11T10:16:10Z",
    state: "read",
    type: "text",
  },
  {
    id: "msg-012",
    content: "Oh, let me check now!",
    sender: {
      id: "user-123",
      name: "Alice",
      avatarUrl: "https://example.com/alice.jpg",
    },
    direction: "outgoing",
    timestamp: "2025-03-11T10:17:00Z",
    state: "read",
    type: "text",
  },
  {
    id: "msg-013",
    content: "Here it is 📄",
    sender: {
      id: "user-456",
      name: "Bob",
      avatarUrl: "https://example.com/bob.jpg",
    },
    direction: "incoming",
    timestamp: "2025-03-11T10:18:30Z",
    state: "read",
    type: "file",
    mediaUrl: "https://example.com/document.pdf",
  },
  {
    id: "msg-014",
    content: "Looks good! I'll review it and let you know my thoughts.",
    sender: {
      id: "user-123",
      name: "Alice",
      avatarUrl: "https://example.com/alice.jpg",
    },
    direction: "outgoing",
    timestamp: "2025-03-11T10:20:00Z",
    state: "read",
    type: "text",
  },
  {
    id: "msg-015",
    content: "Thanks! Take your time 😊",
    sender: {
      id: "user-456",
      name: "Bob",
      avatarUrl: "https://example.com/bob.jpg",
    },
    direction: "incoming",
    timestamp: "2025-03-11T10:21:15Z",
    state: "delivered",
    type: "text",
  },
];

export type CachedMessages = Record<string, Message[]>;

export const cachedMessagesAtom = atom<CachedMessages>({
  "1": [],
  "2": [...messages],
});

export const messagesAtom = atom(
  (get) => {
    const id = get(activeChatIDAtom);
    const cachedMessages = get(cachedMessagesAtom);

    return id ? (cachedMessages?.[id] ?? []) : [];
  },
  (get, set, messages: Message[]) => {
    const cachedMessages: CachedMessages = { ...get(cachedMessagesAtom) };

    const id = get(activeChatIDAtom);

    if (id) cachedMessages[id] = messages;

    set(cachedMessagesAtom, cachedMessages);
  },
);

export const readMessagesAtom = atom(null, (get, set, id: string) => {
  const cachedMessages = { ...get(cachedMessagesAtom) };

  const idMessages = [...cachedMessages[id]].map(
    (message) => ({ ...message, state: "read" }) as Message,
  );

  cachedMessages[id] = idMessages;

  console.log("Cached Messages", cachedMessages);
  console.log("ID Messages", idMessages);

  set(cachedMessagesAtom, cachedMessages);
});

export const missedMessagesAtom = atom((get) => {
  const cachedMessages: CachedMessages = { ...get(cachedMessagesAtom) };
  const result: Record<string, number> = {};

  Object.keys(cachedMessages).map((key) => {
    const missedMessages = cachedMessages[key].filter(
      (message) => message.state === "delivered",
    );

    result[key] = missedMessages.length;
  });

  return result;
});

export const messagesLoadingAtom = atom<boolean>(false);
