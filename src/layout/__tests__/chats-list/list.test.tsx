import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ChatsList from "@/layout/chats-list";
import { Connection } from "@/state/connections";
import { formatDistanceToNow } from "date-fns";

vi.mock("next/navigation", () => ({
  usePathname: () => "/mocked-path",
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

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
    lastOnline: "current",
    unread: 1,
    lastMessage: {
      date: "2024-10-19T21:00:00.000Z",
      content: "Bro!",
    },
  },
};

render(<ChatsList.UI connections={connections} />);

test("Rendered correctly", () => {
  const chatCards = screen.queryAllByTestId("chat-card");

  expect(chatCards.length).toEqual(2);
});

test("Data rendered correctly", async () => {
  const connectionsArray = Object.values(connections);

  connectionsArray.map(async (connection) => {
    await screen.findByText(connection.name);

    await screen.findByText(
      formatDistanceToNow(connection.lastMessage?.date, { addSuffix: true }),
    );

    await screen.findByText(connection.lastMessage.content);
  });
});
