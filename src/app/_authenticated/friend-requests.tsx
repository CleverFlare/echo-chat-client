import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/friend-requests")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/friend-requests"!</div>;
}
