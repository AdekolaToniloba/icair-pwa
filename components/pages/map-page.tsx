"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  Navigation,
  Info,
  Utensils,
  Wifi,
  AlertCircle,
  Phone,
  ChevronDown,
  ZoomIn,
  ZoomOut,
} from "lucide-react"

interface PointOfInterest {
  id: string
  name: string
  icon: React.ElementType
  color: string
  description: string
}

interface Room {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  capacity: number
  currentSession?: string
  nextSession?: string
}

const pointsOfInterest: PointOfInterest[] = [
  {
    id: "restrooms",
    name: "Restrooms",
    icon: AlertCircle,
    color: "#EF4444",
    description: "Located on each floor near main corridors",
  },
  {
    id: "food",
    name: "Food Courts",
    icon: Utensils,
    color: "#F59E0B",
    description: "Main cafeteria and snack stations",
  },
  {
    id: "atm",
    name: "ATMs",
    icon: Phone,
    color: "#3B82F6",
    description: "24/7 ATM services available",
  },
  {
    id: "wifi",
    name: "WiFi Zones",
    icon: Wifi,
    color: "#10B981",
    description: "Free WiFi access throughout campus",
  },
]

const rooms: Room[] = [
  {
    id: "room-101",
    name: "Main Hall",
    x: 20,
    y: 30,
    width: 160,
    height: 100,
    capacity: 500,
    currentSession: "Keynote: The Future of Tech",
    nextSession: "Lunch Break",
  },
  {
    id: "room-102",
    name: "Conference Room A",
    x: 220,
    y: 30,
    width: 120,
    height: 80,
    capacity: 150,
    currentSession: "Workshop: AI & ML",
  },
  {
    id: "room-103",
    name: "Conference Room B",
    x: 380,
    y: 30,
    width: 120,
    height: 80,
    capacity: 120,
    nextSession: "Q&A Session",
  },
  {
    id: "room-104",
    name: "Breakout Room 1",
    x: 220,
    y: 140,
    width: 100,
    height: 70,
    capacity: 50,
  },
  {
    id: "room-105",
    name: "Breakout Room 2",
    x: 360,
    y: 140,
    width: 100,
    height: 70,
    capacity: 50,
    currentSession: "Networking Session",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function MapPage() {
  const [activeTab, setActiveTab] = useState<"campus" | "floor">("campus")
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [expandedPOI, setExpandedPOI] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)

  const handleZoom = (direction: "in" | "out") => {
    setZoom((prev) => {
      if (direction === "in") return Math.min(prev + 0.2, 2)
      return Math.max(prev - 0.2, 0.6)
    })
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="px-4 py-6 sm:px-6 sm:py-8 pb-24">
      <h2 className="text-2xl font-bold mb-6 text-foreground" data-testid="map-title">
        Venue Navigation
      </h2>

      {/* Tab Navigation */}
      <motion.div variants={item} className="flex gap-3 mb-6">
        {[
          { id: "campus", label: "Campus Map", icon: MapPin },
          { id: "floor", label: "Floor Plan", icon: Navigation },
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "campus" | "floor")}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-primary text-white shadow-lg"
                : "bg-card border border-border text-foreground hover:border-primary/50"
            }`}
            data-testid={`tab-${tab.id}`}
          >
            <tab.icon size={18} />
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Campus Map View */}
      <AnimatePresence mode="wait">
        {activeTab === "campus" && (
          <motion.div
            key="campus"
            variants={item}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6"
            data-testid="venue-map"
          >
            <div className="relative w-full bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border-2 border-primary/20 p-4 overflow-hidden">
              <svg viewBox="0 0 500 400" className="w-full h-auto" style={{ aspectRatio: "5/4" }}>
                {/* Background */}
                <defs>
                  <linearGradient id="campusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F0FDF4" />
                    <stop offset="100%" stopColor="#E0F2FE" />
                  </linearGradient>
                </defs>
                <rect width="500" height="400" fill="url(#campusGrad)" />

                {/* Campus buildings/zones */}
                <motion.g
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  {/* Main Venue */}
                  <rect x="50" y="50" width="150" height="120" fill="#00A651" opacity="0.2" rx="8" />
                  <text x="125" y="115" textAnchor="middle" className="text-sm font-bold fill-primary">
                    Conference Venue
                  </text>

                  {/* Hotels Zone */}
                  <rect x="280" y="60" width="140" height="100" fill="#FDB913" opacity="0.2" rx="8" />
                  <text x="350" y="120" textAnchor="middle" className="text-sm font-bold fill-yellow-600">
                    Hotels Zone
                  </text>

                  {/* Restaurants */}
                  <circle cx="80" cy="250" r="40" fill="#F59E0B" opacity="0.2" />
                  <text x="80" y="260" textAnchor="middle" className="text-xs font-bold fill-orange-600">
                    Restaurants
                  </text>

                  {/* Parking */}
                  <rect x="280" y="230" width="100" height="80" fill="#6B7280" opacity="0.2" rx="8" />
                  <text x="330" y="280" textAnchor="middle" className="text-xs font-bold fill-gray-600">
                    Parking
                  </text>

                  {/* ATMs */}
                  <circle cx="420" cy="200" r="35" fill="#3B82F6" opacity="0.2" />
                  <text x="420" y="210" textAnchor="middle" className="text-xs font-bold fill-blue-600">
                    ATMs
                  </text>
                </motion.g>

                {/* Current Location */}
                <motion.g
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <circle cx="250" cy="200" r="8" fill="#00A651" opacity="0.8" />
                  <circle cx="250" cy="200" r="12" fill="none" stroke="#00A651" strokeWidth="2" opacity="0.4" />
                </motion.g>
              </svg>

              {/* Campus Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4"
              >
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Campus Coordinates:</span> 6.5195°N, 3.3989°E
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  You are currently viewing the Unilag campus map. Tap on zones for more details.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Floor Plan View */}
        {activeTab === "floor" && (
          <motion.div
            key="floor"
            variants={item}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6"
            data-testid="floor-plan"
          >
            <div className="relative w-full bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-primary/20 p-4 overflow-hidden">
              {/* Zoom Controls */}
              <div className="absolute top-6 right-6 z-10 flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleZoom("in")}
                  className="bg-primary text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  data-testid="zoom-in-btn"
                >
                  <ZoomIn size={20} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleZoom("out")}
                  className="bg-primary text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  data-testid="zoom-out-btn"
                >
                  <ZoomOut size={20} />
                </motion.button>
              </div>

              {/* Floor Plan SVG */}
              <div className="overflow-auto max-h-96 rounded-lg">
                <svg
                  viewBox="0 0 520 260"
                  className="w-full h-auto"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: "top left",
                    minWidth: `${100 * zoom}%`,
                  }}
                >
                  {/* Floor background */}
                  <rect width="520" height="260" fill="#F8F9FA" stroke="#D1D5DB" strokeWidth="2" />

                  {rooms.map((room) => (
                    <motion.g
                      key={room.id}
                      whileHover={{ opacity: 1 }}
                      style={{ opacity: 0.8, cursor: "pointer" }}
                      onClick={() => setSelectedRoom(room)}
                    >
                      <rect
                        x={room.x}
                        y={room.y}
                        width={room.width}
                        height={room.height}
                        fill={room.currentSession ? "#10B981" : "#E5E7EB"}
                        stroke={selectedRoom?.id === room.id ? "#00A651" : "#9CA3AF"}
                        strokeWidth={selectedRoom?.id === room.id ? "3" : "2"}
                        rx="4"
                      />
                      <text
                        x={room.x + room.width / 2}
                        y={room.y + room.height / 2 - 10}
                        textAnchor="middle"
                        className="text-xs font-bold fill-gray-700"
                      >
                        {room.name}
                      </text>
                      <text
                        x={room.x + room.width / 2}
                        y={room.y + room.height / 2 + 10}
                        textAnchor="middle"
                        className="text-xs fill-gray-600"
                      >
                        {room.capacity} capacity
                      </text>
                    </motion.g>
                  ))}

                  {/* Emergency Exits (red) */}
                  <circle cx="30" cy="30" r="6" fill="#EF4444" />
                  <text x="40" y="35" className="text-xs fill-red-600 font-semibold">
                    Emergency Exit
                  </text>

                  {/* Accessibility Paths (blue) */}
                  <line x1="400" y1="10" x2="480" y2="10" stroke="#3B82F6" strokeWidth="4" />
                  <text x="400" y="28" className="text-xs fill-blue-600 font-semibold">
                    Accessibility Path
                  </text>
                </svg>
              </div>

              {/* Room Details */}
              <AnimatePresence>
                {selectedRoom && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-4 bg-card border-2 border-primary/30 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-foreground text-lg">{selectedRoom.name}</h3>
                        <p className="text-sm text-muted-foreground">Capacity: {selectedRoom.capacity} people</p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedRoom(null)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        ✕
                      </motion.button>
                    </div>

                    {selectedRoom.currentSession && (
                      <div className="bg-green-50 border border-green-200 rounded p-3 mb-3">
                        <p className="text-xs font-semibold text-green-700">CURRENTLY IN SESSION</p>
                        <p className="text-sm text-green-600">{selectedRoom.currentSession}</p>
                      </div>
                    )}

                    {selectedRoom.nextSession && (
                      <div className="bg-blue-50 border border-blue-200 rounded p-3">
                        <p className="text-xs font-semibold text-blue-700">NEXT SESSION</p>
                        <p className="text-sm text-blue-600">{selectedRoom.nextSession}</p>
                      </div>
                    )}

                    {!selectedRoom.currentSession && !selectedRoom.nextSession && (
                      <p className="text-sm text-muted-foreground italic">No sessions scheduled at this time.</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Points of Interest Sidebar */}
      <motion.div variants={item} className="mt-6">
        <h3 className="text-lg font-bold mb-4 text-foreground">Points of Interest</h3>
        <div className="space-y-3">
          {pointsOfInterest.map((poi) => {
            const Icon = poi.icon
            const isExpanded = expandedPOI === poi.id

            return (
              <motion.div
                key={poi.id}
                layout
                onClick={() => setExpandedPOI(isExpanded ? null : poi.id)}
                className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                data-testid={`poi-${poi.id}`}
              >
                <motion.div layout className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div animate={{ scale: isExpanded ? 1.1 : 1 }} style={{ color: poi.color }}>
                      <Icon size={24} />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-foreground">{poi.name}</p>
                      {!isExpanded && <p className="text-xs text-muted-foreground">{poi.description}</p>}
                    </div>
                  </div>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={20} className="text-muted-foreground" />
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-4 border-t border-border"
                    >
                      <p className="text-sm text-muted-foreground">{poi.description}</p>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="mt-3 w-full bg-primary/10 hover:bg-primary/20 text-primary font-semibold py-2 rounded-lg transition-colors"
                        data-testid={`poi-navigate-${poi.id}`}
                      >
                        Get Directions
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Info Box */}
      <motion.div
        variants={item}
        className="mt-6 bg-secondary/10 border border-secondary/30 rounded-lg p-4 flex gap-3"
        data-testid="map-info"
      >
        <Info size={20} className="text-secondary flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-foreground">Pro Tips</p>
          <ul className="text-sm text-muted-foreground mt-2 space-y-1">
            <li>• Use zoom controls to get a better view of the floor plan</li>
            <li>• Click on rooms to see current and upcoming sessions</li>
            <li>• Tap POI cards to get detailed information and directions</li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}
