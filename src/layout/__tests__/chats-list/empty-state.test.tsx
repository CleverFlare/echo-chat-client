import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ChatsList from "@/layout/chats-list";

vi.mock("next/navigation", () => ({
  usePathname: () => "/mocked-path",
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

render(<ChatsList.UI connections={{}} />);

test("Amount of rendered elements", () => {
  const chatCards = screen.queryAllByTestId("chat-card");

  expect(chatCards.length).toEqual(0);
});

test("Empty state", () => {
  const emptyState = screen.getByTestId("empty-state");

  expect(emptyState).toBeDefined();
});
