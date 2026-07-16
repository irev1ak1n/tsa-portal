import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { initialsOf } from '../data/people.js';

export default function ChatThread() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { chats, sendMessage, markThreadRead } = useApp();
    const [draft, setDraft] = useState('');
    const endRef = useRef(null);

    const thread = chats.find((t) => t.id === id) || null;

    useEffect(() => {
        if (thread) markThreadRead(thread.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [thread?.messages.length]);

    if (!thread) {
        return (
            <div className="card">
                <h2>Chat not found</h2>
                <p className="muted">That conversation doesn't exist on this device.</p>
                <Link to="/chats" className="btn navy">
                    Back to Chats
                </Link>
            </div>
        );
    }

    function send(e) {
        e.preventDefault();
        const text = draft.trim();
        if (!text) return;
        sendMessage(thread.id, text);
        setDraft('');
    }

    return (
        <>
            <div className="nm-head">
                <button className="nm-back" onClick={() => navigate('/chats')} aria-label="Back">
                    ←
                </button>
                <span className="avatar">{initialsOf(thread.name)}</span>
                <div style={{ minWidth: 0 }}>
                    <div className="thread-name unread">{thread.name}</div>
                    <div className="small muted">{thread.sub}</div>
                </div>
            </div>

            <div className="notice info">
                <span aria-hidden="true">ⓘ</span>
                <span>
          Demo chat: messages are saved on this device only and are not delivered to anyone. Real messaging needs the
          backend — see the README roadmap.
        </span>
            </div>

            <div className="chat section">
                {thread.messages.length === 0 && (
                    <p className="muted small" style={{ textAlign: 'center', padding: '18px 0' }}>
                        No messages yet. Say hi 👋
                    </p>
                )}
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