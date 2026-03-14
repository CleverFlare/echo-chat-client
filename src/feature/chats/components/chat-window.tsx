import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import { useChats } from "../stores/chats";

export function ChatWindow({
  children,
  activeChatId,
}: {
  children?: ReactNode;
  activeChatId: string;
}) {
  const chats = useChats((state) => state.chats);
  const chat = chats[activeChatId];
  return (
    <div className="flex flex-col">
      <div className="p-2 grid grid-cols-[1fr_auto] border-b">
        <Button variant="ghost" className="justify-start h-max text-start py-2">
          <Avatar>
            <AvatarImage src={chat.avatar} />
            <AvatarFallback>
              {chat.firstName[0]}
              {chat.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1">
            <p>
              {chat.firstName} {chat.lastName}
            </p>
            <p className="font-normal flex items-center gap-2">
              {chat.presence}
              <span
                className="size-2 aspect-square rounded-full bg-neutral-600 flex data-[presence=online]:bg-green-500"
                data-presence={chat.presence}
              />
            </p>
          </div>
        </Button>
      </div>
      <div>{children}</div>
    </div>
  );
}
