import { create } from "zustand";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarUrl?: string | null;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("OutSiteJWT") ?? null,
  reset: () => {
    set({ user: null, token: null });
  },
  setUser: (user) => {
    set({ user });
  },
  setToken: (token) => {
    set({ token });
  },
}));
