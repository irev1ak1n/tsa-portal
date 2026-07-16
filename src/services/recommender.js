// ============================================================
// Smart Event Recommender
//
// Matches the student's interests against the official event
// names and their UI category. Every point produces a
// human-readable reason, so students see WHY something matched.
//
// Team size comes from the official TSA eligibility chart, so
// the "how do you like to work" preference is scored on real
// data. Difficulty and required skills are NOT scored: those
// live in the Competition Guides, which are not in this app.
// ============================================================

import { eventsForDivision } from '../data/events.js';

const INTEREST_KEYWORDS = {
  'Programming': ['coding', 'software', 'program', 'cyber', 'microcontroller', 'develop'],
  'Game design': ['game'],
  'Web design': ['web', 'website'],
  'CAD / 3D modeling': ['cad', 'modeling', 'drafting', 'technical design'],
  'Robotics': ['robot', 'drone', 'uav', 'animatron', 'control'],
  'Video & film': ['video', 'film', 'vlog', 'anima'],
  'Photography': ['photo'],
  'Graphic design': ['graphic', 'promotional', 'fashion', 'board game', 'design'],
  'Public speaking': ['presentation', 'speech', 'debat', 'leadership', 'bowl', 'chapter team'],
  'Writing': ['stories', 'podcast', 'mass media', 'vlog'],
  'Music & audio': ['music', 'audio', 'podcast'],
  'Science & biotech': ['biotech', 'science', 'forensic', 'stem'],
  'Medicine & health': ['medical', 'biotech', 'forensic', 'health'],
  'Business & marketing': ['business', 'marketing', 'promotional', 'fashion'],
  'Architecture': ['architect', 'structural', 'construction', 'off the grid'],
  'Aviation & flight': ['flight', 'aviation', 'aero', 'drone', 'uav'],
  'Data & statistics': ['data', 'analytics', 'geospatial'],
  'Making & fabrication': ['manufactur', 'production', 'prototype', 'inventions', 'mechanical'],
  'Cars & racing': ['dragster', 'racer', 'transportation', 'vehicle'],
  'Teaching': ['teacher', 'stories', 'education'],
};

// '2-6' -> {min:2,max:6} | '2+' -> {min:2,max:Infinity} | '1' -> {min:1,max:1}
function teamRange(eligibility) {
  if (!eligibility) return null;
  const t = eligibility.teamSize;
  if (!t) return eligibility.individualOk ? { min: 1, max: Infinity } : null;
  const nums = t.match(/\d+/g)?.map(Number) || [];
  if (!nums.length) return null;
  const min = Math.min(...nums);
  const max = t.includes('+') ? Infinity : Math.max(...nums);
  return { min: eligibility.individualOk ? 1 : min, max };
}

/**
 * @param {object} profile - { division, interests[] }
 * @param {object} prefs   - { teamPref: 'solo'|'small'|'large'|'any' }
 * @returns ranked [{ event, pct, reasons[] }]
 */
export function recommend(profile, prefs = {}) {
  const pool = eventsForDivision(profile.division || 'HS');
  const results = [];

  for (const event of pool) {
    let score = 0;
    const reasons = [];
    const name = event.name.toLowerCase();
    const category = event.category.toLowerCase();

    for (const interest of profile.interests || []) {
      const keywords = INTEREST_KEYWORDS[interest] || [interest.toLowerCase()];
      if (keywords.some((k) => name.includes(k))) {
        score += 4;
        reasons.push(`This event is ${interest.toLowerCase()}`);
      } else if (keywords.some((k) => category.includes(k))) {
        score += 2;
        reasons.push(`It's in ${event.category}, which fits ${interest.toLowerCase()}`);
      }
    }

    const range = teamRange(event.eligibility);
    if (range && prefs.teamPref && prefs.teamPref !== 'any') {
      if (prefs.teamPref === 'solo' && range.min === 1) {
        score += 3;
        reasons.push('You can enter this one solo');
      } else if (prefs.teamPref === 'small' && range.min <= 3 && range.max <= 4) {
        score += 3;
        reasons.push('Fits your small-team preference');
      } else if (prefs.teamPref === 'large' && range.max >= 5) {
        score += 3;
        reasons.push('Supports the bigger team you want');
      }
    }

    if (score > 0) {
      const pct = Math.min(98, 40 + score * 6);
      results.push({ event, pct, reasons: [...new Set(reasons)] });
    }
  }

  results.sort(
      (a, b) => b.pct - a.pct || b.reasons.length - a.reasons.length || a.event.name.localeCompare(b.event.name)
  );
  return results.slice(0, 8);
}