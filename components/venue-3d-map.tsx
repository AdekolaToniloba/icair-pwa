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
} from "lucide-react";

interface BoothSpace {
  id: string;
  name: string;
  type: "booth" | "stage" | "seating" | "refreshment" | "registration";
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  capacity?: number;
  features?: string[];
  currentActivity?: string;
}

const venueSpaces: BoothSpace[] = [
  {
    id: "stage",
    name: "Main Stage",
    type: "stage",
    x: 20,
    y: 20,
    width: 180,
    height: 80,
    color: "#00A651",
    capacity: 500,
    features: ["Audio System", "LED Screen", "Live Streaming"],
    currentActivity: "Keynote Presentation",
  },
  {
    id: "booth-1",
    name: "Sponsor Booth A",
    type: "booth",
    x: 220,
    y: 30,
    width: 100,
    height: 70,
    color: "#FDB913",
    features: ["Display Stand", "Demo Area"],
  },
  {
    id: "booth-2",
    name: "Sponsor Booth B",
    type: "booth",
    x: 340,
    y: 30,
    width: 100,
    height: 70,
    color: "#FDB913",
    features: ["Display Stand", "Demo Area"],
  },
  {
    id: "booth-3",
    name: "Sponsor Booth C",
    type: "booth",
    x: 460,
    y: 30,
    width: 100,
    height: 70,
    color: "#FDB913",
    features: ["Display Stand", "Demo Area"],
  },
  {
    id: "seating-1",
    name: "Seating Area 1",
    type: "seating",
    x: 20,
    y: 120,
    width: 140,
    height: 100,
    color: "#3B82F6",
    capacity: 150,
  },
  {
    id: "refreshment",
    name: "Refreshment Zone",
    type: "refreshment",
    x: 180,
    y: 120,
    width: 120,
    height: 80,
    color: "#F59E0B",
    features: ["Coffee Bar", "Snacks", "Water Station"],
  },
  {
    id: "seating-2",
    name: "Seating Area 2",
    type: "seating",
    x: 320,
    y: 120,
    width: 140,
    height: 100,
    color: "#3B82F6",
    capacity: 150,
  },
  {
    id: "registration",
    name: "Registration Desk",
    type: "registration",
    x: 480,
    y: 120,
    width: 80,
    height: 60,
    color: "#EF4444",
    features: ["Check-in", "Badge Printing", "Information"],
  },
];

const getIcon = (type: BoothSpace["type"]) => {
  switch (type) {
    case "stage":
      return Presentation;
    case "booth":
      return Users;
    case "seating":
      return Users;
    case "refreshment":
      return Coffee;
    case "registration":
      return Info;
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
    <div className="relative">
      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground">3D Venue Layout</h3>
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
        className="relative w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-primary/20 p-4 overflow-hidden shadow-lg"
      >
        {/* Perspective container for 3D effect */}
        <div
          className="overflow-auto max-h-[500px] rounded-lg"
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
              viewBox="0 0 580 260"
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
                height="260"
                fill="url(#floorGrad)"
                stroke="#D1D5DB"
                strokeWidth="2"
              />
              <rect width="580" height="260" fill="url(#grid)" opacity="0.5" />

              {/* Venue Spaces */}
              {venueSpaces.map((space) => {
                const Icon = getIcon(space.type);
                const isSelected = selectedSpace?.id === space.id;

                return (
                  <motion.g
                    key={space.id}
                    whileHover={{ opacity: 1 }}
                    style={{ cursor: "pointer", opacity: 0.9 }}
                    onClick={() => setSelectedSpace(space)}
                  >
                    {/* 3D effect - shadow/depth */}
                    <rect
                      x={space.x + 4}
                      y={space.y + 4}
                      width={space.width}
                      height={space.height}
                      fill="#000000"
                      opacity="0.15"
                      rx="4"
                    />

                    {/* Main space */}
                    <motion.rect
                      x={space.x}
                      y={space.y}
                      width={space.width}
                      height={space.height}
                      fill={space.color}
                      stroke={isSelected ? "#00A651" : "#9CA3AF"}
                      strokeWidth={isSelected ? "3" : "2"}
                      rx="4"
                      opacity={isSelected ? 1 : 0.85}
                      animate={
                        space.currentActivity
                          ? {
                              opacity: [0.85, 1, 0.85],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />

                    {/* Icon */}
                    <foreignObject
                      x={space.x + space.width / 2 - 12}
                      y={space.y + 10}
                      width="24"
                      height="24"
                    >
                      <div className="flex items-center justify-center text-white">
                        <Icon size={20} />
                      </div>
                    </foreignObject>

                    {/* Label */}
                    <text
                      x={space.x + space.width / 2}
                      y={space.y + space.height / 2 + 5}
                      textAnchor="middle"
                      className="text-xs font-bold fill-white"
                      style={{ pointerEvents: "none" }}
                    >
                      {space.name}
                    </text>

                    {/* Capacity or Activity indicator */}
                    <text
                      x={space.x + space.width / 2}
                      y={space.y + space.height - 15}
                      textAnchor="middle"
                      className="text-xs fill-white/80"
                      style={{ pointerEvents: "none" }}
                    >
                      {space.capacity
                        ? `${space.capacity} seats`
                        : space.currentActivity
                        ? "🔴 LIVE"
                        : ""}
                    </text>

                    {/* Pulse effect for active spaces */}
                    {space.currentActivity && (
                      <motion.circle
                        cx={space.x + space.width - 15}
                        cy={space.y + 15}
                        r="5"
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

              {/* Entrance/Exit markers */}
              <g>
                <rect
                  x="5"
                  y="110"
                  width="8"
                  height="40"
                  fill="#10B981"
                  rx="2"
                />
                <text
                  x="15"
                  y="135"
                  className="text-xs fill-green-600 font-bold"
                  transform="rotate(-90 15 135)"
                >
                  ENTRANCE
                </text>
              </g>

              <g>
                <rect
                  x="567"
                  y="110"
                  width="8"
                  height="40"
                  fill="#EF4444"
                  rx="2"
                />
                <text
                  x="565"
                  y="135"
                  className="text-xs fill-red-600 font-bold"
                  transform="rotate(90 565 135)"
                >
                  EXIT
                </text>
              </g>

              {/* WiFi Zone indicator */}
              <circle cx="290" cy="180" r="30" fill="#10B981" opacity="0.1" />
              <foreignObject x="278" y="168" width="24" height="24">
                <div className="text-green-600">
                  <Wifi size={24} />
                </div>
              </foreignObject>
            </svg>
          </motion.div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 flex flex-wrap gap-3 text-xs"
        >
          {[
            { color: "#00A651", label: "Stage" },
            { color: "#FDB913", label: "Booths" },
            { color: "#3B82F6", label: "Seating" },
            { color: "#F59E0B", label: "Refreshments" },
            { color: "#EF4444", label: "Registration" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground">{item.label}</span>
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
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
              {selectedSpace.capacity && (
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
        className="mt-4 bg-secondary/10 border border-secondary/30 rounded-lg p-4"
      >
        <div className="flex items-start gap-3">
          <Info size={18} className="text-secondary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                Interactive Controls:
              </span>{" "}
              Zoom, rotate, and click on any space to view details. Red pulsing
              indicators show live activities.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
