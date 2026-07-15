import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { recommend } from '../services/recommender.js';
import { Stars, Icon } from '../components/UI.jsx';

const TEAM_PREFS = [
  { v: 'solo', label: 'Solo' },
  { v: 'small', label: 'Small (2–4)' },
  { v: 'large', label: 'Big squad (5+)' },
  { v: 'any', label: 'No preference' },
];

const EFFORT = [
  { v: 'light', label: 'A few hours/week' },
  { v: 'medium', label: 'Steady project' },
  { v: 'heavy', label: 'Go all in' },
  { v: 'any', label: 'Whatever it takes' },
];

export default function Recommender() {
  const { profile, myEvents, addEvent, removeEvent } = useApp();
  const [teamPref, setTeamPref] = useState('any');
  const [effort, setEffort] = useState('any');
  const [results, setResults] = useState(null);

  function run() {
    setResults(recommend(profile, { teamPref, effort }));
  }

  return (
    <>
      <div className="section">
        <div className="eyebrow">Smart Recommender</div>
        <h1>Find your events</h1>
        <p className="muted small">
          Matching against your profile: {profile.interests?.length || 0} interests, {profile.skills?.length || 0}{' '}
          skills, {profile.major} major.{' '}
          <Link to="/onboarding" className="link">
            Edit profile
          </Link>
        </p>
      </div>

      <div className="section card">
        <div className="field">
          <label>How do you like to work?</label>
          <div className="chip-row">
            {TEAM_PREFS.map((t) => (
              <button key={t.v} className={`chip ${teamPref === t.v ? 'on' : ''}`} onClick={() => setTeamPref(t.v)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <label>How much time can you give?</label>
          <div className="chip-row">
            {EFFORT.map((e) => (
              <button key={e.v} className={`chip ${effort === e.v ? 'on' : ''}`} onClick={() => setEffort(e.v)}>
                {e.label}
              </button>
            ))}
          </div>
        </div>
        <button className="btn primary block" onClick={run}>
          <Icon name="spark" size={16} /> {results ? 'Re-run matches' : 'Show my matches'}
        </button>
      </div>

      {results && results.length === 0 && (
        <div className="card">
          <p className="muted" style={{ margin: 0 }}>
            No strong matches — add a few more interests to your profile and try again.
          </p>
        </div>
      )}

      {results && results.length > 0 && (
        <div className="event-grid">
          {results.map(({ event, pct, reasons }) => {
            const added = myEvents.includes(event.id);
            return (
              <div className="event-card" key={event.id}>
                <div className="top">
                  <h3>
                    <Link to={`/events/${event.id}`}>{event.name}</Link>
                  </h3>
                  <span className="match-pct">{pct}%</span>
                </div>
                <div className="meta">
                  <span>Team {event.teamSize}</span>
                  <span>·</span>
                  <Stars n={event.difficulty} />
                </div>
                <div>
                  {reasons.slice(0, 3).map((r, i) => (
                    <p key={i} className="small" style={{ margin: '0 0 4px', color: 'var(--navy-700)' }}>
                      ✓ {r}
                    </p>
                  ))}
                </div>
                <div className="foot">
                  <Link to={`/events/${event.id}`} className="btn ghost small">
                    Details
                  </Link>
                  {added ? (
                    <button className="btn navy small" onClick={() => removeEvent(event.id)}>
                      ✓ Added
                    </button>
                  ) : (
                    <button className="btn primary small" onClick={() => addEvent(event.id)}>
                      <Icon name="plus" size={14} /> Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {results && (
        <p className="small muted" style={{ marginTop: 14 }}>
          Every match explains itself — no black box. The scoring lives in{' '}
          <span className="mono">src/services/recommender.js</span>.
        </p>
      )}
    </>
  );
}
