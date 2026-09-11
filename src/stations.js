import {
  BookOpen,
  CalendarDays,
  Package,
  Radar,
  Radio,
  Rocket,
  Target,
  UserCircle,
  Users,
} from 'lucide-react'

/**
 * Every station maps one-to-one onto a page of the real ambassador portal.
 * `origin` is the page it reskins; `code` is its designation on the HUD.
 */
export const stations = [
  {
    id: 'submit',
    code: 'TX',
    name: 'Transmission Console',
    origin: 'Submit',
    group: 'Program',
    icon: Radio,
    summary: 'Log work, attach proof, send it up for review.',
  },
  {
    id: 'challenges',
    code: 'MSN',
    name: 'Mission Board',
    origin: 'Challenges',
    group: 'Program',
    icon: Target,
    summary: 'Published missions with fuel awards and claim slots.',
  },
  {
    id: 'calendar',
    code: 'ORB',
    name: 'Orbital Schedule',
    origin: 'Calendar',
    group: 'Program',
    icon: CalendarDays,
    summary: 'Program events by month. Add your own.',
  },
  {
    id: 'referrals',
    code: 'BCN',
    name: 'Recruitment Beacon',
    origin: 'Referrals',
    group: 'Program',
    icon: Radar,
    summary: 'Your beacon link, broadcast on request.',
  },
  {
    id: 'store',
    code: 'SUP',
    name: 'Supply Requisition',
    origin: 'Store',
    group: 'Program',
    icon: Package,
    summary: 'Trade fuel for gear across three supply tiers.',
  },
  {
    id: 'directory',
    code: 'CRW',
    name: 'Crew Roster',
    origin: 'Directory',
    group: 'Community',
    icon: Users,
    summary: 'Everyone flying this program, searchable.',
  },
  {
    id: 'opportunities',
    code: 'DEP',
    name: 'Deployment Board',
    origin: 'Opportunities',
    group: 'Library',
    icon: Rocket,
    summary: 'Open roles and placements.',
  },
  {
    id: 'resources',
    code: 'ARC',
    name: "Ship's Archive",
    origin: 'Resources',
    group: 'Library',
    icon: BookOpen,
    summary: 'Brand kits, playbooks and program rules.',
  },
  {
    id: 'profile',
    code: 'PSN',
    name: 'Personnel File',
    origin: 'Profile',
    group: 'Crew',
    icon: UserCircle,
    summary: 'Your record: photo, bio and links.',
  },
]

export const navGroups = ['Program', 'Community', 'Library']

export const stationById = (id) => stations.find((s) => s.id === id) ?? stations[0]
