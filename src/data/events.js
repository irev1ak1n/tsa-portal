// ============================================================
// TSA HUB - official TSA competitive event list (2025-2026).
//
// Names and divisions are the official TSA list.
// "category" is only a UI grouping for the Events filter -
// it is not an official TSA classification.
//
// "eligibility" is transcribed verbatim from the official TSA
// eligibility chart. eligibility.text is the source of truth -
// teamSize/per/individualOk are only parsed for the UI.
// eligibility: null means the chart has no row for that event.
//
// Rubrics, deadlines and full requirements are NOT here on
// purpose. They live in the copyrighted current-year TSA
// Competition Guides. Add them only from the official source.
// ============================================================

export const CATEGORIES = ["Computing & Coding", "Engineering & Design", "Manufacturing & Transportation", "Architecture & Construction", "Digital Media", "Communication & Leadership", "Science & Health", "Business & Marketing"];

export const INTEREST_OPTIONS = [
  "Programming",
  "Game design",
  "Web design",
  "CAD / 3D modeling",
  "Robotics",
  "Video & film",
  "Photography",
  "Graphic design",
  "Public speaking",
  "Writing",
  "Music & audio",
  "Science & biotech",
  "Medicine & health",
  "Business & marketing",
  "Architecture",
  "Aviation & flight",
  "Data & statistics",
  "Making & fabrication",
  "Cars & racing",
  "Teaching",
];

export const SKILL_OPTIONS = [
  "Python / JavaScript",
  "HTML & CSS",
  "Game engines (Unity, Godot)",
  "CAD software (Onshape, Fusion, SolidWorks)",
  "Video editing",
  "Photo editing",
  "Graphic design tools (Figma, Canva)",
  "Research & citations",
  "Presenting to judges",
  "Team leadership",
  "3D printing / fabrication",
  "Audio production",
  "Electronics & circuits",
  "Robotics kits (VEX, LEGO)",
  "Public speaking",
  "Writing",
];

export const MAJOR_OPTIONS = [
  "Computer Science",
  "Software Engineering",
  "Cybersecurity",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Aerospace Engineering",
  "Architecture",
  "Graphic Design",
  "Film & Media",
  "Business / Marketing",
  "Medicine / Pre-Med",
  "Biology / Biotech",
  "Education",
  "Undecided",
];

