import { useTheme } from "@lonik/themer";
import { Moon, Sun } from "lucide-react";
import { SidebarMenuButton } from "./ui/sidebar";

export function ThemeButton() {
  const { theme, setTheme } = useTheme();
  return (
    <SidebarMenuButton
      tooltip={{
        children: "Switch Mode",
        hidden: false,
      }}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </SidebarMenuButton>
  );
}
