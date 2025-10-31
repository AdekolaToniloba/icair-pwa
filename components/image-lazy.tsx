"use client"

import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"

interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export function LazyImage({ src, alt, width, height, className = "" }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden bg-muted ${className}`}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className="w-full h-full object-cover"
      />
    </motion.div>
  )
}
