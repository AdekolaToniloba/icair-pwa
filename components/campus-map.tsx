"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation2, X } from "lucide-react";
import DirectionsButton from "./directions-button";

// Coordinates for University of Lagos
const UNILAG_MULTIPURPOSE_HALL = {
  lat: 6.5195,
  lng: 3.3989,
};

const UNILAG_FIRST_GATE = {
  lat: 6.5157,
  lng: 3.3962,
};

const UNILAG_SECOND_GATE = {
  lat: 6.522,
  lng: 3.4015,
};

interface CampusMapProps {
  className?: string;
}

export default function CampusMap({ className = "" }: CampusMapProps) {
  const [selectedGate, setSelectedGate] = useState<"first" | "second" | null>(
    null
  );
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    setTimeout(() => setMapLoaded(true), 500);
  }, []);

  const gates = [
    {
      id: "first",
      name: "First Gate (Main Entrance)",
      coords: UNILAG_FIRST_GATE,
      description: "Main entrance via Akoka",
      color: "#00A651",
    },
    {
      id: "second",
      name: "Second Gate",
      coords: UNILAG_SECOND_GATE,
      description: "Alternative entrance via Yaba",
      color: "#FDB913",
    },
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: mapLoaded ? 1 : 0, scale: mapLoaded ? 1 : 0.95 }}
        className="relative w-full h-[400px] bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-primary/20 overflow-hidden shadow-lg"
      >
        {/* Embedded Google Map */}
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952479827741!2d3.396794!3d6.519531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c3c5c9b7f3f%3A0x4c4f5c5c5c5c5c5c!2sMultipurpose%20Hall%2C%20University%20of%20Lagos!5e0!3m2!1sen!2sng!4v1635000000000!5m2!1sen!2sng`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />

        {/* Overlay with venue marker */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-primary rounded-full blur-xl"
          />
          <div className="relative bg-primary text-white p-3 rounded-full shadow-xl">
            <MapPin size={24} />
          </div>
        </motion.div>
      </motion.div>

      {/* Gate Selection Cards */}
      <div className="mt-6 space-y-3">
        <h3 className="text-lg font-bold text-foreground mb-3">
          Choose Your Entry Point
        </h3>
        {gates.map((gate, index) => (
          <motion.div
            key={gate.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.button
              onClick={() => setSelectedGate(gate.id as "first" | "second")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full p-4 rounded-xl border-2 transition-all
                ${
                  selectedGate === gate.id
                    ? "border-primary bg-primary/10 shadow-lg"
                    : "border-border bg-card hover:border-primary/50"
                }
              `}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{
                    rotate: selectedGate === gate.id ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ color: gate.color }}
                >
                  <Navigation2 size={24} />
                </motion.div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-foreground">{gate.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {gate.description}
                  </p>
                </div>
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Directions Modal */}
      <AnimatePresence>
        {selectedGate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setSelectedGate(null)}
          >
            <motion.div
              initial={{ y: "100%", scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: "100%", scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border-2 border-primary/30 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Get Directions
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Navigate to Multipurpose Hall
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedGate(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{
                      backgroundColor:
                        gates.find((g) => g.id === selectedGate)?.color ||
                        "#00A651",
                    }}
                  />
                  <p className="font-semibold text-foreground">
                    From: {gates.find((g) => g.id === selectedGate)?.name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <p className="font-semibold text-foreground">
                    To: Multipurpose Hall, UNILAG
                  </p>
                </div>
              </div>

              <DirectionsButton
                destination="Multipurpose Hall, University of Lagos, Nigeria"
                destinationCoords={UNILAG_MULTIPURPOSE_HALL}
                label="Open in Google Maps"
                className="w-full"
                variant="primary"
              />

              <p className="text-xs text-muted-foreground mt-4 text-center">
                This will open Google Maps with directions pre-filled
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 bg-secondary/10 border border-secondary/30 rounded-lg p-4"
      >
        <div className="flex items-start gap-3">
          <MapPin size={20} className="text-secondary shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-foreground">Venue Location</p>
            <p className="text-sm text-muted-foreground mt-1">
              Multipurpose Hall, University of Lagos
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              📍 Coordinates: {UNILAG_MULTIPURPOSE_HALL.lat}°N,{" "}
              {UNILAG_MULTIPURPOSE_HALL.lng}°E
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
