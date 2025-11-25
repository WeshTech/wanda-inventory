import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { Nunito } from "next/font/google";
import ToastProvider from "@/components/providers/toast-provider";
import { Toaster } from "sonner";
import { TanstackProvider } from "@/providers/tanstack-provider";
import { Analytics } from "@vercel/analytics/next";
import { StructuredData } from "@/components/structured-data";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export { metadata } from "./metadata";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`${nunito.className} antialiased flex`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TanstackProvider>
            <SidebarProvider defaultOpen={defaultOpen}>
              <main className="w-full">
                <div className="px-4">{children}</div>
              </main>
              <ToastProvider />
              <Toaster position="top-center" theme="system" />
            </SidebarProvider>
          </TanstackProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
