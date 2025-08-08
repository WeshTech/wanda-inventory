import { AppSidebar } from "@/components/dashboard/AppSidebar";
import Navbar from "@/components/dashboard/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <AppSidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        {children}
      </div>
    </div>
  );
}
