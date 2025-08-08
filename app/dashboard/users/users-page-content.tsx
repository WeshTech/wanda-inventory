"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersTable } from "./users-table";
import { InvitesTable } from "./invites-table";

export default function UsersPageContent() {
  const userCount = 5;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 pt-6">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <h1 className="text-2xl font-semibold">Users & Invites</h1>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="users">
          <TabsList className="grid w-full grid-cols-2 max-w-sm">
            <TabsTrigger value="users">Users ({userCount})</TabsTrigger>
            <TabsTrigger value="invites">Invites</TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <UsersTable />
          </TabsContent>
          <TabsContent value="invites">
            <InvitesTable />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
