import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SignOutIcon, TrashIcon } from "@phosphor-icons/react";

export default function ProfilePanel() {
  return (
    <div className="rounded-xl bg-muted w-full h-full p-8 flex flex-col gap-4">
      <Avatar className="size-[100px] mx-auto mb-4">
        <AvatarImage />
        <AvatarFallback className="text-4xl">M</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2 p-4 border border-border rounded-xl">
        <h2 className="text-lg font-semibold">Bio</h2>
        <p className="text-sm text-muted-foreground">
          This is my bio. It's dedicated to explain to people who I am and to
          express myself in a brief piece of text.
        </p>
      </div>

      <div className="flex flex-col gap-2 p-4 border border-border rounded-xl">
        <h2 className="text-lg font-semibold">Personal Info</h2>
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground">Name</p>
          <p className="text-sm">Muhammad Maher</p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground">Username</p>
          <p className="text-sm">@flare</p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground">Email</p>
          <p className="text-sm">blastclever@gmail.com</p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground">Member Since</p>
          <p className="text-sm">10 Oct. 2025</p>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <Button variant="outline" size="lg">
          <SignOutIcon />
          Logout
        </Button>
        <Button variant="destructive" size="lg" className="text-white w-full">
          <TrashIcon />
          Delete Your Account
        </Button>
      </div>
    </div>
  );
}
