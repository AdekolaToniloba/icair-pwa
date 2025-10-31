"use client"

import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

interface QuickAccessCardProps {
  title: string
  emoji: string
  href: string
  index: number
}

export function QuickAccessCard({ title, emoji, href, index }: QuickAccessCardProps) {
  const navigate = useNavigate()

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
      }}
      whileHover={{ translateY: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(href)}
      className="w-full bg-card border border-border rounded-xl p-4 text-center hover:border-primary/50 hover:shadow-md transition-all active:scale-95"
      data-testid={`quick-access-${title}`}
    >
      <motion.div
        className="text-3xl mb-2"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          delay: index * 0.2,
        }}
      >
        {emoji}
      </motion.div>
      <p className="text-sm font-semibold text-foreground">{title}</p>
    </motion.button>
  )
}
