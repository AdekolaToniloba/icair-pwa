"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Phone, X } from "lucide-react"
import { useState } from "react"
import { useAppStore } from "@/store/app-store"

const emergencyContacts = [
  { name: "Conference Helpline", number: "+234 (0) 123-4567" },
  { name: "Medical Emergency", number: "+234 (0) 987-6543" },
  { name: "Security", number: "+234 (0) 456-7890" },
]

export function EmergencyFAB() {
  const [isOpen, setIsOpen] = useState(false)
  const showEmergencyContacts = useAppStore((state) => state.showEmergencyContacts)

  return (
    <div className="fixed bottom-24 right-4 z-40" data-testid="emergency-fab">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="space-y-2 mb-4"
            role="menu"
            aria-label="Emergency contacts"
          >
            {emergencyContacts.map((contact, idx) => (
              <motion.a
                key={contact.number}
                href={`tel:${contact.number}`}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-3 bg-card border border-border rounded-lg p-3 hover:border-primary transition-colors"
                data-testid={`emergency-contact-${idx}`}
                role="menuitem"
                aria-label={`Call ${contact.name}: ${contact.number}`}
              >
                <Phone size={18} className="text-primary flex-shrink-0" aria-hidden="true" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">{contact.number}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(!isOpen)}
        animate={{ scale: isOpen ? 1 : 1 }}
        className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-lg flex items-center justify-center text-white relative overflow-hidden group"
        data-testid="emergency-fab-button"
        aria-expanded={isOpen}
        aria-label={`${isOpen ? "Close" : "Open"} emergency contacts menu`}
        aria-haspopup="menu"
      >
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          aria-hidden="true"
        />
        <motion.div
          animate={{
            rotate: isOpen ? 45 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
          aria-hidden="true"
        >
          {isOpen ? <X size={24} /> : <Phone size={24} />}
        </motion.div>
      </motion.button>
    </div>
  )
}
