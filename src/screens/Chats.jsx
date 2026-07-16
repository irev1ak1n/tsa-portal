import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { SUGGESTED_ACCOUNTS, initialsOf } from '../data/people.js';
import { Icon } from '../components/UI.jsx';

export default function Chats() {
    const { chats, unreadFor, follows, hiddenSuggestions, toggleFollow, hideSuggestion } = useApp();
    const navigate = useNavigate();
    const [q, setQ] = useState('');

    const query = q.trim();
    const threads = query
        ? chats.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()))
        : chats;

    const suggestions = SUGGESTED_ACCOUNTS.filter((a) => !hiddenSuggestions.includes(a.id));

    function askAi(e) {
        e.preventDefault();
        if (!query) return;
        navigate('/coach', { state: { q: query } });
    }

    return (
        <>
            <form className="ig-search" onSubmit={askAi}>
                <Icon name="search" size={17} />
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search or ask AI"
                    aria-label="Search or ask AI"
                />
            </form>

            {query && (
                <button className="ask-ai-row" onClick={askAi}>
          <span className="avatar avatar-coach">
            <Icon name="spark" size={16} />
          </span>
                    <span style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
            <span className="thread-name">Ask AI — "{query}"</span>
            <span className="thread-last">Answers cite the rulebook</span>
          </span>
                    <span className="tag red">Ask</span>
                </button>
            )}

            <div className="section-head" style={{ marginTop: 4 }}>
                <h2 className="ig-head">Messages</h2>
                <button className="link linkbtn" onClick={() => navigate('/chats/new')}>
                    Requests
                </button>
            </div>

            {threads.length === 0 ? (
                <div className="ig-empty">
                    <h3>No messages yet</h3>
                    <p>Chats will appear here after you send or receive a message.</p>
                    <button className="ig-cta" onClick={() => navigate('/chats/new')}>
                        Get started
                    </button>
                </div>
            ) : (
                <div className="card" style={{ marginBottom: 22 }}>
                    {threads.map((t) => {
                        const n = unreadFor(t.id);
                        const last = t.messages[t.messages.length - 1];
                        return (
                            <div
                                className="thread-row"
                                key={t.id}
                                role="button"
                                tabIndex={0}
                                onClick={() => navigate(`/chats/${t.id}`)}
                                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(`/chats/${t.id}`)}
                            >
                                <span className="avatar">{initialsOf(t.name)}</span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div className="thread-top">
                                        <span className={`thread-name ${n > 0 ? 'unread' : ''}`}>{t.name}</span>
                                        <span className="thread-at">{last?.at || ''}</span>
                                    </div>
                                    <div className="thread-last">
                                        {last ? `${last.from === 'me' ? 'You: ' : ''}${last.text}` : 'Say hi 👋'}
                                    </div>
                                </div>
                                {n > 0 && <span className="thread-count">{n > 9 ? '9+' : n}</span>}
                            </div>
                        );
                    })}
                </div>
            )}

            <hr className="ig-divider" />

            <div className="section-head">
                <h2 className="ig-head">Accounts to follow</h2>
                <button className="link linkbtn">See all</button>
            </div>

            <div className="acct-list">
                {suggestions.length === 0 && (
                    <p className="muted small" style={{ margin: 0 }}>
                        No more suggestions right now.
                    </p>
                )}
                {suggestions.map((a) => {
                    const following = follows.includes(a.id);
                    return (
                        <div className="acct-row" key={a.id}>
                            <span className="avatar">{initialsOf(a.name)}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div className="acct-handle">{a.handle}</div>
                                <div className="acct-name">{a.name}</div>
                                <div className="acct-meta">{a.meta}</div>
                            </div>
                            <button
                                className={`btn-follow ${following ? 'on' : ''}`}
                                onClick={() => toggleFollow(a.id)}
                            >
                                {following ? 'Following' : 'Follow'}
                            </button>
                            <button className="acct-x" onClick={() => hideSuggestion(a.id)} aria-label={`Dismiss ${a.handle}`}>
                                <Icon name="x" size={15} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </>
    );
}