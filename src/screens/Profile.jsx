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
  const { profile, saveProfile, resetAll, myEvents, follows, hiddenSuggestions, toggleFollow, hideSuggestion } =
      useApp();
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

  const steps = [
    {
      id: 'avatar',
      done: !!profile.avatar,
      icon: 'user',
      title: 'Add profile picture',
      desc: 'Choose a photo so teammates recognize you.',
      cta: profile.avatar ? 'Change photo' : 'Add picture',
      action: () => avatarRef.current?.click(),
    },
    {
      id: 'headline',
      done: !!profile.headline,
      icon: 'spark',
      title: 'Add a headline',
      desc: 'One line under your name — what you do in TSA.',
      cta: profile.headline ? 'Edit headline' : 'Add headline',
      action: () => navigate('/onboarding'),
    },
    {
      id: 'cover',
      done: !!profile.cover,
      icon: 'camera',
      title: 'Add a cover photo',
      desc: 'Make the top of your profile yours.',
      cta: profile.cover ? 'Change cover' : 'Add cover',
      action: () => coverRef.current?.click(),
    },
    {
      id: 'events',
      done: myEvents.length > 0,
      icon: 'grid',
      title: 'Pick your events',
      desc: 'Add the TSA events you are competing in this season.',
      cta: myEvents.length ? 'Browse more' : 'Browse events',
      action: () => navigate('/events'),
    },
    {
      id: 'skills',
      done: (profile.skills || []).length > 0,
      icon: 'check',
      title: 'Add your skills',
      desc: 'The recommender matches events to what you can already do.',
      cta: (profile.skills || []).length ? 'Edit skills' : 'Add skills',
      action: () => navigate('/onboarding'),
    },
    {
      id: 'follow',
      done: follows.length > 0,
      icon: 'users',
      title: 'Find people to follow',
      desc: 'Follow students and chapters you care about.',
      cta: 'Find more',
      action: () => setDiscoverOpen(true),
    },
  ];
  const doneCount = steps.filter((t) => t.done).length;

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

        {doneCount < steps.length && (
            <div className="section">
              <h2 className="ig-head cp-title-head">Complete your profile</h2>
              <p className="cp-count">
                <strong>
                  {doneCount} of {steps.length}
                </strong>{' '}
                <span>Complete</span>
              </p>
              <div className="cp-row">
                {steps.map((t) => (
                    <div className={`cp-card ${t.done ? 'done' : ''}`} key={t.id}>
                <span className="cp-ico">
                  <Icon name={t.icon} size={26} />
                  {t.done && (
                      <span className="cp-check">
                      <Icon name="check" size={11} />
                    </span>
                  )}
                </span>
                      <div className="cp-name">{t.title}</div>
                      <div className="cp-desc">{t.desc}</div>
                      <button className={`cp-btn ${t.done ? '' : 'primary'}`} onClick={t.action}>
                        {t.cta}
                      </button>
                    </div>
                ))}
              </div>
            </div>
        )}
      </>
  );
}