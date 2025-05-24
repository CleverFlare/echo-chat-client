import { type Contact } from "@/store/contacts";

export const dummyContactsData: Contact[] = [
  {
    id: "2",
    firstName: "Omaima",
    lastName: "Maher",
    username: "omaima",
    avatarUrl:
      "https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg",
    unread: 4,
    chatId: "2",
    lastMessage: {
      id: "83fd9e2b-e487-463f-a760-43db68be8b69",
      status: "delivered",
      senderId: "2",
      content: "Bye! ✨",
      timestamp: "2025-05-18T09:34:52.820Z",
    },
  },
  {
    id: "3",
    firstName: "Omar",
    lastName: "Maher",
    username: "omdragon",
    avatarUrl:
      "https://i.pinimg.com/564x/24/20/a1/2420a1f4a2e5200aa5744ab3d79f4c3e.jpg",
    unread: 0,
    chatId: "3",
    lastMessage: undefined,
  },
];
