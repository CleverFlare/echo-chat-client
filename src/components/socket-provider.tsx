// SocketProvider.tsx
import { socket } from "@/lib/socket";
import { useAuthStore } from "@/store/auth";
import React, { createContext, useContext, useEffect } from "react";

const SocketContext = createContext(socket);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
