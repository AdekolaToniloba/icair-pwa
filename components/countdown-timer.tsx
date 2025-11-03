"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, memo } from "react";
import { Calendar, Clock } from "lucide-react";

interface CountdownProps {
  targetDate: Date;
}

interface TimeUnit {
  value: number;
  label: string;
}

// Memoized time unit component that only re-renders when its value changes
const TimeUnitDisplay = memo(
  ({
    value,
    label,
    index,
  }: {
    value: number;
    label: string;
    index: number;
  }) => {
    // Different animation variants for each unit to add character
    const containerVariants = {
      hidden: { scale: 0.8, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          delay: index * 0.1,
          duration: 0.5,
          ease: "easeOut",
        },
      },
    };

    // Floating animation with different delays for each unit
    const floatVariants = {
      float: {
        y: [-2, 2, -2],
        transition: {
          duration: 2 + index * 0.3, // Different duration for each unit
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    };

    // Pulse animation for the changing value
    const pulseVariants = {
      initial: { scale: 1 },
      pulse: {
        scale: [1, 1.15, 1],
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
    };

    return (
      <motion.div
        className="flex flex-col items-center relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 bg-primary/20 rounded-xl blur-xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main time display */}
        <motion.div
          className="relative bg-gradient-to-br from-primary via-primary to-primary/80 rounded-xl p-2.5 sm:p-4 min-w-[60px] sm:min-w-[70px] text-center shadow-lg border border-primary/20 overflow-hidden"
          variants={floatVariants}
          animate="float"
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2 + index,
              ease: "linear",
            }}
          />

          {/* Animated number with flip effect */}
          <AnimatePresence mode="wait">
            <motion.div
              key={value} // Key changes trigger animation only when value changes
              variants={pulseVariants}
              initial="initial"
              animate="pulse"
              exit={{
                scale: 0.8,
                opacity: 0,
                rotateX: 90,
                transition: { duration: 0.2 },
              }}
              className="relative z-10"
            >
              <span className="text-white font-bold text-2xl sm:text-3xl md:text-4xl tabular-nums tracking-tight drop-shadow-lg">
                {String(value).padStart(2, "0")}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Decorative dots */}
          <div className="absolute top-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/30 rounded-full" />
          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/30 rounded-full" />
        </motion.div>

        {/* Label with gradient text */}
        <motion.p
          className="text-xs sm:text-sm font-bold mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-white uppercase tracking-wide"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        >
          {label}
        </motion.p>
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if value changes
    return prevProps.value === nextProps.value;
  }
);

TimeUnitDisplay.displayName = "TimeUnitDisplay";

export function CountdownTimer({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };

        // Only update if values actually changed
        setTimeLeft((prev) => {
          if (
            prev.days !== newTimeLeft.days ||
            prev.hours !== newTimeLeft.hours ||
            prev.minutes !== newTimeLeft.minutes ||
            prev.seconds !== newTimeLeft.seconds
          ) {
            return newTimeLeft;
          }
          return prev;
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex justify-between gap-3 sm:gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="bg-muted rounded-xl p-4 min-w-[70px] h-[72px] animate-pulse" />
            <div className="h-4 w-12 bg-muted rounded mt-2 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      {/* Header with icon */}
      <motion.div
        className="flex items-center justify-center gap-2 mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <Calendar className="w-5 h-5 text-primary" />
        </motion.div>
        <h3 className="text-sm sm:text-base font-bold text-foreground uppercase tracking-wide">
          Conference Starts In
        </h3>
        <motion.div
          animate={{
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            delay: 0.5,
          }}
        >
          <Clock className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>

      {/* Countdown units */}
      <div className="flex justify-between gap-2 sm:gap-3 md:gap-4 max-w-lg mx-auto">
        <TimeUnitDisplay value={timeLeft.days} label="Days" index={0} />
        <TimeUnitDisplay value={timeLeft.hours} label="Hours" index={1} />
        <TimeUnitDisplay value={timeLeft.minutes} label="Mins" index={2} />
        <TimeUnitDisplay value={timeLeft.seconds} label="Secs" index={3} />
      </div>

      {/* Decorative elements */}
      <motion.div
        className="flex items-center justify-center gap-2 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Date display */}
      {/* <motion.p
        className="text-center text-xs sm:text-sm text-white mt-4 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Tuesday, November 4, 2025 • 9:00 AM WAT
      </motion.p> */}
    </motion.div>
  );
}
