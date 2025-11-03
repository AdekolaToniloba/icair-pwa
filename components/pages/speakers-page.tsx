"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import {
  Search,
  Users,
  Mic2,
  GraduationCap,
  MessageSquare,
  Building2,
  MapPin,
  ExternalLink,
  X,
  Mail,
  Sparkles,
  User,
} from "lucide-react";
import {
  SPEAKERS,
  getSpeakersByCategory,
  searchSpeakers,
  type Speaker,
  type SpeakerCategory,
} from "@/data/speakers-data";

// Type-specific icons and colors
const CATEGORY_CONFIG: Record<
  string,
  { label: string; icon: any; color: string }
> = {
  all: { label: "All Speakers", icon: Users, color: "primary" },
  keynote: { label: "Keynote", icon: Mic2, color: "red" },
  masterclass: { label: "Masterclass", icon: GraduationCap, color: "blue" },
  panel: { label: "Panel", icon: MessageSquare, color: "green" },
  workshop: { label: "Workshop", icon: Building2, color: "purple" },
  ceremony: { label: "Ceremony", icon: Sparkles, color: "yellow" },
  talk: { label: "Talk", icon: User, color: "indigo" },
};

function SpeakerCard({
  speaker,
  onClick,
  index,
}: {
  speaker: Speaker;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/40 hover:shadow-lg transition-all"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
        {/* Placeholder with initials if no image loaded */}
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <span className="text-4xl font-bold text-muted-foreground opacity-30">
            {speaker.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </span>
        </div>
        {/* Actual image - lazy loaded with blur-up */}
        {speaker.blurDataURL && (
          <img
            src={speaker.blurDataURL}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-sm"
            aria-hidden="true"
          />
        )}
        <img
          src={speaker.image}
          alt={speaker.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          onError={(e) => {
            // Hide image if it fails to load, showing initials instead
            e.currentTarget.style.display = "none";
          }}
          onLoad={(e) => {
            // Fade in smoothly
            e.currentTarget.style.opacity = "1";
          }}
          style={{ opacity: 0 }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-foreground mb-1 line-clamp-1">
          {speaker.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
          {speaker.title}
        </p>
        <div className="flex items-start gap-2 mb-3">
          <Building2 className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground line-clamp-2">
            {speaker.organization}
          </p>
        </div>

        {/* Category badges */}
        <div className="flex flex-wrap gap-1.5">
          {speaker.category.map((cat) => {
            const config = CATEGORY_CONFIG[cat];
            if (!config) return null; // Safety check
            const Icon = config.icon;
            return (
              <span
                key={cat}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium"
              >
                <Icon className="w-3 h-3" />
                {config.label}
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function SpeakerModal({
  speaker,
  onClose,
}: {
  speaker: Speaker;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-2xl"
      >
        {/* Header with image */}
        <div className="relative h-64 bg-gradient-to-br from-primary/20 to-secondary/20">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Blur placeholder */}
          {speaker.blurDataURL && (
            <img
              src={speaker.blurDataURL}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-sm"
              aria-hidden="true"
            />
          )}

          {/* Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-6xl font-bold text-muted-foreground opacity-30">
              {speaker.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
          </div>

          {/* Actual image */}
          <img
            src={speaker.image}
            alt={speaker.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {speaker.name}
            </h2>
            <p className="text-muted-foreground mb-1">{speaker.title}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="w-4 h-4" />
              <span>{speaker.organization}</span>
            </div>
            {speaker.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <MapPin className="w-4 h-4" />
                <span>{speaker.location}</span>
              </div>
            )}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {speaker.category.map((cat) => {
              const config = CATEGORY_CONFIG[cat];
              if (!config) return null; // Safety check
              const Icon = config.icon;
              return (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  <Icon className="w-4 h-4" />
                  {config.label}
                </span>
              );
            })}
          </div>

          {/* Topic */}
          {speaker.topic && (
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-1 text-sm">
                Speaking About:
              </h3>
              <p className="text-muted-foreground">{speaker.topic}</p>
            </div>
          )}

          {/* Bio */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">Biography</h3>
            <p className="text-muted-foreground leading-relaxed">
              {speaker.bio}
            </p>
          </div>

          {/* Contact & Social links */}
          <div className="flex gap-3 pt-2 flex-wrap">
            {speaker.email && (
              <a
                href={`mailto:${speaker.email}`}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            )}
            {speaker.linkedin && (
              <a
                href={speaker.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                LinkedIn
              </a>
            )}
            {speaker.twitter && (
              <a
                href={speaker.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Twitter
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SpeakersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<SpeakerCategory>("all");
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  const filteredSpeakers = useMemo(() => {
    let speakers = SPEAKERS;

    // Apply category filter
    if (selectedCategory !== "all") {
      speakers = getSpeakersByCategory(selectedCategory);
    }

    // Apply search
    if (searchQuery.trim()) {
      speakers = searchSpeakers(searchQuery).filter((speaker) =>
        selectedCategory === "all"
          ? true
          : speaker.category.includes(selectedCategory)
      );
    }

    return speakers;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Speakers</h1>
        <p className="text-muted-foreground">
          Meet the global leaders shaping Africa's future through AI and
          robotics
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 space-y-3"
      >
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search speakers, organizations, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
          {(Object.keys(CATEGORY_CONFIG) as SpeakerCategory[]).map(
            (category) => {
              const config = CATEGORY_CONFIG[category];
              const Icon = config.icon;
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card text-foreground border border-border hover:border-primary/40"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {config.label}
                </button>
              );
            }
          )}
        </div>
      </motion.div>

      {/* Results count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-4 text-sm text-muted-foreground"
      >
        Showing {filteredSpeakers.length}{" "}
        {filteredSpeakers.length === 1 ? "speaker" : "speakers"}
      </motion.div>

      {/* Speakers grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredSpeakers.map((speaker, idx) => (
          <SpeakerCard
            key={speaker.id}
            speaker={speaker}
            onClick={() => setSelectedSpeaker(speaker)}
            index={idx}
          />
        ))}
      </motion.div>

      {/* Empty state */}
      {filteredSpeakers.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground">
            No speakers found matching your search
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-4 text-primary hover:underline text-sm font-medium"
          >
            Clear filters
          </button>
        </motion.div>
      )}

      {/* Speaker modal */}
      <AnimatePresence>
        {selectedSpeaker && (
          <SpeakerModal
            speaker={selectedSpeaker}
            onClose={() => setSelectedSpeaker(null)}
          />
        )}
      </AnimatePresence>

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
