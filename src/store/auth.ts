import { create } from "zustand";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarUrl?: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: "1",
    firstName: "Muhammad",
    lastName: "Maher",
    username: "flare",
    avatarUrl:
      "https://qph.cf2.quoracdn.net/main-qimg-5eb631ae6f587af2631f6d3348047693.webp",
  },
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJmbGFyZSIsImlkIjoiMSIsImlhdCI6MTUxNjIzOTAyMn0.vu53uY6ZiUFovGiLDBFEcVekKjNjCnsRdcVMSPDT_-s",
  logout: () => set({ user: null, token: null }),
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
}));
