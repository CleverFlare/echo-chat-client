import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { createFileRoute } from "@tanstack/react-router";
import { MessagesSquare } from "lucide-react";

export const Route = createFileRoute("/_authenticated/_chats/chats/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex-1 h-full flex justify-center items-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <MessagesSquare
              className="text-muted-foreground"
              size={100}
              absoluteStrokeWidth
              strokeWidth={5}
            />
          </EmptyMedia>
        </EmptyHeader>
        <EmptyContent>
          <EmptyTitle className="text-2xl">Chats</EmptyTitle>
          <EmptyDescription className="text-lg">
            Get in touch with people & friends
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </div>
  );
}
