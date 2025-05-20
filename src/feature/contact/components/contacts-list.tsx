import { cloneElement, useState } from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlass } from "@phosphor-icons/react";
import UserCard from "@/feature/profile/components/user-card";
import ConditionalRenderer from "@/components/utils/conditional-renderer";
import { Resizable } from "re-resizable";
import { EmptyContactsListState } from "@/feature/contact/components/empty-contacts-list-state";
import { FilteredContactList } from "@/feature/contact/components/filtered-contact-list";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useContactsStore } from "@/store/contacts";
import { AddNewContactDialog } from "./add-new-contact-dialog";
import { useChatStore } from "@/store/chat";

function ContactsList() {
  const { contacts } = useContactsStore();
  const { activeChatId } = useChatStore();
  const [search, setSearch] = useState<string>("");

  const isEmpty = contacts ? contacts.length <= 0 : false;

  const isSmall = useMediaQuery("only screen and (max-width: 768px)");

  const Component = isSmall ? (
    <div className="min-w-[300px] h-full flex px-4 max-md:w-full border-border" />
  ) : (
    <Resizable
      defaultSize={isSmall ? undefined : { width: 300 }}
      enable={{
        right: true,
        bottom: false,
      }}
      className="min-w-[300px] h-full flex px-4 max-md:w-full border-border"
    />
  );

  return cloneElement(
    Component,
    {},
    <div className="flex-1 py-4 flex flex-col gap-2">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Messages</h2>
        <div className="flex gap-2">
          <AddNewContactDialog />
        </div>
      </div>
      <div className="relative">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="pe-8"
          data-testid="chats-list-search-input"
        />
        <MagnifyingGlass
          weight="bold"
          color="#aaa"
          className="absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>
      <ConditionalRenderer shouldRender={isEmpty}>
        <EmptyContactsListState />
      </ConditionalRenderer>
      <ConditionalRenderer shouldRender={!isEmpty}>
        <div
          className="flex flex-col flex-1 overflow-y-auto"
          data-testid="chat-card-list"
        >
          <FilteredContactList
            search={search}
            contacts={contacts ?? []}
            active={activeChatId}
          />
        </div>
      </ConditionalRenderer>
      <UserCard />
    </div>,
  );
}

export default ContactsList;
