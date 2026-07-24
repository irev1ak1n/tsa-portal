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

export let EVENTS = [];

export function setEvents(rows) {
  EVENTS = rows;
}

export function teamSizeLabel(event) {
  const e = event?.eligibility;
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