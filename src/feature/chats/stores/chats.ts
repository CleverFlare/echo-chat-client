import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { LastMessage, UnreadCount } from "../types";

export type Chat = {
  id: string;

  // Identity
  avatar: string;
  firstName: string;
  lastName: string;

  // Last message — optional because a brand-new conversation may have none
  lastMessage?: LastMessage;

  // Unread — undefined means "no badge", 0 also suppresses the badge
  unreadCount?: UnreadCount;
};

export type ChatsState = {
  chats: Chat[];
};

export type ChatsStore = ChatsState;

export const useChats = create<ChatsStore>()(
  immer<ChatsStore>(() => ({
    chats: [
      {
        id: "chat-001",
        firstName: "Muhammad",
        lastName: "Maher",
        avatar:
          "https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Andrea",
        unreadCount: 0,
      },
      {
        id: "chat-002",
        firstName: "Andrea",
        lastName: "Avery",
        avatar:
          "https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Andrea",
        unreadCount: 1,
      },
      {
        id: "chat-003",
        firstName: "Jocelyn",
        lastName: "George",
        avatar:
          "https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Jocelyn",
        unreadCount: 0,
      },
      {
        id: "chat-004",
        firstName: "Leo",
        lastName: "Emery",
        avatar:
          "https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Leo",
        unreadCount: 2,
      },
      {
        id: "chat-005",
        firstName: "Leah",
        lastName: "Brian",
        avatar:
          "https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Leah",
        unreadCount: 0,
      },
      {
        id: "chat-006",
        firstName: "Liam",
        lastName: "Jack",
        avatar:
          "https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Liam",
        unreadCount: 0,
      },
      {
        id: "chat-007",
        firstName: "Eliza",
        lastName: "Amaya",
        avatar:
          "https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Eliza",
        unreadCount: 0,
      },
      {
        id: "chat-008",
        firstName: "Liliana",
        lastName: "Jameson",
        avatar:
          "https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Amaya",
        unreadCount: 0,
      },
    ],
  })),
);
