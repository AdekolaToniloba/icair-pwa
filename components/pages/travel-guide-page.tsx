"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  Download,
  Plane,
  Pill,
  Backpack,
  DollarSign,
  Navigation,
  CheckCircle2,
  Circle,
} from "lucide-react"
import jsPDF from "jspdf"

interface TravelItem {
  id: string
  title: string
  completed: boolean
}

interface Section {
  id: string
  title: string
  icon: typeof Plane
  items: TravelItem[]
  description: string
}

const INITIAL_SECTIONS: Section[] = [
  {
    id: "visa",
    title: "Visa Requirements",
    icon: Plane,
    description: "Essential documentation for entry to Nigeria",
    items: [
      { id: "1", title: "Valid passport (6+ months validity)", completed: false },
      { id: "2", title: "Nigerian visa application form", completed: false },
      { id: "3", title: "Passport-sized photographs", completed: false },
      { id: "4", title: "Proof of accommodation", completed: false },
      { id: "5", title: "Return flight ticket", completed: false },
    ],
  },
  {
    id: "health",
    title: "Health & Vaccinations",
    icon: Pill,
    description: "Health precautions and vaccinations recommended",
    items: [
      { id: "6", title: "Yellow fever vaccination certificate", completed: false },
      { id: "7", title: "Malaria prophylaxis", completed: false },
      { id: "8", title: "Travel insurance with medical coverage", completed: false },
      { id: "9", title: "Prescription medications", completed: false },
      { id: "10", title: "First aid kit", completed: false },
    ],
  },
  {
    id: "packing",
    title: "Packing Essentials",
    icon: Backpack,
    description: "What to pack for Lagos climate",
    items: [
      { id: "11", title: "Light, breathable clothing", completed: false },
      { id: "12", title: "Sunscreen and hat", completed: false },
      { id: "13", title: "Umbrella or rain jacket", completed: false },
      { id: "14", title: "Comfortable walking shoes", completed: false },
      { id: "15", title: "Universal power adapter", completed: false },
      { id: "16", title: "Swimwear and beach essentials", completed: false },
    ],
  },
  {
    id: "money",
    title: "Money Matters",
    icon: DollarSign,
    description: "Currency and financial tips",
    items: [
      { id: "17", title: "Nigerian Naira currency exchange", completed: false },
      { id: "18", title: "Notify bank of travel dates", completed: false },
      { id: "19", title: "Carry ATM/credit cards", completed: false },
      { id: "20", title: "Know exchange rates", completed: false },
      { id: "21", title: "Budget for taxis and meals", completed: false },
    ],
  },
  {
    id: "transport",
    title: "Getting Around Lagos",
    icon: Navigation,
    description: "Transportation options in Lagos",
    items: [
      { id: "22", title: "Download ride-sharing apps (Uber, Bolt)", completed: false },
      { id: "23", title: "Learn about Lagos BRT", completed: false },
      { id: "24", title: "Book airport transfer", completed: false },
      { id: "25", title: "Get local SIM card for data", completed: false },
      { id: "26", title: "Know main locations of conference", completed: false },
    ],
  },
]

interface ExpandedSectionProps {
  section: Section
  onToggleItem: (sectionId: string, itemId: string) => void
}

