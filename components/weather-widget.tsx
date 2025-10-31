"use client"

import { Cloud } from "lucide-react"
import { motion } from "framer-motion"

export function WeatherWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-200 flex items-center gap-4"
      data-testid="weather-widget"
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        className="text-blue-500"
      >
        <Cloud size={32} />
      </motion.div>
      <div className="flex-1">
        <p className="font-semibold text-foreground">Lagos Weather</p>
        <p className="text-sm text-muted-foreground">28°C, Partly Cloudy</p>
      </div>
    </motion.div>
  )
}
