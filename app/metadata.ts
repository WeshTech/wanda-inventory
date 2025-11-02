import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Wanda Inventory",
    template: "%s | Wanda Inventory",
  },
  description:
    "Streamline your business operations with Wanda Inventory. Manage multiple stores, track inventory in real-time, monitor sales, and control user access all in one powerful platform.",
  keywords: [
    "inventory management",
    "business management",
    "store management",
    "stock tracking",
    "sales analytics",
    "multi-store management",
    "inventory system",
    "Kenya inventory software",
    "POS system",
    "business analytics",
  ],
  authors: [{ name: "Wanda Inventory Team" }],
  creator: "Wanda Inventory",
  publisher: "Wanda Inventory",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://wandainventory.co.ke"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Wanda Inventory - Smart Business & Inventory Management",
    description:
      "Streamline your business operations with real-time inventory tracking, multi-store management, and powerful analytics.",
    url: "/",
    siteName: "Wanda Inventory",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wanda Inventory Dashboard Preview",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wanda Inventory - Smart Business Management",
    description:
      "Real-time inventory tracking and multi-store management made easy.",
    images: ["/twitter-image.png"],
    // creator: '@wandainventory',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};
