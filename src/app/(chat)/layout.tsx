"use client";

import { useIsClient, useMediaQuery } from "@uidotdev/usehooks";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/chat";
import { ReactNode } from "react";
import { useParams } from "next/navigation";

type Props = {
  children: ReactNode;
  list: ReactNode;
};

export default function Layout(props: Props) {
  const isClient = useIsClient();

  if (!isClient) return null;

  return <LayoutUI {...props} />;
}

function LayoutUI({ children, list }: Props) {
  // eslint-disable-next-line
  const isSmall = useMediaQuery("only screen and (max-width: 768px)");

  const { chat: activeChatId } = useParams();

  return (
    <div className="h-full max-h-[100vh] max-w-[100vw] overflow-hidden">
      <div
        className={cn(
          "grid md:grid-cols-[auto_1fr] grid-cols-[100vw_100vw] h-full transition-transform ease",
          activeChatId && isSmall ? "-translate-x-full" : "",
        )}
      >
        {list}
        <div className="flex md:p-4 max-h-full overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
