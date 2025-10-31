"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { RefreshCw } from "lucide-react"

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const touchStartY = useRef(0)
  const scrollElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (scrollElement.current?.scrollTop === 0) {
        touchStartY.current = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (scrollElement.current?.scrollTop === 0 && touchStartY.current) {
        const distance = e.touches[0].clientY - touchStartY.current
        if (distance > 0) {
          setPullDistance(Math.min(distance, 100))
        }
      }
    }

    const handleTouchEnd = async () => {
      if (pullDistance > 60 && !isRefreshing) {
        setIsRefreshing(true)
        try {
          await onRefresh()
        } finally {
          setIsRefreshing(false)
        }
      }
      setPullDistance(0)
      touchStartY.current = 0
    }

    const element = scrollElement.current
    element?.addEventListener("touchstart", handleTouchStart)
    element?.addEventListener("touchmove", handleTouchMove)
    element?.addEventListener("touchend", handleTouchEnd)

    return () => {
      element?.removeEventListener("touchstart", handleTouchStart)
      element?.removeEventListener("touchmove", handleTouchMove)
      element?.removeEventListener("touchend", handleTouchEnd)
    }
  }, [pullDistance, isRefreshing, onRefresh])

  return (
    <div ref={scrollElement} className="relative overflow-hidden">
      <motion.div
        animate={{ y: pullDistance }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="overflow-hidden"
      >
        <motion.div
          className="flex justify-center py-4 origin-top"
          animate={{ opacity: pullDistance / 100, scale: pullDistance / 100 }}
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : pullDistance * 3.6 }}
            transition={{ duration: isRefreshing ? 1 : 0 }}
          >
            <RefreshCw className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>

        {children}
      </motion.div>
    </div>
  )
}
