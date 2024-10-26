import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { ChatsList, Connection } from "./chats-list";
import { cleanup, render, screen } from "@testing-library/react";

afterEach(cleanup);

beforeAll(() => {
  // eslint-disable-next-line
  vi.mock("next/navigation", () => ({
    usePathname: () => {},
    useRouter: () => ({ replace: () => {} }),
    useSearchParams: () => ({ get: () => {} }),
  }));
});

const connections: Connection[] = [
  {
    id: "1",
    name: "Muhammad Maher",
    unread: 4,
    lastMessage: {
      date: "2024-10-24T19:06:19.763Z",
      content: "I'm okay. How are you doing?",
    },
  },
  {
    id: "2",
    name: "Mahmoud Maher",
    lastMessage: {
      date: "2024-10-24T19:06:19.763Z",
      state: "sent",
      content: "How is it going my guy?",
    },
  },
];

describe("Data Rendering", async () => {
  test("Amount of data rendered", async () => {
    render(<ChatsList connections={connections} />);
    const allConnections = await screen.findAllByTestId("chat-card");

    expect(allConnections.length).toEqual(2);
  });

  test("Data rendered correctly", async () => {
    render(<ChatsList connections={connections} />);
    connections.map((connection) => {
      const renderedName = screen.getByText(connection.name);
      const renderedLastMessage = screen.getByText(
        connection.lastMessage.content,
      );

      expect(renderedName).toBeDefined();
      expect(renderedLastMessage).toBeDefined();
    });
  });
});

describe("Empty State", () => {
  test("Empty connections", async () => {
    render(<ChatsList connections={[]} />);
    const allConnections = screen.queryAllByTestId("chat-card");

    expect(allConnections.length).toEqual(0);
  });

  test("Rendered empty state", async () => {
    render(<ChatsList connections={[]} />);
    expect(screen.getByTestId("empty-state")).toBeDefined();
  });
});
