# Mission Control

A reskin of the Backboard.io Campus Ambassador portal as a spacecraft flight deck.
Built for Backboard's "Portal Redesign" challenge. Frontend only, mock data, MIT licensed.

Every page of the real portal survives the redesign — same tabs, same forms, same
lists, same states. Only the surface changed: dark hull, amber and cyan CRT
readouts, instrument bezels with machined corner brackets, a slow radar sweep
behind the panels, and IBM Plex Mono for anything numeric.

## The theme

The portal is a ship, the ambassador is aboard it, and each page is a station on
the deck. Two words carry the reskin everywhere:

- **Fuel** replaces points. It is what you earn, what you spend in the store, and
  what the status bar and sidebar gauge track.
- **Ranks** replace tiers, keeping the real program tiers underneath:
  Rookie → **Cadet**, Builder → **Officer**, Legend → **Commander**. Both names are
  shown together wherever rank matters, so nobody has to translate.

## Station map

| Station | Reskins | What it still does |
| --- | --- | --- |
| Transmission Console `TX` | Submit | Category tabs (Content, Events, Build, Growth, Feedback, Other), selectable work types with point values, proof link, reviewer notes, an adjustable suggested award, submit for review, and full submission history with status, dates and proof links |
| Mission Board `MSN` | Challenges | Published challenges from 25 to 500 fuel, claim counters, due dates and countdowns, expandable details, and either "Submit for approval" or an "Approved" badge |
| Orbital Schedule `ORB` | Calendar | Month grid with previous/next navigation, named event chips, today highlighted, and "Submit event" to add your own |
| Recruitment Beacon `BCN` | Referrals | The ambassador's unique referral link with a copy action |
| Supply Requisition `SUP` | Store | Three tiers (T0 open, T1 at Cadet, T2 at Commander and locked below it), item costs, variant swatches, redemption limits, and redeem buttons that fall back to "Not enough fuel" |
| Crew Roster `CRW` | Directory | Searchable member grid with rank badges, schools, bios, social links, an admin badge, and "No links shared yet." for members without any |
| Deployment Board `DEP` | Opportunities | Empty by design in the real product: "No active deployments" |
| Ship's Archive `ARC` | Resources | Linked resources with a category label and a one-line description |
| Personnel File `PSN` | Profile | Editable photo, name, school, bio, and links for X, LinkedIn, TikTok, Instagram, YouTube and website, with a live preview of the roster card |

The sidebar keeps the original grouping — **Program** (Transmission Console,
Mission Board, Orbital Schedule, Recruitment Beacon, Supply Requisition),
**Community** (Crew Roster) and **Library** (Deployment Board, Ship's Archive) —
plus a personnel shortcut and a fuel gauge pinned to the bottom. The status bar
carries the fuel readout, mission clock, rank and avatar on every station.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
```

Open the boot screen, hit **Open the console** (or press Enter) and the whole deck
is explorable. The boot sequence runs in about 0.7s and never blocks the entry
control.

## What this is, and isn't

This is a concept build. There is no backend, no database and no auth. Everything
lives in `src/data/mock.js` and in React state: submissions, claimed missions,
scheduled events, fuel balance, redemptions and profile edits all work for the
session and reset on reload. Redeeming gear really does spend fuel, claiming a
mission really does advance its counter — the state is just in memory.

## Build notes

- React 19 + Vite + Tailwind CSS v4. No component library.
- Line icons from `lucide-react` throughout the rail and controls; the social
  marks are hand-drawn monoline SVGs at the same 1.5 stroke weight.
- Responsive to 390px: the rail becomes a drawer, the calendar swaps event chips
  for kind-coded dots with a full agenda below, and every grid collapses to one
  column.
- `prefers-reduced-motion` turns off the radar sweep, the status blip and the
  boot line-in; focus outlines are visible on every control.

## Layout

```
src/
  App.jsx              deck shell, shared state, toasts
  stations.js          station ↔ original page mapping, sidebar grouping
  data/mock.js         all seeded content
  components/          boot screen, sidebar, status bar, shared panel/chip/avatar kit
  consoles/            one file per station
  lib/format.js        date and link formatting
```
