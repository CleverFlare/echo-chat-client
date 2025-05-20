import { type Contact } from "@/store/contacts";

export const dummyContactsData: Contact[] = [
  {
    id: "2",
    firstName: "Omaima",
    lastName: "Maher",
    username: "omaima",
    avatarUrl:
      "https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg",
    online: false,
    unread: 4,
  },
  {
    id: "3",
    firstName: "Omar",
    lastName: "Maher",
    username: "omdragon",
    avatarUrl:
      "https://i.pinimg.com/564x/24/20/a1/2420a1f4a2e5200aa5744ab3d79f4c3e.jpg",
    online: true,
    unread: 0,
  },
];
