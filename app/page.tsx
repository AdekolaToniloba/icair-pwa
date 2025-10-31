"use client"

import type React from "react"

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import Header from "@/components/layout/header"
import BottomNav from "@/components/layout/bottom-nav"
import HomePage from "@/components/pages/home-page"
import SchedulePage from "@/components/pages/schedule-page"
import HotelsPage from "@/components/pages/hotels-page"
import MapPage from "@/components/pages/map-page"
import MorePage from "@/components/pages/more-page"
import TravelGuidePage from "@/components/pages/travel-guide-page"
import { UnifiedPageWrapper } from "@/components/unified-page-wrapper"

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="pb-20"
    >
      {children}
    </motion.div>
  )
}

function AppContent() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto" role="main" aria-live="polite" aria-label="Main content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <UnifiedPageWrapper>
                  <HomePage />
                </UnifiedPageWrapper>
              }
            />
            <Route
              path="/schedule"
              element={
                <UnifiedPageWrapper>
                  <SchedulePage />
                </UnifiedPageWrapper>
              }
            />
            <Route
              path="/hotels"
              element={
                <UnifiedPageWrapper>
                  <HotelsPage />
                </UnifiedPageWrapper>
              }
            />
            <Route
              path="/map"
              element={
                <UnifiedPageWrapper>
                  <MapPage />
                </UnifiedPageWrapper>
              }
            />
            <Route
              path="/more"
              element={
                <UnifiedPageWrapper>
                  <MorePage />
                </UnifiedPageWrapper>
              }
            />
            <Route
              path="/travel-guide"
              element={
                <UnifiedPageWrapper>
                  <TravelGuidePage />
                </UnifiedPageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <BottomNav />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}
