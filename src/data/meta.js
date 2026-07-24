export const STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky',
  'Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
  'Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
  'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania',
  'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming','Other / International',
];

export const DEFAULT_DATES = {
  regionals: '2027-02-06',
  states: '2027-04-09',
};

export const STATE_DATES = {
  'North Carolina': { regionals: '2027-01-30', states: '2027-03-26' },
  Texas:            { regionals: '2027-02-13', states: '2027-04-15' },
  Virginia:         { regionals: '2027-02-06', states: '2027-04-23' },
  California:       { regionals: '2027-02-20', states: '2027-03-19' },
  Georgia:          { regionals: '2027-01-23', states: '2027-03-11' },
  Florida:          { regionals: '2027-02-06', states: '2027-02-24' },
  Pennsylvania:     { regionals: '2027-02-11', states: '2027-04-14' },
  Ohio:             { regionals: '2027-02-27', states: '2027-04-27' },
  Washington:       { regionals: '2027-02-06', states: '2027-03-25' },
  'New Jersey':     { regionals: '2027-01-31', states: '2027-03-31' },
};

export const NATIONALS = {
  name: 'National TSA Conference',
  date: '2027-06-25',
  note: 'Placeholder date — set the real one when announced.',
};

export function datesForState(state) {
  const d = STATE_DATES[state] || DEFAULT_DATES;
  return { ...d, nationals: NATIONALS.date };
}

export const ANNOUNCEMENTS = [
  {
    id: 'a1',
    date: '2026-09-02',
    title: 'Welcome to the 2026–27 season',
    body: 'New competition guides are out. Read your event rules before you build anything — rules change every year.',
  },
  {
    id: 'a2',
    date: '2026-09-15',
    title: 'Chapter dues reminder',
    body: 'You must be a dues-paid member to compete. See your advisor to confirm your affiliation status.',
  },
  {
    id: 'a3',
    date: '2026-10-01',
    title: 'Theme releases posted',
    body: 'Annual themes and problem statements for themed events are now available in the Event Explorer pages.',
  },
  {
    id: 'a4',
    date: '2026-10-20',
    title: 'Team registration window',
    body: 'Lock in your event choices with your advisor before regional registration closes.',
  },
];

export const RULE_UPDATES = [
  {
    id: 'r1',
    date: '2026-09-10',
    cite: 'G-5',
    title: 'AI disclosure clarified',
    body: 'AI tool usage must now be documented with tool name and usage description in the portfolio.',
  },
  {
    id: 'r2',
    date: '2026-10-05',
    cite: 'VG-4.1',
    title: 'Gameplay video length',
    body: 'Video Game Design gameplay video limit confirmed for this season — check the event page.',
  },
  {
    id: 'r3',
    date: '2026-10-18',
    cite: 'DV-2.4',
    title: 'Video runtime window updated',
    body: 'Digital Video Production runtime window adjusted in the current-year guide.',
  },
];

export const BADGES = [
  { id: 'profile',   ico: '\u{1F9ED}', name: 'Signed In',        desc: 'Completed your profile' },
  { id: 'first-event', ico: '\u{1F3AF}', name: 'Event Locked',   desc: 'Added your first event' },
  { id: 'three-events', ico: '\u{1F525}', name: 'Triple Threat', desc: 'Competing in 3+ events' },
  { id: 'first-task', ico: '\u2705',     name: 'On the Board',   desc: 'Completed your first task' },
  { id: 'ten-tasks',  ico: '\u{1F4AA}',  name: 'Grinder',        desc: 'Completed 10 tasks' },
  { id: 'checklist',  ico: '\u{1F4E6}',  name: 'Ship It',        desc: 'Finished a full deliverables checklist' },
  { id: 'coach-3',    ico: '\u{1F4AC}',  name: 'Rule Lawyer',    desc: 'Asked the coach 3 questions' },
  { id: 'team-3',     ico: '\u{1F91D}',  name: 'Squad Up',       desc: 'Added 3 teammates' },
];
