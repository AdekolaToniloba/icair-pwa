"use client";

import { useEffect } from "react";
import HomePage from "@/components/pages/home-page";
import { UnifiedPageWrapper } from "@/components/unified-page-wrapper";
import {
  requestNotificationPermission,
  scheduleConferenceReminders,
} from "@/lib/push-notification";

export default function Home() {
  useEffect(() => {
    requestNotificationPermission().then((granted) => {
      if (granted) {
        scheduleConferenceReminders(); // Sets up all conference reminders
      }
    });
  }, []);

  return (
    <UnifiedPageWrapper>
      <HomePage />
    </UnifiedPageWrapper>
  );
}
