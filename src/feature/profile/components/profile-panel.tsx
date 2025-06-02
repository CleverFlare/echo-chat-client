import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProfile } from "@/queries/profile";
import { useProfileStore } from "@/store/profile";
import { useUpdateEffect } from "@custom-react-hooks/use-update-effect";
import {
  ArrowLeftIcon,
  CalendarDotsIcon,
  MailboxIcon,
} from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import ProfilePanelSkeleton from "./profile-panel-skeleton";

export default function ProfilePanel() {
  const {
    close: closeProfile,
    id,
    addCachedProfile,
    cachedProfiles,
  } = useProfileStore((state) => state);

  const isProfileCached = id! in cachedProfiles;

  const {
    data: fetchedData,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["contact-profile"],
    queryFn: async () => getProfile(id!),
    enabled: !isProfileCached,
  });

  const data = isProfileCached ? cachedProfiles[id!] : fetchedData;

  useUpdateEffect(() => {
    if (fetchedData) {
      addCachedProfile(fetchedData);
    }
  }, [fetchedData]);

  useUpdateEffect(() => {
    if (!isProfileCached) refetch();
  }, [id]);

  if (isPending) {
    return <ProfilePanelSkeleton />;
  }

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
          <Avatar className="size-[90px] mx-auto mb-1">
            <AvatarImage src={data?.avatarUrl ?? ""} />
            <AvatarFallback className="text-4xl">
              {data?.firstName[0].toUpperCase() ?? "Φ"}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-bold">
            {data?.firstName ?? "Unknown"} {data?.lastName}
          </h2>
          <p className="text-muted-foreground text-sm">
            @{data?.username ?? "unknown"}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 rounded-xl">
            <h2 className="text-xs text-muted-foreground">Bio</h2>
            <p className="text-sm">{data?.bio}</p>
          </div>
          <div className="flex flex-col gap-1 rounded-xl">
            <h2 className="text-xs text-muted-foreground">Email</h2>
            <div className="flex gap-2">
              <MailboxIcon weight="duotone" />
              <p className="text-sm">{data?.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 rounded-xl">
            <h2 className="text-xs text-muted-foreground">Member Since</h2>
            <div className="flex gap-2">
              <CalendarDotsIcon weight="duotone" />
              <p className="text-sm">
                {format(data!.createdAt, "d MMM. yyyy")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
