"use client"

import type React from "react"
import { ToastProvider } from "@/components/toast-context"
import { EnhancedErrorBoundary } from "@/components/enhanced-error-boundary"
import { OfflineIndicator } from "@/components/offline-indicator"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { ScrollToTop } from "@/components/scroll-to-top"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <EnhancedErrorBoundary>
      <ToastProvider>
        <OfflineIndicator />
        <PWAInstallPrompt />
        {children}
        <ScrollToTop />
      </ToastProvider>
    </EnhancedErrorBoundary>
  )
}
