"use client";

import React from "react";
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

export const AppSidebar = () => {
  const { user } = useAuthStore();
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
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.title === "Inbox" && (
                    <SidebarMenuBadge>24</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <SidebarGroup>
          <SidebarGroupLabel>Sales</SidebarGroupLabel>
          <SidebarGroupAction title="Make Sale">
            <Plus /> <span className="sr-only">Make Sale</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Projector />
                    See All Projects
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Plus />
                    Add Project
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}

        {/* collapsible */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="flex items-center justify-between text-md">
                Sales
                <ChevronUp className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
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
                    <SidebarMenuButton asChild>
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
                <SidebarMenuButton asChild>
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
                <SidebarMenuButton>
                  <User2 /> John Doe <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="h-[1.2rem] w-[1.2rem] mr-2" />
                  Account
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuItem variant="destructive" onClick={logoutUser}>
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
