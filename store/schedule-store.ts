import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ScheduleState {
  starredSessions: string[]
  toggleStarSession: (sessionId: string) => void
}

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set) => ({
      starredSessions: [],
      toggleStarSession: (sessionId: string) =>
        set((state) => ({
          starredSessions: state.starredSessions.includes(sessionId)
            ? state.starredSessions.filter((id) => id !== sessionId)
            : [...state.starredSessions, sessionId],
        })),
    }),
    {
      name: "schedule-store",
    },
  ),
)
