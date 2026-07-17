import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { INTEREST_OPTIONS, SKILL_OPTIONS, MAJOR_OPTIONS } from '../data/events.js';
import { STATES } from '../data/meta.js';

const GRADES = ['6', '7', '8', '9', '10', '11', '12'];

export default function Onboarding() {
  const { profile, saveProfile } = useApp();
  const navigate = useNavigate();
  const editing = !!profile;

  const [step, setStep] = useState(0);
  const [name, setName] = useState(profile?.name || '');
  const [grade, setGrade] = useState(profile?.grade || '');
  const [division, setDivision] = useState(profile?.division || '');
  const [state, setState] = useState(profile?.state || '');
  const [chapter, setChapter] = useState(profile?.chapter || '');
  const [headline, setHeadline] = useState(profile?.headline || '');
  const [school, setSchool] = useState(profile?.school || '');
  const [city, setCity] = useState(profile?.city || '');
  const [interests, setInterests] = useState(profile?.interests || []);
  const [skills, setSkills] = useState(profile?.skills || []);
  const [major, setMajor] = useState(profile?.major || 'Undecided');

  const TOTAL = 6;

  function pickGrade(g) {
    setGrade(g);
    if (!division) setDivision(Number(g) <= 8 ? 'MS' : 'HS');
  }

  function toggle(list, setList, value) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const canNext = [
    name.trim().length > 0 && grade,
    !!division,
    !!state,
    interests.length > 0,
    true,
    true,
  ][step];

  function finish() {
    saveProfile({
      ...profile,
      name: name.trim(),
      grade,
      division,
      state,
      chapter: chapter.trim(),
      headline: headline.trim(),
      school: school.trim(),
      city: city.trim(),
      interests,
      skills,
      major,
    });
    navigate('/');
  }

  return (
      <div className="onb">
        <div className="onb-hero">
          <div className="eyebrow" style={{ color: '#ff8a97' }}>
            {editing ? 'Update profile' : 'Season setup'}
          </div>
          <h1>TSA Hub</h1>
          <p>
            {editing
                ? 'Change anything — your dashboard, recommendations, and deadlines update instantly.'
                : 'Six quick questions. Everything in the app — events, deadlines, coaching — gets personalized from this.'}
          </p>
        </div>

        <div className="dots" aria-label={`Step ${step + 1} of ${TOTAL}`}>
          {Array.from({ length: TOTAL }).map((_, i) => (
              <span key={i} className={i <= step ? 'on' : ''} />
          ))}
        </div>

        <div className="card">
          {step === 0 && (
              <>
                <h2>Who's competing?</h2>
                <div className="field">
                  <label htmlFor="onb-name">First name</label>
                  <input
                      id="onb-name"
                      className="input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Jordan"
                      autoFocus
                  />
                </div>
                <div className="field">
                  <label>Grade</label>
                  <div className="chip-row">
                    {GRADES.map((g) => (
                        <button key={g} type="button" className={`chip ${grade === g ? 'on' : ''}`} onClick={() => pickGrade(g)}>
                          {g}th
                        </button>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="onb-headline">Headline (optional)</label>
                  <input
                      id="onb-headline"
                      className="input"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="e.g., TSA competitor · Video Game Design · Class of 2027"
                      maxLength={90}
                  />
                  <p className="small muted" style={{ margin: '5px 0 0' }}>
                    One line under your name — what you do in TSA.
                  </p>
                </div>
              </>
          )}

          {step === 1 && (
              <>
                <h2>Your division</h2>
                <p className="muted small">This filters every event and rule you'll see.</p>
                <div className="chip-row">
                  <button type="button" className={`chip ${division === 'MS' ? 'on' : ''}`} onClick={() => setDivision('MS')}>
                    Middle School
                  </button>
                  <button type="button" className={`chip ${division === 'HS' ? 'on' : ''}`} onClick={() => setDivision('HS')}>
                    High School
                  </button>
                </div>
              </>
          )}

          {step === 2 && (
              <>
                <h2>Your state</h2>
                <p className="muted small">Conference dates and countdowns come from this.</p>
                <div className="field">
                  <label htmlFor="onb-state">State association</label>
                  <select id="onb-state" className="input" value={state} onChange={(e) => setState(e.target.value)}>
                    <option value="">Select your state…</option>
                    {STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="onb-school">School</label>
                  <input
                      id="onb-school"
                      className="input"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="e.g., Ballantyne Ridge High School"
                  />
                </div>
                <div className="field">
                  <label htmlFor="onb-city">City</label>
                  <input
                      id="onb-city"
                      className="input"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g., Charlotte"
                  />
                </div>
                <div className="field">
                  <label htmlFor="onb-chapter">TSA chapter (optional)</label>
                  <input
                      id="onb-chapter"
                      className="input"
                      value={chapter}
                      onChange={(e) => setChapter(e.target.value)}
                      placeholder="e.g., Ballantyne Ridge TSA"
                  />
                </div>
              </>
          )}

          {step === 3 && (
              <>
                <h2>What are you into?</h2>
                <p className="muted small">Pick everything that sounds fun — this drives your event matches.</p>
                <div className="chip-row">
                  {INTEREST_OPTIONS.map((opt) => (
                      <button
                          key={opt}
                          type="button"
                          className={`chip ${interests.includes(opt) ? 'on' : ''}`}
                          onClick={() => toggle(interests, setInterests, opt)}
                      >
                        {opt}
                      </button>
                  ))}
                </div>
              </>
          )}

          {step === 4 && (
              <>
                <h2>Skills you already have</h2>
                <p className="muted small">Optional — matching events to real skills makes recommendations sharper.</p>
                <div className="chip-row">
                  {SKILL_OPTIONS.map((opt) => (
                      <button
                          key={opt}
                          type="button"
                          className={`chip ${skills.includes(opt) ? 'on' : ''}`}
                          onClick={() => toggle(skills, setSkills, opt)}
                      >
                        {opt}
                      </button>
                  ))}
                </div>
              </>
          )}

          {step === 5 && (
              <>
                <h2>Thinking about college?</h2>
                <p className="muted small">
                  Events connect to majors and careers. If you're not sure, leave it Undecided.
                </p>
                <div className="field">
                  <label htmlFor="onb-major">Intended major</label>
                  <select id="onb-major" className="input" value={major} onChange={(e) => setMajor(e.target.value)}>
                    {MAJOR_OPTIONS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                    ))}
                  </select>
                </div>
              </>
          )}

          <div className="onb-nav">
            {step > 0 && (
                <button type="button" className="btn ghost" onClick={() => setStep(step - 1)}>
                  Back
                </button>
            )}
            {step < TOTAL - 1 ? (
                <button type="button" className="btn navy block" disabled={!canNext} onClick={() => setStep(step + 1)}>
                  Continue
                </button>
            ) : (
                <button type="button" className="btn primary block" onClick={finish}>
                  {editing ? 'Save changes' : 'Build my dashboard'}
                </button>
            )}
          </div>
        </div>

        {editing && (
            <p className="small muted" style={{ textAlign: 'center', marginTop: 12 }}>
              <button type="button" className="btn ghost small" onClick={() => navigate(-1)}>
                Cancel
              </button>
            </p>
        )}
      </div>
  );
}