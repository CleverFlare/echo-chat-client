import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { format } from "date-fns";
import ConditionalRenderer from "../../../components/utils/conditional-renderer";
import { ComponentProps } from "react";
import { useNamedBlocks } from "@/lib/use-named-blocks";
import { cn } from "@/lib/utils";
import { Contact } from "@/store/contacts";

interface UserStatusProps {
  contact: Contact;
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

export const UserStatus = ({ contact }: UserStatusProps) => {
  return (
    <div className="flex gap-2 z-20">
      <Avatar className="size-[40px]">
        <AvatarImage src={contact.avatarUrl} alt="avatar" />
      </Avatar>
      <div className="flex flex-col justify-center">
        <p className="font-semibold text-sm">
          {contact.firstName} {contact.lastName}
        </p>
        <ConditionalRenderer shouldRender={!contact.online}>
          <p className="text-xs text-gray-500">
            {format(new Date().toISOString()!, "d MMM, yy")}
          </p>
        </ConditionalRenderer>
        <ConditionalRenderer shouldRender={contact.online}>
          <p className="text-purple-500 text-xs font-medium">Online</p>
        </ConditionalRenderer>
      </div>
    </div>
  );
};
