import { Connection } from "@/state/connections";
import { AnimatePresence, motion } from "motion/react";
import { ChatCard } from "./chat-card";
import { EmptySearchState } from "../ui/empty-search-state";
import { useAtom } from "jotai";
import { cachedMessagesAtom } from "@/state/message";
import { compareDesc } from "date-fns";

export function ChatCards({
  connections: connectionsProp,
  active,
  onActiveClick,
  search = "",
}: {
  connections: Connection[];
  active?: string | null;
  onActiveClick: (value: string) => void;
  search: string;
}) {
  const isEmptyConnections = connectionsProp.length <= 0;
  const [messages] = useAtom(cachedMessagesAtom);

  if (isEmptyConnections) return;

  let connections = connectionsProp.filter((connection) =>
    connection.name.toLowerCase().includes(search.toLowerCase()),
  );

  connections = connections.sort((a, b) => {
    const aMessages = messages[a.id];
    const aLastMessageDate =
      aMessages.at(-1)?.timestamp ?? new Date("1-1-1900").toISOString();

    const bMessages = messages[b.id];
    const bLastMessageDate =
      bMessages.at(-1)?.timestamp ?? new Date("1-1-1900").toISOString();

    return compareDesc(aLastMessageDate, bLastMessageDate);
  });

  const isEmptySearchResults = connections.length <= 0;

  if (isEmptySearchResults) return <EmptySearchState search={search} />;

  return (
    <AnimatePresence>
      {/* eslint-disable-next-line */}
      {connections.map(({ lastOnline: _, ...connection }) => (
        <motion.div key={connection.id} layout>
          <ChatCard
            active={active === connection.id}
            onClick={() => onActiveClick(connection.id)}
            {...connection}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
