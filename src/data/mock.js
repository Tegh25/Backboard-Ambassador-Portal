/**
 * All portal data lives here. Frontend-only concept build: nothing is fetched,
 * nothing is persisted. Every console below boots pre-populated so the whole
 * portal is explorable without submitting a single form.
 */

// Tier names come from the real ambassador program (Rookie / Builder / Legend)
// and are skinned as flight ranks. `code` is what shows on the HUD.
export const RANKS = [
  { id: 'rookie', code: 'CADET', source: 'Rookie', minFuel: 0 },
  { id: 'builder', code: 'OFFICER', source: 'Builder', minFuel: 1000 },
  { id: 'legend', code: 'COMMANDER', source: 'Legend', minFuel: 5000 },
]

export const rankById = (id) => RANKS.find((r) => r.id === id) ?? RANKS[0]

export const rankForFuel = (lifetime) =>
  [...RANKS].reverse().find((r) => lifetime >= r.minFuel) ?? RANKS[0]

export const user = {
  callsign: 'AVA MEHRA',
  name: 'Ava Mehra',
  handle: 'ava.mehra',
  school: 'Georgia Institute of Technology',
  rankId: 'builder',
  fuel: 1480, // spendable
  lifetimeFuel: 3260,
  crewId: 'GT-0417',
  joined: 'Aug 2025',
  avatar: { initials: 'AM', hue: 188 },
  bio: 'Systems engineering junior. Runs the Thursday build nights at Klaus and ships more demos than slides.',
  links: {
    x: 'https://x.com/avabuilds',
    linkedin: 'https://linkedin.com/in/avamehra',
    tiktok: '',
    instagram: 'https://instagram.com/ava.builds',
    youtube: 'https://youtube.com/@avabuilds',
    website: 'https://avamehra.dev',
  },
  referralCode: 'AVA-GT-0417',
}

/* 1 — TRANSMISSION CONSOLE (Submit) ------------------------------------- */

