import { type ReactNode } from "react";

export default function ConditionalRenderer({
  shouldRender,
  children,
}: {
  shouldRender?: unknown;
  children: ReactNode;
}): ReactNode | null {
  return shouldRender ? children : null;
}
