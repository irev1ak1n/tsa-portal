import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { Icon, Empty } from '../components/UI.jsx';

function Avatar({ name, kind }) {
    const initials = name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();
    return <span className={`avatar ${kind === 'chapter' ? 'avatar-chapter' : ''}`}>{initials}</span>;
}

export default function Chats() {
    const { chats, unreadFor, sendMessage, markThreadRead } = useApp();
    const navigate = useNavigate();
    const [openId, setOpenId] = useState(null);
    const [draft, setDraft] = useState('');
    const endRef = useRef(null);

    const thread = chats.find((t) => t.id === openId) || null;

    useEffect(() => {
        if (openId) markThreadRead(openId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openId]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [thread?.messages.length]);

    function send(e) {
        e.preventDefault();
        const text = draft.trim();
        if (!text || !openId) return;
        sendMessage(openId, text);
        setDraft('');
    }

    if (thread) {
        return (
            <>
                <div className="section" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button className="btn ghost small" onClick={() => setOpenId(null)}>
                        ← Back
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                        <Avatar name={thread.name} kind={thread.kind} />
                        <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{thread.name}</div>
                            <div className="small muted">{thread.sub}</div>
                        </div>
                    </div>
                </div>

                <div className="notice info">
                    <span aria-hidden="true">ⓘ</span>
                    <span>
            Demo chat: messages are saved on this device only and are not delivered to anyone. Real messaging needs
            the backend — see the README roadmap.
          </span>
                </div>

                <div className="chat section">
                    {thread.messages.map((m) => (
                        <div className={`bubble ${m.from === 'me' ? 'user' : 'coach'}`} key={m.id}>
                            {m.from !== 'me' && thread.kind !== 'direct' && <div className="msg-from">{m.from}</div>}
                            <div>{m.text}</div>
                            <div className="msg-at">{m.at}</div>
                        </div>
                    ))}
                    <div ref={endRef} />
                </div>

                <form className="chatbar" onSubmit={send}>
                    <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder={`Message ${thread.name}…`}
                        aria-label="Message"
                    />
                    <button type="submit">Send</button>
                </form>
            </>
        );
    }

    return (
        <>
            <div className="section">
                <div className="eyebrow">Messages</div>
                <h1>Chats</h1>
            </div>

            <div className="section card flat coach-entry" onClick={() => navigate('/coach')} role="button" tabIndex={0}
                 onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/coach')}>
        <span className="avatar avatar-coach">
          <Icon name="spark" size={17} />
        </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="thread-name">AI Competition Coach</div>
                    <div className="small muted">Ask about rules — answers cite the rulebook</div>
                </div>
                <span className="tag red">Ask</span>
            </div>

            {chats.length === 0 ? (
                <div className="card">
                    <Empty ico="💬" title="No chats yet" sub="Your team and chapter conversations will show up here." />
                </div>
            ) : (
                <div className="card">
                    {chats.map((t) => {
                        const n = unreadFor(t.id);
                        const last = t.messages[t.messages.length - 1];
                        return (
                            <div
                                className="thread-row"
                                key={t.id}
                                role="button"
                                tabIndex={0}
                                onClick={() => setOpenId(t.id)}
                                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpenId(t.id)}
                            >
                                <Avatar name={t.name} kind={t.kind} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div className="thread-top">
                                        <span className={`thread-name ${n > 0 ? 'unread' : ''}`}>{t.name}</span>
                                        <span className="thread-at">{last?.at}</span>
                                    </div>
                                    <div className="thread-last">
                                        {last ? `${last.from === 'me' ? 'You: ' : ''}${last.text}` : t.sub}
                                    </div>
                                </div>
                                {n > 0 && <span className="thread-count">{n > 9 ? '9+' : n}</span>}
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}