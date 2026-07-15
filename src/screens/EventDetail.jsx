import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { getEvent } from '../data/events.js';
import { EVENT_RULES } from '../data/rules.js';
import { Stars, Cite, Icon } from '../components/UI.jsx';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { myEvents, addEvent, removeEvent } = useApp();
  const event = getEvent(id);

  if (!event) {
    return (
      <div className="card">
        <h2>Event not found</h2>
        <p className="muted">That event isn't in the catalog.</p>
        <Link to="/events" className="btn navy">
          Back to Events
        </Link>
      </div>
    );
  }

  const added = myEvents.includes(event.id);
  const rules = EVENT_RULES.filter((r) => r.eventId === event.id);
  const totalPts = event.rubric.reduce((sum, r) => sum + r.pts, 0);

  return (
    <>
      <div className="section">
        <div className="eyebrow">{event.category}</div>
        <h1>{event.name}</h1>
        <p className="muted">{event.overview}</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {added ? (
            <button className="btn navy" onClick={() => removeEvent(event.id)}>
              ✓ In my events — remove
            </button>
          ) : (
            <button className="btn primary" onClick={() => addEvent(event.id)}>
              <Icon name="plus" size={16} /> Add to my events
            </button>
          )}
          <button
            className="btn ghost"
            onClick={() => navigate('/coach', { state: { q: `What are the rules for ${event.name}?` } })}
          >
            <Icon name="chat" size={16} /> Ask the coach
          </button>
        </div>
      </div>

      <div className="section kv">
        <div className="cell">
          <div className="k">Division</div>
          <div className="v">{event.division === 'HS' ? 'High School' : 'Middle School'}</div>
        </div>
        <div className="cell">
          <div className="k">Team size</div>
          <div className="v">{event.teamSize}</div>
        </div>
        <div className="cell">
          <div className="k">Difficulty</div>
          <div className="v">
            <Stars n={event.difficulty} />
          </div>
        </div>
        <div className="cell">
          <div className="k">Typical prep</div>
          <div className="v">{event.prep}</div>
        </div>
      </div>

      <div className="section card">
        <h2>What you'll submit</h2>
        {event.deliverables.map((d, i) => (
          <div className="check" key={i}>
            <span>• {d}</span>
          </div>
        ))}
        <p className="small muted" style={{ marginTop: 10 }}>
          Adding this event auto-creates this checklist in your Team workspace.
        </p>
      </div>

      <div className="section card">
        <h2>How it's scored</h2>
        {event.rubric.map((r, i) => (
          <div className="rubric-row" key={i}>
            <span>{r.c}</span>
            <span className="pts">{r.pts} pts</span>
          </div>
        ))}
        <div className="rubric-row" style={{ borderTop: '2px solid var(--line)', fontWeight: 700 }}>
          <span>Total</span>
          <span className="pts">{totalPts} pts</span>
        </div>
      </div>

      <div className="section card">
        <h2>Season game plan</h2>
        {event.timeline.map((t, i) => (
          <div className="timeline-item" key={i}>
            <span className="tl-month">{t.m}</span>
            <span className="tl-text">{t.t}</span>
          </div>
        ))}
      </div>

      <div className="section card">
        <h2>Advisor tips</h2>
        {event.tips.map((t, i) => (
          <p key={i} className="small" style={{ margin: '0 0 8px' }}>
            → {t}
          </p>
        ))}
      </div>

      {rules.length > 0 && (
        <div className="section card">
          <h2>Key rules</h2>
          {rules.map((r) => (
            <div className="rule-hit" key={r.id}>
              <div className="r-head">
                <Cite id={r.id} />
                <span className="r-title">{r.title}</span>
              </div>
              <div className="r-text">{r.text}</div>
            </div>
          ))}
          <p className="small muted" style={{ marginTop: 10 }}>
            Sample rule text — verify against the official current-year Competition Guide.
          </p>
        </div>
      )}

      <div className="section card">
        <h2>Where this leads</h2>
        <p className="small muted" style={{ marginBottom: 8 }}>
          Careers
        </p>
        <div className="chip-row" style={{ marginBottom: 14 }}>
          {event.careers.map((c) => (
            <span key={c} className="chip static">
              {c}
            </span>
          ))}
        </div>
        <p className="small muted" style={{ marginBottom: 8 }}>
          College majors
        </p>
        <div className="chip-row">
          {event.majors.map((m) => (
            <span key={m} className="chip static">
              {m}
            </span>
          ))}
        </div>
      </div>

      <div className="section card flat">
        <h3>Software & materials</h3>
        <p className="small muted" style={{ margin: 0 }}>
          {event.software.join(' · ')}
        </p>
      </div>
    </>
  );
}
