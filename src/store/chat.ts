import { create } from "zustand";
import { User } from "./auth";
import { dummyMessagesData } from "@/constants/dummy-messages-data";

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
  sender: User;
  status: MessageStatus;
  isEdited: boolean;
};

export type ChatState = {
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
  messages: {
    ...dummyMessagesData,
  },
  addMessage: (chatId, date, message) =>
    set((state) => {
      const isChatIdAbsent = !state.messages?.[chatId];

      const isDateAbsent = !state.messages?.[chatId]?.[date];

      return {
        ...state,
        messages: {
          ...state.messages,
          ...(isChatIdAbsent
            ? {
                [chatId]: {
                  ...(isDateAbsent
                    ? {
                        [date]: [message],
                      }
                    : {
                        [date]: [...state.messages[chatId][date], message],
                      }),
                },
              }
            : {
                [chatId]: {
                  ...state.messages[chatId],
                  ...(isDateAbsent
                    ? {
                        [date]: [message],
                      }
                    : {
                        [date]: [...state.messages[chatId][date], message],
                      }),
                },
              }),
        },
      };
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
