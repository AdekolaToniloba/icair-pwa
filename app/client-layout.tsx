"use client";

import type React from "react";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers";
import Header from "@/components/layout/header";
import BottomNav from "@/components/layout/bottom-nav";
import { AnimatePresence, motion } from "framer-motion";
import { UnifiedPageWrapper } from "@/components/unified-page-wrapper";
import { useNotifications } from "@/hooks/use-notifications";
import SimpleNotificationTest from "@/components/simple-notification-test";

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="pb-20"
    >
      {children}
    </motion.div>
  );
};

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { permission, isInitialized } = useNotifications();

  return (
    <Providers>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main
          className="flex-1 overflow-y-auto"
          role="main"
          aria-live="polite"
          aria-label="Main content"
        >
          <AnimatePresence mode="wait">
            <PageWrapper key="page">
              <UnifiedPageWrapper>{children}</UnifiedPageWrapper>
            </PageWrapper>
          </AnimatePresence>
        </main>
        <BottomNav />
      </div>
      <Analytics />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('/sw.js').then((reg) => {
                console.log('[v0] SW registered:', reg)
              }).catch((err) => {
                console.log('[v0] SW registration failed:', err)
              })
            }
          `,
        }}
      />
      <SimpleNotificationTest />
    </Providers>
  );
}
