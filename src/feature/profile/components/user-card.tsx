import {
  CheckIcon,
  CopyIcon,
  MicrophoneIcon,
  MicrophoneSlashIcon,
  SignOutIcon,
  SpeakerHighIcon,
  SpeakerSimpleSlashIcon,
} from "@phosphor-icons/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { useEffect, useState } from "react";
import ConditionalRenderer from "../../../components/utils/conditional-renderer";
import { motion } from "motion/react";
import { useAuthStore } from "@/store/auth";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { cn } from "@/lib/utils";
import { useRouter } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { logout } from "@/queries/logout";
import { Loader2 } from "lucide-react";
import { getProfile } from "@/queries/profile";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfileStore } from "@/store/profile";

export default function UserCard() {
  const { user, reset, setUser } = useAuthStore();
  const [muted, setMuted] = useState<boolean>(false);
  const [deafen, setDeafen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const { data, isPending: isProfilePending } = useQuery({
    queryKey: ["user"],
    queryFn: () => getProfile(),
  });

  useEffect(() => {
    if (!isProfilePending && data) setUser(data);

    // eslint-disable-next-line
  }, [isProfilePending, data]);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["auth"],
    mutationFn: async () => {
      await logout();
    },
  });

  const router = useRouter();

  // eslint-disable-next-line
  const [_, copy] = useCopyToClipboard();

  const setProfile = useProfileStore((state) => state.setProfile);

  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="w-full p-3 rounded-xl grid grid-cols-[auto_1fr_auto] gap-2 h-max transition-all bg-muted"
    >
      <button onClick={() => setProfile(user!.id)}>
        <ConditionalRenderer shouldRender={!isProfilePending}>
          <Avatar>
            <AvatarImage src={user?.avatarUrl ?? ""} />
            <AvatarFallback>{user?.firstName[0]}</AvatarFallback>
          </Avatar>
        </ConditionalRenderer>
        <ConditionalRenderer shouldRender={isProfilePending}>
          <Skeleton className="size-10 aspect-square rounded-full bg-neutral-200" />
        </ConditionalRenderer>
      </button>
      <ConditionalRenderer shouldRender={isProfilePending}>
        <div className="flex flex-col justify-center gap-2">
          <Skeleton className="h-3 rounded-lg w-full bg-neutral-200" />
          <Skeleton className="h-3 rounded-lg w-1/2 bg-neutral-200" />
        </div>
      </ConditionalRenderer>
      <ConditionalRenderer shouldRender={!isProfilePending}>
        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <button
              className="flex-1 flex flex-col max-w-full truncate"
              onClick={() => {
                setOpen(true);
                copy(user?.username ?? "");
                setIsCopied(true);

                setTimeout(() => {
                  setIsCopied(false);
                }, 1000);
              }}
            >
              <p className="font-semibold text-sm text-start truncate">
                {user?.firstName ?? "Unknown"} {user?.lastName ?? ""}
              </p>
              <div className="w-full truncate overflow-y-hidden relative">
                <motion.p
                  variants={{
                    initial: {
                      y: 0,
                    },
                    hovered: {
                      y: "-100%",
                    },
                  }}
                  className="text-xs text-gray-500 truncate text-start"
                >
                  {"My Status"}
                </motion.p>
                <motion.p
                  variants={{
                    initial: {
                      y: "100%",
                    },
                    hovered: {
                      y: 0,
                    },
                  }}
                  className="text-xs text-gray-500 absolute top-0 truncate w-full text-start"
                >
                  @{user?.username ?? "@unknown"}
                </motion.p>
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent
            colorClass={isCopied ? "bg-green-600 fill-green-600" : ""}
            className={cn("flex gap-2 items-center")}
          >
            {!isCopied && (
              <>
                <CopyIcon />
                Copy Username
              </>
            )}
            {isCopied && (
              <>
                <CheckIcon />
                Copied
              </>
            )}
          </TooltipContent>
        </Tooltip>
      </ConditionalRenderer>
      <div className="flex items-center gap-2">
        <button onClick={() => setMuted((prev) => !prev)}>
          <ConditionalRenderer shouldRender={!muted}>
            <MicrophoneIcon size={20} weight="duotone" />
          </ConditionalRenderer>
          <ConditionalRenderer shouldRender={muted}>
            <MicrophoneSlashIcon size={20} weight="duotone" color="red" />
          </ConditionalRenderer>
        </button>
        <button onClick={() => setDeafen((prev) => !prev)}>
          <ConditionalRenderer shouldRender={!deafen}>
            <SpeakerHighIcon size={20} weight="duotone" />
          </ConditionalRenderer>
          <ConditionalRenderer shouldRender={deafen}>
            <SpeakerSimpleSlashIcon size={20} weight="duotone" color="red" />
          </ConditionalRenderer>
        </button>
        <button
          onClick={async () => {
            await mutateAsync();
            reset();
            router.invalidate();
          }}
          className="disabled:opacity-50"
          disabled={isPending}
        >
          {!isPending && <SignOutIcon size={20} className="text-destructive" />}
          {isPending && <Loader2 className="animate-spin" />}
        </button>
      </div>
    </motion.div>
  );
}
