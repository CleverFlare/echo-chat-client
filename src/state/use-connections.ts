import { create } from "zustand";

export type Connection = {
  id: string;
  image?: string;
  name: string;
  unread?: number;
  lastOnline: "current" | string;
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

export const useConnections = create<ConnectionsState>()((set, get) => ({
  data: null,
  setData: (data) => {
    set((state) => (state.data = data));
  },
  storeMessage: (id) => {
    const data = get().data;

    if (!data) return;

    data[id].lastMessage.date = new Date().toString();

    set(() => ({ data: data }));
  },
}));
