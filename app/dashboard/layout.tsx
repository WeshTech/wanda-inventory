"use client";

import { AppSidebar } from "@/components/dashboard/AppSidebar";
import Navbar from "@/components/dashboard/Navbar";
import ClientAuthInitializer from "@/providers/auth-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientAuthInitializer>
      <div className="flex h-screen">
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          <Navbar />

          {children}
        </div>
      </div>
    </ClientAuthInitializer>
  );
}
