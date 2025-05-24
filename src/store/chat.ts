import { create } from "zustand";
import { useContactsStore } from "./contacts";

// pending -> awaiting network connection to send
// sent -> awaiting the contact to received it
// delivered -> awaiting the contact to read it
// read -> final stage. sent and read successfully
export type MessageStatus =
  | "pending"
  | "sent"
  | "delivered"
  | "read"
  | "failed";

export type Message = {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  status: MessageStatus;
  isEdited: boolean;
};

export type ChatState = {
  activeChatId: string | null;
  setActiveChat: (chatId: string | null) => void;
  messages: Record<string, Record<string, Message[]>>; // chatId -> messages
  addMessage: (chatId: string, date: string, message: Message) => void;
  setMessages: (chatId: string, messages: Record<string, Message[]>) => void;
  setMessageStatus: (
    chatId: string,
    date: string,
    messageId: string,
    status: MessageStatus,
  ) => void;
  editMessage: (
    chatId: string,
    date: string,
    messageId: string,
    content: string,
  ) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  activeChatId: null,
  setActiveChat: (chatId) => set({ activeChatId: chatId }),
  messages: {},
  addMessage: (chatId, date, message) =>
    set((state) => {
      const mutableMessages = { ...state.messages };
      const isChatIdAbsent = !state.messages?.[chatId];

      useContactsStore.getState().updateLastMessage(chatId, message);

      if (isChatIdAbsent) {
        mutableMessages[chatId] = {};
        mutableMessages[chatId][date] = [];
      }

      mutableMessages[chatId][date] = [
        ...mutableMessages[chatId][date],
        message,
      ];

      return { ...state, messages: { ...mutableMessages } };
    }),
  setMessages: (chatId, messages) =>
    set((state) => ({ messages: { ...state.messages, [chatId]: messages } })),
  setMessageStatus: (chatId, date, messageId, status) =>
    set((state) => {
      const mutableState = { ...state };
      const messageIndex = state.messages[chatId][date].findIndex(
        (message) => message.id === messageId,
      );

      mutableState.messages[chatId][date][messageIndex].status = status;

      return { ...mutableState };
    }),
  editMessage: (chatId, date, messageId, content) =>
    set((state) => {
      const mutableState = { ...state };
      const messageIndex = state.messages[chatId][date].findIndex(
        (message) => message.id === messageId,
      );

      mutableState.messages[chatId][date][messageIndex].content = content;
      mutableState.messages[chatId][date][messageIndex].isEdited = true;

      return { ...mutableState };
    }),
}));
