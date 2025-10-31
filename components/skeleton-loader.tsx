"use client"

import { motion } from "framer-motion"

interface SkeletonProps {
  className?: string
  count?: number
}

export function SkeletonCard({ className = "" }: SkeletonProps) {
  return (
    <div className={`bg-muted rounded-lg overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-muted via-muted-foreground/10 to-muted"
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
        }}
        style={{
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  )
}

export function SkeletonText({ className = "", count = 1 }: SkeletonProps) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} className={`h-4 ${className}`} />
      ))}
    </div>
  )
}

export function SkeletonCardContainer() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-card p-4 rounded-lg border border-border space-y-3">
          <div className="flex gap-3">
            <SkeletonCard className="w-12 h-12 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <SkeletonCard className="h-4 w-3/4" />
              <SkeletonCard className="h-3 w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} className="h-32 rounded-lg" />
      ))}
    </div>
  )
}
