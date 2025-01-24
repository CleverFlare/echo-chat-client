import {
  Gear,
  Microphone,
  MicrophoneSlash,
  SpeakerHigh,
  SpeakerSimpleSlash,
} from "@phosphor-icons/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import ConditionalRenderer from "./ui/conditional-renderer";
import Link from "next/link";
import { motion } from "motion/react";

export default function UserCard({
  image,
  name,
  username,
}: {
  image: string;
  name: string;
  username: string;
}) {
  const [muted, setMuted] = useState<boolean>(false);
  const [deafen, setDeafen] = useState<boolean>(false);
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="w-full p-3 rounded-xl grid grid-cols-[auto_1fr_auto] gap-2 h-max transition-all bg-gray-100 hover:bg-gray-200"
    >
      <button>
        <Avatar>
          <AvatarImage src={image} />
        </Avatar>
      </button>
      <div className="flex-1 flex flex-col max-w-full truncate">
        <button className="font-bold text-sm text-start truncate">
          {name}
        </button>
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
            className="text-xs text-gray-500 truncate"
          >
            Something
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
            className="text-xs text-gray-500 absolute top-0 truncate"
          >
            {username}
          </motion.p>
        </div>
      </div>
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
