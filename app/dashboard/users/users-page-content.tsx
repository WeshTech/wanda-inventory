"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersTable } from "./users-table";
import { InvitesTable } from "./invites-table";
import { RolesTable } from "./roles-table";
import { BlockedUsersTable } from "./blocked-users-table";
// import { BlockedUsersTable } from "./blocked-users-table";

export default function UsersPageContent() {
  // Mock user count for display
  const userCount = 5; // This would typically come from a data sour

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background/95 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-4 m-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold sm:text-2xl">Users & Invites</h1>
          <span className="flex sm:hidden items-center justify-center rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
            5
          </span>
        </div>
      </header>
      <div className="grid flex-1 items-start gap-4 p-2 sm:p-4 sm:px-4 sm:py-0 md:gap-8">
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="flex flex-wrap sm:flex-nowrap justify-start gap-2 sm:gap-4 w-full sm:w-1/2">
            <TabsTrigger value="users">Users ({userCount})</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="invites">Invites</TabsTrigger>
            <TabsTrigger value="blocked">Blocked Users</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UsersTable />
          </TabsContent>
          <TabsContent value="invites">
            <InvitesTable />
          </TabsContent>
          <TabsContent value="roles">
            <RolesTable />
          </TabsContent>
          <TabsContent value="blocked">
            <BlockedUsersTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
