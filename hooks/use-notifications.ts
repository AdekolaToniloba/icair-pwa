// hooks/use-notifications.ts
"use client";

import { useEffect, useRef, useState } from "react";
import {
  requestNotificationPermission,
  scheduleConferenceReminders,
  getNotificationPermissionStatus,
} from "@/lib/push-notification";

export function useNotifications() {
  const [permission, setPermission] = useState<string>("default");
  const [isInitialized, setIsInitialized] = useState(false);
  const hasRequestedRef = useRef(false);

  useEffect(() => {
    // Check if notifications are supported
    if (typeof window === "undefined" || !("Notification" in window)) {
      console.log("Notifications not supported");
      return;
    }

    // Check current permission status
    const currentPermission = getNotificationPermissionStatus();
    setPermission(currentPermission);

    // Only request permission once per session
    if (hasRequestedRef.current) return;
    hasRequestedRef.current = true;

    // If already granted, just schedule reminders
    if (currentPermission === "granted") {
      scheduleConferenceReminders();
      setIsInitialized(true);
      return;
    }

    // If denied or unsupported, don't request
    if (currentPermission === "denied" || currentPermission === "unsupported") {
      setIsInitialized(true);
      return;
    }

    // Request permission (only if default/not yet asked)
    const initNotifications = async () => {
      try {
        const granted = await requestNotificationPermission();
        setPermission(granted ? "granted" : "denied");

        if (granted) {
          scheduleConferenceReminders();
          console.log("✅ Notifications initialized and reminders scheduled");
        } else {
          console.log("❌ Notification permission denied");
        }
      } catch (error) {
        console.error("Error initializing notifications:", error);
      } finally {
        setIsInitialized(true);
      }
    };

    // Delay request to not interrupt initial page load
    const timeoutId = setTimeout(initNotifications, 2000);

    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array - only run once

  return { permission, isInitialized };
}
