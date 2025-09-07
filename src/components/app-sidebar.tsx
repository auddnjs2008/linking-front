import { Archive, Folder, Home, Inbox } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

// Menu items.
export const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "MyLinks",
    url: "/links/me",
    icon: Inbox,
  },
  {
    title: "Groups",
    url: "/groups",
    icon: Folder,
  },

  {
    title: "MyGroups",
    url: "/groups/me",
    icon: Archive,
  },
];

export function AppSidebar() {
  const pathname = useLocation();

  return (
    <Sidebar variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      pathname.pathname === item.url &&
                        "hover:bg-black hover:text-white"
                    )}
                  >
                    <Link
                      to={item.url}
                      className={cn(
                        pathname.pathname === item.url && "bg-black text-white"
                      )}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