function ExpandedSection({ section, onToggleItem }: ExpandedSectionProps) {
  const completedCount = section.items.filter((item) => item.completed).length
  const progressPercent = Math.round((completedCount / section.items.length) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="bg-muted/30 p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {completedCount} of {section.items.length} completed
          </span>
          <span className="font-semibold text-primary">{progressPercent}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-primary rounded-full"
          />
        </div>

        <div className="space-y-2 mt-4">
          {section.items.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onToggleItem(section.id, item.id)}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-muted/50 transition-colors"
              data-testid={`travel-item-${item.id}`}
            >
              <motion.div
                animate={{ scale: item.completed ? 1.2 : 1 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                {item.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
              </motion.div>
              <span
                className={`text-sm flex-1 transition-all ${
                  item.completed ? "line-through text-muted-foreground" : "text-foreground"
                }`}
              >
                {item.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function TravelGuidePage() {
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const toggleItem = (sectionId: string, itemId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item)),
            }
          : section,
      ),
    )
  }

  const calculateTotalProgress = () => {
    const totalItems = sections.reduce((sum, section) => sum + section.items.length, 0)
    const completedItems = sections.reduce(
      (sum, section) => sum + section.items.filter((item) => item.completed).length,
      0,
    )
    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
  }

  const exportToPDF = () => {
    const pdf = new jsPDF()
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    let yPosition = 15

    // Header
    pdf.setFontSize(20)
    pdf.setTextColor(0, 166, 81) // Primary green color
    pdf.text("UNILAG Conference 2025 - Travel Guide", pageWidth / 2, yPosition, { align: "center" })
    yPosition += 10

    // Overall progress
    pdf.setFontSize(12)
    pdf.setTextColor(0, 0, 0)
    pdf.text(`Overall Preparation Progress: ${calculateTotalProgress()}%`, 15, yPosition)
    yPosition += 8

    // Add line
    pdf.setDrawColor(200)
    pdf.line(15, yPosition, pageWidth - 15, yPosition)
    yPosition += 8

    // Sections
    sections.forEach((section) => {
      const completedCount = section.items.filter((item) => item.completed).length
      const progressPercent = Math.round((completedCount / section.items.length) * 100)

      // Check if we need a new page
      if (yPosition > pageHeight - 30) {
        pdf.addPage()
        yPosition = 15
      }

      // Section title
      pdf.setFontSize(14)
      pdf.setTextColor(0, 166, 81)
      pdf.text(section.title, 15, yPosition)
      yPosition += 7

      // Section progress
      pdf.setFontSize(10)
      pdf.setTextColor(80, 80, 80)
      pdf.text(`Progress: ${completedCount}/${section.items.length} (${progressPercent}%)`, 15, yPosition)
      yPosition += 6

      // Items
      pdf.setFontSize(9)
      section.items.forEach((item) => {
        const prefix = item.completed ? "[X] " : "[ ] "
        const textColor = item.completed ? [150, 150, 150] : [0, 0, 0]
        pdf.setTextColor(...textColor)
        const splitText = pdf.splitTextToSize(`${prefix}${item.title}`, pageWidth - 30)
        pdf.text(splitText, 20, yPosition)
        yPosition += splitText.length * 4 + 2

        if (yPosition > pageHeight - 15) {
          pdf.addPage()
          yPosition = 15
        }
      })

      yPosition += 3
    })

    // Footer
    pdf.setFontSize(8)
    pdf.setTextColor(150, 150, 150)
    pdf.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 10, { align: "center" })

    pdf.save("UNILAG_Travel_Guide.pdf")
  }

  const totalProgress = calculateTotalProgress()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="px-4 py-6 sm:px-6 sm:py-8"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-foreground" data-testid="travel-guide-title">
          Travel Guide to Lagos
        </h2>
        <p className="text-muted-foreground text-sm">Complete your pre-conference checklist for a smooth experience</p>
      </div>

      {/* Overall Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg mb-6 border border-primary/20"
        data-testid="progress-card"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Overall Preparation</h3>
          <span className="text-2xl font-bold text-primary">{totalProgress}%</span>
        </div>
        <div className="w-full bg-background rounded-full h-2.5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${totalProgress}%` }}
            transition={{ duration: 0.6 }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </motion.div>

      {/* Export PDF Button */}
      <motion.button
        onClick={exportToPDF}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mb-6 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        data-testid="export-pdf-btn"
      >
        <Download size={18} />
        Download Travel Guide as PDF
      </motion.button>

      {/* Sections */}
      <div className="space-y-3">
        {sections.map((section, idx) => {
          const Icon = section.icon
          const isExpanded = expandedSections.has(section.id)

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className="border border-border rounded-lg overflow-hidden bg-card"
            >
              <motion.button
                onClick={() => toggleSection(section.id)}
                whileHover={{ backgroundColor: "rgba(0, 166, 81, 0.05)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between p-4 transition-colors"
                data-testid={`section-toggle-${section.id}`}
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{section.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{section.description}</p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={20} className="text-muted-foreground" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isExpanded && <ExpandedSection section={section} onToggleItem={toggleItem} />}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 pt-6 border-t border-border text-center"
      >
        <p className="text-xs text-muted-foreground">
          Complete all items before your journey to Lagos
          <br />
          Safe travels to UNILAG Conference 2025!
        </p>
      </motion.div>
    </motion.div>
  )
}
