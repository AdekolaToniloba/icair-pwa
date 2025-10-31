import { create } from "zustand"

interface AppState {
  showEmergencyContacts: boolean
  setShowEmergencyContacts: (show: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  showEmergencyContacts: false,
  setShowEmergencyContacts: (show) => set({ showEmergencyContacts: show }),
}))
