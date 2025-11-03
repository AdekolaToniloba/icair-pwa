"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import {
  Clock,
  MapPin,
  User,
  Users,
  Star,
  Search,
  Filter,
  AlertCircle,
  Download,
  ChevronDown,
  Mic2,
  GraduationCap,
  MessageSquare,
  FlaskConical,
  Coffee,
  Building2,
  Sparkles,
  FileText,
  TrendingUp,
  Calendar,
  X,
} from "lucide-react";
import { useScheduleStore } from "@/store/schedule-store";
import {
  CONFERENCE_SCHEDULE,
  type Session,
  type DaySchedule,
  searchSessions,
} from "@/data/schedule-data";

// Type-specific icons and colors
const TYPE_CONFIG = {
  keynote: {
    icon: Mic2,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    label: "Keynote",
  },
  panel: {
    icon: MessageSquare,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    label: "Panel",
  },
  masterclass: {
    icon: GraduationCap,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    label: "Master Class",
  },
  "paper-session": {
    icon: FlaskConical,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    label: "Research Papers",
  },
  workshop: {
    icon: Building2,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    label: "Workshop",
  },
  networking: {
    icon: Users,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    label: "Networking",
  },
  ceremony: {
    icon: Sparkles,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    label: "Ceremony",
  },
  break: {
    icon: Coffee,
    color: "text-gray-600",
    bg: "bg-gray-50",
    border: "border-gray-200",
    label: "Break",
  },
  talk: {
    icon: User,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    label: "Talk",
  },
  roundtable: {
    icon: Users,
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
    label: "Roundtable",
  },
  tour: {
    icon: MapPin,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
    label: "Tour",
  },
  poster: {
    icon: FileText,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    label: "Poster Session",
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function SchedulePage() {
  const [viewType, setViewType] = useState<"agenda" | "tracks" | "my-schedule">(
    "agenda"
  );
  const [selectedDay, setSelectedDay] = useState<"Day 1" | "Day 2" | "Day 3">(
    "Day 1"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const [calendarMenuOpen, setCalendarMenuOpen] = useState<string | null>(null);
  const { starredSessions, toggleStarSession } = useScheduleStore();

  // Get all unique types and tracks
  const allTypes = Array.from(
    new Set(
      Object.values(CONFERENCE_SCHEDULE)
        .flatMap((day) => day.sessions)
        .map((s) => s.type)
    )
  );

  const allTracks = Array.from(
    new Set(
      Object.values(CONFERENCE_SCHEDULE)
        .flatMap((day) => day.sessions)
        .map((s) => s.track)
    )
  );

  // Helper function to get session date/time
  const getSessionDateTime = (session: Session) => {
    let sessionDate = "2025-11-04";
    for (const [key, day] of Object.entries(CONFERENCE_SCHEDULE)) {
      if (day.sessions.some((s) => s.id === session.id)) {
        if (key === "Day 2") sessionDate = "2025-11-05";
        if (key === "Day 3") sessionDate = "2025-11-06";
        break;
      }
    }

    const [startHour, startMin] = session.time
      .split("-")[0]
      .trim()
      .split(":")
      .map(Number);
    const [endHour, endMin] = session.time
      .split("-")[1]
      .trim()
      .split(":")
      .map(Number);

    const start = new Date(
      `${sessionDate}T${String(startHour).padStart(2, "0")}:${String(
        startMin || 0
      ).padStart(2, "0")}:00`
    );
    const end = new Date(
      `${sessionDate}T${String(endHour).padStart(2, "0")}:${String(
        endMin || 0
      ).padStart(2, "0")}:00`
    );

    return { start, end, sessionDate };
  };

  // Generate ICS file for download
  const generateICS = (session: Session) => {
    const { start, end } = getSessionDateTime(session);

    const ical = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MIRG-ICAIR Conference//EN
BEGIN:VEVENT
UID:${session.id}@unilag.edu
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${start.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTEND:${end.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:${session.title}
DESCRIPTION:${session.description}${
      session.speakers
        ? "\\n\\nSpeakers: " + session.speakers.map((s) => s.name).join(", ")
        : ""
    }
LOCATION:${session.room}, University of Lagos
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ical], { type: "text/calendar" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${session.title.replace(/\s+/g, "_")}.ics`;
    link.click();
    setCalendarMenuOpen(null);
  };

  // Add to Google Calendar
  const addToGoogleCalendar = (session: Session) => {
    const { start, end } = getSessionDateTime(session);

    const formatGoogleDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const details = encodeURIComponent(
      `${session.description}\n\n${
        session.speakers
          ? "Speakers: " + session.speakers.map((s) => s.name).join(", ")
          : ""
      }`
    );

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      session.title
    )}&dates=${formatGoogleDate(start)}/${formatGoogleDate(
      end
    )}&details=${details}&location=${encodeURIComponent(
      `${session.room}, University of Lagos`
    )}`;

    window.open(url, "_blank");
    setCalendarMenuOpen(null);
  };

  // Filter and search logic
  const filteredSessions = useMemo(() => {
    let allSessions = Object.values(CONFERENCE_SCHEDULE).flatMap(
      (day) => day.sessions
    );

    // Apply search
    if (searchQuery.trim()) {
      allSessions = searchSessions(searchQuery);
    }

    // Apply filters
    let result = allSessions.filter((session) => {
      const matchesType = !selectedType || session.type === selectedType;
      const matchesTrack = !selectedTrack || session.track === selectedTrack;
      return matchesType && matchesTrack;
    });

    // Apply view type filters
    if (viewType === "agenda") {
      result =
        CONFERENCE_SCHEDULE[selectedDay]?.sessions.filter((session) => {
          const matchesType = !selectedType || session.type === selectedType;
          const matchesTrack =
            !selectedTrack || session.track === selectedTrack;
          const matchesSearch =
            !searchQuery.trim() ||
            session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            session.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            session.speakers?.some((s) =>
              s.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
          return matchesType && matchesTrack && matchesSearch;
        }) || [];
    } else if (viewType === "my-schedule") {
      result = result.filter((s) => starredSessions.includes(s.id));
    }

    return result;
  }, [
    searchQuery,
    selectedType,
    selectedTrack,
    viewType,
    selectedDay,
    starredSessions,
  ]);

  // Conflict detection
  const conflicts = useMemo(() => {
    const starred = Object.values(CONFERENCE_SCHEDULE)
      .flatMap((day) => day.sessions)
      .filter((s) => starredSessions.includes(s.id));
    const conflicting = new Set<string>();

    for (let i = 0; i < starred.length; i++) {
      for (let j = i + 1; j < starred.length; j++) {
        const s1 = starred[i];
        const s2 = starred[j];
        if (!(s1.endTime <= s2.startTime || s2.endTime <= s1.startTime)) {
          conflicting.add(s1.id);
          conflicting.add(s2.id);
        }
      }
    }

    return conflicting;
  }, [starredSessions]);

  // Group sessions by track
  const sessionsByTrack = useMemo(() => {
    const grouped: Record<string, Session[]> = {};
    filteredSessions.forEach((session) => {
      if (!grouped[session.track]) {
        grouped[session.track] = [];
      }
      grouped[session.track].push(session);
    });
    return grouped;
  }, [filteredSessions]);

  const currentDayInfo = CONFERENCE_SCHEDULE[selectedDay];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="px-4 py-6 sm:px-6 sm:py-8 pb-24"
    >
      {/* Header */}
      <motion.div variants={item} className="mb-6">
        <h2
          className="text-3xl font-bold mb-2 text-foreground"
          data-testid="schedule-title"
        >
          Conference Schedule
        </h2>
        <p className="text-muted-foreground">
          MIRG-ICAIR 2025 • University of Lagos • November 4-6
        </p>
      </motion.div>

      {/* View Type Tabs */}
      <motion.div
        variants={item}
        className="flex gap-2 mb-6 overflow-x-auto pb-2 hide-scrollbar"
        role="tablist"
      >
        {(
          [
            { value: "agenda", label: "Daily Agenda", icon: Clock },
            { value: "tracks", label: "By Track", icon: TrendingUp },
            { value: "my-schedule", label: "My Schedule", icon: Star },
          ] as const
        ).map((view) => {
          const Icon = view.icon;
          const isActive = viewType === view.value;
          return (
            <motion.button
              key={view.value}
              onClick={() => setViewType(view.value)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: isActive ? 1 : 1.02 }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border text-foreground hover:border-primary/40"
              }`}
              data-testid={`view-${view.value}`}
              role="tab"
              aria-selected={isActive}
            >
              <Icon size={16} />
              {view.label}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Day Selection (for Agenda view) */}
      {viewType === "agenda" && (
        <motion.div variants={item} className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {Object.entries(CONFERENCE_SCHEDULE).map(([key, day]) => {
              const isActive = selectedDay === key;
              return (
                <motion.button
                  key={key}
                  onClick={() => setSelectedDay(key as any)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: isActive ? 1 : 1.02 }}
                  className={`shrink-0 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg"
                      : "bg-card border border-border text-foreground hover:border-primary/40"
                  }`}
                  data-testid={`day-${key}`}
                >
                  <div className="text-left">
                    <div className="font-bold">{key}</div>
                    <div
                      className={`text-xs ${
                        isActive
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground"
                      }`}
                    >
                      {day.dayOfWeek}, {day.date.split(",")[0]}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Search and Filters */}
      <motion.div
        variants={item}
        className="bg-card rounded-xl border border-border p-4 mb-6 shadow-sm"
      >
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Search sessions, speakers, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              data-testid="search-input"
            />
          </div>
        </div>

        {/* Filter Options */}
        <div className="space-y-3">
          {/* Type Filter */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Filter size={14} />
              Session Type
            </label>
            <div className="flex gap-2 flex-wrap">
              <motion.button
                onClick={() => setSelectedType(null)}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  !selectedType
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                All Types
              </motion.button>
              {allTypes.map((type) => {
                const config = TYPE_CONFIG[type];
                const Icon = config.icon;
                const isSelected = selectedType === type;
                return (
                  <motion.button
                    key={type}
                    onClick={() => setSelectedType(isSelected ? null : type)}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? `${config.bg} ${config.color} ${config.border} border shadow-sm`
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                    data-testid={`type-${type}`}
                  >
                    <Icon size={12} />
                    {config.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Track Filter */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Track
            </label>
            <div className="flex gap-2 flex-wrap">
              <motion.button
                onClick={() => setSelectedTrack(null)}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  !selectedTrack
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                All Tracks
              </motion.button>
              {allTracks.map((track) => (
                <motion.button
                  key={track}
                  onClick={() =>
                    setSelectedTrack(selectedTrack === track ? null : track)
                  }
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedTrack === track
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                  data-testid={`track-${track}`}
                >
                  {track}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Conflict Warning */}
      <AnimatePresence>
        {conflicts.size > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3"
              data-testid="conflict-warning"
              role="alert"
            >
              <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Schedule Conflict</p>
                <p className="text-sm text-red-800">
                  {conflicts.size} starred session
                  {conflicts.size > 1 ? "s" : ""} overlap. Review your
                  selections.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sessions Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${viewType}-${selectedDay}-${searchQuery}-${selectedType}-${selectedTrack}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {viewType === "agenda" ? (
            // Agenda View - Timeline
            <div className="space-y-3">
              {filteredSessions.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Clock
                    className="mx-auto mb-3 text-muted-foreground opacity-30"
                    size={48}
                  />
                  <p className="text-muted-foreground">No sessions found</p>
                </motion.div>
              ) : (
                filteredSessions.map((session, idx) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    index={idx}
                    isStarred={starredSessions.includes(session.id)}
                    onToggleStar={() => toggleStarSession(session.id)}
                    isExpanded={expandedSession === session.id}
                    onToggleExpand={() =>
                      setExpandedSession(
                        expandedSession === session.id ? null : session.id
                      )
                    }
                    hasConflict={conflicts.has(session.id)}
                    onDownloadICS={() => generateICS(session)}
                    onGoogleCalendar={() => addToGoogleCalendar(session)}
                    calendarMenuOpen={calendarMenuOpen === session.id}
                    onToggleCalendarMenu={() =>
                      setCalendarMenuOpen(
                        calendarMenuOpen === session.id ? null : session.id
                      )
                    }
                  />
                ))
              )}
            </div>
          ) : viewType === "tracks" ? (
            // Tracks View - Grouped by Track
            <div className="space-y-6">
              {Object.entries(sessionsByTrack).length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <TrendingUp
                    className="mx-auto mb-3 text-muted-foreground opacity-30"
                    size={48}
                  />
                  <p className="text-muted-foreground">No sessions found</p>
                </motion.div>
              ) : (
                Object.entries(sessionsByTrack).map(
                  ([track, trackSessions], trackIdx) => (
                    <motion.div
                      key={track}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: trackIdx * 0.1 }}
                    >
                      <motion.h3
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xl font-bold text-foreground mb-4 flex items-center gap-2"
                      >
                        <div className="w-1 h-6 bg-primary rounded-full" />
                        {track}
                        <span className="text-sm font-normal text-muted-foreground">
                          ({trackSessions.length})
                        </span>
                      </motion.h3>
                      <div className="space-y-3">
                        {trackSessions.map((session, idx) => (
                          <SessionCard
                            key={session.id}
                            session={session}
                            index={idx}
                            isStarred={starredSessions.includes(session.id)}
                            onToggleStar={() => toggleStarSession(session.id)}
                            isExpanded={expandedSession === session.id}
                            onToggleExpand={() =>
                              setExpandedSession(
                                expandedSession === session.id
                                  ? null
                                  : session.id
                              )
                            }
                            hasConflict={conflicts.has(session.id)}
                            onDownloadICS={() => generateICS(session)}
                            onGoogleCalendar={() =>
                              addToGoogleCalendar(session)
                            }
                            calendarMenuOpen={calendarMenuOpen === session.id}
                            onToggleCalendarMenu={() =>
                              setCalendarMenuOpen(
                                calendarMenuOpen === session.id
                                  ? null
                                  : session.id
                              )
                            }
                          />
                        ))}
                      </div>
                    </motion.div>
                  )
                )
              )}
            </div>
          ) : (
            // My Schedule View
            <div className="space-y-3">
              {filteredSessions.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Star
                    className="mx-auto mb-3 text-muted-foreground opacity-30"
                    size={48}
                  />
                  <p className="text-muted-foreground mb-2">
                    {starredSessions.length === 0
                      ? "No sessions starred yet"
                      : "No sessions match your filters"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {starredSessions.length === 0 &&
                      "Star sessions to build your personal schedule"}
                  </p>
                </motion.div>
              ) : (
                filteredSessions.map((session, idx) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    index={idx}
                    isStarred={true}
                    onToggleStar={() => toggleStarSession(session.id)}
                    isExpanded={expandedSession === session.id}
                    onToggleExpand={() =>
                      setExpandedSession(
                        expandedSession === session.id ? null : session.id
                      )
                    }
                    hasConflict={conflicts.has(session.id)}
                    onDownloadICS={() => generateICS(session)}
                    onGoogleCalendar={() => addToGoogleCalendar(session)}
                    calendarMenuOpen={calendarMenuOpen === session.id}
                    onToggleCalendarMenu={() =>
                      setCalendarMenuOpen(
                        calendarMenuOpen === session.id ? null : session.id
                      )
                    }
                  />
                ))
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  );
}

// Session Card Component
function SessionCard({
  session,
  index,
  isStarred,
  onToggleStar,
  isExpanded,
  onToggleExpand,
  hasConflict,
  onDownloadICS,
  onGoogleCalendar,
  calendarMenuOpen,
  onToggleCalendarMenu,
}: {
  session: Session;
  index: number;
  isStarred: boolean;
  onToggleStar: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  hasConflict: boolean;
  onDownloadICS: () => void;
  onGoogleCalendar: () => void;
  calendarMenuOpen: boolean;
  onToggleCalendarMenu: () => void;
}) {
  const typeConfig = TYPE_CONFIG[session.type];
  const TypeIcon = typeConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`bg-card rounded-xl border transition-all ${
        hasConflict
          ? "border-red-300 hover:border-red-400 hover:shadow-red-100/50"
          : "border-border hover:border-primary/30 hover:shadow-md"
      } overflow-hidden`}
      data-testid={`session-${session.id}`}
    >
      {/* Type indicator bar */}
      <div className={`h-1 ${typeConfig.bg}`} />

      <div className="p-4">
        {/* Header */}
        <div className="flex gap-3 mb-3">
          {/* Type Icon */}
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            className={`shrink-0 w-10 h-10 rounded-lg ${typeConfig.bg} flex items-center justify-center`}
          >
            <TypeIcon className={typeConfig.color} size={20} />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground leading-tight mb-1">
                  {session.title}
                </h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span className="font-medium">{session.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{session.room}</span>
                  </div>
                  {session.capacity && (
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{session.capacity}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Star Button */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStar();
                }}
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.1 }}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors shrink-0"
                data-testid={`star-${session.id}`}
              >
                <motion.div
                  animate={{
                    scale: isStarred ? [1, 1.3, 1] : 1,
                    rotate: isStarred ? [0, -15, 0] : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Star
                    size={20}
                    className={
                      isStarred
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }
                  />
                </motion.div>
              </motion.button>
            </div>

            {/* Badges */}
            <div className="flex gap-2 mb-3 flex-wrap">
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium ${typeConfig.bg} ${typeConfig.color}`}
              >
                {typeConfig.label}
              </span>
              <span className="px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                {session.track}
              </span>
              {hasConflict && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700"
                >
                  <AlertCircle size={12} />
                  Conflict
                </motion.span>
              )}
            </div>

            {/* Speakers/Moderator preview */}
            {(session.speakers || session.moderator) && !isExpanded && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <User size={14} />
                <span className="truncate">
                  {session.moderator && `Moderator: ${session.moderator.name}`}
                  {session.moderator && session.speakers && " • "}
                  {session.speakers &&
                    `${session.speakers.length} speaker${
                      session.speakers.length > 1 ? "s" : ""
                    }`}
                </span>
              </div>
            )}

            {/* Expand Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand();
              }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
              data-testid={`expand-${session.id}`}
            >
              {isExpanded ? "Hide Details" : "View Details"}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </motion.button>

            {/* Expanded Details */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    {/* Description */}
                    <p className="text-sm text-foreground leading-relaxed">
                      {session.description}
                    </p>

                    {/* Moderator */}
                    {session.moderator && (
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                          Moderator
                        </h4>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <User size={14} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {session.moderator.name}
                            </p>
                            {session.moderator.organization && (
                              <p className="text-xs text-muted-foreground">
                                {session.moderator.organization}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Speakers */}
                    {session.speakers && session.speakers.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                          Speaker{session.speakers.length > 1 ? "s" : ""}
                        </h4>
                        <div className="space-y-2">
                          {session.speakers.map((speaker, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-center gap-2 text-sm"
                            >
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <User size={14} className="text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">
                                  {speaker.name}
                                </p>
                                {speaker.organization && (
                                  <p className="text-xs text-muted-foreground">
                                    {speaker.organization}
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Papers */}
                    {session.papers && session.papers.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                          Research Papers
                        </h4>
                        <div className="space-y-2">
                          {session.papers.map((paper, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="text-sm"
                            >
                              <p className="font-medium text-foreground leading-snug mb-1">
                                {paper.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {paper.authors}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Calendar Action Button with Dropdown */}
                    <div className="relative">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleCalendarMenu();
                        }}
                        className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-sm"
                        data-testid={`calendar-${session.id}`}
                      >
                        <Calendar size={16} />
                        Add to Calendar
                      </motion.button>

                      {/* Calendar Options Dropdown */}
                      <AnimatePresence>
                        {calendarMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-full left-0 right-0 mb-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-10"
                          >
                            <motion.button
                              whileTap={{ scale: 0.98 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onGoogleCalendar();
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center gap-3 text-sm"
                            >
                              <Calendar size={16} className="text-primary" />
                              <span className="font-medium">
                                Google Calendar
                              </span>
                            </motion.button>
                            <motion.button
                              whileTap={{ scale: 0.98 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onDownloadICS();
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center gap-3 text-sm border-t border-border"
                            >
                              <Download size={16} className="text-primary" />
                              <span className="font-medium">
                                Apple Calendar / Outlook
                              </span>
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
