import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Friend } from "../types";

export type FriendsState<
  Friends extends Record<string, Friend> = Record<string, Friend>,
> = {
  friends: Friends;
};

export type FriendsModifiers = {
  addFriend: (friend: Friend) => void;
  removeFriend: (friendId: string) => void;
  updateFriend: (friendId: string, patch: Partial<Omit<Friend, "id">>) => void;
};

export type FriendsStore = FriendsState & FriendsModifiers;

export const useFriends = create<FriendsStore>()(
  immer<FriendsStore>((set) => ({
    friends: {
      ["friend-001"]: {
        id: "friend-001",
        firstName: "Muhammad",
        lastName: "Maher",
        handle: "muhammad_m",
        avatar:
          "https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=b6e3f4&seed=Muhammad",
        presence: "online",
        bio: "Hey, there! I'm using Echo.",
        chatId: "chat-001",
      },
      ["friend-002"]: {
        id: "friend-002",
        firstName: "Andrea",
        lastName: "Avery",
        handle: "andrea_a",
        avatar:
          "https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Andrea",
        presence: "offline",
        bio: "Coffee enthusiast & developer.",
        chatId: "chat-002",
      },
      ["friend-003"]: {
        id: "friend-003",
        firstName: "Jocelyn",
        lastName: "George",
        handle: "jocelyn_g",
        avatar:
          "https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=ffd5dc&seed=Jocelyn",
        presence: "online",
        bio: "Hey, there! I'm using Echo.",
        chatId: "chat-003",
      },
      ["friend-004"]: {
        id: "friend-004",
        firstName: "Leo",
        lastName: "Emery",
        handle: "leo_e",
        avatar:
          "https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=ffdfbf&seed=Leo",
        presence: "online",
        bio: "Hey, there! I'm using Echo.",
        chatId: "chat-004",
      },
    },

    addFriend(friend) {
      set((state) => {
        state.friends[friend.id] = friend;
      });
    },

    removeFriend(friendId) {
      set((state) => {
        delete state.friends[friendId];
      });
    },

    updateFriend(friendId, patch) {
      set((state) => {
        if (state.friends[friendId]) {
          Object.assign(state.friends[friendId], patch);
        }
      });
    },
  })),
);
