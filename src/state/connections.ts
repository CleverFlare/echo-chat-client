import { atom } from "jotai";

export type Connection = {
  id: string;
  image?: string;
  name: string;
  unread?: number;
  lastOnline: null | (string & {});
  lastMessage: {
    date: string;
    content: string;
    state?: "sent" | "received" | "read" | null;
  };
};

export interface ConnectionsState {
  data: Record<string, Connection> | null;
  setData: (data: Record<string, Connection>) => void;
  storeMessage: (id: string, message: string) => void;
}

export const connectionsAtom = atom<null | Record<string, Connection>>(null);