export const EVENTS = [
  // ============ MIDDLE SCHOOL (37) ============
  {
    id: "ms-audio-podcasting", division: "MS", name: "Audio Podcasting", category: "Digital Media",
    eligibility: { text: "three (3) teams per state; individual entries are permitted", teamSize: null, per: "state", individualOk: true },
  },
  {
    id: "ms-biotechnology", division: "MS", name: "Biotechnology", category: "Science & Health",
    eligibility: { text: "five (5) teams per state, consisting of at least three (3) individuals", teamSize: "3+", per: "state", individualOk: false },
  },
  {
    id: "ms-career-prep", division: "MS", name: "Career Prep", category: "Communication & Leadership",
    eligibility: { text: "one (1) individual per chapter", teamSize: "1", per: "chapter", individualOk: true },
  },
  {
    id: "ms-challenging-tech-issues", division: "MS", name: "Challenging Technology Issues", category: "Communication & Leadership",
    eligibility: { text: "three (3) teams of two (2) individuals per state", teamSize: "2", per: "state", individualOk: false },
  },
  {
    id: "ms-chapter-team", division: "MS", name: "Chapter Team", category: "Communication & Leadership",
    eligibility: { text: "one (1) team of six (6) individuals per chapter", teamSize: "6", per: "chapter", individualOk: false },
  },
  {
    id: "ms-childrens-stories", division: "MS", name: "Children's Stories", category: "Digital Media",
    eligibility: { text: "three (3) teams per state; individual entries are permitted", teamSize: null, per: "state", individualOk: true },
  },
  {
    id: "ms-coding", division: "MS", name: "Coding", category: "Computing & Coding",
    eligibility: { text: "one (1) team of two (2) individuals per chapter", teamSize: "2", per: "chapter", individualOk: false },
  },
  {
    id: "ms-community-service-video", division: "MS", name: "Community Service Video", category: "Digital Media",
    eligibility: { text: "one (1) team per chapter; individual entries are permitted", teamSize: null, per: "chapter", individualOk: true },
  },
  {
    id: "ms-cad-foundations", division: "MS", name: "Computer-Aided Design (CAD) Foundations", category: "Engineering & Design",
    eligibility: { text: "two (2) individuals per state", teamSize: "1", per: "state", individualOk: true },
  },
  {
    id: "ms-construction-challenge", division: "MS", name: "Construction Challenge", category: "Architecture & Construction",
    eligibility: { text: "one (1) team of at least two (2) individuals per chapter", teamSize: "2+", per: "chapter", individualOk: false },
  },
  {
    id: "ms-cybersecurity", division: "MS", name: "Cybersecurity", category: "Computing & Coding",
    eligibility: { text: "three (3) individuals per chapter", teamSize: "1", per: "chapter", individualOk: true },
  },
  {
    id: "ms-data-science", division: "MS", name: "Data Science and Analytics", category: "Computing & Coding",
    eligibility: { text: "three (3) teams of two to three (2-3) individuals per state", teamSize: "2\u20133", per: "state", individualOk: false },
  },
  {
    id: "ms-digital-photography", division: "MS", name: "Digital Photography", category: "Digital Media",
    eligibility: { text: "three (3) individuals per state", teamSize: "1", per: "state", individualOk: true },
  },
  {
    id: "ms-dragster", division: "MS", name: "Dragster", category: "Manufacturing & Transportation",
    eligibility: { text: "two (2) individuals per chapter", teamSize: "1", per: "chapter", individualOk: true },
  },
  {
    id: "ms-drone", division: "MS", name: "Drone (UAV)", category: "Engineering & Design",
    eligibility: { text: "three (3) teams of two (2) individuals per state", teamSize: "2", per: "state", individualOk: false },
  },
  {
    id: "ms-electrical-applications", division: "MS", name: "Electrical Applications", category: "Engineering & Design",
    eligibility: { text: "one (1) team of two (2) individuals per chapter", teamSize: "2", per: "chapter", individualOk: false },
  },
  {
    id: "ms-flight", division: "MS", name: "Flight", category: "Engineering & Design",
    eligibility: { text: "two (2) individuals per chapter", teamSize: "1", per: "chapter", individualOk: true },
  },
  {
    id: "ms-forensic-technology", division: "MS", name: "Forensic Technology", category: "Science & Health",
    eligibility: { text: "one (1) team of two (2) individuals per chapter", teamSize: "2", per: "chapter", individualOk: false },
  },
  {
    id: "ms-inventions", division: "MS", name: "Inventions and Innovations", category: "Engineering & Design",
    eligibility: { text: "one (1) team of two (2) to four (4) individuals per chapter", teamSize: "2\u20134", per: "chapter", individualOk: false },
  },
  {
    id: "ms-leadership-strategies", division: "MS", name: "Leadership Strategies", category: "Communication & Leadership",
    eligibility: { text: "three (3) teams of three (3) individuals per state", teamSize: "3", per: "state", individualOk: false },
  },
  {
    id: "ms-mass-production", division: "MS", name: "Mass Production", category: "Manufacturing & Transportation",
    eligibility: { text: "one (1) team of at least three (3) individuals per chapter", teamSize: "3+", per: "chapter", individualOk: false },
  },
  {
    id: "ms-mechanical-engineering", division: "MS", name: "Mechanical Engineering", category: "Engineering & Design",
    eligibility: { text: "one (1) team of two (2) individuals per chapter", teamSize: "2", per: "chapter", individualOk: false },
  },
  {
    id: "ms-medical-technology", division: "MS", name: "Medical Technology", category: "Science & Health",
    eligibility: { text: "three (3) teams of two to three (2-3) individuals per state", teamSize: "2\u20133", per: "state", individualOk: false },
  },
  {
    id: "ms-microcontroller-design", division: "MS", name: "Microcontroller Design", category: "Computing & Coding",
    eligibility: { text: "one (1) team per chapter; individual entries are permitted", teamSize: null, per: "chapter", individualOk: true },
  },
  {
    id: "ms-off-the-grid", division: "MS", name: "Off the Grid", category: "Architecture & Construction",
    eligibility: { text: "three (3) teams per state; individual entries are permitted", teamSize: null, per: "state", individualOk: true },
  },
  {
    id: "ms-prepared-speech", division: "MS", name: "Prepared Speech", category: "Communication & Leadership",
    eligibility: { text: "three (3) individuals per state", teamSize: "1", per: "state", individualOk: true },
  },
  {
    id: "ms-problem-solving", division: "MS", name: "Problem Solving", category: "Engineering & Design",
    eligibility: { text: "one (1) team of two (2) individuals per chapter", teamSize: "2", per: "chapter", individualOk: false },
  },
  {
    id: "ms-promotional-marketing", division: "MS", name: "Promotional Marketing", category: "Business & Marketing",
    eligibility: { text: "one (1) individual per chapter", teamSize: "1", per: "chapter", individualOk: true },
  },
  {
    id: "ms-robotics", division: "MS", name: "Robotics", category: "Engineering & Design",
    eligibility: { text: "three (3) teams of two to six (2-6) team members per state", teamSize: "2\u20136", per: "state", individualOk: false },
  },
  {
    id: "ms-solar-racer", division: "MS", name: "Solar Racer", category: "Manufacturing & Transportation",
    eligibility: { text: "one (1) team of two to four (2-4) individuals per chapter; one (1) entry per team", teamSize: "2\u20134", per: "chapter", individualOk: false },
  },
  {
    id: "ms-stem-animation", division: "MS", name: "STEM Animation", category: "Digital Media",
    eligibility: { text: "three (3) teams of at least two (2) individuals per state", teamSize: "2+", per: "state", individualOk: false },
  },
  {
    id: "ms-structural-engineering", division: "MS", name: "Structural Engineering", category: "Architecture & Construction",
    eligibility: { text: "one (1) team of two (2) individuals per chapter", teamSize: "2", per: "chapter", individualOk: false },
  },
  {
    id: "ms-system-control", division: "MS", name: "System Control Technology", category: "Computing & Coding",
    eligibility: { text: "one (1) team of three (3) individuals per state", teamSize: "3", per: "state", individualOk: false },
  },
  {
    id: "ms-tech-bowl", division: "MS", name: "Tech Bowl", category: "Communication & Leadership",
    eligibility: { text: "one (1) team of three (3) individuals per chapter", teamSize: "3", per: "chapter", individualOk: false },
  },
  {
    id: "ms-technical-design", division: "MS", name: "Technical Design", category: "Engineering & Design",
    eligibility: { text: "one (1) team of two (2) individuals per chapter", teamSize: "2", per: "chapter", individualOk: false },
  },
  {
    id: "ms-video-game-design", division: "MS", name: "Video Game Design", category: "Computing & Coding",
    eligibility: { text: "one (1) team of two (2) to six (6) individuals per chapter", teamSize: "2\u20136", per: "chapter", individualOk: false },
  },
  {
    id: "ms-website-design", division: "MS", name: "Website Design", category: "Computing & Coding",
    eligibility: { text: "one (1) team of at least three (3) and a maximum of six (6) individuals per chapter", teamSize: "3\u20136", per: "chapter", individualOk: false },
  },
  // ============ HIGH SCHOOL (39) ============
  {
    id: "animatronics", division: "HS", name: "Animatronics", category: "Engineering & Design",
    eligibility: { text: "three (3) teams of two to three (2-3) team members per state", teamSize: "2\u20133", per: "state", individualOk: false },
  },
  {
    id: "architectural-design", division: "HS", name: "Architectural Design", category: "Architecture & Construction",
    eligibility: { text: "one (1) team per chapter; individual entries are permitted", teamSize: null, per: "chapter", individualOk: true },
  },
  {
    id: "biotechnology-design", division: "HS", name: "Biotechnology Design", category: "Science & Health",
    eligibility: { text: "one (1) team of at least two (2) individuals per chapter", teamSize: "2+", per: "chapter", individualOk: false },
  },
  {
    id: "board-game-design", division: "HS", name: "Board Game Design", category: "Digital Media",
    eligibility: { text: "one (1) team of at least two (2) individuals per chapter", teamSize: "2+", per: "chapter", individualOk: false },
  },
  {
    id: "chapter-team", division: "HS", name: "Chapter Team", category: "Communication & Leadership",
    eligibility: { text: "one (1) team of six (6) members per chapter", teamSize: "6", per: "chapter", individualOk: false },
  },
  {
    id: "childrens-stories", division: "HS", name: "Children's Stories", category: "Digital Media",
    eligibility: { text: "three (3) teams or three (3) individuals per state", teamSize: null, per: "state", individualOk: true },
  },
  {
    id: "coding", division: "HS", name: "Coding", category: "Computing & Coding",
    eligibility: { text: "three (3) teams of two (2) individuals per state", teamSize: "2", per: "state", individualOk: false },
  },
  {
    id: "cad-architecture", division: "HS", name: "Computer-Aided Design (CAD), Architecture", category: "Architecture & Construction",
    eligibility: { text: "two (2) individuals per state", teamSize: "1", per: "state", individualOk: true },
  },
  {
    id: "cad-engineering", division: "HS", name: "Computer-Aided Design (CAD), Engineering", category: "Engineering & Design",
    eligibility: { text: "two (2) individuals per state", teamSize: "1", per: "state", individualOk: true },
  },
  {
    id: "data-science", division: "HS", name: "Data Science and Analytics", category: "Computing & Coding",
    eligibility: { text: "three (3) teams of two (2) individuals per state; individual entries are permitted", teamSize: "2", per: "state", individualOk: true },
  },
  {
    id: "debating-tech-issues", division: "HS", name: "Debating Technological Issues", category: "Communication & Leadership",
    eligibility: { text: "three (3) teams of two (2) individuals per state", teamSize: "2", per: "state", individualOk: false },
  },
  {
    id: "digital-video-production", division: "HS", name: "Digital Video Production", category: "Digital Media",
    eligibility: { text: "three (3) teams or three (3) individuals per state", teamSize: null, per: "state", individualOk: true },
  },
  {
    id: "dragster-design", division: "HS", name: "Dragster Design", category: "Manufacturing & Transportation",
    eligibility: { text: "two (2) individuals per chapter", teamSize: "1", per: "chapter", individualOk: true },
  },
  {
    id: "drone-challenge", division: "HS", name: "Drone Challenge (UAV)", category: "Engineering & Design",
    eligibility: { text: "three (3) teams of two to six (2-6) members per state", teamSize: "2\u20136", per: "state", individualOk: false },
  },
  {
    id: "engineering-design", division: "HS", name: "Engineering Design", category: "Engineering & Design",
    eligibility: { text: "three (3) teams of three (3) or more individuals per state", teamSize: "3+", per: "state", individualOk: false },
  },
  {
    id: "extemporaneous-speech", division: "HS", name: "Extemporaneous Speech", category: "Communication & Leadership",
    eligibility: { text: "three (3) individuals per state", teamSize: "1", per: "state", individualOk: true },
  },
  {
    id: "fashion-design", division: "HS", name: "Fashion Design and Technology", category: "Business & Marketing",
    eligibility: { text: "five (5) teams of two to four (2-4) individuals per state", teamSize: "2\u20134", per: "state", individualOk: false },
  },
  {
    id: "flight-endurance", division: "HS", name: "Flight Endurance", category: "Engineering & Design",
    eligibility: { text: "two (2) individuals per chapter", teamSize: "1", per: "chapter", individualOk: true },
  },
  {
    id: "forensic-science", division: "HS", name: "Forensic Science", category: "Science & Health",
    eligibility: { text: "one (1) team of two (2) individuals per chapter", teamSize: "2", per: "chapter", individualOk: false },
  },
  {
    id: "future-tech-teacher", division: "HS", name: "Future Technology and Engineering Teacher", category: "Communication & Leadership",
    eligibility: { text: "three (3) individuals per chapter", teamSize: "1", per: "chapter", individualOk: true },
  },
  {
    id: "geospatial-technology", division: "HS", name: "Geospatial Technology", category: "Computing & Coding",
    eligibility: { text: "one (1) team of two to three (2-3) individuals per chapter", teamSize: "2\u20133", per: "chapter", individualOk: false },
  },
  {
    id: "manufacturing-prototype", division: "HS", name: "Manufacturing Prototype", category: "Manufacturing & Transportation",
    eligibility: { text: "one (1) team of at least two (2) individuals per chapter", teamSize: "2+", per: "chapter", individualOk: false },
  },
  {
    id: "music-production", division: "HS", name: "Music Production", category: "Digital Media",
    eligibility: { text: "three (3) teams per state; individual entries are permitted", teamSize: null, per: "state", individualOk: true },
  },
  {
    id: "on-demand-video", division: "HS", name: "On Demand Video", category: "Digital Media",
    eligibility: { text: "one (1) team of at least two (2) individuals per chapter", teamSize: "2+", per: "chapter", individualOk: false },
  },
  {
    id: "photographic-technology", division: "HS", name: "Photographic Technology", category: "Digital Media",
    eligibility: { text: "one (1) individual per chapter", teamSize: "1", per: "chapter", individualOk: true },
  },
  {
    id: "prepared-presentation", division: "HS", name: "Prepared Presentation", category: "Communication & Leadership",
    eligibility: { text: "three (3) individuals per state", teamSize: "1", per: "state", individualOk: true },
  },
  {
    id: "promotional-design", division: "HS", name: "Promotional Design", category: "Business & Marketing",
    eligibility: { text: "three (3) individuals per state", teamSize: "1", per: "state", individualOk: true },
  },
  {
    id: "robotics", division: "HS", name: "Robotics", category: "Engineering & Design",
    eligibility: { text: "three (3) teams of two to six (2-6) team members per state", teamSize: "2\u20136", per: "state", individualOk: false },
  },
  {
    id: "software-development", division: "HS", name: "Software Development", category: "Computing & Coding",
    eligibility: { text: "one (1) team of at least two (2) individuals per chapter; presentation/interview is limited to three (3) members", teamSize: "2+", per: "chapter", individualOk: false },
  },
  {
    id: "stem-mass-media", division: "HS", name: "STEM Mass Media", category: "Digital Media",
    eligibility: { text: "one (1) team of two to three (2-3) members per chapter", teamSize: "2\u20133", per: "chapter", individualOk: false },
  },
  {
    id: "structural-design", division: "HS", name: "Structural Design and Engineering", category: "Architecture & Construction",
    eligibility: { text: "one (1) team of two (2) individuals per chapter", teamSize: "2", per: "chapter", individualOk: false },
  },
  {
    id: "system-control", division: "HS", name: "System Control Technology", category: "Computing & Coding",
    eligibility: { text: "two (2) teams of three (3) individuals per state", teamSize: "3", per: "state", individualOk: false },
  },
  {
    id: "technology-bowl", division: "HS", name: "Technology Bowl", category: "Communication & Leadership",
    eligibility: { text: "one (1) team of three (3) individuals per chapter", teamSize: "3", per: "chapter", individualOk: false },
  },
  {
    id: "technology-problem-solving", division: "HS", name: "Technology Problem Solving", category: "Engineering & Design",
    eligibility: { text: "one (1) team of two (2) individuals per chapter", teamSize: "2", per: "chapter", individualOk: false },
  },
  {
    id: "transportation-modeling", division: "HS", name: "Transportation Modeling", category: "Manufacturing & Transportation",
    eligibility: { text: "one (1) individual per chapter", teamSize: "1", per: "chapter", individualOk: true },
  },
  {
    id: "video-game-design", division: "HS", name: "Video Game Design", category: "Computing & Coding",
    eligibility: { text: "five (5) teams of at least two (2) individuals per state", teamSize: "2+", per: "state", individualOk: false },
  },
  {
    id: "vr-simulation", division: "HS", name: "Virtual Reality Simulation (VR)", category: "Computing & Coding",
    eligibility: { text: "one (1) team per chapter; individual entries are permitted", teamSize: null, per: "chapter", individualOk: true },
  },
  {
    id: "vlogging", division: "HS", name: "Vlogging", category: "Digital Media",
    eligibility: null,
  },
  {
    id: "webmaster", division: "HS", name: "Webmaster", category: "Computing & Coding",
    eligibility: { text: "one (1) team of at least two (2) individuals per chapter", teamSize: "2+", per: "chapter", individualOk: false },
  },
];

export function teamSizeLabel(event) {
  const e = event.eligibility;
  if (!e) return null;
  if (e.teamSize && e.individualOk && e.teamSize !== '1') return `${e.teamSize} (or solo)`;
  if (e.teamSize === '1') return 'Individual';
  if (e.teamSize) return `Team of ${e.teamSize}`;
  if (e.individualOk) return 'Team or solo';
  return null;
}

export function getEvent(id) {
  return EVENTS.find((e) => e.id === id) || null;
}

export function eventsForDivision(division) {
  return EVENTS.filter((e) => e.division === division);
}