import { Check } from "lucide-react";

type ReadStatus = "sent" | "received" | "read";

export function MessageReadStatus({ status }: { status: ReadStatus }) {
  if (status === "sent") {
    return <Check size={16} className="text-muted-foreground" />;
  }

  return (
    <div className="relative inline-flex">
      <Check
        size={16}
        className={
          status === "read" ? "text-blue-500" : "text-muted-foreground"
        }
      />
      <Check
        size={16}
        className={`-ml-2.5 ${status === "read" ? "text-blue-500" : "text-muted-foreground"}`}
      />
    </div>
  );
}
