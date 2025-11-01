"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Users,
  Mic2,
  GraduationCap,
  MessageSquare,
  Building2,
  MapPin,
  ExternalLink,
  X,
} from "lucide-react";

type SpeakerCategory = "keynote" | "masterclass" | "panel" | "workshop" | "all";

interface Speaker {
  id: string;
  name: string;
  title: string;
  organization: string;
  location?: string;
  bio: string;
  topic?: string;
  category: SpeakerCategory[];
  image: string;
  linkedin?: string;
  twitter?: string;
}

const SPEAKERS: Speaker[] = [
  {
    id: "1",
    name: "Dr. Bunmi Ajala",
    title: "Senior Special Adviser",
    organization: "Ministry of Communications, Innovation and Digital Economy",
    location: "Nigeria",
    bio: "Dr. Bunmi Ajala serves as Senior Special Adviser to the Minister of Communications, Innovation and Digital Economy in Nigeria. With extensive experience in digital policy and innovation, she has been instrumental in shaping Nigeria's digital transformation agenda.",
    topic: "Digital Innovation Policy in Nigeria",
    category: ["keynote"],
    image: "/speakers/bunmi-ajala.jpg",
  },
  {
    id: "2",
    name: "Prof. Chijioke Okorie",
    title: "Professor",
    organization: "University of Pretoria",
    location: "South Africa",
    bio: "Prof. Chijioke Okorie is a distinguished academic at the University of Pretoria, South Africa. His research focuses on artificial intelligence applications in African contexts and sustainable technology development.",
    topic: "AI for Sustainable Development in Africa",
    category: ["keynote", "panel"],
    image: "/speakers/chijioke-okorie.jpg",
  },
  {
    id: "3",
    name: "Hon. Olatubosun Alake",
    title: "Commissioner",
    organization: "Lagos State Ministry of Innovation, Science, and Technology",
    location: "Lagos, Nigeria",
    bio: "As Lagos State Commissioner for Innovation, Science, and Technology, Hon. Olatubosun Alake drives technology adoption and innovation across Africa's largest city, fostering an ecosystem for startups and tech companies.",
    topic: "Smart Cities and Innovation Ecosystems",
    category: ["keynote"],
    image: "/speakers/olatubosun-alake.jpg",
  },
  {
    id: "4",
    name: "Fatima Tambajang",
    title: "Developer Relations, Startups & VC Ecosystem",
    organization: "NVIDIA",
    location: "USA",
    bio: "Fatima Tambajang leads developer relations for startups and the VC ecosystem at NVIDIA, connecting cutting-edge AI technology with emerging ventures and supporting the growth of AI-powered startups globally.",
    topic: "AI Infrastructure for Startups",
    category: ["masterclass", "panel"],
    image: "/speakers/fatima-tambajang.jpg",
  },
  {
    id: "5",
    name: "Dr. Avishkar Bhoopchand",
    title: "Research Engineer",
    organization: "Google DeepMind",
    location: "London, UK",
    bio: "Dr. Avishkar Bhoopchand is a Research Engineer at Google DeepMind in London, where he works on advancing artificial intelligence through deep learning research and developing next-generation AI systems.",
    topic: "Advances in Deep Learning Research",
    category: ["keynote", "masterclass"],
    image: "/speakers/avishkar-bhoopchand.jpg",
  },
  {
    id: "6",
    name: "Ndidi M. Elue",
    title: "Corporate Counsel",
    organization: "Google DeepMind",
    location: "London, UK",
    bio: "Ndidi M. Elue serves as Corporate Counsel at Google DeepMind, specializing in AI ethics, policy, and the legal frameworks governing artificial intelligence development and deployment.",
    topic: "AI Ethics and Legal Frameworks",
    category: ["panel", "workshop"],
    image: "/speakers/ndidi-elue.jpg",
  },
  {
    id: "7",
    name: "Dr. Bayo Adekanmbi",
    title: "Founder & CEO",
    organization: "Data Science Nigeria",
    location: "Nigeria",
    bio: "Dr. Bayo Adekanmbi is the Founder and Chief Executive Officer of Data Science Nigeria, a non-profit dedicated to building AI talent across Africa. Under his leadership, DSN has trained thousands of AI practitioners.",
    topic: "Building AI Talent in Africa",
    category: ["keynote"],
    image: "/speakers/bayo-adekanmbi.jpg",
  },
  {
    id: "8",
    name: "Dr. Sanmi Koyejo",
    title: "Assistant Professor, Computer Science",
    organization: "Stanford University",
    location: "California, USA",
    bio: "Dr. Sanmi Koyejo is an Assistant Professor of Computer Science at Stanford University. His research focuses on machine learning, particularly in developing robust and interpretable AI systems.",
    topic: "Robust and Interpretable Machine Learning",
    category: ["keynote", "masterclass"],
    image: "/speakers/sanmi-koyejo.jpg",
  },
  {
    id: "9",
    name: "Prof. Muhammad Abdul-Mageed",
    title: "Canada Research Chair",
    organization: "University of British Columbia",
    location: "Vancouver, Canada",
    bio: "Prof. Muhammad Abdul-Mageed holds the Canada Research Chair at the University of British Columbia. His work focuses on natural language processing, particularly for low-resource languages and multilingual AI.",
    topic: "Multilingual AI and NLP",
    category: ["keynote", "masterclass"],
    image: "/speakers/muhammad-abdul-mageed.jpg",
  },
  {
    id: "10",
    name: "Dr. Adedeji Adeniran",
    title: "Director of Research",
    organization: "Center for the Study of the Economies of Africa (CSEA)",
    location: "Nigeria",
    bio: "Dr. Adedeji Adeniran directs research at CSEA, focusing on economic policy analysis and development economics. His work examines the intersection of technology, innovation, and economic growth in Africa.",
    topic: "AI and Economic Development",
    category: ["panel"],
    image: "/speakers/adedeji-adeniran.jpg",
  },
  {
    id: "11",
    name: "Dr. Tajuddeen Gwadabe",
    title: "Programs and MEL Lead",
    organization: "Masakhane African Languages Hub",
    location: "Africa",
    bio: "Dr. Tajuddeen Gwadabe leads programs and monitoring, evaluation, and learning at Masakhane, a grassroots organization focused on NLP for African languages, working to ensure linguistic diversity in AI.",
    topic: "African Languages in AI",
    category: ["masterclass", "panel"],
    image: "/speakers/tajuddeen-gwadabe.jpg",
  },
  {
    id: "12",
    name: "Alex Tsado",
    title: "Co-Founder",
    organization: "Ahura AI, Alliance 4 AI",
    location: "Nigeria",
    bio: "Alex Tsado is Co-Founder of Ahura AI and Alliance 4 AI, working at the forefront of AI entrepreneurship in Africa. He focuses on building AI solutions for African challenges and fostering AI innovation ecosystems.",
    topic: "AI Entrepreneurship in Africa",
    category: ["panel", "workshop"],
    image: "/speakers/alex-tsado.jpg",
  },
];

