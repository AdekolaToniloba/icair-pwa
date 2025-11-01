// code/components/pages/more-page.tsx
"use client";

import { motion } from "framer-motion";
import {
  Settings,
  HelpCircle,
  Share2,
  Award,
  FileText,
  Bell,
} from "lucide-react";

const menuItems = [
  {
    icon: FileText,
    label: "About Conference",
    description: "Learn more about ICAIR 2025",
  },
  {
    icon: Award,
    label: "Speakers",
    description: "Meet our distinguished speakers",
  },
  {
    icon: Share2,
    label: "Share",
    description: "Invite friends to the conference",
  },
  {
    icon: Bell,
    label: "Notifications",
    description: "Manage your alerts and reminders",
  },
  {
    icon: HelpCircle,
    label: "Help & Support",
    description: "Get assistance and FAQ",
  },
  {
    icon: Settings,
    label: "Settings",
    description: "Configure your preferences",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export default function MorePage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="px-4 py-6 sm:px-6 sm:py-8"
    >
      <h2
        className="text-2xl font-bold mb-6 text-foreground"
        data-testid="more-title"
      >
        More Options
      </h2>

      <div className="space-y-3">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={idx}
              variants={item}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left bg-card p-4 rounded-lg border border-border hover:border-primary/30 hover:shadow-md transition-all"
              data-testid={`menu-item-${idx}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                  <Icon size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.description}
                  </p>
                </div>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <span className="text-muted-foreground">→</span>
                </motion.div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Footer Info */}
      <motion.div variants={item} className="mt-8 pt-6 border-t border-border">
        <p className="text-center text-xs text-muted-foreground">
          ICAIR Conference 2025
          <br />
          Version 1.0.0 • Built with ❤️ by Nithub Unilag
        </p>
      </motion.div>
    </motion.div>
  );
}
