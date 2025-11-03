"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Building2,
  Info,
  ChevronDown,
  Navigation,
  Utensils,
  Wifi,
  AlertCircle,
  Phone,
} from "lucide-react";
import CampusMap from "@/components/campus-map";

import Venue3DMap from "@/components/venue-3d-map";

interface PointOfInterest {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
  details: string;
}

const pointsOfInterest: PointOfInterest[] = [
  {
    id: "restrooms",
    name: "Restrooms",
    icon: AlertCircle,
    color: "#EF4444",
    description: "Located on each floor near main corridors",
    details:
      "Modern facilities available on ground floor and first floor. Accessible restrooms near the registration area.",
  },
  {
    id: "food",
    name: "Food Courts",
    icon: Utensils,
    color: "#F59E0B",
    description: "Main cafeteria and snack stations",
    details:
      "Full-service cafeteria offering local and international cuisine. Quick snack stations available throughout the venue. Refreshment zone with complimentary drinks and light snacks.",
  },
  {
    id: "atm",
    name: "ATMs",
    icon: Phone,
    color: "#3B82F6",
    description: "24/7 ATM services available",
    details:
      "Multiple ATM locations: Main entrance, near cafeteria, and second gate. Support for all major Nigerian banks and international cards.",
  },
  {
    id: "wifi",
    name: "WiFi Zones",
    icon: Wifi,
    color: "#10B981",
    description: "Free WiFi access throughout campus",
    details:
      "High-speed WiFi available throughout the venue. Network: UNILAG-Conference | Password: Provided at registration. Dedicated zones with boosted signal for video calls and streaming.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function MapPage() {
  const [activeTab, setActiveTab] = useState<"campus" | "venue">("campus");
  const [expandedPOI, setExpandedPOI] = useState<string | null>(null);

  const tabs = [
    {
      id: "campus",
      label: "Campus Map",
      icon: MapPin,
      description: "Navigate to venue",
    },
    {
      id: "venue",
      label: "Venue Layout",
      icon: Building2,
      description: "3D floor plan",
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="px-4 py-6 sm:px-6 sm:py-8 pb-24"
    >
      {/* Header with floating animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2
          className="text-2xl sm:text-3xl font-bold mb-2 text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          data-testid="map-title"
        >
          Venue Navigation
        </h2>
        <p className="text-sm text-muted-foreground">
          Interactive maps and directions to the conference venue
        </p>
      </motion.div>

      {/* Enhanced Tab Navigation */}
      <motion.div variants={item} className="mb-6">
        <div className="grid grid-cols-2 gap-3">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "campus" | "venue")}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative overflow-hidden rounded-xl p-4 transition-all duration-300
                ${
                  activeTab === tab.id
                    ? "bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg shadow-primary/30"
                    : "bg-card border-2 border-border text-foreground hover:border-primary/50 hover:shadow-md"
                }
              `}
              data-testid={`tab-${tab.id}`}
            >
              {/* Animated background gradient */}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              )}

              <div className="relative flex flex-col items-center gap-2">
                <motion.div
                  animate={
                    activeTab === tab.id
                      ? {
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  <tab.icon size={24} strokeWidth={2.5} />
                </motion.div>
                <div className="text-center">
                  <p className="font-semibold text-sm">{tab.label}</p>
                  <p
                    className={`text-xs mt-0.5 ${
                      activeTab === tab.id
                        ? "text-white/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {tab.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Map Views with smooth transitions */}
      <AnimatePresence mode="wait">
        {activeTab === "campus" && (
          <motion.div
            key="campus"
            variants={item}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            data-testid="campus-map-view"
          >
            <CampusMap />
          </motion.div>
        )}

        {activeTab === "venue" && (
          <motion.div
            key="venue"
            variants={item}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            data-testid="venue-map-view"
          >
            <Venue3DMap />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Points of Interest with enhanced animations */}
      <motion.div variants={item} className="mt-8">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-lg font-bold mb-4 text-foreground flex items-center gap-2"
        >
          <Info size={20} className="text-primary" />
          Points of Interest
        </motion.h3>
        <div className="space-y-3">
          {pointsOfInterest.map((poi, index) => {
            const Icon = poi.icon;
            const isExpanded = expandedPOI === poi.id;

            return (
              <motion.div
                key={poi.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                layout
                onClick={() => setExpandedPOI(isExpanded ? null : poi.id)}
                className="bg-card border-2 border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                data-testid={`poi-${poi.id}`}
              >
                <motion.div
                  layout
                  className="p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <motion.div
                      animate={{
                        scale: isExpanded ? 1.15 : 1,
                        rotate: isExpanded ? [0, 10, -10, 0] : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor: `${poi.color}15`,
                        color: poi.color,
                      }}
                    >
                      <Icon size={24} strokeWidth={2.5} />
                    </motion.div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">
                        {poi.name}
                      </p>
                      {!isExpanded && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {poi.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="shrink-0"
                  >
                    <ChevronDown size={20} className="text-muted-foreground" />
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border"
                    >
                      <div className="p-4 bg-secondary/5">
                        <p className="text-sm text-muted-foreground mb-4">
                          {poi.details}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                          data-testid={`poi-navigate-${poi.id}`}
                        >
                          <Navigation size={18} />
                          Get Directions
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Enhanced Pro Tips */}
      <motion.div
        variants={item}
        className="mt-8 bg-gradient-to-br from-secondary/10 to-primary/5 border-2 border-secondary/30 rounded-xl p-5 shadow-md"
        data-testid="map-info"
      >
        <div className="flex gap-4">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
            }}
            className="shrink-0"
          >
            <Info size={24} className="text-secondary" />
          </motion.div>
          <div>
            <p className="font-bold text-foreground mb-2">Navigation Tips</p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-2"
              >
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>
                  Use the <strong>Campus Map</strong> tab to get directions from
                  either gate
                </span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-2"
              >
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>
                  View the <strong>3D Venue Layout</strong> to see booth
                  locations and seating
                </span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-2"
              >
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>
                  Tap on any venue space to see live activities and features
                </span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-2"
              >
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>
                  Expand <strong>Points of Interest</strong> for detailed
                  information
                </span>
              </motion.li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Floating help button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 bg-gradient-to-br from-primary to-primary/80 text-white p-4 rounded-full shadow-xl z-40 hover:shadow-2xl transition-shadow"
        title="Help"
      >
        <Info size={24} />
      </motion.button>
    </motion.div>
  );
}
