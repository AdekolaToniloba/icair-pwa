"use client"

import { motion } from "framer-motion"
import { CountdownTimer } from "@/components/countdown-timer"
import { WeatherWidget } from "@/components/weather-widget"
import { EmergencyFAB } from "@/components/emergency-fab"
import { QuickAccessCard } from "@/components/quick-access-card"
import { useEffect, useState } from "react"

const quickAccessItems = [
  { title: "Getting Here", emoji: "✈️", href: "/map" },
  { title: "Where to Stay", emoji: "🏨", href: "/hotels" },
  { title: "Venue Map", emoji: "🗺️", href: "/map" },
  { title: "Schedule", emoji: "📅", href: "/schedule" },
  { title: "Where to Eat", emoji: "🍽️", href: "/hotels" },
  { title: "Transport", emoji: "🚕", href: "/map" },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement
      setScrollY(target.scrollTop || 0)
    }

    const mainElement = document.querySelector("main")
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll)
      return () => mainElement.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const conferenceDate = new Date("2025-11-04T09:00:00")

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="px-4 py-6 sm:px-6 sm:py-8 space-y-6">
      {/* Hero Section with Parallax */}
      <motion.div
        variants={item}
        style={{
          y: scrollY * 0.5,
        }}
        className="relative"
      >
        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl p-8 text-white shadow-xl overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"
            animate={{
              x: [0, 20, -10, 0],
              y: [0, -15, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"
            animate={{
              x: [0, -15, 10, 0],
              y: [0, 20, -10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold mb-2"
              data-testid="hero-title"
            >
              Welcome to UNILAG
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/90 mb-6"
            >
              Nov 4-7, 2025 · Lagos, Nigeria
            </motion.p>

            {/* Countdown Timer */}
            <CountdownTimer targetDate={conferenceDate} />
          </div>
        </div>
      </motion.div>

      {/* Weather Widget */}
      <WeatherWidget />

      {/* Quick Access Grid */}
      <motion.div variants={item}>
        <h3 className="text-lg font-bold mb-4 text-foreground" data-testid="quick-access-title">
          Quick Access
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {quickAccessItems.map((item, idx) => (
            <QuickAccessCard
              key={`${item.title}-${idx}`}
              title={item.title}
              emoji={item.emoji}
              href={item.href}
              index={idx}
            />
          ))}
        </div>
      </motion.div>

      {/* Featured Updates Section */}
      <motion.div variants={item}>
        <h3 className="text-lg font-bold mb-4 text-foreground">Latest Updates</h3>
        <div className="space-y-3">
          {[
            {
              title: "Early Bird Registration",
              description: "Get 20% off for registrations before Oct 25",
              icon: "🎫",
            },
            {
              title: "Keynote Speakers Announced",
              description: "Join industry leaders for inspiring talks and discussions",
              icon: "🎤",
            },
            {
              title: "Conference Schedule Released",
              description: "Browse all sessions and plan your conference journey",
              icon: "📋",
            },
          ].map((update, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              whileHover={{ x: 4 }}
              className="bg-card p-4 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer group"
              data-testid={`update-card-${idx}`}
            >
              <div className="flex gap-4">
                <span className="text-2xl">{update.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {update.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{update.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Emergency FAB */}
      <EmergencyFAB />
    </motion.div>
  )
}
