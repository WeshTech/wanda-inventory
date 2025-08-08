"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersTable } from "./users-table";
import { InvitesTable } from "./invites-table";
import { RolesTable } from "./roles-table";
// New import

export default function UsersPageContent() {
  // Mock user count for display
  const userCount = 5; // This would typically come from a data source

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 p-6">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <h1 className="text-2xl font-semibold">Users & Invites</h1>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="users">
          <TabsList className="grid w-full grid-cols-3 max-w-lg">
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
      </main>
    </div>
  );
}
