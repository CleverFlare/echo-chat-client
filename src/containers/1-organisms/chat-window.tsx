"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useConnections } from "@/state/use-connections";
import { useSearchParams } from "next/navigation";
import { ComponentProps } from "react";
import ConditionalRenderer from "@/components/ui/conditional-renderer";
import ChatStatusBar from "@/components/chat-status-bar";
import MessageWritingBar from "@/components/message-writing-bar";

export default function ChatWindow({
  className,
  ...props
}: ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const active = searchParams.get("active");
  const connection = useConnections((state) => state.data?.[active ?? "0"]);

  return (
    <div
      className={cn(
        "bg-gray-100 flex-1 rounded-2xl p-4 grid grid-rows-[auto_1fr_auto]",
        className,
      )}
      {...props}
    >
      <ConditionalRenderer shouldRender={!connection}>
        <div className="w-full row-span-3 h-full flex flex-col justify-center items-center gap-4">
          <Image
            src="/echoes-logo.png"
            width={200}
            height={200}
            alt="Logo"
            className="opacity-50"
          />
          <p className="text-2xl text-gray-500">Echoes</p>
          <p className="text-gray-500 w-[500px] text-balance text-center">
            The only social media and chatting app you&apos;ll ever need.
            <br />
            We know you&apos;re familiar with whatsapp&apos;s simplicity; yet,
            you like the community servers in Discord.
            <br />
            Echoes gives you the best of both worlds.
          </p>
        </div>
      </ConditionalRenderer>
      <ConditionalRenderer shouldRender={connection}>
        <ChatStatusBar connection={connection!} />
        <div className="flex-1 overflow-y-auto"></div>
        <MessageWritingBar onSend={(value) => console.log(value)} />
      </ConditionalRenderer>
    </div>
  );
}
