import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { getEvent } from '../data/events.js';
import { Progress, Empty, Icon } from '../components/UI.jsx';

const COLS = [
  { key: 'todo', label: 'To do' },
  { key: 'doing', label: 'In progress' },
  { key: 'done', label: 'Done' },
];

export default function Team() {
  const app = useApp();
  const [tab, setTab] = useState('tasks');

  return (
      <>
        <div className="section">
          <div className="eyebrow">Team Workspace</div>
          <h1>Team</h1>
        </div>

        <div className="pilltabs" role="tablist">
          {[
            ['tasks', 'Tasks'],
            ['checklist', 'Checklists'],
            ['members', 'Members'],
            ['meetings', 'Meetings'],
            ['notes', 'Notes'],
          ].map(([k, label]) => (
              <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>
                {label}
              </button>
          ))}
        </div>

        {tab === 'tasks' && <Tasks app={app} />}
        {tab === 'checklist' && <Checklists app={app} />}
        {tab === 'members' && <Members app={app} />}
        {tab === 'meetings' && <Meetings app={app} />}
        {tab === 'notes' && <Notes app={app} />}
      </>
  );
}

function Tasks({ app }) {
  const { tasks, myEvents, addTask, moveTask, deleteTask } = app;
  const [title, setTitle] = useState('');
  const [assignee, setAssignee] = useState('');
  const [eventId, setEventId] = useState('');
  const [due, setDue] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title: title.trim(), assignee: assignee.trim(), eventId, due });
    setTitle('');
    setAssignee('');
    setDue('');
  }

  function move(task, dir) {
    const order = ['todo', 'doing', 'done'];
    const next = order[order.indexOf(task.status) + dir];
    if (next) moveTask(task.id, next);
  }

  return (
      <>
        <form className="section card" onSubmit={submit}>
          <h3>Add a task</h3>
          <div className="field">
            <input
                className="input"
                placeholder="What needs doing? e.g., Record gameplay video"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                aria-label="Task title"
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <input
                className="input"
                placeholder="Assignee"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                aria-label="Assignee"
            />
            <input className="input" type="date" value={due} onChange={(e) => setDue(e.target.value)} aria-label="Due date" />
          </div>
          <div className="field" style={{ marginTop: 10 }}>
            <select className="input" value={eventId} onChange={(e) => setEventId(e.target.value)} aria-label="Event">
              <option value="">No event (general)</option>
              {myEvents.map((id) => (
                  <option key={id} value={id}>
                    {getEvent(id)?.name || id}
                  </option>
              ))}
            </select>
          </div>
          <button className="btn primary block" type="submit">
            <Icon name="plus" size={15} /> Add task
          </button>
        </form>

        <div className="kanban">
          {COLS.map((col) => (
              <div className="col" key={col.key}>
                <h3>
                  {col.label} · {tasks.filter((t) => t.status === col.key).length}
                </h3>
                {tasks
                    .filter((t) => t.status === col.key)
                    .map((t) => (
                        <div className="task" key={t.id}>
                          <div className="t-top">
                            <span className="t-title">{t.title}</span>
                            <button className="iconbtn danger" onClick={() => deleteTask(t.id)} aria-label="Delete task">
                              ✕
                            </button>
                          </div>
                          <div className="t-meta">
                            {[t.assignee, t.eventId ? getEvent(t.eventId)?.name : '', t.due ? `due ${t.due}` : '']
                                .filter(Boolean)
                                .join(' · ') || 'Unassigned'}
                          </div>
                          <div className="t-actions">
                            {t.status !== 'todo' && (
                                <button className="iconbtn" onClick={() => move(t, -1)}>
                                  ◀ Back
                                </button>
                            )}
                            {t.status !== 'done' && (
                                <button className="iconbtn" onClick={() => move(t, 1)}>
                                  Next ▶
                                </button>
                            )}
                          </div>
                        </div>
                    ))}
                {tasks.filter((t) => t.status === col.key).length === 0 && (
                    <p className="small muted" style={{ padding: '4px 6px' }}>
                      Nothing here.
                    </p>
                )}
              </div>
          ))}
        </div>
      </>
  );
}

