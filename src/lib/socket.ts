// socket.ts
import { io, Socket } from "socket.io-client";

export const socket: Socket = io(import.meta.env.VITE_SERVER_URL, {
  autoConnect: false, // We control when to connect
  extraHeaders: {
    authorization: localStorage.getItem("OutSiteJWT") ?? "Unauthenticated",
  },
});
