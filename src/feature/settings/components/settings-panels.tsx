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
import { Link, useMatchRoute } from "@tanstack/react-router";
import { ProfileToggle } from "./profile-toggle";
import { LogOut } from "lucide-react";

export function SettingsPanel() {
  const match = useMatchRoute();
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
              {navigation.settings.map((item) =>
                item.title.toLowerCase() === "profile" ? (
                  <ProfileToggle
                    firstName="Muhammad"
                    lastName="Maher"
                    avatar="https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&head=afro,bangs,bangs2&face=calm"
                    active={!!match({ to: item.to })}
                    to={item.to}
                  />
                ) : (
                  <SidebarMenuButton
                    isActive={!!match({ to: item.to })}
                    render={(props) => (
                      <Link to={item.to} {...props}>
                        <item.icon />
                        {item.title}
                      </Link>
                    )}
                  ></SidebarMenuButton>
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuButton
              render={(props) => (
                <Link to="/login" {...props}>
                  <LogOut />
                  Sign Out
                </Link>
              )}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
