import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { composeAnswer, SUGGESTED_QUESTIONS } from '../services/coach.js';
import { ALL_RULES } from '../data/rules.js';
import { Cite } from '../components/UI.jsx';

function highlight(text, q) {
  if (!q || q.length < 2) return text;
  const esc = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${esc})`, 'ig'));
  return parts.map((p, i) =>
    p.toLowerCase() === q.toLowerCase() ? <mark key={i}>{p}</mark> : <span key={i}>{p}</span>
  );
}

export default function Coach() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { profile, bumpCoach } = useApp();

  const [tab, setTab] = useState(params.get('tab') === 'search' ? 'search' : 'chat');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const endRef = useRef(null);
  const seeded = useRef(false);

  function ask(question) {
    const q = question.trim();
    if (!q) return;
    const answer = composeAnswer(q, { profile });
    setMessages((m) => [...m, { role: 'user', text: q }, { role: 'coach', ...answer }]);
    setInput('');
    bumpCoach();
  }

  // Seed question from event pages ("Ask the coach") or ?q=
  useEffect(() => {
    const seed = location.state?.q || params.get('q');
    if (seed && !seeded.current) {
      seeded.current = true;
      ask(seed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  const hits = search.trim().length >= 2
    ? ALL_RULES.filter(
        (r) =>
          (r.title + ' ' + r.text + ' ' + r.id).toLowerCase().includes(search.trim().toLowerCase())
      )
    : [];

  return (
    <>
      <div className="section">
        <div className="eyebrow">Competition Coach</div>
        <h1>Coach</h1>
      </div>

      <div className="notice info">
        <span aria-hidden="true">ⓘ</span>
        <span>
          Demo coach: answers come only from the sample rulebook built into this app, with citations — it never
          guesses. Real AI + official rules plug in with the backend (see{' '}
          <span className="mono">src/services/aiService.js</span>).
        </span>
      </div>

      <div className="pilltabs" role="tablist">
        <button className={tab === 'chat' ? 'on' : ''} onClick={() => setTab('chat')}>
          Ask the coach
        </button>
        <button className={tab === 'search' ? 'on' : ''} onClick={() => setTab('search')}>
          Search the rulebook
        </button>
      </div>

      {tab === 'chat' && (
        <>
          {messages.length === 0 && (
            <div className="section card">
              <h3>Try asking</h3>
              <div className="chip-row">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button key={q} className="chip" onClick={() => ask(q)}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="chat section">
            {messages.map((m, i) =>
              m.role === 'user' ? (
                <div className="bubble user" key={i}>
                  {m.text}
                </div>
              ) : (
                <div className="bubble coach" key={i}>
                  <div>{m.intro}</div>
                  {m.quotes.map((qt) => (
                    <div className="coach-quote" key={qt.id}>
                      <div style={{ marginBottom: 4 }}>
                        <Cite id={qt.id} /> <strong>{qt.title}</strong>
                      </div>
                      {qt.text}
                    </div>
                  ))}
                  {m.outro && (
                    <div className="small muted" style={{ marginTop: 6 }}>
                      {m.outro}
                    </div>
                  )}
                </div>
              )
            )}
            <div ref={endRef} />
          </div>

          <form
            className="chatbar"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about rules, deadlines, events…"
              aria-label="Ask the coach"
            />
            <button type="submit">Ask</button>
          </form>
        </>
      )}

      {tab === 'search' && (
        <>
          <div className="section card flat">
            <input
              className="input"
              placeholder='Search rules — try "video length", "AI", "team"…'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search the rulebook"
              autoFocus
            />
          </div>

          <div className="card">
            {search.trim().length < 2 && (
              <p className="muted small" style={{ margin: 0 }}>
                Type at least 2 characters. {ALL_RULES.length} sections loaded (general rules + event rules).
              </p>
            )}
            {search.trim().length >= 2 && hits.length === 0 && (
              <p className="muted small" style={{ margin: 0 }}>
                No sections match "{search}". Try a shorter keyword.
              </p>
            )}
            {hits.map((r) => (
              <div className="rule-hit" key={r.id}>
                <div className="r-head">
                  <Cite id={r.id} />
                  <span className="r-title">{highlight(r.title, search.trim())}</span>
                  <span className="tag">{r.scope}</span>
                </div>
                <div className="r-text">{highlight(r.text, search.trim())}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
