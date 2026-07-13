import { useEffect, useRef } from "react";

const subscribers = new Set<(now: Date) => void>();
let intervalId: ReturnType<typeof setInterval> | null = null;

function subscribe(cb: (now: Date) => void) {
  subscribers.add(cb);
  if (subscribers.size === 1) {
    intervalId = setInterval(() => {
      const now = new Date();
      subscribers.forEach((fn) => fn(now));
    }, 30_000);
  }
  return () => {
    subscribers.delete(cb);
    if (subscribers.size === 0 && intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}

export function useLiveTimestamp(callback: (now: Date) => void) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => subscribe((now) => callbackRef.current(now)), []);
}
