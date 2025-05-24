import { AnimatePresence, motion } from "motion/react";
import { ContactCard } from "./contact-card";
import { EmptyContactsListSearchState } from "./empty-contacts-list-search-state";
import { type Contact } from "@/store/contacts";
import { type Message, useChatStore } from "@/store/chat";

export function FilteredContactList({
  contacts: contactsProp,
  active,
  search = "",
}: {
  contacts: Contact[];
  active?: string | null;
  search: string;
}) {
  // const router = useRouter();
  const isEmptyContacts = contactsProp.length <= 0;
  const { messages, setActiveChat } = useChatStore();

  if (isEmptyContacts) return null;

  const contacts: Contact[] = contactsProp
    .filter(
      (contact) =>
        (contact.firstName + " " + contact.lastName)
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        contact.username.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      const getLastTimestamp = (
        msgs: Record<string, Message[]> | undefined,
      ) => {
        if (!msgs) return null;

        const allMessages = Object.values(msgs).flat();
        const last = allMessages.at(-1);
        return last?.timestamp ? new Date(last.timestamp).getTime() : null;
      };

      const aTime = getLastTimestamp(messages?.[a.id]);
      const bTime = getLastTimestamp(messages?.[b.id]);

      if (!aTime && !bTime) return 0;
      if (!aTime) return 1;
      if (!bTime) return -1;

      // More recent timestamps come first (descending)
      return bTime - aTime;
    });

  const isEmptySearchResults = contacts.length <= 0;

  if (isEmptySearchResults)
    return <EmptyContactsListSearchState search={search} />;

  return (
    <AnimatePresence initial={false}>
      {contacts.map((contact) => (
        <motion.div
          key={contact.id}
          layoutId={contact.id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <ContactCard
            active={active === contact.id}
            onClick={() => {
              setActiveChat(contact.chatId);
            }}
            lastMessage={contact?.lastMessage}
            avatarUrl={contact.avatarUrl}
            unread={contact.unread}
            name={contact.firstName + " " + contact.lastName}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
