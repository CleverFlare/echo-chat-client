import { cn } from "@/lib/utils";
import { type MessageStatus } from "@/store/chat";
import {
  CheckIcon,
  ChecksIcon,
  ClockIcon,
  type IconProps,
  WarningCircleIcon,
} from "@phosphor-icons/react";

export function MessageStatusIcon({
  state,
  size,
  className,
  weight,
  ...props
}: { state: MessageStatus } & IconProps) {
  switch (state) {
    case "pending":
      return <ClockIcon size={size ?? 16} {...props} />;
    case "sent":
      return <CheckIcon size={size ?? 16} {...props} />;
    case "delivered":
      return <ChecksIcon size={size ?? 20} {...props} />;
    case "read":
      return (
        <ChecksIcon
          className={cn("text-sky-400", className)}
          size={size ?? 20}
          {...props}
        />
      );
    case "failed":
      return (
        <WarningCircleIcon
          weight={weight ?? "fill"}
          className={cn("text-red-500", className)}
          size={size ?? 20}
        />
      );
    default:
      return null;
  }
}
