import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { recommend } from '../services/recommender.js';
import { Icon } from '../components/UI.jsx';
import { teamSizeLabel } from '../data/events.js';

const TEAM_PREFS = [
    { v: 'any', label: 'No preference' },
    { v: 'solo', label: 'Solo' },
    { v: 'small', label: 'Small (2–4)' },
    { v: 'large', label: 'Big squad (5+)' },
];

export default function Recommender() {
    const { profile, myEvents, addEvent, removeEvent } = useApp();
    const [teamPref, setTeamPref] = useState('any');
    const results = recommend(profile, { teamPref });

    return (
        <>
            <div className="section">
                <div className="eyebrow">Smart Recommender</div>
                <h1>Find your events</h1>
                <p className="muted small">
                    Matched against your {profile.interests?.length || 0} interests.{' '}
                    <Link to="/onboarding" className="link">
                        Edit interests
                    </Link>
                </p>
            </div>

            <div className="section card">
                <div className="field" style={{ marginBottom: 0 }}>
                    <label>How do you like to work?</label>
                    <div className="chip-row">
                        {TEAM_PREFS.map((t) => (
                            <button key={t.v} className={`chip ${teamPref === t.v ? 'on' : ''}`} onClick={() => setTeamPref(t.v)}>
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {results.length === 0 && (
                <div className="card">
                    <p className="muted" style={{ margin: 0 }}>
                        No strong matches — add a few more interests to your profile and try again.
                    </p>
                </div>
            )}

            {results.length > 0 && (
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
                                    <span>{event.category}</span>
                                    {teamSizeLabel(event) && (
                                        <>
                                            <span>·</span>
                                            <span>{teamSizeLabel(event)}</span>
                                        </>
                                    )}
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

            <p className="small muted" style={{ marginTop: 14 }}>
                Every match explains itself — no black box. Matching runs on the official event names and the official
                eligibility chart.
            </p>
        </>
    );
}