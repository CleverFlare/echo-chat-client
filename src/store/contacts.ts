import { create } from "zustand";

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarUrl?: string;
  unread: number;
  online: boolean;
};

export type ContactsState = {
  contacts: Contact[];
  getContact: (contactsId: string) => Contact | undefined;
  setContacts: (contacts: Contact[]) => void;
  updateStatus: (id: string, status: boolean) => void;
  readAllMessages: (contactId: string) => void;
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
}));
