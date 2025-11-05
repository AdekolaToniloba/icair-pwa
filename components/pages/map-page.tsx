"use client";

import type React from "react";
import { motion } from "framer-motion";
import Venue3DMap from "@/components/venue-3d-map";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
    },
  },
};

export default function MapPage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col h-screen px-4 py-4 sm:px-6 pb-20"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex-shrink-0"
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          data-testid="map-title"
        >
          Venue Map
        </h2>
        <p className="text-sm text-muted-foreground">
          Interactive venue layout - tap spaces for details
        </p>
      </motion.div>

      {/* Venue Map - Full Height */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 min-h-0"
      >
        <Venue3DMap />
      </motion.div>
    </motion.div>
  );
}
