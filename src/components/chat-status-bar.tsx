import { Avatar, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";
import ConditionalRenderer from "./ui/conditional-renderer";
import { Connection } from "@/state/use-connections";

interface ChatStatusBarProps {
  connection: Connection;
}

export default function ChatStatusBar({ connection }: ChatStatusBarProps) {
  return (
    <div className="w-full rounded-2xl bg-white p-4">
      <div className="flex gap-2">
        <Avatar className="size-[40px]">
          <AvatarImage src={connection.image} />
        </Avatar>
        <div className="flex flex-col justify-center">
          <p className="font-bold text-sm">{connection.name}</p>
          <ConditionalRenderer
            shouldRender={connection.lastOnline !== "current"}
          >
            <p className="text-xs text-gray-500">
              {format(new Date().toString()!, "d MMM, yy")}
            </p>
          </ConditionalRenderer>
          <ConditionalRenderer
            shouldRender={connection.lastOnline === "current"}
          >
            <p className="text-purple-500 text-xs font-bold">Online</p>
          </ConditionalRenderer>
        </div>
      </div>
    </div>
  );
}
