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
import Script from "next/script";

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
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-V690Z4VCLQ"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
      // Declare dataLayer for TypeScript
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-V690Z4VCLQ');
    `,
          }}
        />
        <meta
          name="google-site-verification"
          content="T-ze-va65OTqhSo7_27AXxOOJk2cjeazpQvjINHZzR8"
        />
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
