import Message from "@/feature/chat/components/ui/message";
import { messagesAtom, readMessagesAtom } from "@/state/message";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { activeChatIDAtom } from "@/state/ui";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";

export default function Messages() {
  const [messages] = useAtom(messagesAtom);
  // eslint-disable-next-line
  const [_, readMessages] = useAtom(readMessagesAtom);
  const [active] = useAtom(activeChatIDAtom);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);

  useEffect(() => {
    if (scrollAreaRef.current?.scrollIntoView)
      scrollAreaRef.current?.scrollIntoView(false);
  }, [scrollAreaRef, messages]);

  useEffect(() => {
    if (active) readMessages(active);
  }, [active, readMessages]);

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
          {messages.toReversed().map(({ id, replyTo, ...message }) => {
            return (
              <Message
                key={id}
                replyTo={
                  replyTo &&
                  messages.find((message) => message.id === replyTo.id)
                }
                {...message}
              />
            );
          })}
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
