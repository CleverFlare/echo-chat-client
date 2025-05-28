import { AnimatePresence, motion } from "motion/react";

export function TypingIndiciator({ isTyping }: { isTyping: boolean }) {
  return (
    <AnimatePresence initial={false}>
      {isTyping && (
        <motion.div
          className="flex w-full overflow-hidden"
          exit={{ height: 0 }}
        >
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0, height: 0 }}
            className="w-max p-3 rounded-xl h-max flex shadow-sm bg-white rounded-ss-none gap-1 mx-4 mb-4"
          >
            <div className="size-1.5 rounded-full bg-neutral-200 animate-murcery" />
            <div className="size-1.5 rounded-full bg-neutral-200 animate-murcery delay-200" />
            <div className="size-1.5 rounded-full bg-neutral-200 animate-murcery delay-400" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
