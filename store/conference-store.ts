import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ConferenceState {
  // Navigation
  currentPage: string
  setCurrentPage: (page: string) => void

  // Schedule
  starredSessions: string[]
  toggleStarSession: (sessionId: string) => void
  sessionNotes: Record<string, string>
  addSessionNote: (sessionId: string, note: string) => void
  removeSessionNote: (sessionId: string) => void

  // Hotels
  hotelComparisons: Record<string, boolean>
  toggleHotelComparison: (hotelId: string) => void

  // Travel Guide
  travelChecklist: Record<string, boolean>
  toggleTravelChecklistItem: (itemId: string) => void

  // Offline
  isOnline: boolean
  setIsOnline: (online: boolean) => void

  // User Preferences
  userPreferences: Record<string, unknown>
  setUserPreference: (key: string, value: unknown) => void

  // Syncing
  isSyncing: boolean
  setIsSyncing: (syncing: boolean) => void
}

export const useConferenceStore = create<ConferenceState>()(
  persist(
    (set) => ({
      // Navigation
      currentPage: "/",
      setCurrentPage: (page) => set({ currentPage: page }),

      // Schedule
      starredSessions: [],
      toggleStarSession: (sessionId: string) =>
        set((state) => ({
          starredSessions: state.starredSessions.includes(sessionId)
            ? state.starredSessions.filter((id) => id !== sessionId)
            : [...state.starredSessions, sessionId],
        })),
      sessionNotes: {},
      addSessionNote: (sessionId: string, note: string) =>
        set((state) => ({
          sessionNotes: { ...state.sessionNotes, [sessionId]: note },
        })),
      removeSessionNote: (sessionId: string) =>
        set((state) => {
          const { [sessionId]: _, ...rest } = state.sessionNotes
          return { sessionNotes: rest }
        }),

      // Hotels
      hotelComparisons: {},
      toggleHotelComparison: (hotelId: string) =>
        set((state) => ({
          hotelComparisons: {
            ...state.hotelComparisons,
            [hotelId]: !state.hotelComparisons[hotelId],
          },
        })),

      // Travel Guide
      travelChecklist: {},
      toggleTravelChecklistItem: (itemId: string) =>
        set((state) => ({
          travelChecklist: {
            ...state.travelChecklist,
            [itemId]: !state.travelChecklist[itemId],
          },
        })),

      // Offline
      isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
      setIsOnline: (online) => set({ isOnline: online }),

      // User Preferences
      userPreferences: {},
      setUserPreference: (key: string, value: unknown) =>
        set((state) => ({
          userPreferences: { ...state.userPreferences, [key]: value },
        })),

      // Syncing
      isSyncing: false,
      setIsSyncing: (syncing) => set({ isSyncing: syncing }),
    }),
    {
      name: "conference-store",
      version: 1,
    },
  ),
)
