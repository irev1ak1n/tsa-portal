# TSA Hub — Student Platform (v1 demo)

One place for TSA students to pick events, track deadlines, prep with their team, and search the rulebook.
Built as a working demo you can run locally, show to chapter advisors, and eventually pitch to TSA state/national officers.

---

## Run it on localhost (PhpStorm)

1. **Install Node.js** (LTS version, 20 or newer) from https://nodejs.org — PhpStorm uses it to run the dev server.
2. **Open this folder in PhpStorm** (`File → Open…` → select the `tsa-hub` folder).
3. Open PhpStorm's built-in **Terminal** (bottom bar) and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open **http://localhost:5173** in your browser. That's it.

**See it on your phone (great for demos):** while `npm run dev` is running, the terminal prints a
"Network" URL like `http://192.168.1.23:5173`. Open that on any phone connected to the same Wi-Fi.

Stop the server anytime with `Ctrl+C` in the terminal.

---

## What's in v1

| Area | What it does |
|---|---|
| **Onboarding** | Division (MS/HS), state, grade, interests, skills, intended major — personalizes everything else |
| **Dashboard** | Countdown scoreboard (Regionals / States / Nationals), deadlines, your events with progress, rule updates, announcements |
| **Event Explorer** | 24 sample events with team size, difficulty, rubric, deliverables, month-by-month plan, careers & majors |
| **Smart Recommender** | Ranks events against your profile and explains *why* each one matched — no black box |
| **Coach + Rulebook** | Ask questions, get answers quoted from rule sections with citations (e.g. `WM-3.4`), plus live rulebook search |
| **Team Workspace** | Kanban tasks, auto-generated deliverables checklists, members, meetings, shared notes |
| **Achievements** | Badges earned from real activity in the app |

Everything persists in your browser's localStorage (per device). No account, no server needed for the demo.

---

## Honest limits of this demo (read before pitching)

- **Sample data.** Event details, rules text, and conference dates are *representative placeholders*, not official
  TSA content. Official rulebooks are copyrighted and change yearly — replace this data through a TSA partnership.
  Edit dates in `src/data/meta.js`; events in `src/data/events.js`; rules in `src/data/rules.js`.
- **The coach is offline in v1.** It searches the built-in rule data and quotes matching sections with citations —
  it never invents answers. Real LLM answers come later via a small backend (see `src/services/aiService.js`,
  which documents the exact upgrade path). Never put an AI API key in frontend code.
- **TSA's name and brand belong to TSA.** This is fine as a private demo/prototype. Before publishing publicly or
  putting it on app stores under the TSA name, you need TSA's permission — which is exactly the partnership
  conversation this demo is built to start.

---

## Project map

```
tsa-hub/
├── index.html               fonts, meta, mount point
├── vite.config.js           dev server (LAN preview enabled)
└── src/
    ├── main.jsx / App.jsx   entry + routes + profile gate
    ├── styles.css           full design system (TSA navy/red/white)
    ├── context/
    │   └── AppContext.jsx   ALL app state + localStorage (swap this file for real API later)
    ├── data/
    │   ├── events.js        event catalog (SAMPLE)
    │   ├── rules.js         rulebook sections (SAMPLE)
    │   └── meta.js          states, dates, announcements, badges (SAMPLE)
    ├── services/
    │   ├── recommender.js   transparent event-matching engine
    │   ├── coach.js         rule search + grounded answer composer
    │   └── aiService.js     where the real LLM plugs in (documented stub)
    ├── components/          Layout (nav), UI primitives (icons, progress, cite chips)
    └── screens/             Onboarding, Dashboard, Events, EventDetail,
                             Recommender, Coach, Team, Profile
```

---

## Roadmap (matches the full product vision)

**Phase 2 — backend & accounts:** database + auth, real conference dates per state, sync across devices,
chapter rosters. `AppContext.jsx` is the only file that talks to storage, so the swap is contained.

**Phase 3 — real AI Coach:** backend proxy that sends the matched rule sections + question to an LLM API and
returns grounded, cited answers (RAG). The UI already renders citations. See `src/services/aiService.js`.

**Phase 4 — more roles:** advisor dashboard (progress, missing submissions, messaging), chapter officer tools,
parent view (schedules, forms, payments), state officer + national admin consoles.

**Phase 5 — remaining student modules:** submission tracker with file uploads, practice center (flashcards,
timed quizzes, leaderboards), team finder, portfolio/resume builder, scholarship center, conference companion
(schedules, maps, results), community/forums, notification center, calendar sync.

**Phase 6 — app stores:** wrap this web app with **Capacitor** (fastest path: same code → iOS + Android builds)
or port to **Expo/React Native** (most native feel; the React knowledge transfers). Both routes require an Apple
Developer account ($99/yr) and Google Play account ($25 one-time) — and TSA's sign-off if it ships under their name.

---

*Unofficial prototype. TSA and related marks belong to the Technology Student Association.*
