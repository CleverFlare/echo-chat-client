import type { Presence } from "@/feature/chats/types";

export type { Presence };

export type Friend = {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  handle: string;
  presence: Presence;
  bio?: string;
  chatId: string;
};
