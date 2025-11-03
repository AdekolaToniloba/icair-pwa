// lib/push-notifications.ts
"use client";

export interface NotificationPermission {
  granted: boolean;
  denied: boolean;
  default: boolean;
}

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  return false;
};

export const scheduleSessionNotification = (
  sessionTitle: string,
  sessionTime: string,
  sessionRoom: string,
  minutesBefore: number = 15
) => {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }

  // Calculate notification time
  const [hours, minutes] = sessionTime
    .split("-")[0]
    .trim()
    .split(":")
    .map(Number);
  const sessionDate = new Date();
  sessionDate.setHours(hours, minutes, 0, 0);

  const notificationTime = new Date(
    sessionDate.getTime() - minutesBefore * 60 * 1000
  );
  const now = new Date();

  const timeUntilNotification = notificationTime.getTime() - now.getTime();

  if (timeUntilNotification > 0) {
    setTimeout(() => {
      showNotification(`Session Starting in ${minutesBefore} Minutes`, {
        body: `${sessionTitle}\n📍 ${sessionRoom}`,
        icon: "/icon192x192.jpg",
        badge: "/icon192x192.jpg",
        tag: `session-${sessionTitle}`,
        requireInteraction: true,
        actions: [
          { action: "view", title: "View Details" },
          { action: "dismiss", title: "Dismiss" },
        ],
      });
    }, timeUntilNotification);
  }
};

export const showNotification = (
  title: string,
  options?: NotificationOptions
) => {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }

  const notification = new Notification(title, {
    icon: "/icon192x192.jpg",
    badge: "/icon192x192.jpg",
    vibrate: [200, 100, 200],
    ...options,
  });

  notification.onclick = (event) => {
    event.preventDefault();
    window.focus();
    notification.close();
  };

  return notification;
};

// Schedule notifications for starred sessions
export const scheduleStarredSessionNotifications = (
  sessions: Array<{
    id: string;
    title: string;
    time: string;
    room: string;
    date: string;
  }>
) => {
  sessions.forEach((session) => {
    // 15 minutes before
    scheduleSessionNotification(session.title, session.time, session.room, 15);

    // 1 hour before for important sessions
    scheduleSessionNotification(session.title, session.time, session.room, 60);
  });
};

// Conference reminder notifications
export const scheduleConferenceReminders = () => {
  const conferenceStart = new Date("2025-11-04T09:00:00");
  const now = new Date();

  // 24 hours before
  const oneDayBefore = new Date(
    conferenceStart.getTime() - 24 * 60 * 60 * 1000
  );
  if (oneDayBefore > now) {
    const timeUntil = oneDayBefore.getTime() - now.getTime();
    setTimeout(() => {
      showNotification("Conference Tomorrow!", {
        body: "MIRG-ICAIR 2025 starts tomorrow at University of Lagos. Ready to join us?",
        requireInteraction: true,
      });
    }, timeUntil);
  }

  // 1 hour before
  const oneHourBefore = new Date(conferenceStart.getTime() - 60 * 60 * 1000);
  if (oneHourBefore > now) {
    const timeUntil = oneHourBefore.getTime() - now.getTime();
    setTimeout(() => {
      showNotification("Conference Starting Soon!", {
        body: "MIRG-ICAIR 2025 starts in 1 hour. See you there!",
        requireInteraction: true,
      });
    }, timeUntil);
  }

  // Morning of conference
  const morningOf = new Date("2025-11-04T07:00:00");
  if (morningOf > now) {
    const timeUntil = morningOf.getTime() - now.getTime();
    setTimeout(() => {
      showNotification("Conference Day is Here!", {
        body: "Good morning! MIRG-ICAIR 2025 starts in 2 hours. Have a great conference!",
        requireInteraction: true,
      });
    }, timeUntil);
  }
};

// Check notification permission status
export const getNotificationPermissionStatus = (): string => {
  if (!("Notification" in window)) {
    return "unsupported";
  }
  return Notification.permission;
};

// Helper to register service worker for push notifications
export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered:", registration);
      return registration;
    } catch (error) {
      console.error("Service Worker registration failed:", error);
      return null;
    }
  }
  return null;
};
