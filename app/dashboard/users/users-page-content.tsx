"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersTable } from "./users-table";
import { InvitesTable } from "./invites-table";
import { RolesTable } from "./roles-table";

export default function UsersPageContent() {
  // Mock user count for display
  const userCount = 5; // This would typically come from a data source

  return (
    <div className="flex min-h-screen max-w-screen w-full flex-col bg-muted/40 p-2 lg:p-4">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background/95 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-4 m-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold sm:text-2xl">Users & Invites</h1>
          <span className="flex sm:hidden items-center justify-center rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
            5
          </span>
        </div>
      </header>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-4 sm:py-0 md:gap-8">
        <Tabs defaultValue="users">
          <TabsList className="grid lg:w-1/2 w-full grid-cols-3 ">
            {" "}
            {/* Adjusted grid-cols */}
            <TabsTrigger value="users">Users ({userCount})</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>{" "}
            <TabsTrigger value="invites">Invites</TabsTrigger>
            {/* New Tab Trigger */}
          </TabsList>
          <TabsContent value="users">
            <UsersTable />
          </TabsContent>
          <TabsContent value="invites">
            <InvitesTable />
          </TabsContent>
          <TabsContent value="roles">
            {" "}
            {/* New Tab Content */}
            <RolesTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
