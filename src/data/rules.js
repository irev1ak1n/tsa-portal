// ============================================================
// TSA HUB — rulebook data (SAMPLE CONTENT)
// These sections are written to be *representative* of how TSA
// rules read, so the search and coach features can be demoed.
// They are NOT the official rules. Before real use, replace
// with licensed content from the current-year official TSA
// Competition Guides (requires TSA's permission).
// ============================================================

export const GENERAL_RULES = [
  {
    id: 'G-1',
    title: 'Eligibility',
    text: 'Competitors must be dues-paid members of an affiliated TSA chapter in good standing for the current school year. Middle school and high school divisions compete separately; a student competes in the division that matches their enrolled grade level.',
  },
  {
    id: 'G-2',
    title: 'Entries per chapter',
    text: 'Unless an event rule states otherwise, each chapter may enter a limited number of individuals or teams per event (commonly one to two entries at the state level). Check your state supplement, as state associations may adjust entry limits.',
  },
  {
    id: 'G-3',
    title: 'Original work & plagiarism',
    text: 'All submitted work must be planned and produced by the competing student(s) during the current school year. Plagiarism, including uncredited use of another person\u2019s text, code, designs, images, video, or music, results in disqualification.',
  },
  {
    id: 'G-4',
    title: 'Copyright & citations',
    text: 'Any third-party material (images, fonts, music, code libraries, footage) must be usable under its license and must be cited in the required documentation. Most events require a completed copyright checklist or reference list in the portfolio.',
  },
  {
    id: 'G-5',
    title: 'Use of AI tools',
    text: 'Where artificial intelligence tools are permitted by the event rules, their use must be disclosed and documented, including the tool name and how it was used. Work generated entirely by AI without meaningful student contribution is not eligible. Always check the current-year rule and your event\u2019s specific AI policy, as this area changes frequently.',
  },
  {
    id: 'G-6',
    title: 'Team changes and substitutions',
    text: 'Team rosters are set at registration. Switching or substituting teammates after registration is typically allowed only for documented emergencies and requires advisor approval and, at conference, approval from event management. Adding members beyond an event\u2019s maximum team size is never permitted.',
  },
  {
    id: 'G-7',
    title: 'Submission deadlines',
    text: 'Digital submissions are due by the deadline published for your conference (state supplements list exact dates and portals). Late submissions are not judged. Build in a buffer: upload portals slow down in the final hours.',
  },
  {
    id: 'G-8',
    title: 'Dress code',
    text: 'Competitors must follow the TSA dress code for their event category (competition attire, or official TSA attire where required, e.g., for presentations and interviews). Points may be deducted for dress code violations.',
  },
  {
    id: 'G-9',
    title: 'Interviews & semifinalists',
    text: 'Many events select semifinalists from submitted entries; semifinalists then complete an interview or live component at the conference. All listed team members are expected to participate in interviews unless the event rule states otherwise.',
  },
  {
    id: 'G-10',
    title: 'LEAP / leadership component',
    text: 'Some events include a leadership resume or LEAP-style component describing leadership growth connected to the project. Where required, it is scored as part of the documentation.',
  },
];

