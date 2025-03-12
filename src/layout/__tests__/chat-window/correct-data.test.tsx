import ChatWindow from "@/layout/chat-window";
import { Connection } from "@/state/connections";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

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
      "https://cdn.pixabay.com/photo/2021/06/11/12/26/woman-6328478_1280.jpg",
    lastOnline: null,
    unread: 4,
    lastMessage: {
      date: "2024-10-09T21:00:00.000Z",
      content: "How are you doing?",
      state: "sent",
    },
  },
};

const active = "2";

render(<ChatWindow.UI active={active} connections={connections} />);

test("Correct Data", () => {
  expect(screen.getByText("Omaima Maher")).toBeDefined();
  expect(screen.getByText("Online")).toBeDefined();
});
