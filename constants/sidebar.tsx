import {
  Banknote,
  Boxes,
  LayoutDashboard,
  Package,
  Store,
  Users,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Stores",
    url: "/dashboard/stores",
    icon: Store,
  },
  {
    title: "Users",
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
  {
    title: "Expenses",
    url: "/dashboard/expenses",
    icon: Banknote,
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
