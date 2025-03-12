import { cn } from "@/lib/utils";
import {
  MessageDirection,
  messagesAtom,
  MessageState,
  SenderInfo,
} from "@/state/message";
import { Check, Checks, Clock, WarningCircle } from "@phosphor-icons/react";
import { cva } from "class-variance-authority";
import { format } from "date-fns";
import { ComponentProps } from "react";
import ConditionalRenderer from "../utils/conditional-renderer";
import { useAtom } from "jotai";

interface MessageProps extends ComponentProps<"div"> {
  content: string;
  timestamp: string;
  direction?: MessageDirection;
  state?: MessageState;
  containerProps?: ComponentProps<"div">;
  contentProps?: ComponentProps<"p">;
  timestampProps?: ComponentProps<"p">;
  footerProps?: ComponentProps<"div">;
  replyTo?: {
    id: string | number;
    content: string;
    sender: SenderInfo;
  };
  edited?: boolean;
}

const messageVariants = cva(
  "min-w-[200px] p-2 rounded-lg h-max flex flex-col shadow-sm",
  {
    variants: {
      direction: {
        incoming: "bg-white rounded-ss-none",
        outgoing:
          " bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-se-none ms-auto",
      },
    },
    defaultVariants: {
      direction: "incoming",
    },
  },
);

export function State({ state }: { state: MessageState }) {
  switch (state) {
    case "pending":
      return <Clock size={16} />;
    case "sent":
      return <Check size={16} />;
    case "delivered":
      return <Checks size={20} />;
    case "read":
      return <Checks className="text-sky-400" size={20} />;
    case "failed":
      return <WarningCircle weight="fill" className="text-red-500" size={20} />;
    default:
      return null;
  }
}

export default function Message({
  content,
  timestamp,
  direction = "outgoing",
  className,
  containerProps,
  contentProps,
  timestampProps,
  footerProps,
  state = "pending",
  replyTo,
  edited,
  ...props
}: MessageProps) {
  const containerClassName = containerProps?.className;
  const contentClassName = contentProps?.className;
  const timestampClassName = timestampProps?.className;
  const footerClassName = footerProps?.className;

  const isOutgoing = direction === "outgoing";
  const isFailedMessage = state === "failed";
  const isReplying = !!replyTo;

  const [messages] = useAtom(messagesAtom);

  const reply = isReplying
    ? messages.find((message) => message.id === replyTo.id)
    : null;

  return (
    <div
      className={cn(
        "w-full flex h-max",
        isFailedMessage && "opacity-50",
        containerClassName,
      )}
      {...containerProps}
    >
      <div className={cn(messageVariants({ direction, className }))} {...props}>
        <ConditionalRenderer shouldRender={isReplying}>
          <button
            className={cn(
              "p-2 rounded-lg flex flex-col gap-1 w-full mb-2 justify-start text-start border-l-[4px] border-purple-300",
              isOutgoing ? "bg-white/20" : "bg-purple-500/10",
            )}
          >
            <p
              className={cn(
                "text-xs font-bold truncate w-full",
                isOutgoing ? "text-purple-200" : "text-purple-500",
              )}
            >
              {reply?.sender?.name ?? replyTo?.sender.name ?? "Unknown"}
            </p>
            <p className="text-xs truncate w-full">
              {reply?.content ??
                replyTo?.content ??
                "Could not load the message"}
            </p>
          </button>
        </ConditionalRenderer>
        <p
          className={cn("text-sm [unicode-bidi:plaintext]", contentClassName)}
          {...contentProps}
        >
          {content}
        </p>
        <div
          className={cn(
            "flex justify-end items-center gap-1",
            direction === "outgoing" ? "text-gray-300" : "text-gray-500",
            footerClassName,
          )}
        >
          <ConditionalRenderer shouldRender={edited}>
            <p className={cn("text-xs font-medium", timestampClassName)}>
              edited
            </p>
          </ConditionalRenderer>
          <p
            className={cn("text-xs font-medium", timestampClassName)}
            {...timestampProps}
          >
            {format(timestamp, "h:m aaa")}
          </p>
          <ConditionalRenderer shouldRender={isOutgoing}>
            <State state={state} />
          </ConditionalRenderer>
        </div>
      </div>
    </div>
  );
}
