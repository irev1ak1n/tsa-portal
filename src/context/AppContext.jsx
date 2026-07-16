// ============================================================
// App state — one context, persisted to localStorage.
// This is the layer you will later replace with real API calls
// to your backend/database. Every screen only talks to these
// actions, so the swap will be contained to this file.
// ============================================================

import { createContext, useContext, useEffect, useState } from 'react';

const KEY = 'tsa-hub-state-v1';


const EMPTY = {
  profile: null, // { name, grade, division, state, chapter, interests[], skills[], major }
  myEvents: [], // event ids
  tasks: [], // { id, title, assignee, eventId, status: 'todo'|'doing'|'done', due }
  checklists: {}, // { [eventId]: [{ id, label, done }] }
  notes: '',
  meetings: [], // { id, date, title }
  teamMembers: [], // { id, name, role }
  coachCount: 0,
  chats: [],
  follows: [],
  hiddenSuggestions: [],
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    return EMPTY;
  }
}

const Ctx = createContext(null);

export function AppProvider({ children }) {
  const [state, setState] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // storage full or unavailable — app keeps working in memory
    }
  }, [state]);

  const uid = () => Math.random().toString(36).slice(2, 9);

  const actions = {
    saveProfile(profile) {
      setState((s) => ({ ...s, profile }));
    },

    addEvent(eventId) {
      setState((s) => {
        if (s.myEvents.includes(eventId)) return s;
        return {
          ...s,
          myEvents: [...s.myEvents, eventId],
          checklists: { ...s.checklists, [eventId]: s.checklists[eventId] || [] },
        };
      });
    },

    addChecklistItem(eventId, label) {
      setState((s) => ({
        ...s,
        checklists: {
          ...s.checklists,
          [eventId]: [...(s.checklists[eventId] || []), { id: uid(), label, done: false }],
        },
      }));
    },

    removeChecklistItem(eventId, itemId) {
      setState((s) => ({
        ...s,
        checklists: { ...s.checklists, [eventId]: (s.checklists[eventId] || []).filter((i) => i.id !== itemId) },
      }));
    },

    removeEvent(eventId) {
      setState((s) => ({
        ...s,
        myEvents: s.myEvents.filter((id) => id !== eventId),
      }));
    },

    addTask({ title, assignee, eventId, due }) {
      setState((s) => ({
        ...s,
        tasks: [...s.tasks, { id: uid(), title, assignee, eventId: eventId || '', status: 'todo', due: due || '' }],
      }));
    },

    moveTask(taskId, status) {
      setState((s) => ({
        ...s,
        tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
      }));
    },

    deleteTask(taskId) {
      setState((s) => ({ ...s, tasks: s.tasks.filter((t) => t.id !== taskId) }));
    },

    toggleChecklist(eventId, itemId) {
      setState((s) => ({
        ...s,
        checklists: {
          ...s.checklists,
          [eventId]: (s.checklists[eventId] || []).map((it) =>
              it.id === itemId ? { ...it, done: !it.done } : it
          ),
        },
      }));
    },

    setNotes(notes) {
      setState((s) => ({ ...s, notes }));
    },

    addMeeting({ date, title }) {
      setState((s) => ({
        ...s,
        meetings: [...s.meetings, { id: uid(), date, title }].sort((a, b) =>
            a.date.localeCompare(b.date)
        ),
      }));
    },

    removeMeeting(id) {
      setState((s) => ({ ...s, meetings: s.meetings.filter((m) => m.id !== id) }));
    },

    addMember({ name, role }) {
      setState((s) => ({
        ...s,
        teamMembers: [...s.teamMembers, { id: uid(), name, role }],
      }));
    },

    removeMember(id) {
      setState((s) => ({ ...s, teamMembers: s.teamMembers.filter((m) => m.id !== id) }));
    },

    bumpCoach() {
      setState((s) => ({ ...s, coachCount: s.coachCount + 1 }));
    },

    createThread({ id, name, kind, sub }) {
      setState((s) => {
        if (s.chats.some((t) => t.id === id)) return s;
        return { ...s, chats: [{ id, name, kind, sub, messages: [] }, ...s.chats] };
      });
    },

    toggleFollow(accountId) {
      setState((s) => ({
        ...s,
        follows: s.follows.includes(accountId)
            ? s.follows.filter((a) => a !== accountId)
            : [...s.follows, accountId],
      }));
    },

    hideSuggestion(accountId) {
      setState((s) => ({ ...s, hiddenSuggestions: [...s.hiddenSuggestions, accountId] }));
    },

    sendMessage(threadId, text) {
      setState((s) => ({
        ...s,
        chats: s.chats.map((t) =>
            t.id === threadId
                ? {
                  ...t,
                  messages: [
                    ...t.messages,
                    { id: uid(), from: 'me', text, at: 'Now', read: true },
                  ],
                }
                : t
        ),
      }));
    },

    markThreadRead(threadId) {
      setState((s) => ({
        ...s,
        chats: s.chats.map((t) =>
            t.id === threadId ? { ...t, messages: t.messages.map((m) => ({ ...m, read: true })) } : t
        ),
      }));
    },

    resetAll() {
      localStorage.removeItem(KEY);
      setState(EMPTY);
    },
  };

  // Progress for an event = done items / total items across its
  // checklist and any tasks tagged to it.
  function progressFor(eventId) {
    const list = state.checklists[eventId] || [];
    const tasks = state.tasks.filter((t) => t.eventId === eventId);
    const total = list.length + tasks.length;
    if (total === 0) return 0;
    const done = list.filter((i) => i.done).length + tasks.filter((t) => t.status === 'done').length;
    return Math.round((done / total) * 100);
  }

  function unreadFor(threadId) {
    const t = (state.chats || []).find((c) => c.id === threadId);
    if (!t) return 0;
    return t.messages.filter((m) => m.from !== 'me' && !m.read).length;
  }

  const unreadTotal = (state.chats || []).reduce(
      (sum, t) => sum + t.messages.filter((m) => m.from !== 'me' && !m.read).length,
      0
  );

  return (
      <Ctx.Provider value={{ ...state, ...actions, progressFor, unreadFor, unreadTotal }}>
        {children}
      </Ctx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}