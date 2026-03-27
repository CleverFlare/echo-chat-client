import { FriendsPanel } from "@/feature/contacts/components/friends-panel";
import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_friends")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ strict: false });

  return (
    <div className="flex flex-1">
      <FriendsPanel />
      <Outlet />
    </div>
  );
}
