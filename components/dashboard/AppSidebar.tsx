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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
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
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingCart,
  User,
  User2,
} from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";

import { useAuthPermissions, useAuthUser } from "@/stores/authStore";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLogoutUser } from "@/server/auth/logout";
import { useMemo } from "react";
import { filterByPermissions } from "@/utils/permissions";

export const AppSidebar = () => {
  const router = useRouter();
  const user = useAuthUser();
  const pathname = usePathname();
  const { state } = useSidebar();
  const userRole = user?.role;

  // Check if sidebar is collapsed
  const isCollapsed = state === "collapsed";

  const isActivePath = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") return true;
    if (path !== "/dashboard" && pathname.startsWith(path)) return true;
    return false;
  };

  const permissions = useAuthPermissions();

  // Filter sidebar items based on user permissions
  const visibleItems = useMemo(() => {
    return filterByPermissions(sidebarItems, permissions);
  }, [permissions]);

  return (
    <TooltipProvider>
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
                  <p>
                    {user?.businessName
                      ? user.businessName.charAt(0).toUpperCase() +
                        user.businessName.slice(1).toLowerCase()
                      : "Wanda Inventory"}
                  </p>
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
              {/* <SidebarMenu>
                {sidebarItems.map((item) => {
                  const menuItem = (
                    <SidebarMenuItem>
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
                              isActivePath(item.url) &&
                                "text-primary-foreground"
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
                  );

                  return isCollapsed ? (
                    <Tooltip key={item.title}>
                      <TooltipTrigger asChild>{menuItem}</TooltipTrigger>
                      <TooltipContent side="right" className="ml-2">
                        {item.title}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <div key={item.title}>{menuItem}</div>
                  );
                })}
              </SidebarMenu> */}

              {/* dashboard */}
              {userRole === "owner" && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "transition-all duration-200",
                      isActivePath("/dashboard") &&
                        "bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-sm"
                    )}
                  >
                    <Link href="/dashboard">
                      <LayoutDashboard
                        className={cn(
                          "transition-colors duration-200",
                          isActivePath("/dashboard") &&
                            "text-primary-foreground"
                        )}
                      />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              <SidebarMenu>
                {visibleItems.map((item) => (
                  <SidebarMenuItem key={item.url}>
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
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>

              {/* Settings Menu Item */}
              {userRole === "owner" && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "transition-all duration-200",
                      isActivePath("/dashboard/settings") &&
                        "bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-sm"
                    )}
                  >
                    <Link href="/dashboard/settings">
                      <Settings
                        className={cn(
                          "transition-colors duration-200",
                          isActivePath("/dashboard/settings") &&
                            "text-primary-foreground"
                        )}
                      />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Reports */}
          {userRole === "owner" && (
            <SidebarGroup>
              <SidebarGroupLabel className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Reports
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuSub>
                      {isCollapsed ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                asChild
                                id="sidebar-reports-sales"
                              >
                                <Link href="/dashboard/reports/sales">
                                  <ShoppingCart className="h-4 w-4" />
                                  Sales report
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="ml-2">
                            Sales report
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            id="sidebar-reports-sales"
                          >
                            <Link href="/dashboard/reports/sales">
                              <ShoppingCart className="h-4 w-4" />
                              Sales report
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )}

                      {/* {isCollapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
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
                        </TooltipTrigger>
                        <TooltipContent side="right" className="ml-2">
                          Access Log reports
                        </TooltipContent>
                      </Tooltip>
                    ) : (
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
                    )}

                    {isCollapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
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
                        </TooltipTrigger>
                        <TooltipContent side="right" className="ml-2">
                          Transfer Reports
                        </TooltipContent>
                      </Tooltip>
                    ) : (
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
                    )} */}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* Analytics */}
          {userRole === "owner" && (
            <SidebarGroup>
              <SidebarGroupLabel className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Analytics
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuSub>
                      {isCollapsed ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuSubItem>
                              <SidebarMenuSubButton
                                asChild
                                id="sidebar-analytics-sales"
                              >
                                <Link href="/dashboard/analytics/sales">
                                  <ShoppingCart className="h-4 w-4" />
                                  Sales analysis
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="ml-2">
                            Sales analysis
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            id="sidebar-analytics-sales"
                          >
                            <Link href="/dashboard/analytics/sales">
                              <ShoppingCart className="h-4 w-4" />
                              Sales analysis
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>

        {/* footer */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="hover:bg-accent hover:text-accent-foreground">
                    <User2 /> {user?.businessName || "John Doe"}{" "}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {userRole === "owner" && (
                    <DropdownMenuItem
                      className="hover:bg-accent hover:text-accent-foreground"
                      disabled
                    >
                      <User className="h-[1.2rem] w-[1.2rem] mr-2" />
                      Account
                    </DropdownMenuItem>
                  )}
                  {userRole === "owner" && (
                    <DropdownMenuItem
                      className="hover:bg-accent hover:text-accent-foreground"
                      onClick={() => router.push("/dashboard/settings")}
                    >
                      <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
                      Settings
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={useLogoutUser}
                    className="hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-300"
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
    </TooltipProvider>
  );
};
