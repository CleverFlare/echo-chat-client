import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfileStore } from "@/store/profile";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function ProfilePanelSkeleton() {
  const closeProfile = useProfileStore((state) => state.close);
  return (
    <div className="flex flex-col gap-6 h-full px-4">
      <div className="flex gap-4 items-center">
        <Button size="icon" variant="outline" onClick={closeProfile}>
          <ArrowLeftIcon />
        </Button>
        <h2 className="text-lg font-bold">Profile</h2>
      </div>
      <div className="w-full">
        <Separator />
      </div>
      <div className="rounded-xl w-full h-full flex flex-col gap-6 flex-1">
        <div className="flex flex-col items-center">
          <Skeleton className="size-[90px] mx-auto mb-4 rounded-full" />
          <Skeleton className="h-5 w-1/2 rounded-lg mb-1" />
          <Skeleton className="h-3 w-1/3 rounded-md" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 rounded-xl">
            <h2 className="text-xs text-muted-foreground">Bio</h2>
            <div className="flex gap-2">
              <Skeleton className="h-3 w-full rounded-md" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-3 w-full rounded-md" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-3 w-full rounded-md" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-3 w-1/2 rounded-md" />
            </div>
          </div>
          <div className="flex flex-col gap-1 rounded-xl">
            <h2 className="text-xs text-muted-foreground">Email</h2>
            <div className="flex gap-2">
              <Skeleton className="h-3 w-full rounded-md" />
            </div>
          </div>
          <div className="flex flex-col gap-1 rounded-xl">
            <h2 className="text-xs text-muted-foreground">Member Since</h2>
            <div className="flex gap-2">
              <Skeleton className="h-3 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
