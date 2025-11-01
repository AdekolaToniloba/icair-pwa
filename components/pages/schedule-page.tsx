// code/components/pages/schedule-page.tsx
"use client";

import { motion } from "framer-motion";
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
} from "lucide-react";
import { useScheduleStore } from "@/store/schedule-store";

// Session data structure
interface Session {
  id: string;
  time: string;
  startTime: number;
  endTime: number;
  title: string;
  speaker: string;
  room: string;
  track: "Keynote" | "Workshop" | "Panel" | "Technical" | "Networking";
  level: "Beginner" | "Intermediate" | "Advanced";
  capacity: number;
  description: string;
  avatar?: string;
}

const sessions: Record<string, Session[]> = {
  "Nov 4": [
    {
      id: "s1",
      time: "09:00-10:00",
      startTime: 9,
      endTime: 10,
      title: "Opening Keynote",
      speaker: "Dr. Sarah Chen",
      room: "Main Hall",
      track: "Keynote",
      level: "All" as any,
      capacity: 500,
      description:
        "An inspiring welcome address and overview of the conference themes.",
      avatar: "👩‍💼",
    },
    {
      id: "s2",
      time: "10:15-11:15",
      startTime: 10.25,
      endTime: 11.25,
      title: "AI in Higher Education",
      speaker: "Prof. James Okafor",
      room: "Room A",
      track: "Technical",
      level: "Intermediate",
      capacity: 80,
      description:
        "Exploring applications of artificial intelligence in academic institutions.",
      avatar: "👨‍🏫",
    },
    {
      id: "s3",
      time: "10:15-11:15",
      startTime: 10.25,
      endTime: 11.25,
      title: "Digital Transformation Workshop",
      speaker: "Chioma Adeyemi",
      room: "Room B",
      track: "Workshop",
      level: "Beginner",
      capacity: 60,
      description:
        "Hands-on workshop on digital transformation strategies for institutions.",
      avatar: "👩‍💻",
    },
    {
      id: "s4",
      time: "11:30-12:30",
      startTime: 11.5,
      endTime: 12.5,
      title: "Research Excellence Panel",
      speaker: "Multiple Speakers",
      room: "Main Hall",
      track: "Panel",
      level: "Advanced",
      capacity: 200,
      description:
        "Leading researchers discuss cutting-edge findings and future directions.",
      avatar: "🎤",
    },
    {
      id: "s5",
      time: "12:30-13:30",
      startTime: 12.5,
      endTime: 13.5,
      title: "Lunch Break",
      speaker: "Networking",
      room: "Cafeteria",
      track: "Networking",
      level: "All" as any,
      capacity: 500,
      description: "Enjoy lunch and network with fellow attendees.",
      avatar: "🍽️",
    },
    {
      id: "s6",
      time: "14:00-15:00",
      startTime: 14,
      endTime: 15,
      title: "Future of Education Technology",
      speaker: "Dr. Amara Eze",
      room: "Room C",
      track: "Technical",
      level: "Intermediate",
      capacity: 100,
      description:
        "Emerging technologies shaping the future of educational experiences.",
      avatar: "👩‍🔬",
    },
    {
      id: "s7",
      time: "15:15-16:15",
      startTime: 15.25,
      endTime: 16.25,
      title: "Networking Session",
      speaker: "All Attendees",
      room: "Conference Lounge",
      track: "Networking",
      level: "All" as any,
      capacity: 300,
      description:
        "Informal networking session to connect with peers and speakers.",
      avatar: "🤝",
    },
  ],
  "Nov 5": [
    {
      id: "s8",
      time: "09:00-10:00",
      startTime: 9,
      endTime: 10,
      title: "Advanced Python Programming",
      speaker: "Dr. Tunde Adesina",
      room: "Lab 1",
      track: "Workshop",
      level: "Advanced",
      capacity: 40,
      description:
        "Deep dive into advanced Python concepts and best practices.",
      avatar: "🐍",
    },
    {
      id: "s9",
      time: "10:15-11:15",
      startTime: 10.25,
      endTime: 11.25,
      title: "Cloud Infrastructure Basics",
      speaker: "Zainab Hassan",
      room: "Room D",
      track: "Technical",
      level: "Beginner",
      capacity: 75,
      description:
        "Introduction to cloud computing concepts and AWS fundamentals.",
      avatar: "☁️",
    },
    {
      id: "s10",
      time: "11:30-12:30",
      startTime: 11.5,
      endTime: 12.5,
      title: "Industry Insights Panel",
      speaker: "Multiple Speakers",
      room: "Main Hall",
      track: "Panel",
      level: "Intermediate",
      capacity: 250,
      description:
        "Tech leaders share insights on industry trends and career opportunities.",
      avatar: "💼",
    },
    {
      id: "s11",
      time: "14:00-15:30",
      startTime: 14,
      endTime: 15.5,
      title: "Project Showcase",
      speaker: "Student Teams",
      room: "Exhibition Hall",
      track: "Technical",
      level: "Beginner",
      capacity: 150,
      description:
        "Students showcase innovative projects and research findings.",
      avatar: "🎯",
    },
    {
      id: "s12",
      time: "16:00-17:00",
      startTime: 16,
      endTime: 17,
      title: "Closing Ceremony",
      speaker: "Conference Organizers",
      room: "Main Hall",
      track: "Keynote",
      level: "All" as any,
      capacity: 500,
      description: "Conference highlights, awards, and closing remarks.",
      avatar: "🏆",
    },
  ],
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function SchedulePage() {
  const [viewType, setViewType] = useState<"agenda" | "tracks" | "my-schedule">(
    "agenda"
  );
  const [selectedDay, setSelectedDay] = useState<"Nov 4" | "Nov 5">("Nov 4");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const { starredSessions, toggleStarSession } = useScheduleStore();

  // Get all unique tracks and levels
  const allTracks = Array.from(
    new Set(
      Object.values(sessions)
        .flat()
        .map((s) => s.track)
    )
  );
  const allLevels = Array.from(
    new Set(
      Object.values(sessions)
        .flat()
        .map((s) => s.level)
    )
  );

  // Filter and search logic
  const filteredSessions = useMemo(() => {
    let result = Object.values(sessions)
      .flat()
      .filter((session) => {
        const matchesSearch =
          session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          session.speaker.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTrack = !selectedTrack || session.track === selectedTrack;
        const matchesLevel = !selectedLevel || session.level === selectedLevel;

        return matchesSearch && matchesTrack && matchesLevel;
      });

    if (viewType === "agenda") {
      result = result.filter((s) => sessions[selectedDay].includes(s));
    } else if (viewType === "my-schedule") {
      result = result.filter((s) => starredSessions.includes(s.id));
    }

    return result;
  }, [
    searchQuery,
    selectedTrack,
    selectedLevel,
    viewType,
    selectedDay,
    starredSessions,
  ]);

  // Conflict detection
  const conflicts = useMemo(() => {
    const starred = Object.values(sessions)
      .flat()
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

  const generateICS = (session: Session) => {
    const start = new Date(
      "2025-11-04T" + session.time.split("-")[0] + ":00"
    ).toISOString();
    const end = new Date(
      "2025-11-04T" + session.time.split("-")[1] + ":00"
    ).toISOString();

    const ical = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//UNILAG Conference//EN
BEGIN:VEVENT
UID:${session.id}@unilag.edu
DTSTAMP:${new Date().toISOString()}
DTSTART:${start}
DTEND:${end}
SUMMARY:${session.title}
DESCRIPTION:${session.description}
LOCATION:${session.room}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ical], { type: "text/calendar" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${session.title.replace(/\s+/g, "_")}.ics`;
    link.click();
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="px-4 py-6 sm:px-6 sm:py-8 pb-8"
    >
      <h2
        className="text-2xl font-bold mb-6 text-foreground"
        data-testid="schedule-title"
      >
        Conference Schedule
      </h2>

      {/* View Type Tabs */}
      <motion.div
        variants={item}
        className="flex gap-2 mb-6 overflow-x-auto pb-2"
        role="tablist"
        aria-label="Schedule view options"
      >
        {(["agenda", "tracks", "my-schedule"] as const).map((view) => (
          <motion.button
            key={view}
            onClick={() => setViewType(view)}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
              viewType === view
                ? "bg-primary text-white"
                : "bg-primary/10 text-primary hover:bg-primary/20"
            }`}
            data-testid={`view-${view}`}
            role="tab"
            aria-selected={viewType === view}
            aria-controls={`${view}-panel`}
          >
            {view === "agenda" && "Agenda"}
            {view === "tracks" && "Tracks"}
            {view === "my-schedule" && "My Schedule"}
          </motion.button>
        ))}
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        variants={item}
        className="bg-card rounded-lg border border-border p-4 mb-6"
      >
        {/* Search Bar */}
        <div className="mb-4">
          <label
            htmlFor="session-search"
            className="text-sm font-medium text-foreground mb-2 block"
          >
            Search Sessions
          </label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
              aria-hidden="true"
            />
            <input
              id="session-search"
              type="text"
              placeholder="Search sessions or speakers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
              data-testid="search-input"
              aria-label="Search sessions by title or speaker name"
            />
          </div>
        </div>

        {/* Filter Options */}
        <div className="space-y-3">
          {/* Day Selection (for Agenda view) */}
          {viewType === "agenda" && (
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Day
              </label>
              <div
                className="flex gap-2"
                role="group"
                aria-label="Conference days"
              >
                {["Nov 4", "Nov 5"].map((day) => (
                  <motion.button
                    key={day}
                    onClick={() => setSelectedDay(day as "Nov 4" | "Nov 5")}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      selectedDay === day
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                    data-testid={`day-${day}`}
                    aria-pressed={selectedDay === day}
                  >
                    {day}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Track Filter */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
              <Filter size={16} aria-hidden="true" />
              Track
            </label>
            <div
              className="flex gap-2 flex-wrap"
              role="group"
              aria-label="Session tracks"
            >
              <motion.button
                onClick={() => setSelectedTrack(null)}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  !selectedTrack
                    ? "bg-primary text-white"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
                aria-pressed={!selectedTrack}
              >
                All
              </motion.button>
              {allTracks.map((track) => (
                <motion.button
                  key={track}
                  onClick={() =>
                    setSelectedTrack(selectedTrack === track ? null : track)
                  }
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 rounded-full text-xs transition-all ${
                    selectedTrack === track
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                  data-testid={`track-${track}`}
                  aria-pressed={selectedTrack === track}
                >
                  {track}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Level
            </label>
            <div
              className="flex gap-2 flex-wrap"
              role="group"
              aria-label="Session levels"
            >
              <motion.button
                onClick={() => setSelectedLevel(null)}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  !selectedLevel
                    ? "bg-primary text-white"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
                aria-pressed={!selectedLevel}
              >
                All
              </motion.button>
              {allLevels.map((level) => (
                <motion.button
                  key={level}
                  onClick={() =>
                    setSelectedLevel(selectedLevel === level ? null : level)
                  }
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 rounded-full text-xs transition-all ${
                    selectedLevel === level
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                  data-testid={`level-${level}`}
                  aria-pressed={selectedLevel === level}
                >
                  {level}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Conflict Warning */}
      {conflicts.size > 0 && (
        <motion.div
          variants={item}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3"
          data-testid="conflict-warning"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle
            size={20}
            className="text-red-600 flex-shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold text-red-900">
              Schedule Conflict Detected
            </p>
            <p className="text-sm text-red-800">
              {conflicts.size} of your selected sessions overlap. Please review
              your choices.
            </p>
          </div>
        </motion.div>
      )}

      {/* Sessions Display */}
      <motion.div variants={item} id={`${viewType}-panel`} role="tabpanel">
        {viewType === "agenda" ? (
          // Agenda View - Timeline
          <div className="space-y-3">
            {filteredSessions.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No sessions found
              </p>
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
                />
              ))
            )}
          </div>
        ) : viewType === "tracks" ? (
          // Tracks View - Grouped by Category
          <div className="space-y-6">
            {Object.entries(sessionsByTrack).length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No sessions found
              </p>
            ) : (
              Object.entries(sessionsByTrack).map(
                ([track, trackSessions], trackIdx) => (
                  <motion.div
                    key={track}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: trackIdx * 0.1 }}
                  >
                    <h3
                      className="text-lg font-bold text-foreground mb-3"
                      data-testid={`track-header-${track}`}
                    >
                      {track}
                    </h3>
                    <div className="space-y-2">
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
                              expandedSession === session.id ? null : session.id
                            )
                          }
                          hasConflict={conflicts.has(session.id)}
                          onDownloadICS={() => generateICS(session)}
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
              <motion.div variants={item} className="text-center py-8">
                <Star
                  className="mx-auto mb-2 text-muted-foreground"
                  size={32}
                />
                <p className="text-muted-foreground">
                  {starredSessions.length === 0
                    ? "No sessions starred yet. Star sessions to add them to your schedule!"
                    : "No sessions match your filters"}
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
                />
              ))
            )}
          </div>
        )}
      </motion.div>
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
}: {
  session: Session;
  index: number;
  isStarred: boolean;
  onToggleStar: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  hasConflict: boolean;
  onDownloadICS: () => void;
}) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-700";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "Advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className={`bg-card rounded-lg border transition-all cursor-pointer ${
        hasConflict
          ? "border-red-300 hover:border-red-500 hover:shadow-red-200/50"
          : "border-border hover:border-primary/30 hover:shadow-lg"
      }`}
      data-testid={`session-${session.id}`}
    >
      <div className="p-4">
        <div className="flex gap-3">
          {/* Avatar/Icon */}
          <div className="flex-shrink-0 text-3xl mt-1">{session.avatar}</div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-foreground">{session.title}</h3>
                  {hasConflict && (
                    <AlertCircle
                      size={16}
                      className="text-red-600 flex-shrink-0"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock size={14} />
                  {session.time}
                </div>
              </div>

              {/* Star Button */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStar();
                }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: isStarred ? 0 : 0 }}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors flex-shrink-0"
                data-testid={`star-${session.id}`}
              >
                <Star
                  size={20}
                  className={
                    isStarred
                      ? "fill-secondary text-secondary"
                      : "text-muted-foreground"
                  }
                />
              </motion.button>
            </div>

            {/* Metadata */}
            <div className="flex gap-3 mb-3 flex-wrap items-center">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <User size={14} />
                {session.speaker}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin size={14} />
                {session.room}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users size={14} />
                {session.capacity}
              </div>
            </div>

            {/* Level Badge and Track */}
            <div className="flex gap-2 mb-3">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(
                  session.level
                )}`}
              >
                {session.level}
              </span>
              <span className="px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                {session.track}
              </span>
            </div>

            {/* Expand/Collapse Section */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand();
              }}
              className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
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
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-border space-y-3"
              >
                <p className="text-sm text-foreground">{session.description}</p>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDownloadICS();
                    }}
                    className="flex-1 px-3 py-2 bg-primary text-white rounded font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    data-testid={`calendar-${session.id}`}
                  >
                    <Download size={14} />
                    Add to Calendar
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
