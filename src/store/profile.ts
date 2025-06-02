import { create } from "zustand";
import type { User } from "./auth";

export type ProfileState = {
  open: boolean;
  id: string | null;
  setProfile: (id: string | null) => void;
  close: () => void;
  cachedProfiles: Record<string, User>;
  addCachedProfile: (user: User) => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
  open: false,
  id: null,
  setProfile: (id) => set({ id, open: true }),
  close: () => set({ open: false }),
  cachedProfiles: {},
  addCachedProfile: (user: User) =>
    set((state) => ({
      cachedProfiles: { ...state.cachedProfiles, [user.id]: user },
    })),
}));
