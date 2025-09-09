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
  Plus,
  Projector,
  Settings,
  ShoppingCart,
  User,
  User2,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
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
          <SidebarGroupLabel>Application</SidebarGroupLabel>
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

        {/* collapsible */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel
                className={cn(
                  "flex items-center justify-between text-md transition-colors duration-200",
                  pathname.startsWith("/dashboard/sales") &&
                    "text-primary font-semibold"
                )}
              >
                Sales
                <ChevronUp className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "transition-all duration-200",
                        isActivePath("/dashboard/sales/pos") &&
                          "bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-sm"
                      )}
                    >
                      <Link
                        href="/dashboard/sales/pos"
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Make Sale</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "transition-all duration-200",
                        pathname === "/dashboard/sales" &&
                          "bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-sm"
                      )}
                    >
                      <Link
                        href="/dashboard/sales"
                        className="flex items-center gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>All Sales</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* nested */}
        <SidebarGroup>
          <SidebarGroupLabel>Nested Items</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "transition-all duration-200",
                    pathname.includes("/projects") &&
                      "bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-sm"
                  )}
                >
                  <Link href="/">
                    <Projector />
                    See All Projects
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/">
                        <Plus />
                        Add project
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
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
