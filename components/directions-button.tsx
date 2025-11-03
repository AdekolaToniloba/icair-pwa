"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Navigation } from "lucide-react";

interface DirectionsButtonProps {
  destination: string;
  destinationCoords?: { lat: number; lng: number };
  label?: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

export default function DirectionsButton({
  destination,
  destinationCoords,
  label = "Get Directions",
  className = "",
  variant = "primary",
}: DirectionsButtonProps) {
  const handleGetDirections = () => {
    // If coordinates are provided, use them for more accurate directions
    const query = destinationCoords
      ? `${destinationCoords.lat},${destinationCoords.lng}`
      : encodeURIComponent(destination);

    // Check if user is on mobile to open native app
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Try to open native Google Maps app first
      const mapsUrl = `comgooglemaps://?q=${query}&center=${destinationCoords?.lat},${destinationCoords?.lng}`;
      const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

      // Try native app first, fallback to web
      window.location.href = mapsUrl;
      setTimeout(() => {
        window.open(fallbackUrl, "_blank");
      }, 500);
    } else {
      // Desktop: Open in new tab
      const url = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
      window.open(url, "_blank");
    }
  };

  const variantClasses = {
    primary:
      "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
  };

  return (
    <motion.button
      onClick={handleGetDirections}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        flex items-center justify-center gap-2 px-6 py-3 rounded-lg 
        font-semibold transition-all duration-200
        ${variantClasses[variant]}
        ${className}
      `}
    >
      <Navigation size={20} className="animate-pulse" />
      {label}
    </motion.button>
  );
}
