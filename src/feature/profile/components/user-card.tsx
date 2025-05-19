import {
  Check,
  Copy,
  Gear,
  Microphone,
  MicrophoneSlash,
  SpeakerHigh,
  SpeakerSimpleSlash,
} from "@phosphor-icons/react";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { useState } from "react";
import ConditionalRenderer from "../../../components/utils/conditional-renderer";
import Link from "next/link";
import { motion } from "motion/react";
import { useAuthStore } from "@/store/auth";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { cn } from "@/lib/utils";

export default function UserCard() {
  const { user } = useAuthStore();
  const [muted, setMuted] = useState<boolean>(false);
  const [deafen, setDeafen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // eslint-disable-next-line
  const [_, copy] = useCopyToClipboard();

  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="w-full p-3 rounded-xl grid grid-cols-[auto_1fr_auto] gap-2 h-max transition-all bg-muted"
    >
      <button>
        <Avatar>
          <AvatarImage src={user?.avatarUrl} />
        </Avatar>
      </button>
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
              {user?.firstName} {user?.lastName}
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
                @{user?.username}
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
              <Copy />
              Copy Username
            </>
          )}
          {isCopied && (
            <>
              <Check />
              Copied
            </>
          )}
        </TooltipContent>
      </Tooltip>
      <div className="flex items-center gap-2">
        <button onClick={() => setMuted((prev) => !prev)}>
          <ConditionalRenderer shouldRender={!muted}>
            <Microphone size={20} weight="duotone" />
          </ConditionalRenderer>
          <ConditionalRenderer shouldRender={muted}>
            <MicrophoneSlash size={20} weight="duotone" color="red" />
          </ConditionalRenderer>
        </button>
        <button onClick={() => setDeafen((prev) => !prev)}>
          <ConditionalRenderer shouldRender={!deafen}>
            <SpeakerHigh size={20} weight="duotone" />
          </ConditionalRenderer>
          <ConditionalRenderer shouldRender={deafen}>
            <SpeakerSimpleSlash size={20} weight="duotone" color="red" />
          </ConditionalRenderer>
        </button>
        <Link href="/settings">
          <Gear size={20} weight="duotone" />
        </Link>
      </div>
    </motion.div>
  );
}
