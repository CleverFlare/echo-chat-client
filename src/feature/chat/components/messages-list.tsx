import { ArrowDownIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import { useChatStore } from "@/store/chat";
import { useContactsStore } from "@/store/contacts";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/queries/chat";
import ConditionalRenderer from "@/components/utils/conditional-renderer";
import { useAutoScroll } from "../hooks/use-auto-scroll";
import { MessagesSkeleton } from "./messages-skeleton";
import { GroupedMessages } from "./grouped-messages";
import { TypingIndiciator } from "./typing-indicator";

export default function MessagesList() {
  const {
    activeChatId,
    setMessages,
    messages: { [activeChatId!]: messages },
  } = useChatStore();

  const { resetUnread, getContactByChatId } = useContactsStore();

  const contact = getContactByChatId(activeChatId!);

  const { jumpToBottom, handleScrolling, ref, isAtBottom } = useAutoScroll({
    scrollToBottomDependencies: [messages, contact?.isTyping],
    onBottomReached: () => resetUnread(activeChatId!),
    nearBottomOffset: 400,
    initialScrollBehavior: "instant",
    newMessagesScrollBehavior: "smooth",
  });

  const { isPending } = useQuery({
    queryKey: ["chat", activeChatId!],
    queryFn: async () => {
      const fetchedMessages = await getMessages(activeChatId!);

      if (activeChatId) setMessages(activeChatId, fetchedMessages);

      return fetchedMessages;
    },
  });

  return (
    <ScrollAreaPrimitive.Root className="relative overflow-hidden z-20">
      <ScrollAreaPrimitive.ScrollArea className="h-full">
        <ScrollAreaPrimitive.Viewport
          className="h-full w-full rounded-[inherit]"
          onScroll={handleScrolling}
        >
          <ConditionalRenderer shouldRender={isPending}>
            <MessagesSkeleton ref={ref} />
          </ConditionalRenderer>
          <ConditionalRenderer shouldRender={!isPending}>
            <div className="flex flex-col" ref={ref}>
              <GroupedMessages messages={messages} />
              <TypingIndiciator isTyping={!!contact?.isTyping} />
            </div>
          </ConditionalRenderer>
          <button
            className={cn(
              "w-[40px] h-[40px] flex justify-center items-center rounded-full bg-gradient-to-bl from-purple-500 to-purple-700 absolute bottom-4 right-2 z-40 transition-all",
              isAtBottom ? "rotate-180 scale-0" : "rotate-0 scale-100",
            )}
            onClick={() => jumpToBottom()}
          >
            <ArrowDownIcon color="white" size={20} />
          </button>
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.ScrollArea>
    </ScrollAreaPrimitive.Root>
  );
}
