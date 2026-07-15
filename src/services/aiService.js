// ============================================================
// aiService.js — where the REAL AI plugs in later
//
// v1 ships with an offline coach (services/coach.js) that
// searches the built-in rulebook and quotes sections with
// citations. When you build your backend ("we'll make
// database later"), upgrade the coach like this:
//
//   1. NEVER put an AI API key in this frontend code. Anyone
//      can open DevTools and steal it. Keys live on a server.
//
//   2. Build a tiny backend endpoint, e.g. POST /api/coach
//      (Node/Express, Next.js API route, PHP, anything).
//      The frontend sends { question, ruleSections } to it.
//
//   3. The backend calls an LLM API (for example Anthropic's
//      Messages API, https://docs.claude.com) with a prompt
//      like the one below, using the API key stored in a
//      server-side environment variable, and returns the text.
//
//   4. Flip USE_REMOTE_AI to true. The Coach screen already
//      falls back to the offline engine if this fails.
//
// This is retrieval-augmented generation (RAG) in miniature:
// coach.js finds the relevant rule sections, the LLM writes a
// grounded answer FROM those sections, and you display the
// citations. That grounding is your pitch to TSA: the coach
// cites the rulebook instead of guessing.
// ============================================================

export const USE_REMOTE_AI = false;

const SYSTEM_PROMPT = `You are the TSA Competition Coach. Answer the student's question
using ONLY the rule sections provided. Quote or paraphrase them, and cite section IDs
in brackets like [WM-3.4]. If the sections don't answer the question, say so and tell
the student to check the official Competition Guide or ask their advisor. Never invent
rules. Keep answers under 150 words, friendly and direct.`;

/**
 * @param {string} question
 * @param {Array<{id:string,title:string,text:string}>} ruleSections - from coach.js search
 * @returns {Promise<string>} the model's answer
 */
export async function askRemoteCoach(question, ruleSections) {
  // Example frontend call to YOUR backend (adjust the URL):
  const res = await fetch('/api/coach', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, ruleSections, system: SYSTEM_PROMPT }),
  });
  if (!res.ok) throw new Error('Coach backend unavailable');
  const data = await res.json();
  return data.answer;
}

/* ------------------------------------------------------------
Example backend (Node/Express) — server-side only, for later:

  import express from 'express';
  import Anthropic from '@anthropic-ai/sdk';   // npm i @anthropic-ai/sdk

  const app = express();
  app.use(express.json());
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  app.post('/api/coach', async (req, res) => {
    const { question, ruleSections, system } = req.body;
    const context = ruleSections
      .map(r => `[${r.id}] ${r.title}: ${r.text}`)
      .join('\n\n');
    const msg = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      system,
      messages: [{ role: 'user', content: `Rule sections:\n${context}\n\nQuestion: ${question}` }],
    });
    res.json({ answer: msg.content[0].text });
  });

  app.listen(3001);
------------------------------------------------------------ */
