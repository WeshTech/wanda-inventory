import {
  Inbox,
  LayoutDashboard,
  Package,
  Search,
  Settings,
  Users,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "users",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Inventory",
    url: "/dashboard/inventory",
    icon: Package,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },

  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
