import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_friends/friends")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
