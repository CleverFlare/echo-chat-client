import { createContext, useContext, useEffect, useState } from "react";

const NowContext = createContext<Date>(new Date());

// One interval, lives in the provider
export function NowProvider({ children }: { children: React.ReactNode }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(interval);
  }, []);

  return <NowContext value={now}>{children}</NowContext>;
}

// Components just read — no interval here
export const useNow = () => useContext(NowContext);
