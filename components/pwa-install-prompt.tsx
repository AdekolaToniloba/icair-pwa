"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Wifi,
  Clock,
  Zap,
  Smartphone,
  Share2,
  Plus,
} from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt?: () => Promise<void>;
  userChoice?: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Detect iOS/Safari
const isIOS = () => {
  if (typeof window === "undefined") return false;
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

const isInStandaloneMode = () => {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true
  );
};

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [pageViews, setPageViews] = useState(0);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);

  useEffect(() => {
    // Check if iOS
    const iosDevice = isIOS();
    setIsIOSDevice(iosDevice);

    // Check if already in standalone mode
    if (isInStandaloneMode()) {
      setIsInstalled(true);
      return;
    }

    // Track page views
    const views = Number(localStorage.getItem("pwa-page-views") || "0");
    const newViews = views + 1;
    localStorage.setItem("pwa-page-views", String(newViews));
    setPageViews(newViews);

    // Check if already installed
    const installed = localStorage.getItem("pwa-installed");
    const dismissed = localStorage.getItem("pwa-dismissed");
    if (installed || dismissed) {
      setIsInstalled(true);
      return;
    }

    // For iOS, show prompt after delay
    if (iosDevice) {
      const timer = setTimeout(() => {
        if (newViews >= 2 || true) {
          setShowPrompt(true);
        }
      }, 30000);
      return () => clearTimeout(timer);
    }

    // Listen for beforeinstallprompt event (Android/Chrome)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Show prompt after 30 seconds or 2 page views
      const timer = setTimeout(() => {
        if (newViews >= 2 || true) {
          setShowPrompt(true);
        }
      }, 30000);

      return () => clearTimeout(timer);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
  }, []);

  const handleInstall = async () => {
    if (isIOSDevice) {
      // For iOS, we can't trigger install programmatically
      // The instructions are already shown in the UI
      return;
    }

    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt?.();
      const { outcome } = await deferredPrompt.userChoice!;
      if (outcome === "accepted") {
        localStorage.setItem("pwa-installed", "true");
        setIsInstalled(true);
        setShowPrompt(false);
      }
    } catch (error) {
      console.error("[v0] Install error:", error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDeferredPrompt(null);
    localStorage.setItem("pwa-dismissed", "true");
  };

  // Don't show if installed or dismissed
  if (isInstalled || !showPrompt) return null;

  // For Android/Chrome, require deferredPrompt
  if (!isIOSDevice && !deferredPrompt) return null;

  const benefits = [
    { icon: Wifi, label: "Works offline" },
    { icon: Smartphone, label: "Quick access from home" },
    { icon: Clock, label: "Session reminders" },
    { icon: Zap, label: "Save mobile data" },
  ];

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
        <div className="bg-card rounded-lg shadow-xl border border-border overflow-hidden">
          {/* Purple gradient header - starts from the edge */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-4 py-4 text-white">
            <h3 className="font-bold text-lg mb-2" id="pwa-title">
              Install MIRG-ICAIR 2025 App
            </h3>
            <p className="text-sm text-purple-50" id="pwa-description">
              Get quick access and enhanced features
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-card">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <Icon
                    className="w-4 h-4 text-purple-600 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-xs text-muted-foreground">
                    {benefit.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* iOS Instructions */}
          {isIOSDevice && (
            <div className="px-4 pb-3 bg-card">
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
                <p className="text-xs text-purple-900 dark:text-purple-100 font-medium mb-2">
                  To install on iOS:
                </p>
                <ol className="text-xs text-purple-800 dark:text-purple-200 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold shrink-0">1.</span>
                    <span className="flex items-center gap-1">
                      Tap the <Share2 className="w-3 h-3 inline mx-0.5" /> Share
                      button below
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold shrink-0">2.</span>
                    <span className="flex items-center gap-1">
                      Select <Plus className="w-3 h-3 inline mx-0.5" /> "Add to
                      Home Screen"
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold shrink-0">3.</span>
                    <span>Tap "Add" in the top right</span>
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 p-4 pt-2 border-t border-border bg-card">
            <button
              onClick={handleDismiss}
              className="flex-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded transition-colors"
              aria-label="Dismiss install prompt"
            >
              Not now
            </button>
            {!isIOSDevice && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleInstall}
                data-testid="pwa-install-prompt"
                className="flex-1 px-3 py-2 text-sm font-medium bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                aria-label="Install MIRG-ICAIR 2025 App"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Install
              </motion.button>
            )}
            {isIOSDevice && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleDismiss}
                className="flex-1 px-3 py-2 text-sm font-medium bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                aria-label="Got it"
              >
                Got it
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
