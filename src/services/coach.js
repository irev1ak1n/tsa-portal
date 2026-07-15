// ============================================================
// AI Competition Coach — v1 engine
//
// This version is fully offline: it answers by searching the
// built-in rulebook + event data and quoting the sections it
// found, with citations. That makes the demo honest (it never
// invents rules) and free to run.
//
// When you add a backend, swap composeAnswer() for a real LLM
// call that receives these same matched sections as context
// (see services/aiService.js). The UI won't need to change.
// ============================================================

import { ALL_RULES } from '../data/rules.js';
import { EVENTS } from '../data/events.js';
import { datesForState, NATIONALS } from '../data/meta.js';

const STOPWORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'do', 'does', 'can', 'could',
  'i', 'we', 'our', 'my', 'you', 'your', 'to', 'of', 'in', 'on', 'for', 'and',
  'or', 'what', 'whats', 'how', 'much', 'many', 'it', 'be', 'with', 'about',
  'there', 'this', 'that', 'have', 'has', 'us', 'me', 'at', 'by', 'from',
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t));
}

function wordsOf(text) {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 2)
  );
}

// A query token matches a rule word exactly, or by shared prefix when
// both are 4+ chars (so "teammates" finds "team", "switch" finds "switching").
function hits(token, words) {
  for (const w of words) {
    if (w === token) return true;
    if (Math.min(w.length, token.length) >= 4 && (w.startsWith(token) || token.startsWith(w))) return true;
  }
  return false;
}

function findMentionedEvent(question) {
  const q = question.toLowerCase();
  const exact = EVENTS.find((e) => q.includes(e.name.toLowerCase()));
  if (exact) return exact;
  // Otherwise require at least two distinctive words from an event's
  // name, so "video length" alone doesn't lock onto one video event.
  let best = null;
  let bestCount = 1;
  for (const e of EVENTS) {
    const words = e.name.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 4);
    const count = words.filter((w) => q.includes(w)).length;
    if (count > bestCount) {
      best = e;
      bestCount = count;
    }
  }
  return best;
}

function daysUntil(iso) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((new Date(iso + 'T00:00:00') - now) / 86400000);
}

function fmt(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export const SUGGESTED_QUESTIONS = [
  'Can we use AI on our project?',
  'What is the maximum video length?',
  'Can teammates switch after registration?',
  'What does the Webmaster portfolio need?',
  'When is my state conference?',
  'What team size does Video Game Design allow?',
];

/**
 * Returns { intro, quotes: [{id, title, text}], outro }
 */
export function composeAnswer(question, ctx = {}) {
  const q = question.toLowerCase();
  const tokens = tokenize(question);
  const mentioned = findMentionedEvent(question);

  // ---- Intent: dates & countdowns ----
  if (/(when|how (long|many days)|days (until|till|left))/.test(q) && /(state|regional|national|conference)/.test(q)) {
    const state = ctx.profile?.state || 'your state';
    const d = datesForState(ctx.profile?.state);
    const lines = [];
    if (/regional/.test(q) || !/(state|national)/.test(q)) {
      lines.push(`Regionals (${state}): ${fmt(d.regionals)} — ${daysUntil(d.regionals)} days away.`);
    }
    if (/state/.test(q)) {
      lines.push(`State conference (${state}): ${fmt(d.states)} — ${daysUntil(d.states)} days away.`);
    }
    if (/national/.test(q)) {
      lines.push(`${NATIONALS.name}: ${fmt(NATIONALS.date)} — ${daysUntil(NATIONALS.date)} days away.`);
    }
    if (lines.length === 0) {
      lines.push(
        `Regionals: ${fmt(d.regionals)} (${daysUntil(d.regionals)} days) · States: ${fmt(d.states)} (${daysUntil(d.states)} days) · Nationals: ${fmt(NATIONALS.date)} (${daysUntil(NATIONALS.date)} days).`
      );
    }
    return {
      intro: lines.join('\n'),
      quotes: [],
      outro: 'These are the season dates loaded for your profile. Your advisor has the authoritative calendar.',
    };
  }

  // ---- Intent: event recommendation ----
  if (/(recommend|which event|what event|best event|should i (do|pick|choose|compete))/.test(q)) {
    return {
      intro:
        'That is exactly what the Smart Recommender is for — it scores every event in your division against your interests, skills, and intended major, and explains each match.',
      quotes: [],
      outro: 'Open Events → Get recommendations, answer two quick questions, and you will get a ranked list with reasons.',
    };
  }

  // ---- Intent: event facts (team size, difficulty, deliverables) ----
  if (mentioned && /(team size|how many (people|members|students)|solo|alone|difficulty|deliverable|what.*(submit|turn in)|due)/.test(q)) {
    const facts = [];
    if (/(team size|how many|solo|alone)/.test(q)) {
      facts.push(`${mentioned.name} allows a team size of ${mentioned.teamSize}.`);
    }
    if (/difficulty/.test(q)) {
      facts.push(`Difficulty is rated ${mentioned.difficulty}/5 with typical prep of ${mentioned.prep}.`);
    }
    if (/(deliverable|submit|turn in|due)/.test(q)) {
      facts.push(`Deliverables: ${mentioned.deliverables.join('; ')}.`);
    }
    return {
      intro: facts.join('\n'),
      quotes: [],
      outro: `Full breakdown on the ${mentioned.name} event page, including the scoring rubric and a month-by-month plan.`,
    };
  }

  // ---- Default: search the rulebook ----
  const scored = ALL_RULES.map((rule) => {
    let score = 0;
    const titleWords = wordsOf(rule.title);
    const textWords = wordsOf(rule.text);
    for (const t of tokens) {
      if (hits(t, titleWords)) score += 3;
      if (hits(t, textWords)) score += 1;
    }
    if (mentioned && rule.eventId === mentioned.id) score += 3;
    if (mentioned && rule.eventId && rule.eventId !== mentioned.id) score -= 2;
    return { rule, score };
  })
    .filter((r) => r.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (scored.length === 0) {
    return {
      intro: 'I could not find that in the rulebook data loaded into this demo.',
      quotes: [],
      outro:
        'Try rewording with rule keywords (for example "video length", "AI", "team changes"), check the official current-year Competition Guide, or ask your advisor. This coach only answers from loaded rule text — it will not guess.',
    };
  }

  const lead = mentioned
    ? `Here is what the loaded rules say for ${mentioned.name}:`
    : 'Here is what the loaded rules say:';

  return {
    intro: lead,
    quotes: scored.map(({ rule }) => ({ id: rule.id, title: rule.title, text: rule.text })),
    outro:
      'Cited sections are sample rule text for this demo — always verify against the official current-year Competition Guide before relying on it.',
  };
}
