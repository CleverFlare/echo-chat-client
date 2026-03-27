import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { ReceivedFriendRequest, SentFriendRequest } from "../types";

export type FriendRequestsState = {
  received: Record<string, ReceivedFriendRequest>;
  sent: Record<string, SentFriendRequest>;
};

export type FriendRequestsModifiers = {
  acceptRequest: (requestId: string) => void;
  declineRequest: (requestId: string) => void;
  cancelRequest: (requestId: string) => void;
  addReceived: (request: ReceivedFriendRequest) => void;
  addSent: (request: SentFriendRequest) => void;
};

export type FriendRequestsStore = FriendRequestsState & FriendRequestsModifiers;

export const useFriendRequests = create<FriendRequestsStore>()(
  immer<FriendRequestsStore>((set) => ({
    received: {
      ["req-001"]: {
        id: "req-001",
        senderId: "user-001",
        senderFirstName: "Jocelyn",
        senderLastName: "George",
        senderHandle: "jocelyn_g",
        senderAvatar:
          "https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=ffd5dc&seed=Jocelyn",
        sentAt: new Date("2026-03-25T10:00:00Z"),
        status: "pending",
      },
      ["req-002"]: {
        id: "req-002",
        senderId: "user-002",
        senderFirstName: "Leo",
        senderLastName: "Emery",
        senderHandle: "leo_e",
        senderAvatar:
          "https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=ffdfbf&seed=Leo",
        sentAt: new Date("2026-03-26T14:30:00Z"),
        status: "pending",
      },
    },

    sent: {
      ["req-003"]: {
        id: "req-003",
        receiverId: "user-003",
        receiverFirstName: "Andrea",
        receiverLastName: "Avery",
        receiverHandle: "andrea_a",
        receiverAvatar:
          "https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Andrea",
        sentAt: new Date("2026-03-24T09:15:00Z"),
        status: "pending",
      },
    },

    acceptRequest(requestId) {
      set((state) => {
        if (state.received[requestId]) {
          state.received[requestId].status = "accepted";
        }
      });
    },

    declineRequest(requestId) {
      set((state) => {
        if (state.received[requestId]) {
          state.received[requestId].status = "declined";
        }
      });
    },

    cancelRequest(requestId) {
      set((state) => {
        delete state.sent[requestId];
      });
    },

    addReceived(request) {
      set((state) => {
        state.received[request.id] = request;
      });
    },

    addSent(request) {
      set((state) => {
        state.sent[request.id] = request;
      });
    },
  })),
);
