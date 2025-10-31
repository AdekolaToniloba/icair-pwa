"use client"

import React, { type ReactNode } from "react"
import { motion } from "framer-motion"
import { AlertCircle, RefreshCw } from "lucide-react"

interface EnhancedErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, reset: () => void) => ReactNode
  onError?: (error: Error, info: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorCount: number
}

export class EnhancedErrorBoundary extends React.Component<EnhancedErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: EnhancedErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorCount: 0 }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorCount: 0 }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState((prev) => ({ errorCount: prev.errorCount + 1 }))
    console.error("[v0] Error caught by boundary:", error, errorInfo)
    this.props.onError?.(error, errorInfo)

    // Log to monitoring service if available
    if (typeof window !== "undefined" && (window as any).__logError) {
      ;(window as any).__logError(error, errorInfo)
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      // Show permanent error UI after 3 attempts
      const showPermanentError = this.state.errorCount >= 3

      return (
        this.props.fallback?.(this.state.error, this.reset) || (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-background rounded-lg border border-border"
          >
            <AlertCircle className="w-12 h-12 text-destructive mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2">Something went wrong</h2>
            <p className="text-sm text-muted-foreground text-center mb-2 max-w-sm">{this.state.error.message}</p>
            {showPermanentError && (
              <p className="text-xs text-destructive mb-4 text-center">
                Multiple errors detected. Please refresh the page.
              </p>
            )}
            <div className="flex gap-3 mt-6">
              {!showPermanentError && (
                <motion.button
                  onClick={this.reset}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
                  data-testid="error-reset-btn"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </motion.button>
              )}
              <motion.button
                onClick={() => window.location.reload()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
                data-testid="error-reload-btn"
              >
                Reload Page
              </motion.button>
            </div>
          </motion.div>
        )
      )
    }

    return this.props.children
  }
}
