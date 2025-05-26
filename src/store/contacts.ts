import { create } from "zustand";
import { useChatStore, type Message, type MessageStatus } from "./chat";
import { socket } from "@/lib/socket";

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
  getContactByChatId: (chatId: string) => Contact | undefined;
  setContacts: (contacts: Contact[]) => void;
  resetUnread: (contactId: string) => void;
  updateLastMessage: (contactId: string, message: Message) => void;
};

export const useContactsStore = create<ContactsState>((set, get) => {
  socket.on("new-contact", (contact: Contact) => {
    get().addContact(contact);
  });

  return {
    contacts: [],
    addContact: (contact: Contact) => {
      useChatStore.getState().prepareChatIds([contact.chatId]);

      set((state) => {
        const preexistingContact = state.contacts.find(
          (contactItem) => contactItem.id === contact.id,
        );

        if (preexistingContact) return state;

        return { contacts: [...state.contacts, contact] };
      });
    },
    resetUnread: (contactId) =>
      set((state) => {
        const mutableState = { ...state };
        const contactIndex = mutableState.contacts.findIndex(
          (contact) => contact.chatId === contactId,
        );

        mutableState.contacts[contactIndex].unread = 0;

        return mutableState;
      }),
    getContactByChatId: (chatId: string) => {
      const state = get();
      if (state.contacts === null) return;

      return state.contacts.find((contact) => contact.chatId == chatId);
    },
    setContacts: (contacts) => {
      useChatStore
        .getState()
        .prepareChatIds(contacts.map((contact) => contact.chatId));

      set({ contacts });
    },
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
          senderId: message.senderId,
          timestamp: message.timestamp,
        };

        return { contacts: [...mutableContacts] };
      }),
  };
});
