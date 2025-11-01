"use client";

import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-40 w-full bg-card border-b border-border shadow-sm"
      role="banner"
      aria-label="ICAIR Conference 2025 Header"
    >
      <div className="px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1
              className="text-2xl sm:text-3xl font-bold text-foreground"
              data-testid="header-title"
            >
              MIRG-ICAIR Conference
            </h1>
            <p className="text-sm text-muted-foreground mt-1">2025</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
