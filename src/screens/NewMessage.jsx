import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { SUGGESTED_ACCOUNTS, initialsOf } from '../data/people.js';
import { Icon } from '../components/UI.jsx';

export default function NewMessage() {
    const { createThread, teamMembers } = useApp();
    const navigate = useNavigate();
    const [to, setTo] = useState('');
    const [picked, setPicked] = useState([]);

    const people = [
        ...SUGGESTED_ACCOUNTS.map((a) => ({ id: a.id, name: a.name, sub: a.handle })),
        ...teamMembers.map((m) => ({ id: 'tm-' + m.id, name: m.name, sub: m.role })),
    ];

    const q = to.trim().toLowerCase();
    const results = q
        ? people.filter((p) => (p.name + ' ' + p.sub).toLowerCase().includes(q))
        : people;

    function openDirect(person) {
        createThread({ id: person.id, name: person.name, kind: 'direct', sub: person.sub });
        navigate(`/chats/${person.id}`);
    }

    function toggle(person) {
        setPicked((cur) =>
            cur.some((p) => p.id === person.id) ? cur.filter((p) => p.id !== person.id) : [...cur, person]
        );
    }

    function startGroup() {
        if (picked.length < 2) return;
        const id = 'g-' + picked.map((p) => p.id).join('-').slice(0, 24);
        createThread({
            id,
            name: picked.map((p) => p.name.split(' ')[0]).join(', '),
            kind: 'group',
            sub: `${picked.length + 1} members`,
        });
        navigate(`/chats/${id}`);
    }

    const groupMode = picked.length > 0;

    return (
        <>
            <div className="nm-head">
                <button className="nm-back" onClick={() => navigate('/chats')} aria-label="Back">
                    ←
                </button>
                <h1 className="nm-title">New message</h1>
            </div>

            <div className="nm-to">
                <span className="nm-to-label">To:</span>
                <input
                    className="nm-to-input"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Search"
                    aria-label="Search people"
                    autoFocus
                />
            </div>

            {groupMode ? (
                <button className="nm-group" onClick={startGroup} disabled={picked.length < 2}>
          <span className="avatar avatar-group">
            <Icon name="users" size={16} />
          </span>
                    <span style={{ flex: 1, textAlign: 'left' }}>
            <span className="thread-name">
              {picked.length < 2 ? 'Pick one more person' : `Create group · ${picked.length} selected`}
            </span>
            <span className="thread-last">{picked.map((p) => p.name).join(', ')}</span>
          </span>
                </button>
            ) : (
                <div className="nm-group static">
          <span className="avatar avatar-group">
            <Icon name="users" size={16} />
          </span>
                    <span className="thread-name">Group chat</span>
                    <span className="small muted" style={{ marginLeft: 'auto' }}>
            Select 2+ below
          </span>
                </div>
            )}

            <div className="card">
                {results.length === 0 && (
                    <p className="muted small" style={{ margin: 0 }}>
                        No one matches "{to}".
                    </p>
                )}
                {results.map((p) => {
                    const on = picked.some((x) => x.id === p.id);
                    return (
                        <div className="acct-row" key={p.id}>
                            <span className="avatar">{initialsOf(p.name)}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div className="acct-handle">{p.name}</div>
                                <div className="acct-name">{p.sub}</div>
                            </div>
                            <button className="btn ghost small" onClick={() => openDirect(p)}>
                                Message
                            </button>
                            <button
                                className={`nm-check ${on ? 'on' : ''}`}
                                onClick={() => toggle(p)}
                                aria-label={`${on ? 'Remove' : 'Add'} ${p.name} to group`}
                            >
                                {on ? '✓' : ''}
                            </button>
                        </div>
                    );
                })}
            </div>

            <p className="small muted" style={{ marginTop: 12 }}>
                Demo: messages save to this device only and are not delivered. Real messaging needs the backend.
            </p>
        </>
    );
}