const CATEGORY_CONFIG = {
  all: { label: "All Speakers", icon: Users, color: "primary" },
  keynote: { label: "Keynote", icon: Mic2, color: "red" },
  masterclass: { label: "Masterclass", icon: GraduationCap, color: "blue" },
  panel: { label: "Panel", icon: MessageSquare, color: "green" },
  workshop: { label: "Workshop", icon: Building2, color: "purple" },
};

function SpeakerCard({
  speaker,
  onClick,
}: {
  speaker: Speaker;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
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
        {/* Actual image - lazy loaded */}
        <img
          src={speaker.image}
          alt={speaker.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Hide image if it fails to load, showing initials instead
            e.currentTarget.style.display = "none";
          }}
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
          <Building2 className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground line-clamp-2">
            {speaker.organization}
          </p>
        </div>

        {/* Category badges */}
        <div className="flex flex-wrap gap-1.5">
          {speaker.category.map((cat) => {
            const config = CATEGORY_CONFIG[cat];
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

          {/* Social links */}
          {(speaker.linkedin || speaker.twitter) && (
            <div className="flex gap-3 pt-2">
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
          )}
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

  const filteredSpeakers = SPEAKERS.filter((speaker) => {
    const matchesSearch =
      speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.topic?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || speaker.category.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8">
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
          <motion.div
            key={speaker.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx }}
          >
            <SpeakerCard
              speaker={speaker}
              onClick={() => setSelectedSpeaker(speaker)}
            />
          </motion.div>
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
      {selectedSpeaker && (
        <SpeakerModal
          speaker={selectedSpeaker}
          onClose={() => setSelectedSpeaker(null)}
        />
      )}

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
