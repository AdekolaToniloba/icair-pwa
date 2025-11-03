"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Settings,
  HelpCircle,
  Share2,
  Award,
  FileText,
  Bell,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import ShareModal from "@/components/share-modal"; // Adjust path as needed

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

const itemVariant = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export default function MorePage() {
  const router = useRouter();
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const menuItems = [
    {
      icon: FileText,
      label: "About Conference",
      description: "Learn more about ICAIR 2025",
      action: () => window.open("https://icair.unilag.edu.ng/", "_blank"),
      external: true,
    },
    {
      icon: Award,
      label: "Speakers",
      description: "Meet our distinguished speakers",
      action: () => router.push("/speakers"),
      external: false,
    },
    {
      icon: Share2,
      label: "Share",
      description: "Invite friends to the conference",
      action: () => setShareModalOpen(true),
      external: false,
    },
    {
      icon: Bell,
      label: "Notifications",
      description: "Manage your alerts and reminders",
      action: () => router.push("/notifications"),
      external: false,
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      description: "Get assistance and FAQ",
      action: () => {}, // You can add a help page route here
      external: false,
    },
    {
      icon: Settings,
      label: "Settings",
      description: "Configure your preferences",
      action: () => {}, // You can add a settings page route here
      external: false,
    },
  ];

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="px-4 py-6 sm:px-6 sm:py-8 pb-24"
      >
        {/* Header */}
        <motion.div variants={itemVariant} className="mb-6">
          <h2 className="text-3xl font-bold mb-2 text-foreground">
            More Options
          </h2>
          <p className="text-muted-foreground">
            Explore additional features and information
          </p>
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={idx}
                variants={itemVariant}
                whileHover={{ x: 4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={item.action}
                className="w-full text-left bg-card p-4 rounded-xl border border-border hover:border-primary/40 hover:shadow-lg transition-all group"
                data-testid={`menu-item-${idx}`}
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    className="shrink-0 p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors"
                  >
                    <Icon size={22} className="text-primary" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow/External Icon */}
                  <motion.div
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="shrink-0"
                  >
                    {item.external ? (
                      <ExternalLink
                        size={20}
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                      />
                    ) : (
                      <ChevronRight
                        size={20}
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                      />
                    )}
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Conference Info Card */}
        <motion.div
          variants={itemVariant}
          className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl"
        >
          <h3 className="font-bold text-lg text-foreground mb-2">
            MIRG-ICAIR 2025
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Machine Intelligence Research Group - International Conference on AI
            and Robotics
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-semibold text-foreground">📅 Date:</span>
              November 4-6, 2025
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-semibold text-foreground">📍 Venue:</span>
              University of Lagos
            </div>
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          variants={itemVariant}
          className="mt-8 pt-6 border-t border-border text-center"
        >
          <p className="text-sm text-muted-foreground mb-2">
            MIRG-ICAIR Conference App
          </p>
          <p className="text-xs text-muted-foreground">
            Version 1.0.0 • Built with ❤️ by Nithub Unilag
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              window.open("https://icair.unilag.edu.ng/", "_blank")
            }
            className="mt-4 text-xs text-primary hover:underline font-medium"
          >
            Visit Conference Website →
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        url="https://icair.unilag.edu.ng/register/"
        title="MIRG-ICAIR 2025 Conference"
        text="Join me at the MIRG-ICAIR 2025 Conference at University of Lagos! November 4-6, 2025"
      />
    </>
  );
}
