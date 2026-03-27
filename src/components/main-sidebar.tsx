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
import { authClient } from "@/lib/auth-client";

export function MainSidebar() {
  const matchRoute = useMatchRoute();
  const { data: session } = authClient.useSession();

  return (
    <Sidebar
      collapsible="none"
      className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r max-md:hidden"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="md:h-8 md:p-0"
              render={(props) => (
                <a href="#" {...props}>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              )}
            ></SidebarMenuButton>
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
                      isActive={!!matchRoute({ to: item.to, fuzzy: true })}
                      className="px-2.5 md:px-2"
                      render={(props) => (
                        <Link to={item.to} {...props}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      )}
                    ></SidebarMenuButton>
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
                isActive={!!matchRoute({ to: item.to, fuzzy: true })}
                className="px-2.5 md:px-2"
                render={(props) => (
                  <Link to={item.to} {...props}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                )}
              ></SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
        <Link to="/">
          <Avatar
            className="w-full h-[unset] aspect-square"
            role="button"
            aria-description="profile button"
          >
            <AvatarImage
              src={(session?.user as { avatar?: string })?.avatar}
              className="rounded-lg"
            />
            <AvatarFallback>MH</AvatarFallback>
          </Avatar>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
