import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import { useChatStore } from "@/store/chat";
import { getRelativeDayLabel } from "@/lib/get-relative-day-label";
import { useAuthStore } from "@/store/auth";
import { useContactsStore } from "@/store/contacts";
import MessageBubble from "@/feature/chat/components/message-bubble";

export default function MessagesList() {
  const { user } = useAuthStore();
  const { activeChatId } = useChatStore();

  const messages = useChatStore((state) => state.messages[activeChatId!]);

  const { readAllMessages } = useContactsStore();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);

  useEffect(() => {
    const unsub = useChatStore.subscribe(async () => {
      setTimeout(() => {
        if (scrollAreaRef.current)
          scrollAreaRef.current?.scrollIntoView({
            block: "end",
          });
      }, 0);
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (activeChatId) readAllMessages(activeChatId);

    if (scrollAreaRef.current)
      scrollAreaRef.current?.scrollIntoView({
        block: "end",
      });
  }, [activeChatId, readAllMessages]);

  const activeChatMessages = messages ? Object.keys(messages) : [];

  return (
    <ScrollAreaPrimitive.Root className="relative overflow-hidden z-20">
      <ScrollAreaPrimitive.Viewport
        className="h-full w-full rounded-[inherit]"
        onScroll={(e) => {
          const { scrollTop, scrollHeight, offsetHeight } = e.currentTarget;

          const height = scrollHeight - offsetHeight;

          const isAtBottom = scrollTop === height;

          if (isAtBottom) setIsAtBottom(true);
          else setIsAtBottom(false);
        }}
      >
        <div
          className="flex flex-col-reverse py-4 px-4 gap-2"
          ref={scrollAreaRef}
        >
          {activeChatMessages.toReversed().map((date) => (
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
                    message.sender.id === user?.id ? "outgoing" : "incoming"
                  }
                  status={message.status}
                />
              ))}
            </div>
          ))}
        </div>
        <button
          className={cn(
            "w-[40px] h-[40px] flex justify-center items-center rounded-full bg-gradient-to-bl from-purple-500 to-purple-700 absolute bottom-4 right-2 z-40 transition-all",
            isAtBottom ? "rotate-180 scale-0" : "rotate-0 scale-100",
          )}
          onClick={() => {
            scrollAreaRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
          }}
        >
          <ArrowDown color="white" size={20} />
        </button>
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}
