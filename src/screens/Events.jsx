import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { EVENTS, CATEGORIES } from '../data/events.js';
import { Stars, Icon } from '../components/UI.jsx';

export default function Events() {
  const { profile, myEvents, addEvent, removeEvent } = useApp();
  const [query, setQuery] = useState('');
  const [division, setDivision] = useState(profile?.division || 'HS');
  const [category, setCategory] = useState('All');

  const q = query.trim().toLowerCase();
  const list = EVENTS.filter((e) => {
    if (e.division !== division) return false;
    if (category !== 'All' && e.category !== category) return false;
    if (q && !(e.name + ' ' + e.category + ' ' + e.skills.join(' ')).toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <>
      <div className="section">
        <div className="eyebrow">Event Explorer</div>
        <h1>Events</h1>
        <p className="muted small">
          {division === 'HS' ? 'High School' : 'Middle School'} division · sample catalog — swap in the official
          current-year list later.
        </p>
      </div>

      <div className="section card flat" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 220px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="search" size={18} />
          <input
            className="input"
            style={{ border: 0, padding: '6px 2px' }}
            placeholder="Search events or skills…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search events"
          />
        </div>
        <div className="chip-row">
          <button className={`chip ${division === 'MS' ? 'on' : ''}`} onClick={() => setDivision('MS')}>
            MS
          </button>
          <button className={`chip ${division === 'HS' ? 'on' : ''}`} onClick={() => setDivision('HS')}>
            HS
          </button>
        </div>
      </div>

      <div className="pilltabs" role="tablist" aria-label="Category filter">
        {['All', ...CATEGORIES].map((c) => (
          <button key={c} className={category === c ? 'on' : ''} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="section" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/recommend" className="btn primary small">
          <Icon name="spark" size={16} /> Not sure? Get recommendations
        </Link>
      </div>

      <div className="event-grid">
        {list.map((e) => {
          const added = myEvents.includes(e.id);
          return (
            <div className="event-card" key={e.id}>
              <div className="top">
                <h3>
                  <Link to={`/events/${e.id}`}>{e.name}</Link>
                </h3>
                <span className="tag">{e.category.split(' ')[0]}</span>
              </div>
              <div className="meta">
                <span>Team {e.teamSize}</span>
                <span>·</span>
                <Stars n={e.difficulty} />
                <span>·</span>
                <span>{e.prep}</span>
              </div>
              <p className="small muted" style={{ margin: 0 }}>
                {e.overview.length > 110 ? e.overview.slice(0, 110) + '…' : e.overview}
              </p>
              <div className="foot">
                <Link to={`/events/${e.id}`} className="btn ghost small">
                  Details
                </Link>
                {added ? (
                  <button className="btn navy small" onClick={() => removeEvent(e.id)}>
                    ✓ Added — remove
                  </button>
                ) : (
                  <button className="btn primary small" onClick={() => addEvent(e.id)}>
                    <Icon name="plus" size={14} /> My events
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {list.length === 0 && (
        <div className="card">
          <p className="muted" style={{ margin: 0 }}>
            No events match that search in this division. Try clearing filters.
          </p>
        </div>
      )}
    </>
  );
}
