"use client";

import type React from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Calendar,
  Hotel,
  MapPin,
  MoreHorizontal,
  Plane,
  Award,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "schedule", label: "Schedule", icon: Calendar, href: "/schedule" },
  { id: "speakers", label: "Speakers", icon: Award, href: "/speakers" },
  { id: "map", label: "Map", icon: MapPin, href: "/map" },
  { id: "more", label: "More", icon: MoreHorizontal, href: "/more" },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-2xl md:hidden"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <motion.button
              key={item.id}
              onClick={() => router.push(item.href)}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors relative"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              data-testid={`nav-button-${item.id}`}
              aria-current={active ? "page" : undefined}
              aria-label={`${item.label}${active ? " (current page)" : ""}`}
              title={item.label}
            >
              {active && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-lg"
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  aria-hidden="true"
                />
              )}

              <motion.div
                animate={{
                  scale: active ? 1.15 : 1,
                  color: active ? "text-primary" : "text-muted-foreground",
                }}
                transition={{ type: "spring", damping: 15, stiffness: 300 }}
                className="relative z-10"
                aria-hidden="true"
              >
                <Icon
                  size={24}
                  strokeWidth={active ? 2.5 : 2}
                  data-testid={`icon-${item.id}`}
                />
              </motion.div>

              <motion.span
                animate={{
                  color: active ? "text-primary" : "text-muted-foreground",
                  scale: active ? 1.05 : 1,
                }}
                transition={{ type: "spring", damping: 15, stiffness: 300 }}
                className="text-xs font-semibold relative z-10"
                data-testid={`label-${item.id}`}
              >
                {item.label}
              </motion.span>

              {active && (
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-lg"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                  style={{ pointerEvents: "none" }}
                  aria-hidden="true"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}