function Checklists({ app }) {
  const { myEvents, checklists, toggleChecklist, addChecklistItem, removeChecklistItem, progressFor } = app;
  const [drafts, setDrafts] = useState({});

  if (myEvents.length === 0) {
    return (
        <div className="card">
          <Empty
              ico="📦"
              title="No checklists yet"
              sub="Add an event, then build its checklist from the official Competition Guide."
              action={
                <Link to="/events" className="btn primary">
                  Browse events
                </Link>
              }
          />
        </div>
    );
  }

  function add(e, id) {
    e.preventDefault();
    const label = (drafts[id] || '').trim();
    if (!label) return;
    addChecklistItem(id, label);
    setDrafts((d) => ({ ...d, [id]: '' }));
  }

  return (
      <>
        {myEvents.map((id) => {
          const event = getEvent(id);
          const items = checklists[id] || [];
          return (
              <div className="section card" key={id}>
                <div className="section-head">
                  <h3>{event?.name || id}</h3>
                  <span className="small muted">{progressFor(id)}%</span>
                </div>
                <Progress pct={progressFor(id)} />
                <div style={{ marginTop: 10 }}>
                  {items.length === 0 && (
                      <p className="small muted">
                        Add what this event actually requires, straight from the official Competition Guide.
                      </p>
                  )}
                  {items.map((it) => (
                      <div className={`check ${it.done ? 'done' : ''}`} key={it.id}>
                        <input
                            type="checkbox"
                            checked={it.done}
                            onChange={() => toggleChecklist(id, it.id)}
                            aria-label={it.label}
                        />
                        <span style={{ flex: 1 }}>{it.label}</span>
                        <button className="iconbtn danger" onClick={() => removeChecklistItem(id, it.id)} aria-label="Remove">
                          ✕
                        </button>
                      </div>
                  ))}
                </div>
                <form onSubmit={(e) => add(e, id)} style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <input
                      className="input"
                      placeholder="Add a requirement…"
                      value={drafts[id] || ''}
                      onChange={(e) => setDrafts((d) => ({ ...d, [id]: e.target.value }))}
                      aria-label={`Add checklist item for ${event?.name || id}`}
                  />
                  <button className="btn ghost small" type="submit">
                    <Icon name="plus" size={14} /> Add
                  </button>
                </form>
              </div>
          );
        })}
      </>
  );
}

function Members({ app }) {
  const { teamMembers, addMember, removeMember } = app;
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    addMember({ name: name.trim(), role: role.trim() || 'Member' });
    setName('');
    setRole('');
  }

  return (
      <>
        <form className="section card" onSubmit={submit}>
          <h3>Add a teammate</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <input className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} aria-label="Name" />
            <input
                className="input"
                placeholder="Role, e.g., Editor"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                aria-label="Role"
            />
          </div>
          <button className="btn primary block" style={{ marginTop: 10 }} type="submit">
            <Icon name="plus" size={15} /> Add member
          </button>
        </form>

        <div className="card">
          {teamMembers.length === 0 && (
              <p className="muted small" style={{ margin: 0 }}>
                No teammates yet. Add your squad so tasks have owners.
              </p>
          )}
          {teamMembers.map((m) => (
              <div className="member-row" key={m.id}>
                <span className="avatar">{m.name.slice(0, 2).toUpperCase()}</span>
                <div style={{ flex: 1 }}>
                  <div className="m-name">{m.name}</div>
                  <div className="m-role">{m.role}</div>
                </div>
                <button className="iconbtn danger" onClick={() => removeMember(m.id)} aria-label={`Remove ${m.name}`}>
                  ✕
                </button>
              </div>
          ))}
        </div>
      </>
  );
}

function Meetings({ app }) {
  const { meetings, addMeeting, removeMeeting } = app;
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!date || !title.trim()) return;
    addMeeting({ date, title: title.trim() });
    setDate('');
    setTitle('');
  }

  return (
      <>
        <form className="section card" onSubmit={submit}>
          <h3>Schedule a meeting</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Date" />
            <input
                className="input"
                placeholder="Topic, e.g., Storyboard review"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                aria-label="Topic"
            />
          </div>
          <button className="btn primary block" style={{ marginTop: 10 }} type="submit">
            <Icon name="plus" size={15} /> Add meeting
          </button>
        </form>

        <div className="card">
          {meetings.length === 0 && (
              <p className="muted small" style={{ margin: 0 }}>
                No meetings scheduled.
              </p>
          )}
          {meetings.map((m) => (
              <div className="deadline" key={m.id}>
                <div className="when">{m.date.slice(5)}</div>
                <div className="what">{m.title}</div>
                <button className="iconbtn danger" onClick={() => removeMeeting(m.id)} aria-label="Remove meeting">
                  ✕
                </button>
              </div>
          ))}
        </div>
      </>
  );
}

function Notes({ app }) {
  const { notes, setNotes } = app;
  return (
      <div className="card">
        <h3>Shared notes</h3>
        <p className="small muted">Autosaves as you type. Meeting minutes, links, decisions — keep it all here.</p>
        <textarea
            className="input"
            rows={12}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Type your team notes…"
            aria-label="Team notes"
        />
      </div>
  );
}