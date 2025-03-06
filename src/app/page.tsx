import ChatWindow from "@/layout/chat-window";
import { ChatsList } from "@/layout/chats-list";
import { Connection } from "@/state/connections";
import { Suspense } from "react";

const connections: Record<string, Connection> = {
  "1": {
    id: "1",
    name: "Muhammad Maher",
    image:
      "https://qph.cf2.quoracdn.net/main-qimg-5eb631ae6f587af2631f6d3348047693.webp",
    lastOnline: new Date("24-1-2025").toString(),
    lastMessage: {
      date: "2024-10-09T21:00:00.000Z",
      content: "How are you doing?",
      state: "sent",
    },
  },
  "2": {
    id: "2",
    name: "Omaima Maher",
    image:
      "https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_960_720.jpg",
    lastOnline: null,
    unread: 1,
    lastMessage: {
      date: "2024-10-19T21:00:00.000Z",
      content: "Bro!",
    },
  },
};

export default function Home() {
  return (
    <div className="h-full md:grid md:grid-cols-[auto_1fr]">
      <Suspense>
        <ChatsList connections={connections} />
        <ChatWindow className="my-4 me-4" />
      </Suspense>
    </div>
  );
}
