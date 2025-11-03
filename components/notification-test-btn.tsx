"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Zap, Calendar, Clock, TestTube2 } from "lucide-react";
import {
  showNotification,
  scheduleSessionNotification,
  requestNotificationPermission,
} from "@/lib/push-notification";

// Only show in development
const isDev = process.env.NODE_ENV === "development";

export default function NotificationTestButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [lastTest, setLastTest] = useState<string>("");

  // Don't render in production
  if (!isDev) return null;

  const testImmediateNotification = async () => {
    const granted = await requestNotificationPermission();
    if (!granted) {
      alert("Please allow notifications first!");
      return;
    }

    showNotification("🎉 Test Notification", {
      body: "If you see this, notifications are working perfectly!",
      icon: "/icon192x192.jpg",
      tag: "test-immediate",
    });
    setLastTest("Immediate notification sent!");
  };

  const testDelayedNotification = async () => {
    const granted = await requestNotificationPermission();
    if (!granted) {
      alert("Please allow notifications first!");
      return;
    }

    setTimeout(() => {
      showNotification("⏰ Delayed Test", {
        body: "This notification came after 5 seconds!",
        icon: "/icon192x192.jpg",
        tag: "test-delayed",
      });
    }, 5000);

    setLastTest("Notification will appear in 5 seconds...");
  };

  const testSessionNotification = async () => {
    const granted = await requestNotificationPermission();
    if (!granted) {
      alert("Please allow notifications first!");
      return;
    }

    // Create a test session starting in 1 minute
    const now = new Date();
    const testTime = new Date(now.getTime() + 60000); // 1 minute from now
    const hours = testTime.getHours();
    const minutes = testTime.getMinutes();
    const timeString = `${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}-${hours}:${minutes + 30}`;

    // Schedule for 30 seconds from now (not 15 min)
    setTimeout(() => {
      showNotification("📅 Test Session Starting Soon!", {
        body: "Test Session\n📍 Test Room",
        icon: "/icon192x192.jpg",
        requireInteraction: true,
        tag: "test-session",
      });
    }, 30000); // 30 seconds

    setLastTest("Session reminder in 30 seconds...");
  };

  const testConferenceReminder = async () => {
    const granted = await requestNotificationPermission();
    if (!granted) {
      alert("Please allow notifications first!");
      return;
    }

    setTimeout(() => {
      showNotification("🎊 Conference Starting Tomorrow!", {
        body: "MIRG-ICAIR 2025 at University of Lagos. Ready to join us?",
        icon: "/icon192x192.jpg",
        requireInteraction: true,
        tag: "test-conference",
      });
    }, 3000); // 3 seconds

    setLastTest("Conference reminder in 3 seconds...");
  };

  const testQuickSession = async () => {
    const granted = await requestNotificationPermission();
    if (!granted) {
      alert("Please allow notifications first!");
      return;
    }

    // Quick test - notification in 5 seconds
    setTimeout(() => {
      showNotification("⚡ Quick Session Test", {
        body: "Your starred session is starting in 15 minutes!\n📍 Main Hall",
        icon: "/icon192x192.jpg",
        requireInteraction: true,
        actions: [
          { action: "view", title: "View Details" },
          { action: "dismiss", title: "Dismiss" },
        ],
        tag: "test-quick-session",
      });
    }, 5000);

    setLastTest("Quick session test in 5 seconds...");
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 z-[60] w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center text-white"
        title="Test Notifications"
      >
        <Bell className="w-6 h-6" />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-purple-600 rounded-full opacity-30"
        />
      </motion.button>

      {/* Test Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55]"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="fixed bottom-24 right-4 z-[60] w-80 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TestTube2 className="w-5 h-5" />
                    <h3 className="font-bold">Test Notifications</h3>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-white/80 mt-1">Dev Mode Only</p>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                {/* Immediate Test */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={testImmediateNotification}
                  className="w-full p-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-lg text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        Instant Test
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Immediate notification
                      </p>
                    </div>
                  </div>
                </motion.button>

                {/* Quick Session (5 sec) */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={testQuickSession}
                  className="w-full p-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        Quick Session
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Appears in 5 seconds
                      </p>
                    </div>
                  </div>
                </motion.button>

                {/* Conference Test (3 sec) */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={testConferenceReminder}
                  className="w-full p-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        Conference Reminder
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Appears in 3 seconds
                      </p>
                    </div>
                  </div>
                </motion.button>

                {/* Session Test (30 sec) */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={testSessionNotification}
                  className="w-full p-3 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded-lg text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        Session Reminder
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Appears in 30 seconds
                      </p>
                    </div>
                  </div>
                </motion.button>

                {/* Delayed Test */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={testDelayedNotification}
                  className="w-full p-3 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        Delayed Test
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Appears in 5 seconds
                      </p>
                    </div>
                  </div>
                </motion.button>

                {/* Status */}
                {lastTest && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg"
                  >
                    <p className="text-xs text-blue-800 dark:text-blue-200">
                      ✓ {lastTest}
                    </p>
                  </motion.div>
                )}

                {/* Info */}
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    💡 <strong>Tip:</strong> Keep this tab open to receive test
                    notifications
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
