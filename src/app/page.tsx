import { ChatsList, Connection } from "@/components/chats-list";

const connections: Connection[] = [
  {
    id: "1",
    name: "Muhammad Maher",
    image:
      "https://qph.cf2.quoracdn.net/main-qimg-5eb631ae6f587af2631f6d3348047693.webp",
    lastMessage: {
      date: "2024-10-09T21:00:00.000Z",
      content: "How are you doing?",
      state: "sent",
    },
  },
  {
    id: "2",
    name: "Omaima Maher",
    image:
      "https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_960_720.jpg",
    unread: 1,
    lastMessage: {
      date: "2024-10-19T21:00:00.000Z",
      content: "Bro!",
    },
  },
];

export default function Home() {
  return (
    <div className="h-full">
      <ChatsList connections={[]} />
    </div>
  );
}
