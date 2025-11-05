"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Calendar, Zap, Radio, ChevronDown } from "lucide-react";

interface CountdownProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="bg-muted rounded-2xl p-8 w-full max-w-md h-40 animate-pulse" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full py-8 px-4"
    >
      {/* Main Day 2 Badge - Centerpiece */}
      <motion.div
        className="relative max-w-md mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl blur-2xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main card */}
        <div className="relative bg-gradient-to-br from-primary via-primary to-primary/90 rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-primary/30 overflow-hidden">
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 20px 20px, white 2px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
            animate={{
              x: [0, 40],
              y: [0, 40],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Top icon row */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Zap
                  className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300"
                  fill="currentColor"
                />
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.div>

              <motion.div
                animate={{
                  rotate: [0, -360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Zap
                  className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300"
                  fill="currentColor"
                />
              </motion.div>
            </motion.div>

            {/* Main text */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-2 tracking-tight"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(255,255,255,0.3)",
                    "0 0 30px rgba(255,255,255,0.5)",
                    "0 0 20px rgba(255,255,255,0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                DAY 2
              </motion.h2>
              <motion.div
                className="flex items-center justify-center gap-3 mt-4"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="relative"
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <motion.div
                    className="absolute inset-0 bg-red-500 rounded-full"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                </motion.div>
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                  Live Now
                </span>
              </motion.div>
            </motion.div>

            {/* Broadcasting indicator - Clickable Link to Schedule */}
            <motion.a
              href="/schedule?day=2"
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/30 cursor-pointer hover:bg-white/30 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Radio className="w-4 h-4 text-white" />
              </motion.div>
              <span className="text-sm sm:text-base font-semibold text-white">
                Exciting Sessions Happening Now
              </span>
              <motion.div
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown className="w-4 h-4 text-white rotate-[-90deg]" />
              </motion.div>
            </motion.a>

            {/* Decorative bottom dots */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-white/60"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-3 right-3 w-3 h-3 bg-white/40 rounded-full" />
          <div className="absolute bottom-3 left-3 w-3 h-3 bg-white/40 rounded-full" />
          <div className="absolute top-3 left-3 w-2 h-2 bg-yellow-300/60 rounded-full" />
          <div className="absolute bottom-3 right-3 w-2 h-2 bg-yellow-300/60 rounded-full" />
        </div>
      </motion.div>

      {/* Supporting text */}
      <motion.p
        className="text-center text-sm sm:text-base text-muted-foreground mt-6 font-medium max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        Don't miss out on today's keynotes, panels, and networking opportunities
      </motion.p>

      {/* Animated bottom accent */}
      <motion.div
        className="flex items-center justify-center gap-2 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
