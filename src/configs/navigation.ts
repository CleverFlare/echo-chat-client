import { MessageCircle, Settings, UserRoundPlus, Users } from "lucide-react";

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
        icon: Users,
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
};
