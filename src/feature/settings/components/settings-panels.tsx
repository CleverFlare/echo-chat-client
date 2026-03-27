import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { navigation } from "@/configs/navigation";
import { Link, useMatchRoute, useRouter } from "@tanstack/react-router";
import { ProfileToggle } from "./profile-toggle";
import { LogOut, Trash } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function SettingsPanel() {
  const match = useMatchRoute();
  const router = useRouter();
  return (
    <Sidebar collapsible="none" className="w-80 border-r">
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl">Settings</h2>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.settings.map((item) => (
                <SidebarMenuButton
                  isActive={!!match({ to: item.to })}
                  render={(props) => (
                    <Link to={item.to} {...props}>
                      <item.icon />
                      {item.title}
                    </Link>
                  )}
                ></SidebarMenuButton>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuButton
              onClick={async () => {
                try {
                  await authClient.deleteUser();
                  router.navigate({ to: "/" });
                } catch (error) {
                  toast.error(error as string);
                }
              }}
            >
              <Trash />
              Delete Account
            </SidebarMenuButton>
            <SidebarMenuButton
              onClick={async () => {
                await authClient.signOut();
                router.navigate({ to: "/" });
              }}
            >
              <LogOut />
              Sign Out
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
