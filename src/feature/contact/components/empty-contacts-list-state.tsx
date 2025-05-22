import { ChatsCircleIcon } from "@phosphor-icons/react";

export function EmptyContactsListState() {
  return (
    <div
      className="flex flex-col items-center mt-4 flex-1"
      data-testid="empty-state"
    >
      <div className="rounded-full p-4 bg-black/5">
        <ChatsCircleIcon size={40} color="#00000080" />
      </div>
      <p className="font-bold text-lg text-center mt-2">No chats, yet.</p>
      <p className="font-medium text-sm text-center text-gray-500">
        Here, you&apos;ll find all your chat history.
      </p>
    </div>
  );
}
