"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Coffee,
  Presentation,
  Wifi,
  Info,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Star,
  MapPin,
} from "lucide-react";

interface BoothSpace {
  id: string;
  name: string;
  type:
    | "booth"
    | "stage"
    | "seating"
    | "refreshment"
    | "registration"
    | "walkway"
    | "vip"
    | "poster"
    | "vendor"
    | "toilet"
    | "mainhall";
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  capacity?: number;
  features?: string[];
  currentActivity?: string;
}

/**
 * Updated coordinates with better spacing:
 * - Narrower walkway (100px width instead of 140px)
 * - Better separated bottom sections
 * - Improved readability
 */
const venueSpaces: BoothSpace[] = [
  // Top Left - Registration Booth (Entrance area)
  {
    id: "registration",
    name: "Registration",
    type: "registration",
    x: 20,
    y: 20,
    width: 120,
    height: 60,
    color: "#EF4444",
    features: ["Check-in", "Badge Printing", "Information"],
  },

  // Top Right - Vendors area
  {
    id: "vendors",
    name: "Vendors",
    type: "vendor",
    x: 440,
    y: 20,
    width: 120,
    height: 60,
    color: "#06b6d4",
    features: ["Sponsor booths", "Merch", "Stalls"],
  },

  // Left — Exhibition (top)
  {
    id: "exhibition-left-top",
    name: "Exhibition",
    type: "booth",
    x: 20,
    y: 100,
    width: 140,
    height: 80,
    color: "#FDB913",
    features: ["Displays", "Demos"],
  },

  // Left — Exhibition (bottom)
  {
    id: "exhibition-left-bottom",
    name: "Exhibition",
    type: "booth",
    x: 20,
    y: 200,
    width: 140,
    height: 80,
    color: "#FDB913",
    features: ["Multiple exhibitors"],
  },

  // Right — Exhibition (top) - ADJUSTED POSITION
  {
    id: "exhibition-right-top",
    name: "Exhibition",
    type: "booth",
    x: 340,
    y: 100,
    width: 220,
    height: 80,
    color: "#FDB913",
    features: ["Partners", "Demos"],
  },

  // Right — Exhibition (bottom) - ADJUSTED POSITION
  {
    id: "exhibition-right-bottom",
    name: "Exhibition",
    type: "booth",
    x: 340,
    y: 200,
    width: 220,
    height: 80,
    color: "#FDB913",
    features: ["Partner showcases"],
  },

  // Center - Main Walkway - NARROWER WIDTH
  {
    id: "walkway",
    name: "Walkway",
    type: "walkway",
    x: 180,
    y: 90,
    width: 140,
    height: 200,
    color: "#E5E7EB",
  },

  // Bottom Left - Poster area - BETTER SPACING
  {
    id: "posters",
    name: "Posters",
    type: "poster",
    x: 20,
    y: 300,
    width: 140,
    height: 50,
    color: "#fff7ed",
    features: ["Research Boards", "Presentations"],
  },

  // Bottom Right - VIP Section - BETTER SPACING
  {
    id: "vip",
    name: "VIP",
    type: "vip",
    x: 420,
    y: 300,
    width: 140,
    height: 50,
    color: "#fff1f2",
    features: ["Reserved seating", "VIP access"],
  },

  // Bottom Center - Main Hall - MORE HEIGHT
  {
    id: "main-hall",
    name: "Main Hall",
    type: "mainhall",
    x: 180,
    y: 305,
    width: 220,
    height: 90,
    color: "#00A651",
    features: ["Main Screen", "Audio System", "Stage"],
    currentActivity: "Conference Sessions",
  },

  // Bottom left — Toilets/Exits - REPOSITIONED
  {
    id: "toilets",
    name: "Toilets",
    type: "toilet",
    x: 20,
    y: 365,
    width: 140,
    height: 30,
    color: "#6b7280",
    features: ["Restrooms", "Emergency exit"],
  },
];

const getIcon = (type: BoothSpace["type"]) => {
  switch (type) {
    case "stage":
    case "mainhall":
      return Presentation;
    case "booth":
      return Users;
    case "seating":
      return Users;
    case "refreshment":
      return Coffee;
    case "registration":
      return Info;
    case "walkway":
      return MapPin;
    case "vip":
      return Star;
    case "poster":
      return MapPin;
    case "vendor":
      return MapPin;
    case "toilet":
      return Users;
    default:
      return Info;
  }
};

