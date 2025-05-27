import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDownIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import { useChatStore } from "@/store/chat";
import { getRelativeDayLabel } from "@/lib/get-relative-day-label";
import { useAuthStore } from "@/store/auth";
import { useContactsStore } from "@/store/contacts";
import MessageBubble from "@/feature/chat/components/message-bubble";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/queries/chat";
import ConditionalRenderer from "@/components/utils/conditional-renderer";
import { Skeleton } from "@/components/ui/skeleton";
import { range } from "@/lib/range";
import { AnimatePresence, motion } from "motion/react";
import { useUpdateEffect } from "@custom-react-hooks/use-update-effect";

const NEAR_BOTTOM_OFFSET = 400;

export default function MessagesList() {
  const user = useAuthStore((state) => state.user);
  const { activeChatId, setMessages } = useChatStore();
  const messages = useChatStore((state) => state.messages[activeChatId!]);
  const { resetUnread, getContactByChatId } = useContactsStore();

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
  const [isUserNearBottom, setIsUserNearBottom] = useState<boolean>(true);

  const contact = getContactByChatId(activeChatId!);

  const scrollToBottom = useCallback(
    (smooth: boolean = false) => {
      if (scrollAreaRef.current && isUserNearBottom)
        // using timeout to delay the scrolling after rendering (asynchronous operation)
        setTimeout(() => {
          scrollAreaRef.current?.scrollIntoView({
            block: "end",
            behavior: smooth ? "smooth" : "instant",
          });
        }, 0);
    },

    [isUserNearBottom, scrollAreaRef],
  );

  useUpdateEffect(() => {
    scrollToBottom(true);
  }, [messages, contact?.isTyping]);

  useEffect(() => {
    scrollToBottom(false);

    // eslint-disable-next-line
  }, [scrollAreaRef.current]);

  useEffect(() => {
    if (activeChatId) resetUnread(activeChatId);

    // eslint-disable-next-line
  }, [activeChatId]);

  const { isPending, data } = useQuery({
    queryKey: ["chat", activeChatId!],
    queryFn: () => getMessages(activeChatId!),
  });

  useEffect(() => {
    if (!isPending && data) setMessages(activeChatId!, data);

    // eslint-disable-next-line
  }, [isPending, data, activeChatId]);

  const activeChatMessages = messages ? Object.keys(messages) : [];

  return (
    <ScrollAreaPrimitive.Root className="relative overflow-hidden z-20">
      <ScrollAreaPrimitive.ScrollArea className="h-full">
        <ScrollAreaPrimitive.Viewport
          className="h-full w-full rounded-[inherit]"
          onScroll={(e) => {
            const { scrollTop, scrollHeight, offsetHeight, clientHeight } =
              e.currentTarget;

            const height = scrollHeight - offsetHeight;

            const isAtBottom = scrollTop === height;

            const isUserNearBottom =
              scrollHeight - scrollTop - clientHeight <= NEAR_BOTTOM_OFFSET;

            console.log("IS USER NEAR THE BOTTOM", isUserNearBottom);

            setIsUserNearBottom(isUserNearBottom);

            if (isAtBottom) setIsAtBottom(true);
            else setIsAtBottom(false);
          }}
        >
          <ConditionalRenderer shouldRender={isPending}>
            <div
              className="flex flex-col-reverse justify-end w-full py-4 px-4 gap-2"
              ref={scrollAreaRef}
            >
              {range(14).map((i) => (
                <div
                  className={cn(
                    "flex w-full",
                    i % 2 === 0 ? "justify-start" : "justify-end",
                  )}
                  key={`Chat Skeleton ${i}`}
                >
                  <div
                    className={cn(
                      "min-w-[200px] p-2 rounded-xl h-max flex flex-col shadow-sm gap-2 bg-neutral-50",
                      i % 2 === 0
                        ? "rounded-ss-none"
                        : "rounded-se-none ms-auto",
                    )}
                  >
                    <Skeleton
                      className={cn("h-3 rounded bg-neutral-200 w-[300px]")}
                    />
                    <Skeleton
                      className={cn("h-3 rounded bg-neutral-200 w-[200px]")}
                    />
                    <div className={cn("flex w-full gap-2 justify-end")}>
                      <Skeleton
                        className={cn("h-2 w-5 rounded-sm bg-neutral-200")}
                      />
                      <ConditionalRenderer shouldRender={i % 2 === 1}>
                        <Skeleton
                          className={cn("h-2 w-3 rounded-sm bg-neutral-200")}
                        />
                      </ConditionalRenderer>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ConditionalRenderer>
          <ConditionalRenderer shouldRender={!isPending}>
            <div className="flex flex-col" ref={scrollAreaRef}>
              <div className="flex flex-col-reverse p-4 gap-2">
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
                          message.senderId === user?.id
                            ? "outgoing"
                            : "incoming"
                        }
                        status={message.status}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <AnimatePresence initial={false}>
                {contact?.isTyping && (
                  <motion.div
                    className="flex w-full overflow-hidden"
                    exit={{ height: 0 }}
                  >
                    <motion.div
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "100%", opacity: 0, height: 0 }}
                      className="w-max p-3 rounded-xl h-max flex shadow-sm bg-white rounded-ss-none gap-1 mx-4 mb-4"
                    >
                      <div className="size-1.5 rounded-full bg-neutral-200 animate-murcery" />
                      <div className="size-1.5 rounded-full bg-neutral-200 animate-murcery delay-200" />
                      <div className="size-1.5 rounded-full bg-neutral-200 animate-murcery delay-400" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ConditionalRenderer>
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
            <ArrowDownIcon color="white" size={20} />
          </button>
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.ScrollArea>
    </ScrollAreaPrimitive.Root>
  );
}
