import { SettingsPanel } from "@/feature/settings/components/settings-panels";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-1">
      <SettingsPanel />
      <Outlet />
    </div>
  );
}
