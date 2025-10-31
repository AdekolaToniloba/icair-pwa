import { create } from "zustand"

interface OfflineData {
  starredSessions: string[]
  hotelComparisons: Record<string, boolean>
  sessionNotes: Record<string, string>
  userPreferences: Record<string, unknown>
}

interface OfflineStore {
  data: OfflineData
  isOnline: boolean
  setIsOnline: (online: boolean) => void
  addStarredSession: (sessionId: string) => void
  removeStarredSession: (sessionId: string) => void
  addHotelComparison: (hotelId: string) => void
  removeHotelComparison: (hotelId: string) => void
  addSessionNote: (sessionId: string, note: string) => void
  removeSessionNote: (sessionId: string) => void
  setUserPreference: (key: string, value: unknown) => void
  loadFromStorage: () => void
  saveToStorage: () => void
  syncWithServer: () => Promise<void>
}

const defaultData: OfflineData = {
  starredSessions: [],
  hotelComparisons: {},
  sessionNotes: {},
  userPreferences: {},
}

export const useOfflineStore = create<OfflineStore>((set, get) => ({
  data: defaultData,
  isOnline: typeof navigator !== "undefined" && navigator.onLine,

  setIsOnline: (online: boolean) => set({ isOnline: online }),

  addStarredSession: (sessionId: string) => {
    set((state) => {
      const newData = { ...state.data }
      if (!newData.starredSessions.includes(sessionId)) {
        newData.starredSessions.push(sessionId)
      }
      get().saveToStorage()
      return { data: newData }
    })
  },

  removeStarredSession: (sessionId: string) => {
    set((state) => {
      const newData = { ...state.data }
      newData.starredSessions = newData.starredSessions.filter((id) => id !== sessionId)
      get().saveToStorage()
      return { data: newData }
    })
  },

  addHotelComparison: (hotelId: string) => {
    set((state) => {
      const newData = { ...state.data }
      newData.hotelComparisons[hotelId] = true
      get().saveToStorage()
      return { data: newData }
    })
  },

  removeHotelComparison: (hotelId: string) => {
    set((state) => {
      const newData = { ...state.data }
      delete newData.hotelComparisons[hotelId]
      get().saveToStorage()
      return { data: newData }
    })
  },

  addSessionNote: (sessionId: string, note: string) => {
    set((state) => {
      const newData = { ...state.data }
      newData.sessionNotes[sessionId] = note
      get().saveToStorage()
      return { data: newData }
    })
  },

  removeSessionNote: (sessionId: string) => {
    set((state) => {
      const newData = { ...state.data }
      delete newData.sessionNotes[sessionId]
      get().saveToStorage()
      return { data: newData }
    })
  },

  setUserPreference: (key: string, value: unknown) => {
    set((state) => {
      const newData = { ...state.data }
      newData.userPreferences[key] = value
      get().saveToStorage()
      return { data: newData }
    })
  },

  loadFromStorage: () => {
    if (typeof window === "undefined") return

    try {
      const stored = localStorage.getItem("offline-data")
      if (stored) {
        const data = JSON.parse(stored) as OfflineData
        set({ data })
      }
    } catch (error) {
      console.error("[v0] Failed to load offline data:", error)
    }
  },

  saveToStorage: () => {
    if (typeof window === "undefined") return

    try {
      const { data } = get()
      localStorage.setItem("offline-data", JSON.stringify(data))
    } catch (error) {
      console.error("[v0] Failed to save offline data:", error)
    }
  },

  syncWithServer: async () => {
    try {
      const { data } = get()
      const response = await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      return response.json()
    } catch (error) {
      console.error("[v0] Sync failed:", error)
    }
  },
}))
