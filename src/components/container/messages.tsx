import Message from "@/components/ui/message";
import { messagesAtom } from "@/state/message";
import { useAtom } from "jotai";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export default function Messages() {
  const [messages] = useAtom(messagesAtom);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);

  useEffect(() => {
    if (scrollAreaRef.current?.scrollIntoView)
      scrollAreaRef.current?.scrollIntoView(false);
  }, [scrollAreaRef]);

  return (
    <ScrollArea
      className="relative"
      onScroll={(e) => {
        const { scrollTop, scrollHeight, offsetHeight } = e.currentTarget;

        const height = scrollHeight - offsetHeight;

        const isAtBottom = scrollTop === height;

        if (isAtBottom) setIsAtBottom(true);
        else setIsAtBottom(false);
      }}
    >
      <div className="flex flex-col py-4 px-14 gap-2" ref={scrollAreaRef}>
        {messages.map(({ id, ...message }) => {
          return <Message key={id} {...message} />;
        })}
      </div>
      <button
        className={cn(
          "w-[40px] h-[40px] flex justify-center items-center rounded-full bg-gradient-to-bl from-purple-500 to-purple-700 absolute bottom-4 right-2 z-40 transition-all",
          isAtBottom ? "rotate-180 scale-0" : "rotate-0 scale-100",
        )}
        onClick={() => scrollAreaRef.current?.scrollIntoView(false)}
      >
        <ArrowDown color="white" size={20} />
      </button>
    </ScrollArea>
  );
}
