import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { createFileRoute } from "@tanstack/react-router";
import { UsersRound } from "lucide-react";

export const Route = createFileRoute("/_authenticated/_friends/friends/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex-1 h-full flex justify-center items-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <UsersRound
              className="text-muted-foreground"
              size={100}
              absoluteStrokeWidth
              strokeWidth={5}
            />
          </EmptyMedia>
        </EmptyHeader>
        <EmptyContent>
          <EmptyTitle className="text-2xl">Friends</EmptyTitle>
          <EmptyDescription className="text-lg">
            See all your friends
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </div>
  );
}
