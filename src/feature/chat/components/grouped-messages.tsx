import { getRelativeDayLabel } from "@/lib/get-relative-day-label";
import type { Message } from "@/store/chat";
import MessageBubble from "./message-bubble";
import { useAuthStore } from "@/store/auth";

export function GroupedMessages({
  messages,
}: {
  messages: Record<string, Message[]>;
}) {
  const user = useAuthStore((state) => state.user);

  const dates = messages ? Object.keys(messages) : [];
  return (
    <div className="flex flex-col-reverse p-4 gap-2">
      {dates.toReversed().map((date) => (
        <div className="flex flex-col gap-2" key={date}>
          <div className="flex gap-2 justify-center items-center sticky top-2">
            <p className="text-muted-foreground text-xs font-medium py-1 px-2 bg-white rounded-md shadow-sm">
              {getRelativeDayLabel(date)}
            </p>
          </div>
          {messages[date].map((message) => (
            <MessageBubble
              edited={message.isEdited}
              key={message.id}
              id={message.id}
              timestamp={message.timestamp}
              content={message.content}
              direction={
                message.senderId === user?.id ? "outgoing" : "incoming"
              }
              status={message.status}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
