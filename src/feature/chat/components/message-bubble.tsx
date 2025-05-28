import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { format } from "date-fns";
import { type ComponentProps } from "react";
import ConditionalRenderer from "../../../components/utils/conditional-renderer";
import { MessageStatusIcon } from "../../../components/message-status-icon";
import { type MessageStatus } from "@/store/chat";

interface MessageProps extends ComponentProps<"div"> {
  content: string;
  timestamp: string;
  direction: "incoming" | "outgoing";
  status: MessageStatus;
  containerProps?: ComponentProps<"div">;
  contentProps?: ComponentProps<"p">;
  timestampProps?: ComponentProps<"p">;
  footerProps?: ComponentProps<"div">;
  // replyTo?: MessageType;
  mediaUrl?: string;
  edited: boolean;
  id: string;
}

const messageVariants = cva(
  "min-w-[200px] p-2 rounded-xl h-max flex flex-col shadow-sm",
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

export default function MessageBubble({
  content,
  timestamp,
  direction = "outgoing",
  className,
  containerProps,
  contentProps,
  timestampProps,
  footerProps,
  status = "pending",
  // replyTo,
  edited,
  // eslint-disable-next-line
  mediaUrl,
  ...props
}: MessageProps) {
  const containerClassName = containerProps?.className;
  const contentClassName = contentProps?.className;
  const timestampClassName = timestampProps?.className;
  const footerClassName = footerProps?.className;

  const isOutgoing = direction === "outgoing";
  const isFailedMessage = status === "failed";
  // const isReplying = !!replyTo;

  // const reply = isReplying ? replyTo : null;

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
        {/* <ConditionalRenderer shouldRender={isReplying}> */}
        {/*   <button */}
        {/*     className={cn( */}
        {/*       "p-2 rounded-lg flex flex-col gap-1 w-full mb-2 justify-start text-start border-l-[4px] border-purple-300", */}
        {/*       isOutgoing ? "bg-white/20" : "bg-purple-500/10", */}
        {/*     )} */}
        {/*   > */}
        {/*     <p */}
        {/*       className={cn( */}
        {/*         "text-xs font-semibold truncate w-full", */}
        {/*         isOutgoing ? "text-purple-200" : "text-purple-500", */}
        {/*       )} */}
        {/*     > */}
        {/*       {reply?.sender?.name ?? replyTo?.sender.name ?? "Unknown"} */}
        {/*     </p> */}
        {/*     <p className="text-xs truncate w-full"> */}
        {/*       {reply?.content ?? */}
        {/*         replyTo?.content ?? */}
        {/*         "Could not load the message"} */}
        {/*     </p> */}
        {/*   </button> */}
        {/* </ConditionalRenderer> */}
        <p
          className={cn(
            "text-sm [unicode-bidi:plaintext] whitespace-pre-line",
            contentClassName,
          )}
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
          <p className={cn("text-xs", timestampClassName)} {...timestampProps}>
            {format(timestamp, "h:m aaa")}
          </p>
          <ConditionalRenderer shouldRender={isOutgoing}>
            <MessageStatusIcon status={status} />
          </ConditionalRenderer>
        </div>
      </div>
    </div>
  );
}
