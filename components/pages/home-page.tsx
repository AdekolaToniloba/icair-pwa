"use client";

import { motion } from "framer-motion";
import { CountdownTimer } from "@/components/countdown-timer";
import { WeatherWidget } from "@/components/weather-widget";
import { EmergencyFAB } from "@/components/emergency-fab";
import { QuickAccessCard } from "@/components/quick-access-card";
import { useEffect, useState } from "react";

const quickAccessItems = [
  { title: "Getting Here", emoji: "✈️", href: "/map" },
  { title: "Where to Stay", emoji: "🏨", href: "/hotels" },
  { title: "Venue Map", emoji: "🗺️", href: "/map" },
  { title: "Schedule", emoji: "📅", href: "/schedule" },
  { title: "Where to Eat", emoji: "🍽️", href: "/hotels" },
  { title: "Transport", emoji: "🚕", href: "/map" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Guard for SSR - only run on client
    if (typeof window === "undefined") return;

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      setScrollY(target.scrollTop || 0);
    };

    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
      return () => mainElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const conferenceDate = new Date("2025-11-04T09:00:00");

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="px-4 py-6 sm:px-6 sm:py-8 space-y-6"
    >
      {/* Hero Section with Parallax */}
      <motion.div
        variants={item}
        style={{
          y: scrollY * 0.5,
        }}
        className="relative"
      >
        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl p-8 text-white shadow-xl overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"
            animate={{
              x: [0, 20, -10, 0],
              y: [0, -15, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"
            animate={{
              x: [0, -15, 10, 0],
              y: [0, 20, -10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <span className="text-sm font-semibold bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                5th Edition
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold mb-2"
              data-testid="hero-title"
            >
              MIRG-ICAIR 2025
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/90 mb-2 text-sm"
            >
              Nov 4-6, 2025 · Lagos, Nigeria
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/80 text-xs mb-6 leading-relaxed"
            >
              Building Sustainable AI-Driven Transformation Infrastructures for
              African Economies
            </motion.p>

            {/* Countdown Timer */}
            <CountdownTimer targetDate={conferenceDate} />

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-white/20"
            >
              <div className="text-center">
                <p className="text-2xl font-bold">900+</p>
                <p className="text-xs text-white/80">Participants</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">20+</p>
                <p className="text-xs text-white/80">Countries</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs text-white/80">Continents</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Weather Widget */}
      <WeatherWidget />

      {/* Quick Access Grid */}
      <motion.div variants={item}>
        <h3
          className="text-lg font-bold mb-4 text-foreground"
          data-testid="quick-access-title"
        >
          Quick Access
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {quickAccessItems.map((item, idx) => (
            <QuickAccessCard
              key={`${item.title}-${idx}`}
              title={item.title}
              emoji={item.emoji}
              href={item.href}
              index={idx}
            />
          ))}
        </div>
      </motion.div>

      {/* About Section */}
      <motion.div variants={item}>
        <h3 className="text-lg font-bold mb-4 text-foreground">
          About MIRG-ICAIR
        </h3>
        <div className="bg-card rounded-lg border border-border p-5 space-y-4">
          <p className="text-sm text-foreground leading-relaxed">
            The International Conference on Artificial Intelligence and Robotics
            (ICAIR) is{" "}
            <span className="font-semibold text-primary">
              Africa's leading platform
            </span>{" "}
            for advancing research, innovation, and collaboration in AI and
            robotics.
          </p>
          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <p className="font-semibold text-sm text-foreground">
                  AI & Robotics Innovation
                </p>
                <p className="text-xs text-muted-foreground">
                  Cutting-edge research and practical applications
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">🌍</span>
              <div>
                <p className="font-semibold text-sm text-foreground">
                  Africa-Focused Solutions
                </p>
                <p className="text-xs text-muted-foreground">
                  Context-aware AI systems for sustainable growth
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">🤝</span>
              <div>
                <p className="font-semibold text-sm text-foreground">
                  Global Collaboration
                </p>
                <p className="text-xs text-muted-foreground">
                  Connecting researchers, policymakers, and industry leaders
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Updates Section */}
      <motion.div variants={item}>
        <h3 className="text-lg font-bold mb-4 text-foreground">
          Latest Updates
        </h3>
        <div className="space-y-3">
          {[
            {
              title: "Conference Theme Announced",
              description:
                "Building Sustainable AI-Driven Transformation Infrastructures",
              icon: "🎯",
            },
            {
              title: "Keynote Speakers Confirmed",
              description: "World-renowned AI researchers and industry leaders",
              icon: "🎤",
            },
            {
              title: "Registration Now Open",
              description: "Secure your spot at Africa's premier AI conference",
              icon: "🎫",
            },
          ].map((update, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              whileHover={{ x: 4 }}
              className="bg-card p-4 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer group"
              data-testid={`update-card-${idx}`}
            >
              <div className="flex gap-4">
                <span className="text-2xl">{update.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {update.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {update.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Organizers */}
      <motion.div variants={item}>
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20 p-4">
          <p className="text-xs text-muted-foreground mb-2">Organized by</p>
          <div className="flex items-center gap-4">
            <div>
              <p className="font-bold text-foreground">MIRG</p>
              <p className="text-xs text-muted-foreground">
                Machine Intelligence Research Group
              </p>
            </div>
            <span className="text-muted-foreground">×</span>
            <div>
              <p className="font-bold text-foreground">Nithub</p>
              <p className="text-xs text-muted-foreground">
                Innovation & Technology Hub
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Emergency FAB */}
      <EmergencyFAB />
    </motion.div>
  );
}
