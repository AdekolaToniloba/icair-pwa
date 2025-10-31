"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Download, Wifi, Clock, Zap, Smartphone } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt?: () => Promise<void>
  userChoice?: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [pageViews, setPageViews] = useState(0)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Track page views
    const views = Number(localStorage.getItem("pwa-page-views") || "0")
    const newViews = views + 1
    localStorage.setItem("pwa-page-views", String(newViews))
    setPageViews(newViews)

    // Check if already installed
    const installed = localStorage.getItem("pwa-installed")
    if (installed) {
      setIsInstalled(true)
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)

      // Show prompt after 30 seconds or 2 page views
      const timer = setTimeout(() => {
        if (newViews >= 2 || true) {
          setShowPrompt(true)
        }
      }, 30000)

      return () => clearTimeout(timer)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt?.()
      const { outcome } = await deferredPrompt.userChoice!
      if (outcome === "accepted") {
        localStorage.setItem("pwa-installed", "true")
        setIsInstalled(true)
        setShowPrompt(false)
      }
    } catch (error) {
      console.error("[v0] Install error:", error)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setDeferredPrompt(null)
  }

  if (isInstalled || !showPrompt || !deferredPrompt) return null

  const benefits = [
    { icon: Wifi, label: "Works offline" },
    { icon: Smartphone, label: "Quick access from home" },
    { icon: Clock, label: "Session reminders" },
    { icon: Zap, label: "Save mobile data" },
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-24 left-4 right-4 md:bottom-8 md:right-8 md:max-w-sm z-50"
        role="dialog"
        aria-labelledby="pwa-title"
        aria-describedby="pwa-description"
      >
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#00A651] to-green-700 p-4 text-white">
            <h3 className="font-bold text-lg mb-2" id="pwa-title">
              Install UNILAG Conference App
            </h3>
            <p className="text-sm text-green-50" id="pwa-description">
              Get quick access and enhanced features
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-3 p-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4 text-[#00A651] flex-shrink-0" aria-hidden="true" />
                  <span className="text-xs text-gray-700">{benefit.label}</span>
                </motion.div>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 p-4 pt-2 border-t border-gray-100">
            <button
              onClick={handleDismiss}
              className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded transition-colors"
              aria-label="Dismiss install prompt"
            >
              Not now
            </button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleInstall}
              data-testid="pwa-install-prompt"
              className="flex-1 px-3 py-2 text-sm font-medium bg-[#00A651] text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              aria-label="Install UNILAG Conference App"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Install
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
