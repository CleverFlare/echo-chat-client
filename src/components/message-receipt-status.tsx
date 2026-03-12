import { Check } from "lucide-react";

export type ReceiptStatus = "sent" | "delivered" | "read" | "failed";

export function MessageReceiptStatus({ status }: { status: ReceiptStatus }) {
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
