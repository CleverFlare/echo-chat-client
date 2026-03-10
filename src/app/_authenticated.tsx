import { MainSidebar } from "@/components/main-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex">
      <SidebarProvider>
        <MainSidebar />
        <Outlet />
      </SidebarProvider>
    </div>
  );
}
