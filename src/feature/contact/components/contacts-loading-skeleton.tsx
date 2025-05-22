import { Skeleton } from "@/components/ui/skeleton";
import { range } from "@/lib/range";

export function ContactsLoadingSkeleton() {
  return (
    <div className="flex flex-col">
      {range(6).map((i) => (
        <div key={i} className="flex w-full p-3 gap-2">
          <Skeleton className="size-10 aspect-square rounded-full" />
          <div className="flex flex-col flex-1 justify-center gap-2">
            <Skeleton className="h-3 w-full rounded-lg" />
            <Skeleton className="h-3 w-1/2 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
