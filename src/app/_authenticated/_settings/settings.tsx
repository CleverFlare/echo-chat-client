import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_settings/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
