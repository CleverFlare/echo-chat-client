import TextareaAutosize from "react-textarea-autosize";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MessageWritingBarProps {
  onSend: (value: string) => void;
}

export default function MessageWritingBar({ onSend }: MessageWritingBarProps) {
  const [message, setMessage] = useState<string>("");

  return (
    <form
      className="w-full rounded-2xl bg-white overflow-hidden flex"
      onSubmit={(e) => {
        e.preventDefault();
        if (!message) return;

        onSend(message);
      }}
    >
      <TextareaAutosize
        maxRows={5}
        className="border-none resize-none outline-none py-4 flex-1 px-4 font-[inherit]"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          const isEnter = e.key === "Enter";
          const isShiftPressed = e.shiftKey;
          if (isEnter && !isShiftPressed) {
            e.preventDefault();
            e.stopPropagation();
            e.currentTarget.closest("form")?.requestSubmit();
          }
        }}
        style={{
          height: 56,
        }}
        placeholder="Write your message..."
      />
      <div className="flex justify-center items-center h-full px-2">
        <Button className="h-10 w-10 bg-gradient-to-r from-purple-500 to-purple-700">
          <PaperPlaneRight weight="fill" />
        </Button>
      </div>
    </form>
  );
}
