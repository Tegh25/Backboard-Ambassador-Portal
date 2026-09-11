import { useEffect, useRef, useState } from 'react'
import { rankById, user } from '../data/mock'

const checks = [
  { label: 'Bus power', value: 'NOMINAL' },
  { label: 'Telemetry uplink', value: 'LOCKED' },
  { label: 'Crew manifest', value: '12 ABOARD' },
  { label: 'Fuel cell', value: `${user.fuel} UNITS` },
  { label: 'Mission board', value: '6 ACTIVE' },
  { label: 'Console handoff', value: 'READY' },
]

export default function Boot({ onEnter }) {
  const [shown, setShown] = useState(0)
  const button = useRef(null)

  useEffect(() => {
    // Full sequence runs in ~0.7s and never blocks the entry control.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setShown(checks.length)
      return
    }
    const timers = checks.map((_, i) => setTimeout(() => setShown(i + 1), 90 + i * 95))
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    button.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Enter') onEnter()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onEnter])

  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden px-5 py-12">
      <div className="sweep" aria-hidden="true" />
      <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="relative w-full max-w-2xl">
        <p className="stamp mb-5 text-phosphor">Backboard · Campus Ambassador Program</p>

        <h1 className="readout text-[clamp(2rem,7.4vw,3.6rem)] leading-[0.94] font-bold tracking-[-0.02em] text-readout">
          MISSION
          <br />
          CONTROL
        </h1>

        <p className="mt-5 max-w-[58ch] text-[15px] leading-relaxed text-muted">
          The ambassador portal, rebuilt as a flight deck. Nine stations, one crew, fuel instead of
          points.
        </p>

        <div className="bezel mt-8 p-4 sm:p-5">
          <ul className="space-y-1.5">
            {checks.slice(0, shown).map((c) => (
              <li
                key={c.label}
                className="boot-line readout flex items-center gap-3 text-[12px] sm:text-[13px]"
              >
                <span className="text-go">OK</span>
                <span className="text-muted">{c.label}</span>
                <span className="rule flex-1" />
                <span className="text-signal">{c.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button ref={button} type="button" className="switch" onClick={onEnter}>
            Open the console
          </button>
          <p className="readout text-[11px] tracking-[0.14em] text-faint uppercase">
            {user.callsign} · {rankById(user.rankId).code} · {user.crewId}
          </p>
        </div>
      </div>

      <div className="scanlines" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </main>
  )
}
