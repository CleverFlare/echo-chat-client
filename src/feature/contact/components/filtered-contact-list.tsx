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
  const setActiveChat = useChatStore((state) => state.setActiveChat);

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
      if (!a?.lastMessage?.timestamp) return 1;
      if (!b?.lastMessage?.timestamp) return -1;

      return (
        new Date(b!.lastMessage!.timestamp!).getTime() -
        new Date(a!.lastMessage!.timestamp!).getTime()
      );
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
            active={active === contact.chatId}
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
