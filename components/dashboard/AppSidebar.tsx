"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "../ui/sidebar";
import { sidebarItems } from "@/constants/sidebar";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronUp,
  LogOut,
  Settings,
  ShoppingCart,
  User,
  FileText,
  ArrowLeftRight,
  User2,
} from "lucide-react";

import { useAuthStore } from "@/stores/authStore";
import { logoutUser } from "@/server/auth/logout";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const AppSidebar = () => {
  const { user } = useAuthStore();
  const pathname = usePathname();

  const isActivePath = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") return true;
    if (path !== "/dashboard" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-12 w-full">
              <Link href="/">
                <Image
                  src="/images/logo.jpg"
                  alt="logo"
                  width={2500}
                  height={2500}
                  className="rounded-full h-8 w-8"
                />
                <p>{user?.name ? user.name : "Wanda Inventory"}</p>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Application
          </SidebarGroupLabel>{" "}
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "transition-all duration-200",
                      isActivePath(item.url) &&
                        "bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-sm"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon
                        className={cn(
                          "transition-colors duration-200",
                          isActivePath(item.url) && "text-primary-foreground"
                        )}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.title === "Inbox" && (
                    <SidebarMenuBadge
                      className={cn(
                        isActivePath(item.url) &&
                          "bg-secondary text-secondary-foreground"
                      )}
                    >
                      24
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Reports */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Reports
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild id="sidebar-reports-sales">
                      <Link href="/dashboard/reports/sales">
                        <ShoppingCart className="h-4 w-4" />
                        Sales report
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      id="sidebar-reports-access-logs"
                    >
                      <Link href="/dashboard/reports/access-logs">
                        <FileText className="h-4 w-4" />
                        Access Log reports
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      id="sidebar-reports-transfer-reports"
                    >
                      <Link href="/dashboard/reports/transfer-reports">
                        <ArrowLeftRight className="h-4 w-4" />
                        Transfer Reports
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Anaytics */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Analytics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild id="sidebar-analytics-sales">
                      <Link href="/analytics/sales">
                        <ShoppingCart className="h-4 w-4" />
                        Sales analysis
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-accent hover:text-accent-foreground">
                  <User2 /> {user?.name || "John Doe"}{" "}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground">
                  <User className="h-[1.2rem] w-[1.2rem] mr-2" />
                  Account
                </DropdownMenuItem>

                <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground">
                  <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuItem
                  variant="destructive"
                  onClick={logoutUser}
                  className="hover:bg-destructive hover:text-destructive-foreground"
                >
                  <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
