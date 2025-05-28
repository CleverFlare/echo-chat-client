import { useUpdateEffect } from "@custom-react-hooks/use-update-effect";
import { useCallback, useRef, useState, type UIEvent } from "react";

type AutoScrollProps = {
  initialScrollBehavior?: "smooth" | "instant";
  newMessagesScrollBehavior?: "smooth" | "instant";
  nearBottomOffset?: number;
  scrollToBottomDependencies: unknown[];
  onBottomReached?: () => void;
  onNearBottom?: () => void;
};

export function useAutoScroll({
  initialScrollBehavior = "instant",
  nearBottomOffset = 200,
  onBottomReached = () => null,
  onNearBottom = () => null,
  newMessagesScrollBehavior,
  scrollToBottomDependencies,
}: AutoScrollProps) {
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const scrollElementCallbackRef = useCallback((node: HTMLDivElement) => {
    if (node === null) return;

    scrollElementRef.current = node;

    setTimeout(() => {
      node.scrollIntoView({
        block: "end",
        behavior: initialScrollBehavior,
      });
    }, 0);

    onBottomReached();
    onNearBottom();

    // eslint-disable-next-line
  }, []);

  const isUserNearBottomRef = useRef<boolean>(true);
  const isAtBottomRef = useRef<boolean>(true);

  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);

  const handleScrolling = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, offsetHeight, clientHeight } =
        e.currentTarget;

      const height = scrollHeight - offsetHeight;
      const isAtBottomNow = scrollTop === height;
      const isNearBottomNow =
        scrollHeight - scrollTop - clientHeight <= nearBottomOffset;

      isUserNearBottomRef.current = isNearBottomNow;
      isAtBottomRef.current = isAtBottomNow;

      if (isAtBottom !== isAtBottomNow) {
        setIsAtBottom(isAtBottomNow);
      }
    },

    // eslint-disable-next-line
    [isAtBottom],
  );

  useUpdateEffect(() => {
    if (scrollElementRef.current === null) return;

    if (!isAtBottomRef.current && isUserNearBottomRef.current) {
      setTimeout(() => {
        if (scrollElementRef.current === null) return;

        scrollElementRef.current.scrollIntoView({
          block: "end",
          behavior: newMessagesScrollBehavior,
        });
      }, 0);

      setIsAtBottom(true);

      isAtBottomRef.current = true;
      isUserNearBottomRef.current = true;
    }
  }, [scrollElementRef.current, ...scrollToBottomDependencies]);

  useUpdateEffect(() => {
    if (isAtBottomRef.current) onBottomReached();
    if (isUserNearBottomRef.current) onNearBottom();
  }, [isAtBottomRef.current, isUserNearBottomRef.current]);

  const jumpToBottom = useCallback(
    (behavior: "smooth" | "instant" = "smooth") => {
      if (!scrollElementRef.current) return;

      scrollElementRef.current.scrollIntoView({
        block: "end",
        behavior: behavior,
      });

      isAtBottomRef.current = true;
      isUserNearBottomRef.current = true;
    },
    // eslint-disable-next-line
    [scrollElementRef.current],
  );

  return {
    ref: scrollElementCallbackRef,
    handleScrolling,
    jumpToBottom,
    isAtBottom,
  };
}
