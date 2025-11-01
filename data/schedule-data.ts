// Schedule data for MIRG-ICAIR 2025 Conference
// November 4-6, 2025 at University of Lagos

export interface Speaker {
  name: string;
  title?: string;
  organization?: string;
}

export interface Session {
  id: string;
  time: string;
  startTime: number; // For conflict detection (24h format, e.g., 9.5 = 9:30)
  endTime: number;
  title: string;
  type:
    | "keynote"
    | "panel"
    | "masterclass"
    | "paper-session"
    | "workshop"
    | "networking"
    | "ceremony"
    | "break"
    | "talk"
    | "roundtable"
    | "tour"
    | "poster";
  speakers?: Speaker[];
  moderator?: Speaker;
  room: string;
  track:
    | "AI & Robotics"
    | "Research"
    | "Innovation"
    | "Education"
    | "Infrastructure"
    | "Ethics"
    | "General";
  description: string;
  capacity?: number;
  papers?: {
    title: string;
    authors: string;
  }[];
}

export interface DaySchedule {
  date: string;
  dayOfWeek: string;
  sessions: Session[];
}

export const CONFERENCE_SCHEDULE: Record<string, DaySchedule> = {
  "Day 1": {
    date: "November 4, 2025",
    dayOfWeek: "Tuesday",
    sessions: [
      {
        id: "d1-s1",
        time: "7:30 - 9:00",
        startTime: 7.5,
        endTime: 9,
        title: "Registration",
        type: "networking",
        room: "Main Lobby",
        track: "General",
        description: "Welcome and registration for all conference attendees",
      },
      {
        id: "d1-s2",
        time: "9:00 - 9:45",
        startTime: 9,
        endTime: 9.75,
        title: "Young People Innovators Panel",
        type: "panel",
        speakers: [
          { name: "Korin AI Team", organization: "Korin AI" },
          { name: "Dawn AI Team", organization: "Dawn AI" },
          { name: "YarnGPT Team", organization: "YarnGPT" },
        ],
        room: "Main Hall",
        track: "Innovation",
        description:
          "Emerging young innovators showcase their AI-driven solutions",
        capacity: 500,
      },
      {
        id: "d1-s3",
        time: "9:45 - 10:30",
        startTime: 9.75,
        endTime: 10.5,
        title: "Research Paper Presentations - Session 1",
        type: "paper-session",
        room: "Main Hall",
        track: "Research",
        description: "Academic research presentations on AI applications",
        papers: [
          {
            title:
              "Time Series Modeling for Fraud Activities in the Nigerian Banking Industry for 2025",
            authors: "Edosa Osa, Patience Orukpe, Emmanuel Imonmion",
          },
          {
            title:
              "Diffusion-GAN Hybrids Models for Resource-Efficient Text-to-Image Generation in African Contexts",
            authors: "Christian Anichebe",
          },
        ],
        capacity: 500,
      },
      {
        id: "d1-s4",
        time: "10:30 - 10:35",
        startTime: 10.5,
        endTime: 10.58,
        title: "Opening Prayer",
        type: "ceremony",
        room: "Main Hall",
        track: "General",
        description: "Conference opening prayer",
      },
      {
        id: "d1-s5",
        time: "10:35 - 10:40",
        startTime: 10.58,
        endTime: 10.67,
        title: "National Anthem",
        type: "ceremony",
        room: "Main Hall",
        track: "General",
        description: "National anthem and formal opening",
      },
      {
        id: "d1-s6",
        time: "10:40 - 10:50",
        startTime: 10.67,
        endTime: 10.83,
        title: "Recognition of Dignitaries",
        type: "ceremony",
        speakers: [
          { name: "Oluwaseun Ajigdagba", title: "Master of Ceremonies" },
        ],
        room: "Main Hall",
        track: "General",
        description: "Recognition of special guests and dignitaries",
      },
      {
        id: "d1-s7",
        time: "10:50 - 10:55",
        startTime: 10.83,
        endTime: 10.92,
        title: "Opening Remarks - Conference Chair",
        type: "ceremony",
        speakers: [
          {
            name: "Dr. Victor Odumuyiwa",
            title: "Conference Chair & MIRG Chair",
          },
        ],
        room: "Main Hall",
        track: "General",
        description: "Welcome address from the Conference Chair",
      },
      {
        id: "d1-s8",
        time: "10:55 - 11:00",
        startTime: 10.92,
        endTime: 11,
        title: "Opening Remarks - Head of Department",
        type: "ceremony",
        speakers: [
          {
            name: "Head of Computer Sciences",
            organization: "University of Lagos",
          },
        ],
        room: "Main Hall",
        track: "General",
        description:
          "Opening remarks from Head of Computer Sciences Department",
      },
      {
        id: "d1-s9",
        time: "11:00 - 11:10",
        startTime: 11,
        endTime: 11.17,
        title: "Goodwill Messages",
        type: "ceremony",
        speakers: [
          { name: "UNDP Representative" },
          { name: "Nigeria AI Lab" },
          { name: "Galaxy Backbone" },
          { name: "Google Representative" },
        ],
        room: "Main Hall",
        track: "General",
        description: "Goodwill messages from partner organizations",
      },
      {
        id: "d1-s10",
        time: "11:10 - 11:20",
        startTime: 11.17,
        endTime: 11.33,
        title: "Opening Remarks - Vice Chancellor",
        type: "ceremony",
        speakers: [
          { name: "Vice Chancellor", organization: "University of Lagos" },
        ],
        room: "Main Hall",
        track: "General",
        description: "Opening address from the Vice Chancellor",
      },
      {
        id: "d1-s11",
        time: "11:20 - 11:40",
        startTime: 11.33,
        endTime: 11.67,
        title: "Opening Remarks - Honourable Minister",
        type: "ceremony",
        speakers: [
          {
            name: "Dr. Bosun Tijani",
            title: "Honourable Minister",
            organization:
              "Ministry of Communications, Innovation and Digital Economy",
          },
        ],
        room: "Main Hall",
        track: "General",
        description: "Opening address from the Honourable Minister",
      },
      {
        id: "d1-s12",
        time: "11:40 - 12:15",
        startTime: 11.67,
        endTime: 12.25,
        title: "Keynote 1: Charting Nigeria's AI Future",
        type: "keynote",
        speakers: [
          {
            name: "Dr. Bunmi Ajala",
            title: "National Director",
            organization: "National Centre for AI and Robotics",
          },
        ],
        room: "Main Hall",
        track: "AI & Robotics",
        description:
          "Building a National Framework for Responsible and Inclusive Artificial Intelligence",
        capacity: 500,
      },
      {
        id: "d1-s13",
        time: "12:15 - 12:45",
        startTime: 12.25,
        endTime: 12.75,
        title: "Keynote 2: Lagos as a National AI Vanguard",
        type: "keynote",
        speakers: [
          {
            name: "Hon. Olatubosun Alake",
            title: "Commissioner",
            organization:
              "Lagos State Ministry of Innovation, Science, and Technology",
          },
        ],
        room: "Main Hall",
        track: "Innovation",
        description:
          "Aligning State Innovation Strategy with Nigeria's AI Future",
        capacity: 500,
      },
      {
        id: "d1-s14",
        time: "12:45 - 13:00",
        startTime: 12.75,
        endTime: 13,
        title: "Group Photograph",
        type: "networking",
        room: "Main Hall",
        track: "General",
        description: "Official conference group photograph",
      },
      {
        id: "d1-s15",
        time: "13:00 - 13:30",
        startTime: 13,
        endTime: 13.5,
        title: "Exhibition Tour",
        type: "tour",
        room: "Exhibition Hall",
        track: "General",
        description: "Tour of AI and robotics exhibition",
      },
      {
        id: "d1-s16",
        time: "13:30 - 14:30",
        startTime: 13.5,
        endTime: 14.5,
        title: "Panel 1: Trust, Ethics, and Inclusion",
        type: "panel",
        moderator: { name: "Daniel Emenahor", organization: "British Council" },
        speakers: [
          { name: "Ndidi Elue", organization: "Google DeepMind, New York" },
          {
            name: "Dr. Chijioke Okorie",
            organization: "University of Pretoria, South Africa",
          },
          {
            name: "Dr. Kemi Omotubora",
            organization: "University of Lagos, Nigeria",
          },
        ],
        room: "Main Hall",
        track: "Ethics",
        description: "Building responsible AI for Africa's Digital Economics",
        capacity: 500,
      },
      {
        id: "d1-s17",
        time: "14:15 - 14:30",
        startTime: 14.25,
        endTime: 14.5,
        title: "Sponsors Presentation",
        type: "networking",
        room: "Main Hall",
        track: "General",
        description: "Presentations from conference sponsors",
      },
      {
        id: "d1-s18",
        time: "14:30 - 15:30",
        startTime: 14.5,
        endTime: 15.5,
        title: "Lunch Break",
        type: "break",
        room: "Cafeteria",
        track: "General",
        description: "Lunch and networking opportunity",
        capacity: 500,
      },
      {
        id: "d1-s19",
        time: "15:30 - 16:00",
        startTime: 15.5,
        endTime: 16,
        title: "Keynote 3: Scaling Context-Aware AI Development",
        type: "keynote",
        speakers: [
          {
            name: "Dr. Tajudeen Gwadabe",
            organization: "Masakhane African Languages Hub",
          },
        ],
        room: "Main Hall",
        track: "AI & Robotics",
        description: "Community-driven data collection for African AI",
        capacity: 500,
      },
      {
        id: "d1-s20",
        time: "16:00 - 17:00",
        startTime: 16,
        endTime: 17,
        title: "Master Class 1: AI Fundamentals",
        type: "masterclass",
        speakers: [{ name: "Mr. Sodiq", title: "Facilitator" }],
        room: "Lab 1",
        track: "Education",
        description: "Hands-on session on AI development fundamentals",
        capacity: 80,
      },
      {
        id: "d1-s21",
        time: "17:00 - 17:30",
        startTime: 17,
        endTime: 17.5,
        title: "Talk: Cognitive Prosthetics",
        type: "talk",
        speakers: [{ name: "Mr. Emeka Okoye" }],
        room: "Main Hall",
        track: "AI & Robotics",
        description: "Knowledge Graphs for Smart City Governance",
        capacity: 300,
      },
    ],
  },
  "Day 2": {
    date: "November 5, 2025",
    dayOfWeek: "Wednesday",
    sessions: [
      {
        id: "d2-s1",
        time: "8:30 - 9:00",
        startTime: 8.5,
        endTime: 9,
        title: "Registration",
        type: "networking",
        room: "Main Lobby",
        track: "General",
        description: "Day 2 registration and opening ceremonies",
      },
      {
        id: "d2-s2",
        time: "9:30 - 10:30",
        startTime: 9.5,
        endTime: 10.5,
        title: "Master Class 2: AI for Autonomous Vehicles",
        type: "masterclass",
        speakers: [{ name: "Mr. Fredrick Akpoghene", organization: "JEHO" }],
        room: "Lab 1",
        track: "AI & Robotics",
        description: "Hands-on workshop on autonomous vehicle AI systems",
        capacity: 80,
      },
      {
        id: "d2-s3",
        time: "10:30 - 11:15",
        startTime: 10.5,
        endTime: 11.25,
        title: "Keynote 4: Data Licensing and Regulatory Aspects",
        type: "keynote",
        speakers: [
          {
            name: "Prof. Chijioke Okorie",
            organization: "University of Pretoria",
          },
        ],
        room: "Main Hall",
        track: "Ethics",
        description: "Legal and regulatory frameworks for AI development",
        capacity: 500,
      },
      {
        id: "d2-s4",
        time: "11:15 - 12:00",
        startTime: 11.25,
        endTime: 12,
        title: "Keynote 5: Africa in the Loop",
        type: "keynote",
        speakers: [
          {
            name: "Prof. Muhammad Abdul-Mageed",
            organization: "University of British Columbia",
          },
        ],
        room: "Main Hall",
        track: "AI & Robotics",
        description: "Co-Creating Speech & Language AI for Africa",
        capacity: 500,
      },
      {
        id: "d2-s5",
        time: "12:00 - 13:15",
        startTime: 12,
        endTime: 13.25,
        title: "Research Paper Presentations - Session 2",
        type: "paper-session",
        moderator: { name: "Dr. Babatunde Sawyerr" },
        room: "Main Hall",
        track: "Research",
        description: "AI research papers on NLP and African contexts",
        papers: [
          {
            title:
              "Addressing Artificial Intelligence Bias through Inclusivity: A Case Study with Nigerian Food Images",
            authors: "Samuel Oyefusi, Tito Osadebey, Micah Udeogu",
          },
          {
            title:
              "An Empirical Research Study On Yoruba Speech-Speech Model: Introducing YORI As An Ensemble Based Model",
            authors: "Samson Lasisi, Femi Idowu",
          },
          {
            title:
              "Harnessing DeepSeek for African NLP: A Performance Evaluation Across Low-Resource Language Tasks",
            authors: "Blessing Adetokunbo, Victor Odumuyiwa",
          },
          {
            title:
              "Ede: A Multi-Dialect Yoruba-to-English Translation Using a Custom Transformer Architecture",
            authors: "Faruq Afolabi, Fagbemi Tenifayo",
          },
        ],
        capacity: 500,
      },
      {
        id: "d2-s6",
        time: "13:15 - 13:45",
        startTime: 13.25,
        endTime: 13.75,
        title: "Sponsors Presentation",
        type: "networking",
        room: "Main Hall",
        track: "General",
        description: "Sponsor presentations and announcements",
      },
      {
        id: "d2-s7",
        time: "13:45 - 14:00",
        startTime: 13.75,
        endTime: 14,
        title: "Lunch Break",
        type: "break",
        room: "Cafeteria",
        track: "General",
        description: "Lunch and networking",
        capacity: 500,
      },
      {
        id: "d2-s8",
        time: "14:00 - 15:00",
        startTime: 14,
        endTime: 15,
        title: "Poster Presentation",
        type: "poster",
        room: "Exhibition Hall",
        track: "Research",
        description: "Academic poster presentations and networking",
        capacity: 200,
      },
      {
        id: "d2-s9",
        time: "13:30 - 15:00",
        startTime: 13.5,
        endTime: 15,
        title: "Executive Roundtable: Quadruple Helix Model",
        type: "roundtable",
        moderator: { name: "Dr. Victor Odumuyiwa" },
        room: "Conference Room A",
        track: "Innovation",
        description: "AI R&D and Innovation Scaling through collaboration",
        capacity: 50,
      },
      {
        id: "d2-s10",
        time: "15:00 - 16:00",
        startTime: 15,
        endTime: 16,
        title: "Panel 2: AI Infrastructure and Startup Innovation",
        type: "panel",
        moderator: { name: "Dr. William Tsuma" },
        speakers: [
          {
            name: "Dr. Sanmi Koyejo",
            organization: "Stanford University / Black in AI",
          },
          { name: "Opeyemi Folorunsho", organization: "Moniepoint Group" },
          { name: "Fatima Tambajang", organization: "NVIDIA" },
          { name: "Chinazo Anebelundu", organization: "Data Science Nigeria" },
        ],
        room: "Main Hall",
        track: "Infrastructure",
        description: "Building Scalable Pathways for Business Growth in Africa",
        capacity: 500,
      },
      {
        id: "d2-s11",
        time: "16:00 - 17:00",
        startTime: 16,
        endTime: 17,
        title: "Research Paper Presentations - Session 3",
        type: "paper-session",
        room: "Main Hall",
        track: "Research",
        description: "Papers on AI applications in banking and agriculture",
        papers: [
          {
            title:
              "Artificial Intelligence Intervention for Mitigating Fraud and Forgeries in the Nigerian Banking Industry",
            authors: "Edosa Osa, Patience Orukpe, Solomon Igori",
          },
          {
            title: "Fine-Tuning GPT-2 with LoRA for African Recipe Generation",
            authors: "Blessing Towoju, Victor Odumuyiwa",
          },
          {
            title:
              "Forecasting Bush Mango (Irvingia Gabonesis) Fruit Yields using Machine Learning Models",
            authors: "Babatunde Bamgbade",
          },
        ],
        capacity: 500,
      },
      {
        id: "d2-s12",
        time: "17:00 - 18:00",
        startTime: 17,
        endTime: 18,
        title: "Research Paper Presentations - Session 4",
        type: "paper-session",
        room: "Main Hall",
        track: "Research",
        description: "Papers on ML applications in healthcare and IoT",
        papers: [
          {
            title:
              "Ano-SNELA: Anomaly Detection in Heartbeat ECG Using Stratified Normalization Enhanced LSTM-Autoencoder",
            authors:
              "Olabisi Johnson, Felix Aranuwa, Olanrewaju Johnson, Ezekiel Oyekanmi",
          },
          {
            title:
              "Baseline Study of Different Optimization Trends Analysis Methods to Enhance IoT-Driven Irrigation System",
            authors:
              "Dauda Isiaka, Afolayan Obiniyi, Victoria Yemi-Peters, Joshua Agbogun",
          },
          {
            title:
              "Attention-Based Long Short-Term Memory Network Model for News Media Sentiment Analysis with Extra Attention on Emojis",
            authors: "Olayinka Olarewaju, Emeka Ogbuju, Francisca Oladipo",
          },
        ],
        capacity: 500,
      },
      {
        id: "d2-s13",
        time: "18:00 - 19:00",
        startTime: 18,
        endTime: 19,
        title: "Campus Tour",
        type: "tour",
        room: "Campus",
        track: "General",
        description: "Guided tour around University of Lagos campus",
        capacity: 100,
      },
    ],
  },
  "Day 3": {
    date: "November 6, 2025",
    dayOfWeek: "Thursday",
    sessions: [
      {
        id: "d3-s1",
        time: "8:30 - 9:00",
        startTime: 8.5,
        endTime: 9,
        title: "Registration",
        type: "networking",
        room: "Main Lobby",
        track: "General",
        description: "Day 3 registration and opening ceremonies",
      },
      {
        id: "d3-s2",
        time: "9:30 - 10:15",
        startTime: 9.5,
        endTime: 10.25,
        title: "Keynote 6: Using RLHF to Build AI for Africa",
        type: "keynote",
        speakers: [
          {
            name: "Dr. Avishkar Bhoopchand",
            organization: "Google DeepMind London",
          },
        ],
        room: "Main Hall",
        track: "AI & Robotics",
        description: "Using RLHF to Build AI that Serves African Priorities",
        capacity: 500,
      },
      {
        id: "d3-s3",
        time: "10:15 - 11:30",
        startTime: 10.25,
        endTime: 11.5,
        title: "Panel 3: Robotics for Sectoral Transformation",
        type: "panel",
        speakers: [
          { name: "Dr. Olatunji Omisore" },
          {
            name: "Dr. Olusola Ayoola",
            organization: "Robotics and AI Lab, Ibadan",
          },
          {
            name: "Dr. Chika Yinka-Banjo",
            organization: "AI and Robotics Lab, UNILAG",
          },
          { name: "Mr. Fredrick Akpoghene", organization: "JEHO" },
        ],
        room: "Main Hall",
        track: "AI & Robotics",
        description: "Positioning Nigeria in the Global Robotics Value Chain",
        capacity: 500,
      },
      {
        id: "d3-s4",
        time: "11:30 - 12:30",
        startTime: 11.5,
        endTime: 12.5,
        title: "Research Paper Presentations - Session 5",
        type: "paper-session",
        room: "Main Hall",
        track: "Research",
        description: "Papers on AI in education and social media analysis",
        papers: [
          {
            title:
              "Organisational Climate and Intention to Use Generative AI among Academic Staff of a Nigerian University",
            authors: "Kingsley'Et Abang",
          },
          {
            title:
              "Reassessing Public Perception of the NYSC: A Large Language Model Analysis of Social Media Discourse",
            authors:
              "Kayode Makinde, Oluwatimileyin Onasanya, Frances Adelakun, Adebayo Abayomi-Alli",
          },
          {
            title:
              "Nigerian Higher Education in the 5th Industrial Revolution: An AI-Enabled Flipped Learning Model",
            authors: "Ugbedeojo Abba",
          },
        ],
        capacity: 500,
      },
      {
        id: "d3-s5",
        time: "12:30 - 13:30",
        startTime: 12.5,
        endTime: 13.5,
        title: "Panel 4: Domesticating AI for Inclusive Education",
        type: "panel",
        moderator: { name: "Jude Adejumo", organization: "ccHub" },
        speakers: [
          {
            name: "Dr. Adedeji Adeniran",
            organization: "Centre for the Study of the Economies of Africa",
          },
          { name: "Dr. Oladipupo Sennaike", organization: "Nigeria AI Lab" },
          { name: "Dr. Toyosi Akerele", organization: "RiseNetworks" },
          {
            name: "Dr. Yinka Adewunmi",
            organization: "UNILAG Innovation & Technology Office",
          },
          { name: "Mr. Peter Adeyemi", organization: "Cubbes" },
        ],
        room: "Main Hall",
        track: "Education",
        description: "AI adoption strategies for African education systems",
        capacity: 500,
      },
      {
        id: "d3-s6",
        time: "13:30 - 14:00",
        startTime: 13.5,
        endTime: 14,
        title: "Talk: AI and Economics",
        type: "talk",
        speakers: [{ name: "UNDP Representative" }],
        room: "Main Hall",
        track: "Innovation",
        description: "Economic impacts and opportunities of AI in Africa",
        capacity: 300,
      },
      {
        id: "d3-s7",
        time: "14:00 - 14:15",
        startTime: 14,
        endTime: 14.25,
        title: "National AI Innovation Challenge Launch",
        type: "ceremony",
        speakers: [{ name: "Ms. Elsie Atafuah", title: "UNDP RR in Nigeria" }],
        room: "Main Hall",
        track: "Innovation",
        description: "Launch of AI UNIPOD Pre-Launch initiative",
        capacity: 500,
      },
      {
        id: "d3-s8",
        time: "14:15 - 15:00",
        startTime: 14.25,
        endTime: 15,
        title: "Lunch Break",
        type: "break",
        room: "Cafeteria",
        track: "General",
        description: "Lunch and networking",
        capacity: 500,
      },
      {
        id: "d3-s9",
        time: "15:00 - 16:15",
        startTime: 15,
        endTime: 16.25,
        title: "Master Class 3: Accelerating AI Innovation",
        type: "masterclass",
        speakers: [{ name: "Mr. Alex Tsado", organization: "AI Alliance" }],
        room: "Lab 1",
        track: "Infrastructure",
        description: "Africa GPU Hub and AI acceleration infrastructure",
        capacity: 80,
      },
      {
        id: "d3-s10",
        time: "16:15 - 17:15",
        startTime: 16.25,
        endTime: 17.25,
        title: "Research Paper Presentations - Session 6",
        type: "paper-session",
        room: "Main Hall",
        track: "Research",
        description: "Final research papers on AI in education",
        papers: [
          {
            title:
              "Machine Learning Models for First-Year GPA Prediction in Nigerian Tertiary Institutions",
            authors: "Khalid Ahmad, Fati Ochepa, Faruk Ahmed, Ismail Ahmad",
          },
          {
            title:
              "Exploring the integration of RAG and LLMs for exam question generation in Zimbabwe",
            authors: "Praise Takunda Ganyiwa",
          },
          {
            title:
              "Starlight: Data-Driven Framework for Improving Academic Performance in Nigerian Secondary Education",
            authors:
              "Joshua Edun, Kayode Makinde, Mbuotidem Awak, Joshua Salako",
          },
        ],
        capacity: 500,
      },
      {
        id: "d3-s11",
        time: "17:15 - 18:15",
        startTime: 17.25,
        endTime: 18.25,
        title: "AI UniPod Tour",
        type: "tour",
        room: "AI UniPod",
        track: "General",
        description: "Exclusive tour of the AI UniPod facility",
        capacity: 50,
      },
      {
        id: "d3-s12",
        time: "18:30 - 20:00",
        startTime: 18.5,
        endTime: 20,
        title: "Cocktail & Closing Ceremony",
        type: "ceremony",
        room: "Main Hall",
        track: "General",
        description: "Conference closing ceremony and networking cocktail",
        capacity: 500,
      },
    ],
  },
};

// Helper functions
export function getAllSessions(): Session[] {
  return Object.values(CONFERENCE_SCHEDULE).flatMap((day) => day.sessions);
}

export function getSessionsByDay(day: string): Session[] {
  return CONFERENCE_SCHEDULE[day]?.sessions || [];
}

export function getSessionsByType(type: Session["type"]): Session[] {
  return getAllSessions().filter((session) => session.type === type);
}

export function getSessionsByTrack(track: Session["track"]): Session[] {
  return getAllSessions().filter((session) => session.track === track);
}

export function searchSessions(query: string): Session[] {
  const lowerQuery = query.toLowerCase();
  return getAllSessions().filter(
    (session) =>
      session.title.toLowerCase().includes(lowerQuery) ||
      session.description.toLowerCase().includes(lowerQuery) ||
      session.speakers?.some((s) =>
        s.name.toLowerCase().includes(lowerQuery)
      ) ||
      session.moderator?.name.toLowerCase().includes(lowerQuery)
  );
}
