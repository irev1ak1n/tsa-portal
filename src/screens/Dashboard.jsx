import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { getEvent } from '../data/events.js';
import { datesForState, NATIONALS, ANNOUNCEMENTS, RULE_UPDATES } from '../data/meta.js';
import { Icon, Progress, Cite, Empty } from '../components/UI.jsx';

function daysUntil(iso) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((new Date(iso + 'T00:00:00') - now) / 86400000);
}

function shortDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function minusDays(iso, n) {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

export default function Dashboard() {
  const { profile, myEvents, progressFor } = useApp();
  const dates = datesForState(profile?.state);

  const slots = [
    { lbl: 'Regionals', date: dates.regionals },
    { lbl: 'States', date: dates.states },
    { lbl: 'Nationals', date: dates.nationals },
  ];

  const deadlines = [
    ...myEvents.map((id) => {
      const e = getEvent(id);
      return { date: minusDays(dates.regionals, 14), what: `${e?.name || id} — submission target` };
    }),
    { date: dates.regionals, what: 'Regional Conference' },
    { date: dates.states, what: 'State Conference' },
    { date: dates.nationals, what: NATIONALS.name },
  ]
    .filter((d) => daysUntil(d.date) >= 0)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  return (
    <>
      <div className="section">
        <div className="eyebrow">2026–27 season · {profile?.state}</div>
        <h1>Hey, {profile?.name}</h1>
      </div>

      {/* Countdown scoreboard — signature element */}
      <div className="section">
        <div className="scoreboard">
          {slots.map((s) => {
            const d = daysUntil(s.date);
            return (
              <div className="slot" key={s.lbl}>
                <div className={`num ${d <= 30 ? 'soon' : ''}`}>{d}</div>
                <div className="lbl">{s.lbl}</div>
                <div className="date">{shortDate(s.date)}</div>
              </div>
            );
          })}
        </div>
        <p className="small muted" style={{ marginTop: 6 }}>
          Days remaining · sample dates — edit in <span className="mono">src/data/meta.js</span>
        </p>
      </div>

      {/* My events */}
      <div className="section">
        <div className="section-head">
          <h2>My events</h2>
          <Link className="link" to="/events">
            Browse all →
          </Link>
        </div>
        {myEvents.length === 0 ? (
          <div className="card">
            <Empty
              ico="🎯"
              title="No events yet"
              sub="Answer two questions and get matched to events built for your interests."
              action={
                <Link to="/recommend" className="btn primary">
                  Get my matches
                </Link>
              }
            />
          </div>
        ) : (
          <div className="event-grid">
            {myEvents.map((id) => {
              const e = getEvent(id);
              if (!e) return null;
              const pct = progressFor(id);
              return (
                <div className="event-card" key={id}>
                  <div className="top">
                    <h3>
                      <Link to={`/events/${id}`}>{e.name}</Link>
                    </h3>
                    <span className="tag">{e.division}</span>
                  </div>
                  <div className="meta">
                    <span>Team {e.teamSize}</span>
                    <span>·</span>
                    <span>{e.category}</span>
                  </div>
                  <Progress pct={pct} />
                  <div className="foot">
                    <span className="small muted">{pct}% ready</span>
                    <Link to="/team" className="btn ghost small">
                      Open workspace
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Deadlines */}
      <div className="section">
        <div className="section-head">
          <h2>Upcoming deadlines</h2>
        </div>
        <div className="card">
          {deadlines.map((d, i) => {
            const days = daysUntil(d.date);
            return (
              <div className="deadline" key={i}>
                <div className="when">{shortDate(d.date)}</div>
                <div className="what">{d.what}</div>
                <div className={`in ${days <= 21 ? 'hot' : ''}`}>in {days}d</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div className="section">
        <div className="section-head">
          <h2>Quick actions</h2>
        </div>
        <div className="quick">
          <Link to="/recommend">
            <Icon name="spark" /> Find my events
          </Link>
          <Link to="/coach">
            <Icon name="chat" /> Ask the coach
          </Link>
          <Link to="/coach?tab=search">
            <Icon name="book" /> Search rulebook
          </Link>
          <Link to="/team">
            <Icon name="users" /> Team tasks
          </Link>
        </div>
      </div>

      {/* Feeds */}
      <div className="section">
        <div className="section-head">
          <h2>Rule updates</h2>
        </div>
        <div className="card">
          {RULE_UPDATES.map((r) => (
            <div className="feed-item" key={r.id}>
              <div className="f-head">
                <span className="f-title">
                  <Cite id={r.cite} /> {r.title}
                </span>
                <span className="f-date">{shortDate(r.date)}</span>
              </div>
              <div className="f-body">{r.body}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2>Announcements</h2>
        </div>
        <div className="card">
          {ANNOUNCEMENTS.map((a) => (
            <div className="feed-item" key={a.id}>
              <div className="f-head">
                <span className="f-title">{a.title}</span>
                <span className="f-date">{shortDate(a.date)}</span>
              </div>
              <div className="f-body">{a.body}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
