import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MIRG-ICAIR 2025 | Companion App",
  description:
    "Official companion app for MIRG-ICAIR 2025 - 5th International Conference on AI and Robotics. Building Sustainable AI-Driven Transformation Infrastructures for African Economies.",
  generator: "Nithub Unilag",
  manifest: "/manifest.json",
  keywords: [
    "ICAIR",
    "MIRG",
    "AI Conference",
    "Robotics",
    "Africa",
    "Nithub",
    "Machine Intelligence",
    "Artificial Intelligence",
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ICAIR 2025",
  },
  formatDetection: {
    telephone: false,
  },
};
export const viewport = {
  themeColor: "#6d00ab",
};

import ClientLayout from "./client-layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.jpg" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.jpg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="ICAIR 2025" />
        <meta name="theme-color" content="#6d00ab" />
        <meta
          name="description"
          content="MIRG-ICAIR 2025: Building Sustainable AI-Driven Transformation Infrastructures for African Economies"
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
