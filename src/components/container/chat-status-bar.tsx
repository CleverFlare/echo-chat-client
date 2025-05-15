import { Avatar, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";
import ConditionalRenderer from "../utils/conditional-renderer";
import { Connection } from "@/state/connections";
import { ComponentProps } from "react";
import { useNamedBlocks } from "@/lib/use-named-blocks";
import { cn } from "@/lib/utils";

interface UserStatusProps {
  connection: Connection;
}

export const StartSide = (props: ComponentProps<"div">) => <div {...props} />;
export const EndSide = (props: ComponentProps<"div">) => <div {...props} />;

export default function ChatStatusBar({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  const findChild = useNamedBlocks(children);
  return (
    <div
      className={cn("w-full rounded-2xl bg-white p-4", className)}
      {...props}
    >
      {findChild(StartSide)}
      {findChild(EndSide)}
    </div>
  );
}

export const UserStatus = ({ connection }: UserStatusProps) => {
  const isCurrentlyOnline = connection.lastOnline === null;
  return (
    <div className="flex gap-2 z-20">
      <Avatar className="size-[40px]">
        <AvatarImage src={connection.image} alt="avatar" />
      </Avatar>
      <div className="flex flex-col justify-center">
        <p className="font-semibold text-sm">{connection.name}</p>
        <ConditionalRenderer shouldRender={!isCurrentlyOnline}>
          <p className="text-xs text-gray-500">
            {format(new Date().toString()!, "d MMM, yy")}
          </p>
        </ConditionalRenderer>
        <ConditionalRenderer shouldRender={isCurrentlyOnline}>
          <p className="text-purple-500 text-xs font-semibold">Online</p>
        </ConditionalRenderer>
      </div>
    </div>
  );
};
