"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, WifiIcon } from "lucide-react";

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowOnlineMessage(true);
      // Auto-hide message after 3 seconds
      const timer = setTimeout(() => setShowOnlineMessage(false), 3000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOnlineMessage(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-0 left-0 right-0 z-40 bg-yellow-100 border-b border-yellow-300 px-4 py-3"
          role="status"
          aria-live="polite"
          aria-label="Offline status"
        >
          <div className="flex items-center justify-center gap-2 text-yellow-800">
            <WifiOff className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="text-sm font-medium">
              You are offline - using cached data
            </span>
          </div>
        </motion.div>
      )}
      {showOnlineMessage && isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 left-0 right-0 z-40 bg-green-100 border-b border-green-300 px-4 py-2"
          role="status"
          aria-live="polite"
          aria-label="Online status"
        >
          <div className="flex items-center justify-center gap-2 text-green-800">
            <WifiIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="text-xs font-medium">
              Back online - syncing updates
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
