import { Command } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { navigation as nav } from "@/configs/navigation";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ThemeButton } from "./theme-button";

export function MainSidebar() {
  const matchRoute = useMatchRoute();

  return (
    <Sidebar
      collapsible="none"
      className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r max-md:hidden"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {nav.main.sections.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      isActive={!!matchRoute({ to: item.to })}
                      className="px-2.5 md:px-2"
                      asChild
                    >
                      <Link to={item.to}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <ThemeButton />
        {nav.main.footer.map((item) => {
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={{
                  children: item.title,
                  hidden: false,
                }}
                isActive={!!matchRoute({ to: item.to })}
                className="px-2.5 md:px-2"
                asChild
              >
                <Link to={item.to}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
        <Link to="/">
          <Avatar
            className="w-full h-[unset] aspect-square rounded-lg cursor-pointer"
            role="button"
            aria-description="profile button"
          >
            <AvatarImage src="https://api.dicebear.com/9.x/open-peeps/svg?backgroundColor=d1d4f9&seed=Aiden" />
            <AvatarFallback>MH</AvatarFallback>
          </Avatar>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
