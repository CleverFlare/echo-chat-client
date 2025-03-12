import { atom } from "jotai";

export type User = {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
};

export const userAtom = atom<User | null>({
  id: "1",
  name: "Muhammad Maher",
  username: "flare",
  avatarUrl:
    "https://qph.cf2.quoracdn.net/main-qimg-5eb631ae6f587af2631f6d3348047693.webp",
});
