import { atom } from "jotai";

export type Connection = {
  id: string;
  image?: string;
  name: string;
  unread?: number;
  lastOnline: null | (string & {});
};

const connections: Record<string, Connection> = {
  "1": {
    id: "1",
    name: "Muhammad Maher",
    image:
      "https://qph.cf2.quoracdn.net/main-qimg-5eb631ae6f587af2631f6d3348047693.webp",
    lastOnline: new Date("24-1-2025").toString(),
  },
  "2": {
    id: "2",
    name: "Omaima Maher",
    image:
      "https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg",
    lastOnline: null,
    unread: 4,
  },
};

export const connectionsAtom = atom<null | Record<string, Connection>>(
  connections,
);
