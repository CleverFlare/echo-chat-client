import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";
import { Link } from "@tanstack/react-router";

export function ProfileToggle({
  firstName = "Muhammad",
  lastName = "Maher",
  avatar = "https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&head=afro,bangs,bangs2&face=calm",
  active = false,
  to,
}: ChatCardProps) {
  return (
    <Toggle
      pressed={active}
      className="grid grid-cols-[auto_1fr] gap-2 justify-start h-max px-2 py-2 font-normal text-start"
      render={(props) => (
        <Link to={to} {...props}>
          <Avatar>
            <AvatarImage src={avatar} alt="avatar" />
            <AvatarFallback>
              {firstName[0]}
              {lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="grid w-full">
            <h4 className="font-medium">
              {firstName} {lastName}
            </h4>
            <p className="text-muted-foreground truncate">
              Hey, there! I'm using Echo!
            </p>
          </div>
        </Link>
      )}
    ></Toggle>
  );
}

// ---- Root ChatCard props ----

type ChatCardProps = {
  to: string;

  // Identity
  avatar: string;
  firstName: string;
  lastName: string;

  active?: boolean;

  // Interaction
  isSelected?: boolean;
  isMuted?: boolean;
  isPinned?: boolean;
  onClick?: (id: string) => void;
};
