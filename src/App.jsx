import { useCallback, useEffect, useState } from 'react'
import Boot from './components/Boot'
import Sidebar from './components/Sidebar'
import StatusBar from './components/StatusBar'
import TransmissionConsole from './consoles/TransmissionConsole'
import MissionBoard from './consoles/MissionBoard'
import OrbitalSchedule from './consoles/OrbitalSchedule'
import SupplyRequisition from './consoles/SupplyRequisition'
import CrewRoster from './consoles/CrewRoster'
import RecruitmentBeacon from './consoles/RecruitmentBeacon'
import DeploymentBoard from './consoles/DeploymentBoard'
import ShipsArchive from './consoles/ShipsArchive'
import PersonnelFile from './consoles/PersonnelFile'
import { stationById } from './stations'
import {
  calendarEvents,
  challenges as seedChallenges,
  rankForFuel,
  submissionHistory,
  user,
} from './data/mock'

export default function App() {
  const [booted, setBooted] = useState(false)
  const [active, setActive] = useState('submit')
  const [navOpen, setNavOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const [fuel, setFuel] = useState(user.fuel)
  const [submissions, setSubmissions] = useState(submissionHistory)
  const [challenges, setChallenges] = useState(seedChallenges)
  const [events, setEvents] = useState(calendarEvents)
  const [redemptions, setRedemptions] = useState({})
  const [profile, setProfile] = useState({
    name: user.name,
    school: user.school,
    bio: user.bio,
    links: user.links,
    avatar: user.avatar,
    photo: null,
  })

  const rank = rankForFuel(user.lifetimeFuel)
  const station = stationById(active)

  const notify = useCallback((message) => setToast({ id: Date.now(), message }), [])

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(id)
  }, [toast])

  const navigate = (id) => {
    setActive(id)
    setNavOpen(false)
    window.scrollTo({ top: 0 })
  }

  const transmit = (entry) => {
    setSubmissions((list) => [entry, ...list])
    notify(`Transmission ${entry.id} sent for review`)
  }

  const submitForApproval = (id) => {
    setChallenges((list) =>
      list.map((c) =>
        c.id === id ? { ...c, status: 'submitted', claimed: Math.min(c.slots, c.claimed + 1) } : c,
      ),
    )
    notify(`Mission ${id} sent for approval`)
  }

  const addEvent = (event) => {
    setEvents((list) => [...list, event])
    notify(`${event.title} added to the schedule`)
  }

  const redeem = (item) => {
    if (fuel < item.cost) return
    setFuel((f) => f - item.cost)
    setRedemptions((r) => ({ ...r, [item.id]: (r[item.id] ?? 0) + 1 }))
    notify(`${item.name} requisitioned · −${item.cost} fuel`)
  }

  if (!booted) return <Boot onEnter={() => setBooted(true)} />

  const consoles = {
    submit: <TransmissionConsole submissions={submissions} onTransmit={transmit} />,
    challenges: <MissionBoard challenges={challenges} onSubmitApproval={submitForApproval} />,
    calendar: <OrbitalSchedule events={events} onAddEvent={addEvent} />,
    store: (
      <SupplyRequisition fuel={fuel} rank={rank} redemptions={redemptions} onRedeem={redeem} />
    ),
    directory: <CrewRoster />,
    referrals: <RecruitmentBeacon onNotify={notify} />,
    opportunities: <DeploymentBoard />,
    resources: <ShipsArchive />,
    profile: (
      <PersonnelFile profile={profile} rank={rank} onSave={setProfile} onNotify={notify} />
    ),
  }

  return (
    <div className="min-h-dvh">
      <Sidebar
        active={active}
        onNavigate={navigate}
        fuel={fuel}
        rank={rank}
        open={navOpen}
        onClose={() => setNavOpen(false)}
      />

      <div className="lg:pl-[248px]">
        <StatusBar
          station={station}
          fuel={fuel}
          rank={rank}
          onMenu={() => setNavOpen(true)}
          onProfile={() => navigate('profile')}
        />

        <main className="relative overflow-hidden px-4 py-5 sm:px-6 sm:py-6">
          <div className="sweep opacity-25" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1180px]">{consoles[active]}</div>
        </main>
      </div>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4">
        {toast && (
          <p
            key={toast.id}
            className="readout boot-line border border-phosphor-dim bg-hull px-4 py-2.5 text-[12px] tracking-[0.08em] text-phosphor shadow-[0_0_24px_rgba(0,0,0,0.6)]"
          >
            {toast.message}
          </p>
        )}
      </div>

      <div className="scanlines" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </div>
  )
}
