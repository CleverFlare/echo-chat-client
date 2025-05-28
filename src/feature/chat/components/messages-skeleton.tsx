import { Skeleton } from "@/components/ui/skeleton";
import ConditionalRenderer from "@/components/utils/conditional-renderer";
import { range } from "@/lib/range";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const MessagesSkeleton = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      className="flex flex-col-reverse justify-end w-full py-4 px-4 gap-2"
      ref={ref}
    >
      {range(14).map((i) => {
        const isOddIndex = i % 2 === 1;
        return (
          <div
            className={cn(
              "flex w-full",
              i % 2 === 0 ? "justify-start" : "justify-end",
            )}
            key={`Chat Skeleton ${i}`}
          >
            <div
              className={cn(
                "min-w-[200px] p-2 rounded-xl h-max flex flex-col shadow-sm gap-2 bg-neutral-50",
                i % 2 === 0 ? "rounded-ss-none" : "rounded-se-none ms-auto",
              )}
            >
              <Skeleton
                className={cn("h-3 rounded bg-neutral-200 w-[300px]")}
              />
              <Skeleton
                className={cn("h-3 rounded bg-neutral-200 w-[200px]")}
              />
              <div className={cn("flex w-full gap-2 justify-end")}>
                <Skeleton className={cn("h-2 w-5 rounded-sm bg-neutral-200")} />
                <ConditionalRenderer shouldRender={isOddIndex}>
                  <Skeleton
                    className={cn("h-2 w-3 rounded-sm bg-neutral-200")}
                  />
                </ConditionalRenderer>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});
