import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { BADGES } from '../data/meta.js';

export default function Profile() {
  const app = useApp();
  const navigate = useNavigate();
  const { profile, myEvents, tasks, checklists, teamMembers, coachCount, resetAll } = app;

  const doneTasks = tasks.filter((t) => t.status === 'done').length;
  const fullChecklist = Object.values(checklists).some(
    (list) => list.length > 0 && list.every((i) => i.done)
  );

  const earned = {
    profile: !!profile,
    'first-event': myEvents.length >= 1,
    'three-events': myEvents.length >= 3,
    'first-task': doneTasks >= 1,
    'ten-tasks': doneTasks >= 10,
    checklist: fullChecklist,
    'coach-3': coachCount >= 3,
    'team-3': teamMembers.length >= 3,
  };
  const earnedCount = Object.values(earned).filter(Boolean).length;

  function reset() {
    if (window.confirm('Reset all demo data? This clears your profile, events, tasks, and notes.')) {
      resetAll();
      navigate('/onboarding');
    }
  }

  return (
    <>
      <div className="section">
        <div className="eyebrow">Profile</div>
        <h1>{profile.name}</h1>
        <p className="muted small">
          Grade {profile.grade} · {profile.division === 'HS' ? 'High School' : 'Middle School'} · {profile.state}
          {profile.chapter ? ` · ${profile.chapter}` : ''}
        </p>
        <Link to="/onboarding" className="btn ghost small">
          Edit profile
        </Link>
      </div>

      <div className="section card">
        <h3>Interests</h3>
        <div className="chip-row" style={{ marginBottom: 14 }}>
          {(profile.interests || []).map((i) => (
            <span key={i} className="chip static">
              {i}
            </span>
          ))}
        </div>
        <h3>Skills</h3>
        <div className="chip-row" style={{ marginBottom: 14 }}>
          {(profile.skills || []).length === 0 && <span className="muted small">None added yet</span>}
          {(profile.skills || []).map((s) => (
            <span key={s} className="chip static">
              {s}
            </span>
          ))}
        </div>
        <h3>Intended major</h3>
        <span className="chip static">{profile.major}</span>
      </div>

      <div className="section">
        <div className="section-head">
          <h2>Achievements</h2>
          <span className="small muted">
            {earnedCount}/{BADGES.length}
          </span>
        </div>
        <div className="badge-grid">
          {BADGES.map((b) => (
            <div className={`badge ${earned[b.id] ? '' : 'locked'}`} key={b.id}>
              <div className="b-ico">{b.ico}</div>
              <div className="b-name">{b.name}</div>
              <div className="b-desc">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section notice">
        <span aria-hidden="true">⚠</span>
        <span>
          This is a demo build: events, rules, and dates are sample data stored only on this device. Before pitching
          or publishing, replace them with official TSA content (with TSA's permission) and connect a real backend —
          see the README roadmap.
        </span>
      </div>

      <div className="section card flat">
        <h3>Danger zone</h3>
        <p className="small muted">Wipe everything on this device and start onboarding fresh.</p>
        <button className="btn ghost small" style={{ color: 'var(--red-600)' }} onClick={reset}>
          Reset demo data
        </button>
      </div>
    </>
  );
}
