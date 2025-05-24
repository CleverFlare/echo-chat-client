import { create } from "zustand";
import type { Message, MessageStatus } from "./chat";

export type ContactLastMessage = {
  id: string;
  senderId: string;
  content: string;
  status: MessageStatus;
  timestamp: string;
};

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarUrl?: string;
  chatId: string;
  unread: number;
  lastMessage?: ContactLastMessage;
};

export type ContactsState = {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  getContact: (contactsId: string) => Contact | undefined;
  setContacts: (contacts: Contact[]) => void;
  readAllMessages: (contactId: string) => void;
  updateLastMessage: (contactId: string, message: Message) => void;
};

export const useContactsStore = create<ContactsState>((set, get) => ({
  contacts: [],
  addContact: (contact: Contact) =>
    set((state) => {
      const preexistingContact = state.contacts.find(
        (contactItem) => contactItem.id === contact.id,
      );

      if (preexistingContact) return state;

      return { contacts: [...state.contacts, contact] };
    }),
  readAllMessages: (contactId) =>
    set((state) => {
      const mutableState = { ...state };
      const contactIndex = mutableState.contacts.findIndex(
        (contact) => contact.chatId === contactId,
      );

      mutableState.contacts[contactIndex].unread = 0;

      return mutableState;
    }),
  getContact: (contactId: string) => {
    const state = get();
    if (state.contacts === null) return;

    return state.contacts.find((contact) => contact.chatId == contactId);
  },
  setContacts: (contacts) => set({ contacts }),
  updateLastMessage: (chatId, message) =>
    set((state) => {
      const mutableContacts = [...state.contacts];

      const contactIndex = state.contacts.findIndex(
        (contact) => contact.chatId === chatId,
      );

      mutableContacts[contactIndex].lastMessage = {
        id: message.id,
        status: message.status,
        content: message.content,
        senderId: message.sender.id,
        timestamp: message.timestamp,
      };

      return { contacts: [...mutableContacts] };
    }),
}));
