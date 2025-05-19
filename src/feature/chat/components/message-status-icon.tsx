import { cn } from "@/lib/utils";
import { MessageStatus } from "@/store/chat";
import {
  Check,
  Checks,
  Clock,
  IconProps,
  WarningCircle,
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
      return <Clock size={size ?? 16} {...props} />;
    case "sent":
      return <Check size={size ?? 16} {...props} />;
    case "delivered":
      return <Checks size={size ?? 20} {...props} />;
    case "read":
      return (
        <Checks
          className={cn("text-sky-400", className)}
          size={size ?? 20}
          {...props}
        />
      );
    case "failed":
      return (
        <WarningCircle
          weight={weight ?? "fill"}
          className={cn("text-red-500", className)}
          size={size ?? 20}
        />
      );
    default:
      return null;
  }
}
