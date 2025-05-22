import { create } from "zustand";
import type { Message } from "./chat";

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarUrl?: string;
  chatId: string;
  unread: number;
  online: boolean;
  lastMessage: Message | undefined;
};

export type ContactsState = {
  contacts: Contact[];
  getContact: (contactsId: string) => Contact | undefined;
  setContacts: (contacts: Contact[]) => void;
  updateStatus: (id: string, status: boolean) => void;
  readAllMessages: (contactId: string) => void;
  updateLastMessage: (contactId: string, message: Message) => void;
};

export const useContactsStore = create<ContactsState>((set, get) => ({
  contacts: [],
  readAllMessages: (contactId) =>
    set((state) => {
      const mutableState = { ...state };
      const contactIndex = mutableState.contacts.findIndex(
        (contact) => contact.id === contactId,
      );

      mutableState.contacts[contactIndex].unread = 0;

      return mutableState;
    }),
  getContact: (contactId: string) => {
    const state = get();
    if (state.contacts === null) return;

    return state.contacts.find((contact) => contact.id == contactId);
  },
  setContacts: (contacts) => set({ contacts }),
  updateStatus: (id, status) =>
    set((state) => {
      const mutableState = { ...state };

      const contactIndex = mutableState.contacts.findIndex(
        (contact) => contact.id === id,
      );

      mutableState.contacts[contactIndex].online = status;

      return mutableState;
    }),
  updateLastMessage: (chatId, message) =>
    set((state) => {
      const mutableContacts = [...state.contacts];

      const contactIndex = state.contacts.findIndex(
        (contact) => contact.chatId === chatId,
      );

      mutableContacts[contactIndex].lastMessage = message;

      return { contacts: [...mutableContacts] };
    }),
}));
