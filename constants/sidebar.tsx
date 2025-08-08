import {
  CalendarHeart,
  Inbox,
  LayoutDashboard,
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
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calender",
    url: "#",
    icon: CalendarHeart,
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
