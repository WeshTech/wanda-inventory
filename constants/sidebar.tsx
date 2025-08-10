import { Boxes, LayoutDashboard, Package, Users } from "lucide-react";

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
    title: "Category",
    url: "/dashboard/category",
    icon: Boxes,
  },
  // {
  //   title: "Sales",
  //   url: "/dashboard/sales",
  //   icon: ShoppingBag,
  // },
  // {
  //   title: "Inbox",
  //   url: "#",
  //   icon: Inbox,
  // },

  // {
  //   title: "Search",
  //   url: "#",
  //   icon: Search,
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
];
