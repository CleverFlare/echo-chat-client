import {
  Key,
  MessageCircle,
  Settings,
  User,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";

export const navigation = {
  main: {
    sections: [
      {
        title: "Chats",
        icon: MessageCircle,
        to: "/chats",
      },
      {
        title: "Friends",
        icon: UsersRound,
        to: "/friends",
      },
      {
        title: "Friend Requests",
        icon: UserRoundPlus,
        to: "/friend-requests",
      },
    ],

    footer: [
      {
        title: "Settings",
        icon: Settings,
        to: "/settings",
      },
    ],
  },
  settings: [
    {
      title: "Profile",
      icon: User,
      to: "/settings/profile",
    },
    {
      title: "Privacy",
      icon: Key,
      to: "/settings/privacy",
    },
  ],
};
