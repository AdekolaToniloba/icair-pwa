"use client";

import { Bell } from "lucide-react";

/**
 * SUPER SIMPLE TEST BUTTON
 * Use this to verify your setup works before using the full component
 *
 * No imports needed except lucide-react
 * No environment checks
 * Just a button that shows and triggers notifications
 */
export default function SimpleNotificationTest() {
  const testNotification = () => {
    console.log("Button clicked!");

    // Check if notifications are supported
    if (!("Notification" in window)) {
      alert("Notifications not supported in this browser");
      return;
    }

    console.log("Current permission:", Notification.permission);

    // Request permission if needed
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        console.log("Permission result:", permission);
        if (permission === "granted") {
          showTestNotification();
        }
      });
    } else if (Notification.permission === "granted") {
      showTestNotification();
    } else {
      alert(
        "Notifications are blocked. Please enable them in browser settings."
      );
    }
  };

  const showTestNotification = () => {
    console.log("Showing notification...");
    new Notification("🎉 Test Notification", {
      body: "If you see this, everything works!",
      icon: "/icon192x192.jpg",
      badge: "/icon192x192.jpg",
    });
  };

  return (
    <button
      onClick={testNotification}
      className="fixed bottom-32 right-4 z-[999] w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform"
      title="Test Notifications"
    >
      <Bell className="w-8 h-8" />
    </button>
  );
}
