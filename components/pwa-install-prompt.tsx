"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Wifi, Clock, Zap, Smartphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface BeforeInstallPromptEvent extends Event {
  prompt?: () => Promise<void>;
  userChoice?: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [pageViews, setPageViews] = useState(0);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Track page views
    const views = Number(localStorage.getItem("pwa-page-views") || "0");
    const newViews = views + 1;
    localStorage.setItem("pwa-page-views", String(newViews));
    setPageViews(newViews);

    // Check if already installed or dismissed permanently
    const installed = localStorage.getItem("pwa-installed");
    const dismissed = localStorage.getItem("pwa-dismissed-permanently");

    if (installed === "true" || dismissed === "true") {
      setIsInstalled(true);
    }

    // Listen for app installation
    const handleAppInstalled = () => {
      console.log("[PWA] App installed successfully");
      localStorage.setItem("pwa-installed", "true");
      setIsInstalled(true);
      setShowPrompt(false);
    };

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      console.log("[PWA] beforeinstallprompt event fired");
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Reset installed flag when prompt is available (means app was uninstalled)
      localStorage.removeItem("pwa-installed");
      setIsInstalled(false);

      // Show prompt after 30 seconds or 2 page views (unless permanently dismissed)
      if (dismissed !== "true") {
        const timer = setTimeout(() => {
          if (newViews >= 2 || true) {
            setShowPrompt(true);
          }
        }, 30000);

        return () => clearTimeout(timer);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt?.();
      const { outcome } = await deferredPrompt.userChoice!;

      if (outcome === "accepted") {
        console.log("[PWA] User accepted install prompt");
        localStorage.setItem("pwa-installed", "true");
        localStorage.removeItem("pwa-dismissed-permanently");
        setIsInstalled(true);
        setShowPrompt(false);
      } else {
        console.log("[PWA] User dismissed install prompt");
      }
    } catch (error) {
      console.error("[PWA] Install error:", error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDeferredPrompt(null);
    // Store dismissal timestamp to avoid showing too frequently
    localStorage.setItem("pwa-last-dismissed", Date.now().toString());
  };

  const handleDismissPermanently = () => {
    setShowPrompt(false);
    setDeferredPrompt(null);
    localStorage.setItem("pwa-dismissed-permanently", "true");
  };

  if (isInstalled || !showPrompt || !deferredPrompt) return null;

  const benefits = [
    { icon: Wifi, label: "Works offline" },
    { icon: Smartphone, label: "Quick home screen access" },
    { icon: Clock, label: "Session reminders" },
    { icon: Zap, label: "Lightning fast" },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-24 left-4 right-4 md:bottom-8 md:right-8 md:left-auto md:max-w-md z-50"
        role="dialog"
        aria-labelledby="pwa-title"
        aria-describedby="pwa-description"
      >
        <Card className="shadow-xl border-border overflow-hidden">
          {/* Header with gradient background */}
          <CardHeader className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground relative overflow-hidden border-b-0">
            {/* Animated background orbs */}
            <motion.div
              className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"
              animate={{
                x: [0, 15, -10, 0],
                y: [0, -10, 10, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-3xl"
              animate={{
                x: [0, -10, 10, 0],
                y: [0, 15, -10, 0],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <CardTitle className="text-xl mb-2" id="pwa-title">
                  Install UNILAG Conference App
                </CardTitle>
                <CardDescription
                  className="text-primary-foreground/90"
                  id="pwa-description"
                >
                  Get quick access to sessions, speakers, and venue info
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleDismissPermanently}
                className="text-primary-foreground hover:bg-white/20 -mr-2 -mt-2"
                aria-label="Don't show again"
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Benefits Grid */}
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-3 mb-4">
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
                    <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10">
                      <Icon
                        className="size-4 text-primary flex-shrink-0"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-sm text-foreground font-medium">
                      {benefit.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={handleDismiss}
                className="flex-1"
                aria-label="Dismiss install prompt"
              >
                Not now
              </Button>
              <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
                <Button
                  onClick={handleInstall}
                  data-testid="pwa-install-prompt"
                  className="w-full gap-2"
                  aria-label="Install UNILAG Conference App"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Install
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
