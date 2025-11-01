import { PermissionRule } from "@/utils/permissions";
import {
  ArrowLeftRight,
  Banknote,
  BotMessageSquare,
  Boxes,
  FileText,
  FileUser,
  LucideIcon,
  Package,
  PackageCheck,
  ShoppingBag,
  Store,
  Truck,
  Users,
} from "lucide-react";

export interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
  permission?: PermissionRule;
}

export const sidebarItems: SidebarItem[] = [
  // {
  //   title: "Dashboard",
  //   url: "/dashboard",
  //   icon: LayoutDashboard,
  //   permission: { check: "none" }, // Dashboard is always visible
  // },
  {
    title: "Stores",
    url: "/dashboard/stores",
    icon: Store,
    permission: {
      resource: "store",
      check: "all", // User must have ALL store permissions
    },
  },
  {
    title: "Make Sale",
    url: "/dashboard/sales/pos",
    icon: ShoppingBag,
    permission: {
      resource: "sales",
      check: "create", // User must have create or update sales permission
    },
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
    permission: {
      resource: "users",
      check: "any", // User must have at least one user permission
    },
  },
  {
    title: "Inventory",
    url: "/dashboard/inventory",
    icon: Package,
    permission: {
      resource: "storeInventory",
      check: "any", // User must have at least one inventory permission
    },
  },
  {
    title: "Category",
    url: "/dashboard/category",
    icon: Boxes,
    permission: {
      resource: "categories",
      check: "any",
    },
  },
  {
    title: "Expenses",
    url: "/dashboard/expenses",
    icon: Banknote,
    permission: {
      check: "none", // No specific permission for expenses yet
    },
  },
  {
    title: "Suppliers",
    url: "/dashboard/suppliers",
    icon: Truck,
    permission: {
      resource: "suppliers",
      check: "any",
    },
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: FileUser,
    permission: {
      check: "none", // No specific permission for customers yet
    },
  },
  {
    title: "Purchase Orders",
    url: "/dashboard/purchase-orders",
    icon: FileText,
    permission: {
      resource: "purchaseOrders",
      check: "any",
    },
  },
  {
    title: "Purchase Received",
    url: "/dashboard/purchase-receives",
    icon: PackageCheck,
    permission: {
      resource: "purchaseOrders",
      check: "read", // User needs at least read permission
    },
  },
  {
    title: "Goods Transfer",
    url: "/dashboard/transfers",
    icon: ArrowLeftRight,
    permission: {
      resource: "transfers",
      check: "any",
    },
  },
  {
    title: "Virtual Assistant",
    url: "/dashboard/assistant",
    icon: BotMessageSquare,
    permission: {
      check: "none", // Virtual assistant is available to all
    },
  },
  // {
  //   title: "Settings",
  //   url: "/dashboard/settings",
  //   icon: Settings,
  //   permission: {
  //     check: "none", // Settings is always visible
  //   },
  // },
];
