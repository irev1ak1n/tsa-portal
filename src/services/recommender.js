// ============================================================
// Smart Event Recommender
// Transparent scoring: every point added produces a
// human-readable reason, so students see WHY an event matched.
// ============================================================

import { eventsForDivision } from '../data/events.js';

const INTEREST_KEYWORDS = {
  'Programming': ['coding', 'software', 'program', 'game', 'cyber', 'data'],
  'Game design': ['game'],
  'Web design': ['web', 'website'],
  'CAD / 3D modeling': ['cad', 'model', 'drafting', 'drawing'],
  'Robotics': ['engineering', 'control', 'mechan', 'prototype'],
  'Video & film': ['video', 'film'],
  'Photography': ['photo'],
  'Graphic design': ['graphic', 'photo', 'anima', 'fashion', 'portfolio'],
  'Public speaking': ['presentation', 'speech', 'debat', 'speaking', 'interview', 'leadership'],
  'Writing': ['writing', 'content', 'script', 'research', 'documentation'],
  'Music & audio': ['music', 'audio', 'sound'],
  'Science & biotech': ['biotech', 'science', 'forensic', 'stem', 'medical'],
  'Medicine & health': ['medical', 'biotech', 'forensic', 'health'],
  'Business & marketing': ['business', 'marketing', 'fashion', 'entrepreneur'],
  'Architecture': ['architect', 'structural', 'construction'],
  'Aviation & flight': ['flight', 'aircraft', 'aero', 'dragster'],
};

function blobFor(event) {
  return [
    event.name,
    event.category,
    event.overview,
    event.skills.join(' '),
    event.careers.join(' '),
  ]
    .join(' ')
    .toLowerCase();
}

function parseTeamSize(teamSize) {
  const nums = teamSize.match(/\d+/g)?.map(Number) || [1];
  return { min: Math.min(...nums), max: Math.max(...nums) };
}

/**
 * @param {object} profile - { division, interests[], skills[], major }
 * @param {object} prefs   - { teamPref: 'solo'|'small'|'large'|'any', effort: 'light'|'medium'|'heavy'|'any' }
 * @returns ranked [{ event, pct, reasons[] }]
 */
export function recommend(profile, prefs = {}) {
  const pool = eventsForDivision(profile.division || 'HS');
  const results = [];

  for (const event of pool) {
    let score = 0;
    const reasons = [];
    const blob = blobFor(event);

    for (const interest of profile.interests || []) {
      const keywords = INTEREST_KEYWORDS[interest] || [interest.toLowerCase()];
      if (keywords.some((k) => blob.includes(k))) {
        score += 3;
        reasons.push(`Matches your interest in ${interest.toLowerCase()}`);
      }
    }

    for (const skill of profile.skills || []) {
      if (event.skills.some((s) => s.toLowerCase() === skill.toLowerCase())) {
        score += 2;
        reasons.push(`Uses a skill you already have: ${skill}`);
      }
    }

    if (profile.major && profile.major !== 'Undecided' && event.majors.includes(profile.major)) {
      score += 4;
      reasons.push(`Directly aligns with ${profile.major}`);
    }

    const { min, max } = parseTeamSize(event.teamSize);
    if (prefs.teamPref === 'solo' && min === 1) {
      score += 2;
      reasons.push('Can be done solo, like you prefer');
    } else if (prefs.teamPref === 'small' && min <= 3 && max <= 4) {
      score += 2;
      reasons.push('Fits your small-team preference');
    } else if (prefs.teamPref === 'large' && max >= 5) {
      score += 2;
      reasons.push('Supports the bigger team you want');
    }

    if (prefs.effort === 'light' && event.difficulty <= 2) {
      score += 1;
      reasons.push('Lighter time commitment');
    } else if (prefs.effort === 'medium' && event.difficulty === 3) {
      score += 1;
      reasons.push('Moderate time commitment, as requested');
    } else if (prefs.effort === 'heavy' && event.difficulty >= 4) {
      score += 1;
      reasons.push('A deep project worth the hours you can give');
    }

    if (score > 0) {
      const pct = Math.min(98, 35 + score * 4);
      results.push({ event, pct, reasons: [...new Set(reasons)] });
    }
  }

  results.sort((a, b) => b.pct - a.pct);
  return results.slice(0, 6);
}