export const submissionCategories = [
  {
    id: 'content',
    label: 'Content',
    blurb: 'Posts, threads, tutorials and demo reels that put Backboard in front of new eyes.',
    options: [
      {
        id: 'awareness-post',
        title: 'Awareness post',
        description: 'A single post introducing Backboard to your feed.',
        points: 50,
      },
      {
        id: 'educational-thread',
        title: 'Educational post or thread',
        description: 'A multi-part breakdown of a Backboard workflow or feature.',
        points: 150,
      },
      {
        id: 'tutorial',
        title: 'Tutorial blog or video',
        description: 'A start-to-finish walkthrough someone could follow along with.',
        points: 250,
      },
      {
        id: 'short-form',
        title: 'Short-form video demo',
        description: 'Under 90 seconds, showing one thing Backboard does well.',
        points: 100,
      },
    ],
  },
  {
    id: 'events',
    label: 'Events',
    blurb: 'Anything you ran in a room, a lab or a lecture hall.',
    options: [
      {
        id: 'workshop',
        title: 'Campus workshop',
        description: 'A hands-on session with 15+ attendees and a sign-in sheet.',
        points: 400,
      },
      {
        id: 'club-talk',
        title: 'Club talk or demo',
        description: 'A slot at an existing club meeting.',
        points: 200,
      },
      {
        id: 'booth',
        title: 'Tabling or booth',
        description: 'Career fair, org fair or hackathon sponsor table.',
        points: 150,
      },
      {
        id: 'hack-mentor',
        title: 'Hackathon mentoring',
        description: 'A mentoring shift at a hackathon using Backboard.',
        points: 250,
      },
    ],
  },
  {
    id: 'build',
    label: 'Build',
    blurb: 'Things you shipped on top of the platform.',
    options: [
      {
        id: 'demo-app',
        title: 'Demo app',
        description: 'A small working app built on Backboard, deployed and public.',
        points: 350,
      },
      {
        id: 'template',
        title: 'Starter template',
        description: 'A reusable repo other ambassadors can fork.',
        points: 300,
      },
      {
        id: 'integration',
        title: 'Integration or plugin',
        description: 'Backboard wired into another tool in your stack.',
        points: 500,
      },
    ],
  },
  {
    id: 'growth',
    label: 'Growth',
    blurb: 'Bringing new builders and new campuses into the program.',
    options: [
      {
        id: 'signups',
        title: 'Referred signups',
        description: 'Verified signups through your beacon link, per batch of five.',
        points: 200,
      },
      {
        id: 'ambassador-referral',
        title: 'Ambassador referral',
        description: 'Someone you recruited who completed onboarding.',
        points: 300,
      },
      {
        id: 'club-partnership',
        title: 'Club partnership',
        description: 'A standing agreement with a campus org.',
        points: 400,
      },
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    blurb: 'Signal sent back to the product team.',
    options: [
      {
        id: 'bug-report',
        title: 'Reproducible bug report',
        description: 'Steps, expected result, actual result.',
        points: 75,
      },
      {
        id: 'feature-writeup',
        title: 'Feature write-up',
        description: 'A proposal with the use case and who it helps.',
        points: 125,
      },
      {
        id: 'user-interview',
        title: 'User interview notes',
        description: 'Notes from a session with a non-ambassador builder.',
        points: 150,
      },
    ],
  },
  {
    id: 'other',
    label: 'Other',
    blurb: "Work that doesn't fit a slot yet. Describe it and a reviewer sets the award.",
    options: [
      {
        id: 'freeform',
        title: 'Freeform contribution',
        description: 'Tell us what you did and what it moved.',
        points: 100,
      },
    ],
  },
]

export const submissionHistory = [
  {
    id: 'TX-0091',
    title: 'Tutorial blog or video — "Shipping a Backboard agent in 20 minutes"',
    category: 'Content',
    status: 'approved',
    points: 250,
    submitted: '2026-08-28',
    reviewed: '2026-08-30',
    proof: 'https://avamehra.dev/blog/backboard-agent-in-20',
  },
  {
    id: 'TX-0088',
    title: 'Campus workshop — Klaus 1443, 41 attendees',
    category: 'Events',
    status: 'approved',
    points: 400,
    submitted: '2026-08-19',
    reviewed: '2026-08-21',
    proof: 'https://drive.example.com/gt-workshop-signin',
  },
  {
    id: 'TX-0085',
    title: 'Short-form video demo — memory recall in 60s',
    category: 'Content',
    status: 'pending',
    points: 100,
    submitted: '2026-09-08',
    reviewed: null,
    proof: 'https://x.com/avabuilds/status/1892',
  },
  {
    id: 'TX-0080',
    title: 'Awareness post — orientation week repost',
    category: 'Content',
    status: 'rejected',
    points: 0,
    submitted: '2026-08-11',
    reviewed: '2026-08-12',
    proof: 'https://instagram.com/p/gt-orientation',
    note: 'Proof link was private. Re-share publicly and apply again.',
  },
  {
    id: 'TX-0076',
    title: 'Reproducible bug report — thread export drops attachments',
    category: 'Feedback',
    status: 'approved',
    points: 75,
    submitted: '2026-07-30',
    reviewed: '2026-08-02',
    proof: 'https://github.com/backboard/issues/412',
  },
]

/* 2 — MISSION BOARD (Challenges) ---------------------------------------- */

export const challenges = [
  {
    id: 'MSN-201',
    title: 'Sticker drop',
    description: 'Put Backboard stickers on 25 laptops around your engineering building and photograph the drop.',
    points: 25,
    claimed: 0,
    slots: 1,
    due: '2026-09-19',
    status: 'open',
  },
  {
    id: 'MSN-204',
    title: 'Office hours takeover',
    description: 'Host a one-hour open session where anyone can bring a project and wire it to Backboard.',
    points: 40,
    claimed: 0,
    slots: 1,
    due: '2026-09-26',
    status: 'open',
  },
  {
    id: 'MSN-208',
    title: 'Course syllabus pitch',
    description: 'Get a professor to list Backboard as an approved tool for a project-based course.',
    points: 150,
    claimed: 1,
    slots: 2,
    due: '2026-10-10',
    status: 'open',
  },
  {
    id: 'MSN-212',
    title: 'Ship a public demo',
    description: 'Build and deploy something real on Backboard, then write the thread that explains how it works.',
    points: 350,
    claimed: 1,
    slots: 1,
    due: '2026-09-30',
    status: 'approved',
  },
  {
    id: 'MSN-215',
    title: 'Run a 100-person hack night',
    description: 'Full production: venue, food, judges, and at least 100 checked-in builders shipping on Backboard.',
    points: 500,
    claimed: 0,
    slots: 3,
    due: '2026-11-14',
    status: 'open',
  },
  {
    id: 'MSN-219',
    title: 'Campus case study',
    description: 'Interview three student teams using Backboard and publish a written case study with metrics.',
    points: 220,
    claimed: 2,
    slots: 4,
    due: '2026-10-31',
    status: 'open',
  },
]

/* 3 — ORBITAL SCHEDULE (Calendar) --------------------------------------- */

const today = new Date()
const dayKey = (y, m, d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

// Events are seeded relative to the current month so the grid is never empty.
const relative = (offsetDays) => {
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offsetDays)
  return dayKey(d.getFullYear(), d.getMonth(), d.getDate())
}

export const calendarEvents = [
  { id: 'EV-1', date: relative(-9), title: 'Org fair tabling', kind: 'event' },
  { id: 'EV-2', date: relative(-4), title: 'Build night #7', kind: 'event' },
  { id: 'EV-3', date: relative(0), title: 'Ambassador sync', kind: 'briefing' },
  { id: 'EV-4', date: relative(0), title: 'Demo review', kind: 'review' },
  { id: 'EV-5', date: relative(2), title: 'Workshop: agents 101', kind: 'event' },
  { id: 'EV-6', date: relative(5), title: 'Sticker drop deadline', kind: 'deadline' },
  { id: 'EV-7', date: relative(8), title: 'Hack night walkthrough', kind: 'event' },
  { id: 'EV-8', date: relative(12), title: 'Case study interviews', kind: 'review' },
  { id: 'EV-9', date: relative(16), title: 'Monthly fuel audit', kind: 'briefing' },
  { id: 'EV-10', date: relative(21), title: 'Campus demo day', kind: 'event' },
]

export const eventKinds = {
  event: { label: 'Event', color: 'phosphor' },
  briefing: { label: 'Briefing', color: 'signal' },
  review: { label: 'Review', color: 'go' },
  deadline: { label: 'Deadline', color: 'alarm' },
}

/* 4 — SUPPLY REQUISITION (Store) ---------------------------------------- */

export const storeTiers = [
  {
    id: 't0',
    label: 'T0 · Standard issue',
    requires: null,
    note: 'Open to every ambassador.',
    items: [
      {
        id: 'stickers',
        name: 'Sticker pack',
        description: 'Twelve die-cut vinyl stickers, weatherproof.',
        cost: 100,
        limit: '2/semester each',
        swatches: ['#4fd8e8', '#f5a623', '#ff5f56'],
      },
      {
        id: 'tee',
        name: 'Program tee',
        description: 'Heavyweight cotton with the ambassador crest on the sleeve.',
        cost: 450,
        limit: '1/semester each',
        swatches: ['#0d151c', '#d8e6ef', '#1b3a4a'],
      },
      {
        id: 'notebook',
        name: 'Field notebook',
        description: 'Dot-grid, lay-flat binding, 160 pages.',
        cost: 250,
        limit: '2/semester each',
        swatches: ['#2c4150', '#7a5a24'],
      },
    ],
  },
  {
    id: 't1',
    label: 'T1 · Flight kit',
    requires: 'rookie',
    note: 'Unlocks at Cadet.',
    items: [
      {
        id: 'hoodie',
        name: 'Crew hoodie',
        description: 'Embroidered callsign on the cuff. Yours is printed at checkout.',
        cost: 1200,
        limit: '1/semester each',
        swatches: ['#0d151c', '#1b3a4a', '#3a2c1b'],
      },
      {
        id: 'deck',
        name: 'Mechanical keypad',
        description: 'Six-key macro deck, pre-mapped to Backboard shortcuts.',
        cost: 1800,
        limit: '1/year each',
        swatches: ['#111d26', '#d8e6ef'],
      },
      {
        id: 'credit',
        name: '$50 platform credit',
        description: 'Dropped straight onto your Backboard workspace.',
        cost: 900,
        limit: '3/semester each',
        swatches: [],
      },
    ],
  },
  {
    id: 't2',
    label: 'T2 · Command issue',
    requires: 'legend',
    note: 'Unlocks at Commander.',
    items: [
      {
        id: 'jacket',
        name: 'Flight jacket',
        description: 'Sateen bomber, patch set included, numbered run of 50.',
        cost: 4000,
        limit: '1/year each',
        swatches: ['#1b2a35', '#3a2c1b'],
      },
      {
        id: 'summit',
        name: 'Summit flight',
        description: 'Travel and lodging to the annual Backboard builder summit.',
        cost: 6500,
        limit: '1/year each',
        swatches: [],
      },
    ],
  },
]

/* 5 — CREW ROSTER (Directory) ------------------------------------------- */

export const crew = [
  {
    id: 'C-01',
    name: 'Ava Mehra',
    school: 'Georgia Institute of Technology',
    rankId: 'builder',
    admin: false,
    avatar: { initials: 'AM', hue: 188 },
    bio: 'Systems engineering junior. Runs Thursday build nights at Klaus.',
    links: { x: 'https://x.com/avabuilds', linkedin: 'https://linkedin.com/in/avamehra' },
  },
  {
    id: 'C-02',
    name: 'Diego Salcedo',
    school: 'University of Texas at Austin',
    rankId: 'legend',
    admin: true,
    avatar: { initials: 'DS', hue: 36 },
    bio: 'Program lead. Reviews transmissions and keeps the mission board stocked.',
    links: {
      x: 'https://x.com/diegosalcedo',
      linkedin: 'https://linkedin.com/in/diegosalcedo',
      github: 'https://github.com/dsalcedo',
      website: 'https://diego.build',
    },
  },
  {
    id: 'C-03',
    name: 'Priya Raghavan',
    school: 'University of Illinois Urbana-Champaign',
    rankId: 'legend',
    admin: false,
    avatar: { initials: 'PR', hue: 158 },
    bio: 'Wrote the retrieval tutorial series everyone forks.',
    links: { github: 'https://github.com/praghavan', website: 'https://priya.codes' },
  },
  {
    id: 'C-04',
    name: 'Marcus Bell',
    school: 'Morehouse College',
    rankId: 'builder',
    admin: false,
    avatar: { initials: 'MB', hue: 8 },
    bio: 'Turned the CS lounge into a permanent demo station.',
    links: { instagram: 'https://instagram.com/marcusbuilds' },
  },
  {
    id: 'C-05',
    name: 'Yuki Tanaka',
    school: 'University of Washington',
    rankId: 'rookie',
    admin: false,
    avatar: { initials: 'YT', hue: 268 },
    bio: 'First-year. Started a weekly reading group on agent memory.',
    links: {},
  },
  {
    id: 'C-06',
    name: 'Fatima Al-Rashid',
    school: 'New York University',
    rankId: 'builder',
    admin: false,
    avatar: { initials: 'FA', hue: 210 },
    bio: 'Design lead for the Tandon hack series. Ships in Figma and in code.',
    links: { linkedin: 'https://linkedin.com/in/fatimaalrashid', x: 'https://x.com/fatima_builds' },
  },
  {
    id: 'C-07',
    name: 'Owen Kelly',
    school: 'Purdue University',
    rankId: 'rookie',
    admin: false,
    avatar: { initials: 'OK', hue: 96 },
    bio: 'Mechanical engineering. Building a lab notebook agent for his research group.',
    links: {},
  },
  {
    id: 'C-08',
    name: 'Sofia Duarte',
    school: 'Arizona State University',
    rankId: 'builder',
    admin: false,
    avatar: { initials: 'SD', hue: 320 },
    bio: 'Runs the largest ambassador Discord. 900 members and counting.',
    links: { instagram: 'https://instagram.com/sofiaduarte', website: 'https://sofia.gg' },
  },
  {
    id: 'C-09',
    name: 'Noah Brenner',
    school: 'University of Michigan',
    rankId: 'legend',
    admin: false,
    avatar: { initials: 'NB', hue: 178 },
    bio: 'Shipped three integrations last semester. Answers every thread in #help.',
    links: { github: 'https://github.com/nbrenner', x: 'https://x.com/noahbrenner' },
  },
  {
    id: 'C-10',
    name: 'Amara Okonkwo',
    school: 'Howard University',
    rankId: 'builder',
    admin: false,
    avatar: { initials: 'AO', hue: 48 },
    bio: 'Journalism and CS double major. Documents every event she runs.',
    links: { x: 'https://x.com/amarawrites', linkedin: 'https://linkedin.com/in/amaraokonkwo' },
  },
  {
    id: 'C-11',
    name: 'Ravi Chandra',
    school: 'University of California, San Diego',
    rankId: 'rookie',
    admin: false,
    avatar: { initials: 'RC', hue: 132 },
    bio: 'Transfer student rebuilding the AI club from six people up.',
    links: {},
  },
  {
    id: 'C-12',
    name: 'Elena Vasquez',
    school: 'Florida International University',
    rankId: 'builder',
    admin: false,
    avatar: { initials: 'EV', hue: 288 },
    bio: 'Hosts bilingual workshops. Half her turnout is non-CS majors.',
    links: { linkedin: 'https://linkedin.com/in/elenavasquez' },
  },
]

/* 9 — SHIP'S ARCHIVE (Resources) ---------------------------------------- */

export const resources = [
  {
    id: 'R-1',
    category: 'Brand',
    title: 'Backboard logo pack',
    href: 'https://backboard.io/brand/logos',
    description: 'Wordmark and glyph in SVG and PNG, light and dark lockups.',
  },
  {
    id: 'R-2',
    category: 'Branding',
    title: 'Ambassador brand guide',
    href: 'https://backboard.io/brand/guide',
    description: 'Color, type and the rules for using the program crest on your own work.',
  },
  {
    id: 'R-3',
    category: 'Brand',
    title: 'Slide template',
    href: 'https://backboard.io/brand/deck',
    description: 'The deck to start from when you pitch a club or a class.',
  },
  {
    id: 'R-4',
    category: 'Playbook',
    title: 'Running your first workshop',
    href: 'https://backboard.io/resources/workshop-playbook',
    description: 'Room setup, timing, and the three demos that land with a cold room.',
  },
  {
    id: 'R-5',
    category: 'Product',
    title: 'Docs and API reference',
    href: 'https://docs.backboard.io',
    description: 'Everything the platform can do, with runnable examples.',
  },
  {
    id: 'R-6',
    category: 'Program',
    title: 'Fuel and rank rules',
    href: 'https://backboard.io/resources/points',
    description: 'How awards are set, when they post, and what resets each semester.',
  },
]
