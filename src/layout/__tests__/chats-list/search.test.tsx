import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ChatsList from "@/layout/chats-list";
import { Connection } from "@/state/connections";
import userEvent from "@testing-library/user-event";

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
    name: "Mahmoud Ismail",
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

test("Search results", () => {
  const searchInput = screen.getByTestId("chats-list-search-input");

  userEvent.type(searchInput, "Omaima");

  const present = screen.queryByText(/$Omaima/g);
  const absent = screen.queryByText(/$Mahmoud/g);

  expect(present).toBeDefined();
  expect(absent).toBeNull();
});
