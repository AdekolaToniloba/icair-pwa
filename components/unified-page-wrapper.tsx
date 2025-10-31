"use client"

import type React from "react"
import { motion } from "framer-motion"
import { AlertCircle, Loader2 } from "lucide-react"

interface UnifiedPageWrapperProps {
  children: React.ReactNode
  isLoading?: boolean
  error?: Error | null
  onRetry?: () => void
}

export const UnifiedPageWrapper: React.FC<UnifiedPageWrapperProps> = ({
  children,
  isLoading = false,
  error = null,
  onRetry = () => window.location.reload(),
}) => {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-screen p-6 bg-background"
      >
        <AlertCircle className="w-16 h-16 text-destructive mb-6" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Page Error</h2>
        <p className="text-muted-foreground text-center mb-8 max-w-md">{error.message}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          data-testid="page-error-retry"
        >
          Try Again
        </motion.button>
      </motion.div>
    )
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-screen p-6 bg-background"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="mb-6"
        >
          <Loader2 className="w-16 h-16 text-primary" />
        </motion.div>
        <p className="text-muted-foreground">Loading...</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="pb-20"
    >
      {children}
    </motion.div>
  )
}
