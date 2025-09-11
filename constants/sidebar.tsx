import {
  ArrowLeftRight,
  Banknote,
  BotMessageSquare,
  Boxes,
  FileText,
  FileUser,
  LayoutDashboard,
  Package,
  PackageCheck,
  Settings,
  ShoppingBag,
  Store,
  Truck,
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
    title: "Make Sale",
    url: "/dashboard/sales/pos",
    icon: ShoppingBag,
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
  {
    title: "Suppliers",
    url: "/dashboard/suppliers",
    icon: Truck,
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: FileUser,
  },
  {
    title: "Purchase Orders",
    url: "/dashboard/purchase-orders",
    icon: FileText,
  },
  {
    title: "Purchase Received",
    url: "/dashboard/purchase-received",
    icon: PackageCheck,
  },
  {
    title: "Goods Transfer",
    url: "/dashboard/transfers",
    icon: ArrowLeftRight,
  },
  {
    title: "Virtual Assistant",
    url: "/dashboard/assistant",
    icon: BotMessageSquare,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];
