import TextareaAutosize from "react-textarea-autosize";
import { PaperPlaneRightIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useIsTyping } from "use-is-typing";
import { useSocket } from "@/components/socket-provider";
import { useChatStore } from "@/store/chat";
import { useContactsStore } from "@/store/contacts";
import { useUpdateEffect } from "@custom-react-hooks/use-update-effect";
import { useAuthStore } from "@/store/auth";

interface MessageInputBoxProps {
  onSend: (value: string) => void;
}

export default function MessageInputBox({ onSend }: MessageInputBoxProps) {
  const [message, setMessage] = useState<string>("");
  const [isTyping, registerInput] = useIsTyping();
  const socket = useSocket();
  const activeChatId = useChatStore((state) => state.activeChatId);
  const getContactByChatId = useContactsStore(
    (state) => state.getContactByChatId,
  );
  const myId = useAuthStore((state) => state.user?.id);
  const contact = getContactByChatId(activeChatId!);

  useUpdateEffect(() => {
    socket.emit("is-typing", {
      receivingUserId: contact?.id,
      isTyping,
      senderId: myId,
    });
  }, [isTyping]);

  return (
    <form
      className="w-full rounded-2xl bg-white overflow-hidden flex z-20"
      onSubmit={(e) => {
        e.preventDefault();
        if (!message) return;

        setMessage("");

        onSend(message);
      }}
    >
      <TextareaAutosize
        ref={registerInput}
        maxRows={5}
        className="border-none resize-none outline-none py-4 flex-1 px-4 font-[inherit] [unicode-bidi:plaintext]"
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
          <PaperPlaneRightIcon weight="fill" />
        </Button>
      </div>
    </form>
  );
}
