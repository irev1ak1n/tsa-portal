import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function Profile() {
  const navigate = useNavigate();
  const { profile, resetAll } = useApp();

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