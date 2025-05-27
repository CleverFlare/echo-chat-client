import { create } from "zustand";
import { useContactsStore } from "./contacts";
import { socket } from "@/lib/socket";

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
  addMessage: (
    chatId: string,
    date: string,
    message: Message,
    isSocket?: boolean,
  ) => void;
  setMessages: (chatId: string, messages: Record<string, Message[]>) => void;
  setMessageStatus: (
    chatId: string,
    date: string,
    messageId: string,
    status: MessageStatus,
  ) => void;
  prepareChatIds: (chatIds: string[]) => void;
  editMessage: (
    chatId: string,
    date: string,
    messageId: string,
    content: string,
  ) => void;
};

export const useChatStore = create<ChatState>((set, get) => {
  socket.on("receive-message", (message: Message & { chatId: string }) => {
    const { chatId, timestamp } = message;

    get().addMessage(chatId, timestamp.split("T")[0], message, true);
  });

  return {
    activeChatId: null,
    setActiveChat: (chatId) => set({ activeChatId: chatId }),
    messages: {},
    prepareChatIds: (chatIds) =>
      set((state) => {
        const mutableMessage = { ...state.messages };

        for (const chatId of chatIds) {
          if (chatId in mutableMessage) continue;

          mutableMessage[chatId] = {};
        }

        return { ...state, messages: { ...state.messages, ...mutableMessage } };
      }),
    addMessage: (chatId, date, message, isSocket = false) =>
      set((state) => {
        if (!isSocket)
          socket.emit(
            "send-message",
            useContactsStore
              .getState()
              .contacts.find((contact) => contact.chatId === get().activeChatId)
              ?.id,
            {
              ...message,
              chatId,
            },
          );

        const mutableMessages = { ...state.messages };
        const isChatIdAbsent = chatId in state.messages === false;

        useContactsStore.getState().updateLastMessage(chatId, message);

        if (isChatIdAbsent) {
          mutableMessages[chatId] = {};
        }

        const isDateAbsent = !Array.isArray(mutableMessages[chatId][date]);

        if (isDateAbsent) {
          mutableMessages[chatId][date] = [];
        }

        mutableMessages[chatId][date] = [
          ...state.messages[chatId][date],
          message,
        ];

        return {
          ...state,
          messages: {
            ...state.messages,
            [chatId]: {
              ...mutableMessages[chatId],
              [date]: [...mutableMessages[chatId][date]],
            },
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
  };
});
