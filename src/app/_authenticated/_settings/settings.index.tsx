import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";

export const Route = createFileRoute("/_authenticated/_settings/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-1 justify-between items-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <Settings
              className="text-muted-foreground"
              size={100}
              absoluteStrokeWidth
              strokeWidth={5}
            />
          </EmptyMedia>
        </EmptyHeader>
        <EmptyContent>
          <EmptyTitle className="text-2xl">Settings</EmptyTitle>
        </EmptyContent>
      </Empty>
    </div>
  );
}
