import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { SUGGESTED_ACCOUNTS, initialsOf } from '../data/people.js';
import { resizeImage, COVER_MAX, AVATAR_MAX } from '../services/images.js';
import { Icon } from '../components/UI.jsx';

function handleOf(profile) {
  if (profile.username) return profile.username;
  const slug = (profile.name || '').toLowerCase().replace(/[^a-z0-9._]/g, '');
  return slug || 'student';
}

export default function Profile() {
  const navigate = useNavigate();
  const { profile, saveProfile, resetAll, follows, hiddenSuggestions, toggleFollow, hideSuggestion } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState('');
  const coverRef = useRef(null);
  const avatarRef = useRef(null);

  const isPrivate = !!profile.isPrivate;
  const username = handleOf(profile);
  const suggestions = SUGGESTED_ACCOUNTS.filter((a) => !hiddenSuggestions.includes(a.id));

  const place = [profile.city, profile.state].filter(Boolean).join(', ');
  const subline = [profile.school || profile.chapter, place].filter(Boolean).join(' · ');

  async function pickImage(e, kind) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setImgError('');
    try {
      const dataUrl = await resizeImage(file, kind === 'cover' ? COVER_MAX : AVATAR_MAX);
      saveProfile({ ...profile, [kind]: dataUrl });
    } catch (err) {
      setImgError(err.message || 'Could not use that image.');
    }
  }

  async function share() {
    try {
      await navigator.clipboard.writeText(username);
    } catch {
      // clipboard blocked — still show feedback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  function reset() {
    if (window.confirm('Reset all demo data? This clears your profile, events, tasks, and notes.')) {
      resetAll();
      navigate('/onboarding');
    }
  }

  return (
      <>
        <div className="pf-top">
          <span />
          <div className="pf-user">
            {isPrivate && <Icon name="lock" size={15} />}
            <span className="pf-username">{username}</span>
          </div>
          <button className="pf-menu" onClick={() => setMenuOpen((v) => !v)} aria-label="Settings" aria-expanded={menuOpen}>
            <Icon name="menu" size={22} />
          </button>
        </div>

        {menuOpen && (
            <div className="pf-sheet">
              <label className="pf-toggle">
            <span className="pf-toggle-label">
              <span className="pf-toggle-t">Private account</span>
              <span className="small muted">
                {isPrivate ? 'Only people you approve can see your profile.' : 'Anyone on TSA Hub can see your profile.'}
              </span>
            </span>
                <input type="checkbox" checked={isPrivate} onChange={() => saveProfile({ ...profile, isPrivate: !isPrivate })} />
              </label>
              <button className="btn ghost small" style={{ color: 'var(--red-600)', marginTop: 14 }} onClick={reset}>
                Reset demo data
              </button>
            </div>
        )}

        <div className="pf-cover">
          {profile.cover ? <img src={profile.cover} alt="" /> : <div className="pf-cover-empty" />}
          <button className="pf-cam" onClick={() => coverRef.current?.click()} aria-label="Change cover photo">
            <Icon name="camera" size={17} />
          </button>
          <input ref={coverRef} type="file" accept="image/*" hidden onChange={(e) => pickImage(e, 'cover')} />
        </div>

        <div className="pf-avatar-row">
          <div className="pf-avatar-wrap">
            {profile.avatar ? (
                <img className="pf-avatar" src={profile.avatar} alt="" />
            ) : (
                <span className="pf-avatar pf-avatar-fallback">{initialsOf(profile.name || 'TSA')}</span>
            )}
            <button className="pf-avatar-btn" onClick={() => avatarRef.current?.click()} aria-label="Change profile photo">
              <Icon name="plus" size={14} />
            </button>
            <input ref={avatarRef} type="file" accept="image/*" hidden onChange={(e) => pickImage(e, 'avatar')} />
          </div>
        </div>

        {imgError && (
            <div className="notice">
              <span aria-hidden="true">⚠</span>
              <span>{imgError}</span>
            </div>
        )}

        <div className="pf-identity">
          <h1 className="pf-name">{profile.name}</h1>
          {profile.headline && <p className="pf-headline">{profile.headline}</p>}
          {subline && <p className="pf-subline">{subline}</p>}
          <p className="pf-stats">
          <span>
            <strong>0</strong> followers
          </span>
            <span className="pf-dot">·</span>
            <span>
            <strong>{follows.length}</strong> following
          </span>
          </p>
        </div>

        <div className="pf-actions">
          <button className="pf-btn" onClick={() => navigate('/onboarding')}>
            Edit profile
          </button>
          <button className="pf-btn" onClick={share}>
            {copied ? 'Copied' : 'Share profile'}
          </button>
          <button
              className={`pf-btn pf-btn-icon ${discoverOpen ? 'on' : ''}`}
              onClick={() => setDiscoverOpen((v) => !v)}
              aria-label="Discover people"
              aria-expanded={discoverOpen}
          >
            <Icon name="user-plus" size={18} />
          </button>
        </div>

        {discoverOpen && (
            <div className="section">
              <div className="section-head">
                <h2 className="ig-head">Discover people</h2>
                <button className="link linkbtn">See all</button>
              </div>
              {suggestions.length === 0 ? (
                  <p className="muted small">No more suggestions right now.</p>
              ) : (
                  <div className="pf-discover">
                    {suggestions.map((a) => {
                      const following = follows.includes(a.id);
                      return (
                          <div className="pf-card" key={a.id}>
                            <button className="pf-card-x" onClick={() => hideSuggestion(a.id)} aria-label={`Dismiss ${a.handle}`}>
                              <Icon name="x" size={13} />
                            </button>
                            <span className="avatar pf-card-avatar">{initialsOf(a.name)}</span>
                            <div className="pf-card-name">{a.name}</div>
                            <div className="pf-card-meta">{a.meta}</div>
                            <button className={`btn-follow ${following ? 'on' : ''}`} onClick={() => toggleFollow(a.id)}>
                              {following ? 'Following' : 'Follow'}
                            </button>
                          </div>
                      );
                    })}
                  </div>
              )}
            </div>
        )}

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
      </>
  );
}