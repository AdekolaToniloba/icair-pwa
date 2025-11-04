// speakers-data.ts
// Comprehensive speaker database for MIRG-ICAIR 2025

export interface Speaker {
  id: string;
  name: string;
  title: string;
  organization: string;
  location?: string;
  bio: string;
  topic?: string;
  category: SpeakerCategory[];
  image: string;
  blurDataURL?: string; // For blur-up loading
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export type SpeakerCategory =
  | "keynote"
  | "masterclass"
  | "panel"
  | "workshop"
  | "ceremony"
  | "talk"
  | "all";

export const SPEAKERS: Speaker[] = [
  // KEYNOTE SPEAKERS
  {
    id: "bosun-tijani",
    name: "Dr. Bosun Tijani",
    title: "Honourable Minister",
    organization: "Ministry of Communications, Innovation and Digital Economy",
    location: "Nigeria",
    bio: "Dr. Bosun Tijani is Nigeria's Honourable Minister of Communications, Innovation and Digital Economy. He is a leading figure in Nigeria's technology ecosystem and drives the national agenda for digital transformation and innovation.",
    topic: "Nigeria's Digital Economy Vision",
    category: ["ceremony"],
    image: "/speakers/bosun-tijani.jpg",
  },
  {
    id: "bunmi-ajala",
    name: "Dr. Bunmi Ajala",
    title: "National Director",
    organization: "National Centre for AI and Robotics",
    location: "Nigeria",
    bio: "Dr. Bunmi Ajala serves as National Director at the National Centre for AI and Robotics and Senior Special Adviser to the Minister of Communications, Innovation and Digital Economy in Nigeria. With extensive experience in digital policy and innovation, she has been instrumental in shaping Nigeria's digital transformation agenda and building a national framework for responsible and inclusive artificial intelligence.",
    topic: "Building a National Framework for Responsible and Inclusive AI",
    category: ["keynote"],
    image: "/speakers/bunmi-ajala.jpeg",
  },
  {
    id: "olatubosun-alake",
    name: "Hon. Olatubosun Alake",
    title: "Commissioner",
    organization: "Lagos State Ministry of Innovation, Science, and Technology",
    location: "Lagos, Nigeria",
    bio: "As Lagos State Commissioner for Innovation, Science, and Technology, Hon. Olatubosun Alake drives technology adoption and innovation across Africa's largest city, fostering an ecosystem for startups and tech companies. He leads efforts to align state innovation strategy with Nigeria's AI future.",
    topic:
      "Lagos as a National AI Vanguard: Aligning State Innovation Strategy",
    category: ["keynote"],
    image: "/speakers/olatubosun-alake.jpg",
  },
  {
    id: "folasade-ogunsola",
    name: "Professor Folasade Ogunsola",
    title: "Vice Chancellor",
    organization: "University of Lagos",
    location: "Nigeria",
    bio: "Professor Folasade Ogunsola is the Vice Chancellor of the University of Lagos. She is a distinguished academic and administrator, leading one of Nigeria's premier universities.",
    topic: "Opening Address",
    category: ["ceremony"],
    image: "/speakers/folasade-ogunsola.jpg",
  },
  {
    id: "victor-odumuyiwa",
    name: "Dr. Victor Odumuyiwa",
    title: "Conference Chair & MIRG Chair",
    organization: "University of Lagos",
    location: "Nigeria",
    bio: "Dr. Victor Odumuyiwa serves as the Conference Chair for MIRG-ICAIR 2025 and chairs the Machine Intelligence Research Group (MIRG) at the University of Lagos. His research focuses on machine learning, data mining, and AI applications in African contexts.",
    topic: "Conference Opening & AI Research in Africa",
    category: ["ceremony"],
    image: "/speakers/victor-odumuyiwa.webp",
  },
  {
    id: "chika-yinka-banjo",
    name: "Dr. Chika Yinka-Banjo",
    title: "Head of Department, Computer Science",
    organization: "University of Lagos",
    location: "Nigeria",
    bio: "Dr Chika Yinka-Banjo is an Associate Professor of Computer Science at University of Lagos (UNILAG), where she leads the Artificial Intelligence & Robotics Laboratory (AIRLAB). She holds a PhD in Computer Science (Artificial Intelligence & Robotics) from University of Cape Town, South Africa. Her work integrates machine learning, robotics and data science, including a model for multi-robot safety inspection in underground mining environments. Beyond her technical research, she is deeply committed to STEM education and mentorship in Nigeria. Dr Yinka-Banjo has been recognised for excellence in teaching (including an award from Massachusetts Institute of Technology's Empowering The Teachers programme) and has founded robotics and coding initiatives aimed at empowering young people, especially girls, to engage with technology and innovation.",
    topic: "Robotics for Sectoral Transformation",
    category: ["panel"],
    image: "/speakers/chika-yinka-banjo.jpg",
  },
  {
    id: "chijioke-okorie",
    name: "Prof. Chijioke Okorie",
    title: "Associate Professor of Law",
    organization: "University of Pretoria",
    location: "South Africa",
    bio: "Prof. Chijioke Okorie is a Nigerian-born legal scholar and Associate Professor of Law at the University of Pretoria, South Africa. She holds degrees from Nnamdi Azikiwe University, the University of Strathclyde, and the University of Cape Town. Her work focuses on intellectual property, data governance, and emerging technologies, especially how law interacts with artificial intelligence and digital innovation in Africa. She leads the Data Science Law Lab (DSLL), promoting interdisciplinary research on technology and law. In 2025, she received a major grant from Canada's IDRC to explore how intellectual property can support AI innovation in Africa.",
    topic: "Data Licensing and Regulatory Aspects of AI in Africa",
    category: ["keynote", "panel"],
    image: "/speakers/chijioke-okorie.jpeg",
  },
  {
    id: "muhammad-abdul-mageed",
    name: "Prof. Muhammad Abdul-Mageed",
    title: "Canada Research Chair in NLP and Machine Learning",
    organization: "University of British Columbia",
    location: "Vancouver, Canada",
    bio: "Prof. Muhammad Abdul-Mageed is a Canada Research Chair in Natural Language Processing and Machine Learning and serves as an Associate Professor in the School of Information and the Department of Linguistics (with an associate membership in Computer Science) at University of British Columbia (UBC). His research spans deep learning, natural language processing (NLP), and computational socio-pragmatics, aimed at building machines that better understand and generate human language in equitable, efficient, and socially aware ways. His lab at UBC works on a wide range of language technologies including large-scale language models, automatic speech processing, machine translation, and dialect identification (notably for Arabic and low-resource languages).",
    topic: "Africa in the Loop: Co-Creating Speech & Language AI",
    category: ["keynote", "masterclass"],
    image: "/speakers/muhammad-abdul-ageed.jpg",
  },
  {
    id: "oladipupo-sennaike",
    name: "Dr. Oladipupo Sennaike",
    title: "Senior Lecturer & Lead, Nigeria AI Research Lab",
    organization: "University of Lagos",
    location: "Nigeria",
    bio: "Dr. Oladipupo Sennaike is a Senior Lecturer in the Department of Computer Sciences at University of Lagos, Nigeria, where he also obtained his PhD in Computer Science (specialising in Artificial Intelligence). With over 25 years of professional experience as a software engineer and entrepreneur, he brings both deep academic expertise and real-world technology insight to his research. His research focuses primarily on unsupervised learning, data stream mining and responsible AI—especially as applied to education and inclusive development in Africa. He leads the Nigeria AI Research Lab at the University of Lagos, and is the lead Principal Investigator for the 'EduAI Hub' funded project dedicated to AI for Education innovation across Africa.",
    topic: "AI for Education Innovation",
    category: ["panel"],
    image: "/speakers/oladipupo-sennaike.jpg",
  },
  {
    id: "avishkar-bhoopchand",
    name: "Dr. Avishkar Bhoopchand",
    title: "Staff Research Engineer",
    organization: "Google DeepMind",
    location: "London, UK",
    bio: "Dr. Avishkar Bhoopchand is a Staff Research Engineer at Google DeepMind and an executive board member of the Deep Learning Indaba. Originally from Cape Town, he transitioned from a software-engineering role within the financial sector to cutting-edge AI research, specialising in natural language processing and machine learning. Avishkar is deeply committed to advancing the African AI ecosystem: he served as General Co-Chair of the 2023 Deep Learning Indaba in Ghana and chairs the 'Baobab' mentorship programme under the Indaba's umbrella. His work spans research engineering, community leadership, and capacity-building across the continent.",
    topic: "Using RLHF to Build AI that Serves African Priorities",
    category: ["keynote", "masterclass"],
    image: "/speakers/avishkar-bhoopchand.jpg",
  },
  {
    id: "tajudeen-gwadabe",
    name: "Dr. Tajuddeen Gwadabe",
    title: "Programs and MEL Lead",
    organization: "Masakhane African Languages Hub",
    location: "Africa",
    bio: "Tajuddeen Rabiu Gwadabe is a Nigerian scholar and researcher in computer science, currently affiliated with the University of Chinese Academy of Sciences where he is undertaking his PhD in Computer Science and Technology. He earned his B.Eng in Electrical Engineering from Bayero University Kano (2011) and his M.Sc in Electrical & Electronics Engineering from Mevlana University, Turkey (2014). His academic and research interests include recommender systems, natural language processing (NLP) and machine learning with a special emphasis on African and Hausa-language contexts. His work reflects a commitment to ensuring that technological tools and language-technologies become more inclusive and relevant for African linguistic communities.",
    topic: "Scaling Context-Aware AI Development through Community-Driven Data",
    category: ["keynote", "masterclass"],
    image: "/speakers/tajuddeen-gwadabe.jpeg",
  },

  // PANEL MODERATORS & PANELISTS
  {
    id: "daniel-emenahor",
    name: "Daniel Emenahor",
    title: "Programme Manager",
    organization: "British Council",
    location: "Nigeria",
    bio: "Daniel Emenahor serves as Programme Manager at the British Council, Nigeria, where he leads initiatives connecting technology, education, and cultural exchange. He brings extensive experience in facilitating dialogue on innovation, ethics, and digital transformation.",
    topic: "Trust, Ethics, and Inclusion in AI",
    category: ["panel"],
    image: "/speakers/daniel-emenahor.jpg",
  },
  {
    id: "ndidi-elue",
    name: "Ndidi M. Elue",
    title: "Corporate Counsel",
    organization: "Google DeepMind",
    location: "New York, USA",
    bio: "Ndidi M. Elue is a legal and policy professional currently based in New York, working at Google DeepMind. With prior experience as Counsel on the Responsible AI team at Meta, her expertise spans the fields of artificial intelligence governance, ethics, and innovation. Her educational background includes a law degree from Loyola University Chicago School of Law, and she has a strong track record in leadership communications, diversity strategy, and advisory roles.",
    topic: "AI Ethics and Legal Frameworks",
    category: ["panel", "workshop"],
    image: "/speakers/ndidi-elue.jpeg",
  },
  {
    id: "kemi-omotubora",
    name: "Dr. Kemi Omotubora",
    title: "Senior Lecturer",
    organization: "Faculty of Law, University of Lagos",
    location: "Nigeria",
    bio: "Dr Kemi Omotubora is a Senior Lecturer at the Faculty of Law, University of Lagos, where she teaches on e-commerce law, intellectual property, banking law and the law of technology. She earned her PhD in Cybersecurity Law at University of Leeds, UK, following an LLM in Cyberlaw. Her research and professional interests centre on the intersections of law, emerging technologies and society—specifically data protection, cybersecurity, identity management, artificial intelligence regulation, and the gender dynamics of digital technologies. She co-leads the EDUAI Hub (Hub for Responsible Artificial Intelligence for Education Innovation and Research Network in Africa) and co-founded the Community Initiative for Digital Inclusion (CoIfDI).",
    topic: "Legal Frameworks for AI in Africa",
    category: ["panel"],
    image: "/speakers/kemi-omotubora.jpeg",
  },
  {
    id: "william-tsuma",
    name: "Dr. William Tsuma",
    title: "Programme Manager, Preventive Action and Human Security",
    organization:
      "Global Partnership for the Prevention of Armed Conflict (GPPAC)",
    location: "Kenya",
    bio: "Dr. William Tsuma is a conflict-prevention and human security specialist who holds a PhD in Development Studies from the Centre for Development Research (ZEF) at the University of Bonn, Germany. He has extensive experience working in civil-society networks on conflict management, especially in East Africa, and currently serves as Programme Manager for Preventive Action and Human Security at the Global Partnership for the Prevention of Armed Conflict (GPPAC); he also coordinates GPPAC's Southern and West Africa regions.",
    topic: "AI Infrastructure and Startup Innovation",
    category: ["panel"],
    image: "/speakers/william-tsuma.jpeg",
  },
  {
    id: "sanmi-koyejo",
    name: "Dr. Sanmi Koyejo",
    title: "Assistant Professor, Computer Science",
    organization: "Stanford University / Black in AI",
    location: "California, USA",
    bio: "Dr. Sanmi Koyejo is an Assistant Professor of Computer Science at Stanford University, where he leads the Stanford Trustworthy AI Research (STAIR) lab. His work centres on the development of measurement‐theoretic foundations for trustworthy machine learning systems—especially around evaluation, fairness, robustness and privacy with practical applications in healthcare and neuroscience. Dr. Koyejo has been recognised with prestigious honours including the Presidential Early Career Award for Scientists and Engineers (PECASE) and the Alfred P. Sloan Research Fellowship. He also serves as President of the organisation Black in AI.",
    topic: "Robust and Interpretable Machine Learning",
    category: ["keynote", "panel"],
    image: "/speakers/sanmi-koyejo.png",
  },
  {
    id: "opeyemi-folorunsho",
    name: "Opeyemi Folorunsho",
    title: "Technology Leader",
    organization: "Moniepoint Group",
    location: "Nigeria",
    bio: "Opeyemi Folorunsho is a technology leader at Moniepoint Group, one of Nigeria's fastest-growing fintech companies. He brings deep expertise in building scalable payment infrastructure and digital banking solutions that serve millions of Nigerians.",
    topic: "AI Infrastructure for Financial Services",
    category: ["panel"],
    image: "/speakers/opeyemi-folorunsho.jpg",
  },
  {
    id: "fatima-tambajang",
    name: "Fatima Tambajang",
    title: "Head of Developer, Startups & VC Ecosystem",
    organization: "NVIDIA",
    location: "Africa & Middle East",
    bio: "Fatima Tambajang serves as the Head of Developer, Startups & VC Ecosystem for Africa and the Middle East at NVIDIA, where she leads efforts to empower African developer communities and early-stage tech startups with AI tools, GPU infrastructure, and strategic partnerships. Her background includes a master's degree in economics and global development from the University of Copenhagen and a strong track-record in startup acceleration across key African markets. She advocates for inclusive growth in Africa's tech ecosystem by championing access to cutting-edge technologies, developer training, and venture capital support.",
    topic: "AI Infrastructure for Startups",
    category: ["masterclass", "panel"],
    image: "/speakers/fatima-tambajang.jpeg",
  },
  {
    id: "chinazo-anebelundu",
    name: "Chinazo Anebelundu",
    title: "Director of AI Solutions Delivery",
    organization: "Data Science Nigeria",
    location: "Nigeria",
    bio: "Chinazo Anebelundu is a Nigerian-based AI and geospatial analytics leader, currently serving as Director of AI Solutions Delivery at Data Science Nigeria (DSN). Her career within DSN started in 2019 via the AI Bootcamp, before formally joining in 2020. She has over a decade of experience delivering data-driven and geospatial solutions across sectors in Africa. In her role, Anebelundu leads teams focusing on AI engineering, geospatial analytics, and product delivery—driving solutions that address last-mile healthcare, digital inclusion for informal businesses, and adaptive learning for rural students. Her work has gained international recognition, including a global award from the Bill & Melinda Gates Foundation.",
    topic: "AI for Social Impact",
    category: ["panel"],
    image: "/speakers/chinazo-anebelundu.jpg",
  },

  {
    id: "olatunji-omisore",
    name: "Dr. Olatunji Omisore",
    title: "Research Scientist",
    organization:
      "Shenzhen Institute of Advanced Technology, Chinese Academy of Sciences",
    location: "China",
    bio: "Dr. Olatunji Mumini Omisore is a Nigerian‐born researcher specialising in intelligent systems, surgical robotics and biomedical image & signal processing. He earned his PhD in Pattern Recognition and Intelligent Systems from the University of the Chinese Academy of Sciences (UCAS) in 2019. His work has taken place in China, including at the Shenzhen Institute of Advanced Technology (SIAT) of the Chinese Academy of Sciences, where he served as a postdoctoral fellow and research associate. In his research Dr. Omisore has led projects funded by institutions like the National Natural Science Foundation of China and the Shenzhen Natural Science Foundation, applying machine learning and robotics to minimally-invasive interventions and medical imaging.",
    topic: "Surgical Robotics and AI",
    category: ["panel"],
    image: "/speakers/olatunji-omisore.png",
  },
  {
    id: "olusola-ayoola",
    name: "Dr. Olusola Ayoola",
    title: "Founder & CEO",
    organization: "Robotics and Artificial Intelligence Nigeria (RAIN)",
    location: "Nigeria",
    bio: "Dr. Ayoola is a Nigerian-trained electrical and electronic engineer who holds a first-class bachelor's degree from University of Ibadan, and both a master's with distinction and a doctorate in Electrical & Electronic Engineering from University of Manchester (UK). He worked with the Robotics Research Group at the University of Manchester between 2014-2019 developing ground and underwater robotic systems, including for nuclear decommissioning tasks. He is the founder and CEO of Robotics and Artificial Intelligence Nigeria (RAIN), a pioneering Nigerian robotics and AI organisation which supports training, research, and product development tailored for Africa's industrial challenges.",
    topic: "Robotics for African Industries",
    category: ["panel"],
    image: "/speakers/olusola-ayoola.jpg",
  },
  {
    id: "fredrick-akpoghene",
    name: "Fredrick Akpoghene",
    title: "Founder & CEO",
    organization: "JéGO Technologies",
    location: "Miami, USA",
    bio: "Frederick Akpoghene is a Nigerian-born tech entrepreneur based in Miami who founded JéGO Technologies, Inc., a company designing autonomous 'pods' to deliver on-demand services and goods, especially in the healthcare and small business sectors. With over 15 years of experience in software engineering and development, he started coding in his early teens and has launched several startups and apps before focusing on mobility and logistics solutions. Akpoghene's vision revolves around decentralising access to services and empowering small-business entrepreneurs by reducing fixed infrastructure costs (like rent) and delivering more flexible mobility and commerce options.",
    topic: "Autonomous Vehicles and AI",
    category: ["masterclass", "panel"],
    image: "/speakers/fredrick-akpoghene.jpg",
  },
  {
    id: "jude-adejumo",
    name: "Jude Feranmi Adejumo",
    title: "Practice Lead, Higher Education Institution Innovation",
    organization: "Co‑creation Hub (CcHUB)",
    location: "Nigeria",
    bio: "Jude Adejuwon serves as Practice Lead for the Higher Education Institution (HEI) Innovation team at Co‑creation Hub (CcHUB), where he leads efforts to integrate universities into Africa's innovation ecosystem by supporting academic innovators, research commercialisation and startup-university partnerships. Under his leadership, CcHUB's HEI Innovation practice has launched programmes such as the Academic Innovators Community of Practice and the 'Uni:nnnovators Startup-in-Residence' initiative; these have engaged 1,000+ student innovators across multiple African countries and disbursed significant funding for prototype development.",
    topic: "AI for Inclusive Education",
    category: ["panel"],
    image: "/speakers/jude-adejumo.jpeg",
  },
  {
    id: "adedeji-adeniran",
    name: "Dr. Adedeji Adeniran",
    title: "Director of Education & Governance Research",
    organization: "Centre for the Study of the Economies of Africa (CSEA)",
    location: "Nigeria",
    bio: "Dr Adeniran is a Nigerian economist and senior researcher who currently serves as Director of Education & Governance Research (and formerly Director of Research) at the Centre for the Study of the Economies of Africa (CSEA) in Abuja. He holds a PhD in Economics from University of the Witwatersrand in South Africa, and a master's and bachelor's in Economics/Educational Management from University of Ibadan, Nigeria. His research spans macroeconomics, public economics, development finance, education systems, and governance in Africa.",
    topic: "AI and Economic Development in Africa",
    category: ["panel"],
    image: "/speakers/adedeji-adeniran.jpeg",
  },

  {
    id: "toyosi-akerele",
    name: "Dr. Toyosi Akerele-Ogunsiji",
    title: "Founder & CEO",
    organization: "Rise Networks",
    location: "Nigeria",
    bio: "Dr. Toyosi Akerele-Ogunsiji is a Nigerian social entrepreneur, technology education advocate and founder/CEO of Rise Networks, a data & artificial intelligence (AI) for development social enterprise. She holds a Bachelor of Laws (Civil Law) degree from the University of Jos, and advanced executive certifications in strategic management and digital marketing. She also earned a Master in Public Administration from the Harvard Kennedy School and is currently a PhD Fellow at the Nigerian Defence Academy researching defence-digital transformation. Her work centres on leveraging emerging technologies—especially AI and data science—to empower young people, promote inclusive digital skills and shape governance frameworks in Africa.",
    topic: "AI for Youth Empowerment",
    category: ["panel"],
    image: "/speakers/toyosi-akerele.jpeg",
  },
  {
    id: "peter-adeyemi",
    name: "Peter Adeyemi",
    title: "Co-Founder & CEO",
    organization: "Cubbes",
    location: "Nigeria",
    bio: "Peter Adeyemi is a Nigerian entrepreneur and technologist, best known as the Co-Founder & CEO of Cubbes, an edtech platform aimed at transforming how students in Africa access learning resources. He previously served as Chief Operating Officer at Curacel (a YC W22-backed insurtech startup), where he helped scale operations across African markets. Driven by his own experience as a student encountering outdated educational resources, Peter now channels his expertise into building technology and systems that empower learners.",
    topic: "EdTech Innovation in Africa",
    category: ["panel"],
    image: "/speakers/peter-adeyemi.jpg",
  },
  {
    id: "olayinka-adewumi",
    name: "Dr. Olayinka Omowunmi Adewumi",
    title: "Acting Director, Innovation & Technology Management Office",
    organization: "University of Lagos",
    location: "Nigeria",
    bio: "Dr Olayinka Omowunmi Adewumi is Senior Lecturer in the Department of Mechanical Engineering at University of Lagos (UNILAG), Nigeria, holding a PhD in Mechanical Engineering from University of Pretoria and an MSc from UNILAG. Her research focuses on enhancing thermal performance of fluid-flow and heat-transfer systems using theoretical and numerical methods. In addition to her academic role, she leads practical innovation initiatives: she heads the internship programme for S2PAfrica, integrating virtualised laboratories and hands-on design in engineering education, and in 2024 was appointed Acting Director of UNILAG's Innovation & Technology Management Office (ITMO).",
    topic: "University Innovation Ecosystems",
    category: ["panel"],
    image: "/speakers/olayinka-adewumi.webp",
  },

  // MASTERCLASS FACILITATORS
  {
    id: "sodiq-facilitator",
    name: "Mr. Sodiq",
    title: "AI Facilitator",
    organization: "Data Science Nigeria",
    location: "Nigeria",
    bio: "Mr. Sodiq is an experienced AI facilitator and trainer with Data Science Nigeria, specializing in hands-on workshops that introduce participants to fundamental AI concepts and practical applications.",
    topic: "AI Fundamentals Masterclass",
    category: ["masterclass"],
    image: "/speakers/sodiq-facilitator.webp",
  },
  {
    id: "alex-tsado",
    name: "Alex Tsado",
    title: "Co-Founder",
    organization: "Ahura AI, Alliance 4 AI",
    location: "Nigeria",
    bio: "Alex Tsado is Co-Founder of Ahura AI and Alliance 4 AI, working at the forefront of AI entrepreneurship in Africa. He focuses on building AI solutions for African challenges and fostering AI innovation ecosystems. His expertise spans AI infrastructure, GPU computing, and accelerating AI innovation across the continent.",
    topic: "Accelerating AI Innovation: Africa GPU Hub",
    category: ["masterclass", "panel"],
    image: "/speakers/alex-tsado.webp",
  },

  // ADDITIONAL SPEAKERS
  {
    id: "emeka-okoye",
    name: "Emeka Azuka Okoye",
    title: "Neuro-Symbolic AI Engineer & Senior Knowledge Engineer",
    organization: "Syntaxia (USA) / Cymantiks Limited",
    location: "Nigeria/USA",
    bio: "Emeka is a Neuro-Symbolic AI Engineer with over 20 years of experience in Knowledge Engineering, Semantic Infrastructure Development, AI Data Context Engineering, and Generative AI. He specializes in bridging symbolic reasoning and neural intelligence to design transformative AI solutions that empower organizations on their digital transformation journeys. Emeka excels at converting complex data into unified, actionable intelligence networks and developing scalable architectures that enhance cognitive automation, decision-making, and innovation. He has co-founded two startups, worked with Openlink Software, the Land Portal Foundation (Netherlands), and currently serves as a Senior Knowledge Engineer at Syntaxia (USA).",
    topic: "Cognitive Prosthetics: Knowledge Graphs for Smart City Governance",
    category: ["talk"],
    image: "/speakers/emeka-okoye.png",
  },
  {
    id: "bayo-adekanmbi",
    name: "Dr. Olubayo Adekanmbi",
    title: "Founder & Chief Executive Officer",
    organization: "Data Science Nigeria",
    location: "Nigeria",
    bio: "Dr. Olubayo Adekanmbi is a Nigerian technologist, entrepreneur and strategist with more than two decades of experience in data science, artificial intelligence and digital innovation. He holds a PhD from the University of London and has led major roles in the telecoms sector (including MTN Nigeria and Airtel Africa) where he oversaw analytics, strategy and transformation across large customer bases in Africa. He founded Data Science Nigeria—a non-profit dedicated to building AI talent and deploying AI for social good in Africa—and co-founded EqualyzAI, which focuses on locally relevant AI for African languages and markets. His work has earned international recognition and he continues to champion inclusive AI that is rooted in African contexts.",
    topic: "Building AI Talent in Africa",
    category: ["keynote"],
    image: "/speakers/bayo-adekanmbi.jpeg",
  },

  {
    id: "folasade-ogunsola",
    name: "Professor Folasade Ogunsola",
    title: "Vice Chancellor",
    organization: "University of Lagos",
    location: "Nigeria",
    bio: "Professor Folasade Ogunsola is the Vice Chancellor of the University of Lagos. She is a distinguished academic and administrator, leading one of Nigeria's premier universities.",
    topic: "Opening Address",
    category: ["ceremony"],
    image: "/speakers/folasade-ogunsola.jpg",
  },

  // ADDITIONAL INNOVATORS & SPEAKERS
  {
    id: "olubayo-adekanmbi",
    name: "Dr. Oluwatobi Olabiyi",
    title: "Director of Engineering, Generative AI Models",
    organization: "NVIDIA",
    location: "USA",
    bio: "Dr Olabiyi is an engineer and researcher specialising in wireless communications, signal processing, and machine-learning for communication systems. He earned his B.Sc in Electronic & Electrical Engineering from Obafemi Awolowo University (Nigeria), followed by his M.S. and Ph.D. in Electrical Engineering from Prairie View A&M University (Texas, USA). Professionally, he has held senior research and engineering roles in machine-learning and conversational AI (including at Capital One) and currently serves in a leadership engineering position at NVIDIA driving AI/data-science initiatives that bridge advanced signal-processing and conversational/multimodal AI.",
    topic: "Generative AI and Machine Learning at Scale",
    category: ["keynote"],
    image: "/speakers/oluwatobi-olabiyi.webp",
  },
  {
    id: "sawyer-fuller",
    name: "Sawyer Fuller",
    title: "Associate Professor of Mechanical Engineering",
    organization: "University of Washington",
    location: "USA",
    bio: "Sawyer Fuller is an Associate Professor of Mechanical Engineering (and Adjunct in Computer Science & Engineering) at University of Washington whose work revolves around biologically‐inspired robotics, especially insect‐scale aerial and ground vehicles. He earned his PhD in Bioengineering from California Institute of Technology and his B.S. and M.S. in Mechanical Engineering from Massachusetts Institute of Technology. His laboratory—known as the Autonomous Insect Robotics Laboratory—targets one of the frontier challenges in engineering: how to build fully autonomous robots as small as insects.",
    topic: "Bio-Inspired Robotics",
    category: ["keynote"],
    image: "/speakers/sawyer-fuller.webp",
  },
  {
    id: "silas-adekunle",
    name: "Silas Adekunle",
    title: "Co-founder & CEO",
    organization: "Awarri",
    location: "UK/Nigeria",
    bio: "Silas Adekunle is a Nigerian-British robotics engineer and entrepreneur, celebrated for inventing the world's first intelligent gaming robot, MekaMon, through his company Reach Robotics. He holds a first-class Bachelor's degree in Robotics Technology from the University of the West of England (UWE Bristol) and began his entrepreneurial journey while still a student. Today, Adekunle is the CEO and co-founder of two ventures: Awarri, focused on advancing AI and robotics education and infrastructure in Africa, and Reach Industries, developing a visual-intelligence lab-automation platform called Lumi for use in scientific and industrial settings. His work has earned global recognition—including listings on Forbes 30 Under 30 and the Financial Times' Top 100 Minority Ethnic Leaders in Technology.",
    topic: "Robotics Innovation and Education",
    category: ["keynote"],
    image: "/speakers/silas-adekunle.webp",
  },
  {
    id: "williams-onifade",
    name: "Prof. Williams Olufade Onifade",
    title: "Professor of AI & Data Analytics, Deputy Director",
    organization: "University of Ibadan School of Open & Distance Learning",
    location: "Nigeria",
    bio: "Prof. Olufade F. W. Onifade is a Nigerian academic specialising in computer science, currently serving at the University of Ibadan in Nigeria. He earned two PhDs — one from the University of Ibadan and another from Université Nancy 2 (France) — under a French government scholarship. His research spans information retrieval, pattern recognition, biometrics, fuzzy logic and computer vision. He has published 80+ academic papers, led the Pattern Recognition, Robotics & Intelligent Analytics Group at UI, and held fellowships such as the MIT-ETT and the CV Raman Fellowship for African researchers.",
    topic: "Pattern Recognition and Intelligent Systems",
    category: ["keynote"],
    image: "/speakers/williams-onifade.webp",
  },

  // YOUNG INNOVATORS (Day 1 Panel)
  {
    id: "korin-ai-team",
    name: "Korin AI Team",
    title: "Young Innovators",
    organization: "Korin AI",
    location: "Nigeria",
    bio: "The Korin AI team represents emerging young innovators developing AI-driven solutions for African challenges.",
    topic: "Youth Innovation in AI",
    category: ["panel"],
    image: "/speakers/korin-ai.webp",
  },
  {
    id: "dawn-ai-team",
    name: "Dawn AI Team",
    title: "Young Innovators",
    organization: "Dawn AI",
    location: "Nigeria",
    bio: "Dawn AI is a student-led initiative developing innovative AI solutions for education and learning in Africa.",
    topic: "AI for Education",
    category: ["panel"],
    image: "/speakers/dawn-ai.webp",
  },
  {
    id: "yarngpt-team",
    name: "YarnGPT Team",
    title: "Young Innovators",
    organization: "YarnGPT",
    location: "Nigeria",
    bio: "YarnGPT team is building innovative language models and AI tools focused on African contexts and storytelling.",
    topic: "Language AI Innovation",
    category: ["panel"],
    image: "/speakers/yarngpt.webp",
  },
];

// Helper functions
export function getSpeakerById(id: string): Speaker | undefined {
  return SPEAKERS.find((speaker) => speaker.id === id);
}

export function getSpeakerByName(name: string): Speaker | undefined {
  return SPEAKERS.find(
    (speaker) => speaker.name.toLowerCase() === name.toLowerCase()
  );
}

export function getSpeakersByCategory(category: SpeakerCategory): Speaker[] {
  if (category === "all") return SPEAKERS;
  return SPEAKERS.filter((speaker) => speaker.category.includes(category));
}

export function searchSpeakers(query: string): Speaker[] {
  const lowerQuery = query.toLowerCase();
  return SPEAKERS.filter(
    (speaker) =>
      speaker.name.toLowerCase().includes(lowerQuery) ||
      speaker.organization.toLowerCase().includes(lowerQuery) ||
      speaker.bio.toLowerCase().includes(lowerQuery) ||
      speaker.topic?.toLowerCase().includes(lowerQuery)
  );
}

// Map speaker names from schedule to speaker IDs
export function getSpeakerByScheduleName(
  scheduleName: string
): Speaker | undefined {
  // Handle special cases and variations
  const nameMap: Record<string, string> = {
    "Dr. Bunmi Ajala": "bunmi-ajala",
    "Hon. Olatubosun Alake": "olatubosun-alake",
    "Prof. Chijioke Okorie": "chijioke-okorie",
    "Prof. Muhammad Abdul-Mageed": "muhammad-abdul-mageed",
    "Dr. Avishkar Bhoopchand": "avishkar-bhoopchand",
    "Dr. Tajudeen Gwadabe": "tajudeen-gwadabe",
    "Dr. Tajuddeen Gwadabe": "tajudeen-gwadabe",
    "Daniel Emenahor": "daniel-emenahor",
    "Ndidi Elue": "ndidi-elue",
    "Dr. Kemi Omotubora": "kemi-omotubora",
    "Dr. William Tsuma": "william-tsuma",
    "Dr. Sanmi Koyejo": "sanmi-koyejo",
    "Opeyemi Folorunsho": "opeyemi-folorunsho",
    "Fatima Tambajang": "fatima-tambajang",
    "Chinazo Anebelundu": "chinazo-anebelundu",
    "Dr. Chika Yinka-Banjo": "chika-yinka-banjo",
    "Dr. Olatunji Omisore": "olatunji-omisore",
    "Dr. Olusola Ayoola": "olusola-ayoola",
    "Mr. Fredrick Akpoghene": "fredrick-akpoghene",
    "Jude Adejumo": "jude-adejumo",
    "Dr. Adedeji Adeniran": "adedeji-adeniran",
    "Dr. Oladipupo Sennaike": "oladipupo-sennaike",
    "Dr. Toyosi Akerele": "toyosi-akerele",
    "Mr. Peter Adeyemi": "peter-adeyemi",
    "Dr. Yinka Adewunmi": "olayinka-adewumi",
    "Mr. Sodiq": "sodiq-facilitator",
    "Mr. Alex Tsado": "alex-tsado",
    "Alex Tsado": "alex-tsado",
    "Mr. Emeka Okoye": "emeka-okoye",
    "Dr. Bayo Adekanmbi": "bayo-adekanmbi",
    "Dr. Victor Odumuyiwa": "victor-odumuyiwa",
    "Dr. Bosun Tijani": "bosun-tijani",
    "Vice Chancellor": "folasade-ogunsola",
    "Professor Folasade Ogunsola": "folasade-ogunsola",
    "Korin AI Team": "korin-ai-team",
    "Dawn AI Team": "dawn-ai-team",
    "YarnGPT Team": "yarngpt-team",
  };

  // Check direct name mapping first
  if (nameMap[scheduleName]) {
    return getSpeakerById(nameMap[scheduleName]);
  }

  // Try fuzzy matching
  return getSpeakerByName(scheduleName);
}