export default function Venue3DMap() {
  const [selectedSpace, setSelectedSpace] = useState<BoothSpace | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoom = (direction: "in" | "out") => {
    setZoom((prev) => {
      if (direction === "in") return Math.min(prev + 0.15, 1.8);
      return Math.max(prev - 0.15, 0.7);
    });
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div className="relative h-full flex flex-col">
      {/* Controls */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className="text-lg font-bold text-foreground">ICAIR Venue</h3>
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleZoom("in")}
            className="bg-card border border-border hover:border-primary/50 p-2 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={18} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleZoom("out")}
            className="bg-card border border-border hover:border-primary/50 p-2 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={18} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9, rotate: -90 }}
            onClick={handleRotate}
            className="bg-card border border-border hover:border-primary/50 p-2 rounded-lg transition-colors"
            title="Rotate View"
          >
            <RotateCcw size={18} />
          </motion.button>
        </div>
      </div>

      {/* 3D Venue Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full flex-1 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-primary/20 p-4 overflow-hidden shadow-lg flex flex-col min-h-0"
      >
        {/* Perspective container for 3D effect */}
        <div
          className="flex-1 overflow-auto rounded-lg"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            animate={{ rotateZ: rotation }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center",
            }}
            className="relative mx-auto"
          >
            <svg
              viewBox="0 0 580 410"
              className="w-full h-auto"
              style={{ minWidth: "580px" }}
            >
              {/* Floor */}
              <defs>
                <pattern
                  id="grid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="0.5"
                  />
                </pattern>
                <linearGradient
                  id="floorGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#F8F9FA" />
                  <stop offset="100%" stopColor="#E9ECEF" />
                </linearGradient>
              </defs>

              <rect
                width="580"
                height="410"
                fill="url(#floorGrad)"
                stroke="#D1D5DB"
                strokeWidth="2"
              />
              <rect width="580" height="410" fill="url(#grid)" opacity="0.5" />

              {/* Venue Spaces */}
              {venueSpaces.map((space) => {
                const Icon = getIcon(space.type);
                const isSelected = selectedSpace?.id === space.id;
                const isWalkway = space.type === "walkway";

                return (
                  <motion.g
                    key={space.id}
                    whileHover={{ opacity: isWalkway ? 0.6 : 1 }}
                    style={{
                      cursor: isWalkway ? "default" : "pointer",
                      opacity: isWalkway ? 0.3 : 0.95,
                    }}
                    onClick={() => !isWalkway && setSelectedSpace(space)}
                  >
                    {/* 3D effect - shadow/depth */}
                    {!isWalkway && (
                      <rect
                        x={space.x + 4}
                        y={space.y + 4}
                        width={space.width}
                        height={space.height}
                        fill="#000000"
                        opacity="0.12"
                        rx="6"
                      />
                    )}

                    {/* Main space */}
                    <motion.rect
                      x={space.x}
                      y={space.y}
                      width={space.width}
                      height={space.height}
                      fill={space.color}
                      stroke={
                        isSelected
                          ? "#00A651"
                          : isWalkway
                          ? "#9CA3AF"
                          : "#9CA3AF"
                      }
                      strokeWidth={isSelected ? "3" : isWalkway ? "1" : "2"}
                      strokeDasharray={isWalkway ? "5,5" : "0"}
                      rx="8"
                      opacity={isSelected ? 1 : isWalkway ? 0.35 : 0.95}
                      animate={
                        space.currentActivity
                          ? {
                              opacity: [0.9, 1, 0.9],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />

                    {/* Icon - only for non-walkway spaces */}
                    {!isWalkway && (
                      <foreignObject
                        x={space.x + space.width / 2 - 14}
                        y={space.y + 8}
                        width="28"
                        height="28"
                      >
                        <div className="flex items-center justify-center text-white drop-shadow-lg">
                          <Icon size={22} strokeWidth={2.5} />
                        </div>
                      </foreignObject>
                    )}

                    {/* Label - IMPROVED READABILITY */}
                    <text
                      x={space.x + space.width / 2}
                      y={space.y + space.height / 2 + 8}
                      textAnchor="middle"
                      className={`font-bold drop-shadow ${
                        isWalkway
                          ? "fill-gray-400 text-xs"
                          : "fill-white text-sm"
                      }`}
                      style={{
                        pointerEvents: "none",
                        paintOrder: "stroke fill",
                        stroke: isWalkway ? "none" : "rgba(0,0,0,0.3)",
                        strokeWidth: isWalkway ? "0" : "0.5px",
                      }}
                    >
                      {space.name}
                    </text>

                    {/* Capacity or Activity indicator */}
                    {!isWalkway && space.height > 45 && (
                      <text
                        x={space.x + space.width / 2}
                        y={space.y + space.height - 14}
                        textAnchor="middle"
                        className="text-[10px] fill-white/90 font-semibold drop-shadow"
                        style={{
                          pointerEvents: "none",
                          paintOrder: "stroke fill",
                          stroke: "rgba(0,0,0,0.3)",
                          strokeWidth: "0.5px",
                        }}
                      >
                        {space.capacity
                          ? `${space.capacity} seats`
                          : space.currentActivity
                          ? "🔴 LIVE"
                          : ""}
                      </text>
                    )}

                    {/* Pulse effect for active spaces */}
                    {space.currentActivity && (
                      <motion.circle
                        cx={space.x + space.width - 18}
                        cy={space.y + 16}
                        r="6"
                        fill="#EF4444"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      />
                    )}
                  </motion.g>
                );
              })}

              {/* Entrance marker (top left near registration) */}
              <g>
                {/* <rect
                  x="5"
                  y="30"
                  width="8"
                  height="40"
                  fill="#10B981"
                  rx="2"
                /> */}
                <text
                  x="-15"
                  y="55"
                  className="text-[4px] fill-green-600 font-bold"
                  transform="rotate(-90 15 55)"
                >
                  Entrance
                </text>
              </g>

              {/* Exit marker (bottom left near toilets) */}
              <g>
                {/* <rect
                  x="5"
                  y="365"
                  width="8"
                  height="30"
                  fill="#EF4444"
                  rx="2"
                /> */}
                <text
                  x="15"
                  y="382"
                  className="text-[10px] fill-red-600 font-bold"
                  transform="rotate(-90 15 382)"
                >
                  EXIT
                </text>
              </g>

              {/* VIP Zone indicator */}
              <g>
                <circle cx={490} cy={325} r={18} fill="#FEE2E2" opacity={0.6} />
                <foreignObject x={483} y={313} width={26} height={26}>
                  <div className="text-pink-600">
                    <Star size={18} />
                  </div>
                </foreignObject>
              </g>
            </svg>
          </motion.div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-3 flex flex-wrap gap-2 text-[10px] flex-shrink-0"
        >
          {[
            { color: "#00A651", label: "Main Hall" },
            { color: "#FDB913", label: "Exhibition" },
            { color: "#fff1f2", label: "VIP" },
            { color: "#EF4444", label: "Registration" },
            { color: "#fff7ed", label: "Posters" },
            { color: "#06b6d4", label: "Vendors" },
            { color: "#6b7280", label: "Toilets" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Space Details Modal */}
      <AnimatePresence>
        {selectedSpace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 pb-24"
            onClick={() => setSelectedSpace(null)}
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
                <div className="flex items-center gap-3">
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: `${selectedSpace.color}20`,
                      color: selectedSpace.color,
                    }}
                  >
                    {(() => {
                      const Icon = getIcon(selectedSpace.type);
                      return <Icon size={24} />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {selectedSpace.name}
                    </h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {selectedSpace.type}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedSpace(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Current Activity */}
              {selectedSpace.currentActivity && (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4 mb-4"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      className="w-2 h-2 bg-red-500 rounded-full"
                    />
                    <p className="text-xs font-bold text-red-700 uppercase">
                      Live Now
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-red-900">
                    {selectedSpace.currentActivity}
                  </p>
                </motion.div>
              )}

              {/* Capacity */}
              {selectedSpace.capacity && selectedSpace.capacity > 0 && (
                <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3 mb-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Capacity:
                    </span>{" "}
                    {selectedSpace.capacity} people
                  </p>
                </div>
              )}

              {/* Features */}
              {selectedSpace.features && selectedSpace.features.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Features:
                  </p>
                  <ul className="space-y-2">
                    {selectedSpace.features.map((feature, index) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: selectedSpace.color }}
                        />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-3 bg-secondary/10 border border-secondary/30 rounded-lg p-3 flex-shrink-0"
      >
        <div className="flex items-start gap-2">
          <Info size={16} className="text-secondary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Tap spaces</span> to
            view details. Use zoom and rotate controls above.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