export const EVENT_RULES = [
  // Webmaster
  {
    id: 'WM-2.1',
    eventId: 'webmaster',
    title: 'Webmaster — site requirements',
    text: 'The website must address the annual theme, be reachable at a stable URL for the entire judging window, and function in current versions of major browsers. All pages must be the work of the team.',
  },
  {
    id: 'WM-3.4',
    eventId: 'webmaster',
    title: 'Webmaster — performance & accessibility',
    text: 'Sites are evaluated for usability, including load performance on a typical connection and basic accessibility (readable contrast, alt text on meaningful images, keyboard-reachable navigation). Slow-loading or inaccessible pages lose usability points.',
  },
  {
    id: 'WM-5.2',
    eventId: 'webmaster',
    title: 'Webmaster — documentation portfolio',
    text: 'The portfolio must include a plan of work log, a list of software used, sources for all content, and a completed copyright checklist covering images, fonts, and any code libraries.',
  },
  // Video Game Design
  {
    id: 'VG-4.1',
    eventId: 'video-game-design',
    title: 'Video Game Design — gameplay video',
    text: 'Teams submit a gameplay video demonstrating the game. The video must not exceed the published maximum length (commonly around 2 minutes) and must show actual gameplay captured from the build being submitted.',
  },
  {
    id: 'VG-4.3',
    eventId: 'video-game-design',
    title: 'Video Game Design — asset citations',
    text: 'All art, audio, fonts, and code assets not created by the team must be licensed for use and listed in the documentation. Engine-provided starter assets must still be identified.',
  },
  {
    id: 'VG-6.2',
    eventId: 'video-game-design',
    title: 'Video Game Design — content standards',
    text: 'Games must be appropriate for a school audience. Excessive violence, mature themes, or copyrighted characters (including fan games) result in penalties or disqualification.',
  },
  // Coding
  {
    id: 'CO-1.3',
    eventId: 'coding',
    title: 'Coding — languages & environment',
    text: 'The problem set may be solved in any language supported at the conference (commonly Python, Java, and C++). Internet access is restricted during the challenge; standard language documentation may be provided.',
  },
  {
    id: 'CO-2.2',
    eventId: 'coding',
    title: 'Coding — team format',
    text: 'Entries are individuals or pairs per the current-year rule. Work must be completed only by registered team members during the challenge window.',
  },
  // Software Development
  {
    id: 'SD-3.1',
    eventId: 'software-development',
    title: 'Software Development — application requirements',
    text: 'The application must run live during judging (no video-only demos), address the annual theme, and include a portfolio documenting requirements, design decisions, testing, and third-party components.',
  },
  // Digital Video Production
  {
    id: 'DV-2.4',
    eventId: 'digital-video-production',
    title: 'Digital Video Production — runtime & credits',
    text: 'The film must fall within the published minimum and maximum runtime (check the current-year rule; commonly a few minutes plus limited credits). Overtime entries receive penalties or are not judged.',
  },
  {
    id: 'DV-3.1',
    eventId: 'digital-video-production',
    title: 'Digital Video Production — releases',
    text: 'Signed talent releases are required for every recognizable person appearing in the film, and location permissions where applicable. Missing releases result in disqualification.',
  },
  // On Demand Video
  {
    id: 'OD-1.2',
    eventId: 'on-demand-video',
    title: 'On Demand Video — on-site window',
    text: 'Teams receive the prompt and required elements at the conference and must submit the finished video within the published window (commonly 24–36 hours). All footage must be captured during the window.',
  },
  // Music Production
  {
    id: 'MP-2.1',
    eventId: 'music-production',
    title: 'Music Production — originality & length',
    text: 'The track must be an original composition within the published length limit. Sample packs and virtual instruments are allowed if licensed and documented; recognizable interpolations of existing songs are not.',
  },
  // Photographic Technology
  {
    id: 'PT-2.3',
    eventId: 'photographic-technology',
    title: 'Photographic Technology — editing disclosure',
    text: 'Standard adjustments (exposure, color, crop) are permitted. Composite or generative edits must be disclosed where the current-year rule allows them at all.',
  },
  // Prepared Presentation
  {
    id: 'PP-1.4',
    eventId: 'prepared-presentation',
    title: 'Prepared Presentation — timing',
    text: 'The speech must fall within the published time window (with a small grace period). Going under or over the window results in point deductions per the rubric.',
  },
  // Debating Technological Issues
  {
    id: 'DB-2.2',
    eventId: 'debating-tech-issues',
    title: 'Debating Technological Issues — side assignment',
    text: 'Teams prepare both the pro and con positions for each published resolution; sides are assigned at the conference. Printed evidence is permitted per the current-year rule.',
  },
  // Engineering Design
  {
    id: 'ED-3.2',
    eventId: 'engineering-design',
    title: 'Engineering Design — documentation',
    text: 'The portfolio must show the full design process: problem research, constraints, concept alternatives with a selection rationale, testing data, and iterations. Judges score the process as heavily as the final artifact.',
  },
  // CAD Engineering
  {
    id: 'CE-1.1',
    eventId: 'cad-engineering',
    title: 'CAD Engineering — on-site challenge',
    text: 'Competitors model the provided part or assembly on site within the time limit using approved CAD software. Files must be exported in the requested formats; dimensional accuracy is scored against the source drawing.',
  },
  // Architectural Design
  {
    id: 'AD-2.5',
    eventId: 'architectural-design',
    title: 'Architectural Design — drawing set',
    text: 'The required drawing set (site plan, floor plans, elevations or sections as published) must follow the annual brief. Models may be physical or digital per the current-year rule.',
  },
  // Flight Endurance
  {
    id: 'FE-1.6',
    eventId: 'flight-endurance',
    title: 'Flight Endurance — aircraft specifications',
    text: 'Aircraft must meet the published specification limits (wingspan, weight, motor size). Aircraft are inspected before official flights; out-of-spec aircraft may be corrected only within the published windows.',
  },
  // Biotechnology Design
  {
    id: 'BD-2.1',
    eventId: 'biotechnology-design',
    title: 'Biotechnology Design — safety & ethics',
    text: 'Projects must follow safety and ethics guidelines; work involving human subjects, tissues, or hazardous materials requires the documented approvals listed in the current-year rule.',
  },
  // Forensic Science
  {
    id: 'FS-1.2',
    eventId: 'forensic-science',
    title: 'Forensic Science — on-site format',
    text: 'Teams of two analyze the provided scenario and evidence on site. Outside notes are not permitted unless the current-year rule states otherwise.',
  },
  // Fashion Design
  {
    id: 'FD-3.3',
    eventId: 'fashion-design',
    title: 'Fashion Design — construction',
    text: 'Garments must be constructed by the competing team during the current year. Purchased garments may only be used where the rule explicitly allows embellishment-based categories.',
  },
  // MS Website Design
  {
    id: 'MW-2.1',
    eventId: 'ms-website-design',
    title: 'Website Design (MS) — requirements',
    text: 'The site must address the annual theme and include the pages listed in the current-year rule. Builders and templates are allowed only where the rule permits, and must be documented.',
  },
  // MS Dragster
  {
    id: 'DR-1.4',
    eventId: 'ms-dragster',
    title: 'Dragster (MS) — body specifications',
    text: 'Dragster bodies must meet the published dimension and weight limits and pass safety inspection (axle placement, washer clearance). Cars that fail inspection may not race.',
  },
  // MS Tech Bowl
  {
    id: 'TB-1.1',
    eventId: 'ms-tech-bowl',
    title: 'Tech Bowl (MS) — format',
    text: 'A written qualifying test determines the teams advancing to head-to-head rounds. Team members may not use notes or devices during any round.',
  },
];

export const ALL_RULES = [
  ...GENERAL_RULES.map((r) => ({ ...r, scope: 'General rules' })),
  ...EVENT_RULES.map((r) => ({ ...r, scope: 'Event rule' })),
];
