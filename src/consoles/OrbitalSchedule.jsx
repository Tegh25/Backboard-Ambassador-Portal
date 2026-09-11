import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react'
import { eventKinds } from '../data/mock'
import { MONTH_NAMES, formatDate, todayISO, toISO } from '../lib/format'
import { Panel } from '../components/ui'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const kindClass = {
  phosphor: 'border-phosphor-dim text-phosphor bg-phosphor/8',
  signal: 'border-signal-dim text-signal bg-signal/8',
  go: 'border-go/40 text-go bg-go/8',
  alarm: 'border-alarm/40 text-alarm bg-alarm/8',
}

const dotClass = {
  phosphor: 'bg-phosphor',
  signal: 'bg-signal',
  go: 'bg-go',
  alarm: 'bg-alarm',
}

export default function OrbitalSchedule({ events, onAddEvent }) {
  const now = new Date()
  const [cursor, setCursor] = useState({ year: now.getFullYear(), month: now.getMonth() })
  const [drafting, setDrafting] = useState(false)
  const [draft, setDraft] = useState({ title: '', date: todayISO(), kind: 'event' })

  const today = todayISO()

  const cells = useMemo(() => {
    const first = new Date(cursor.year, cursor.month, 1)
    const lead = (first.getDay() + 6) % 7 // grid starts on Monday
    const out = []
    for (let i = 0; i < lead; i += 1) out.push(null)
    const days = new Date(cursor.year, cursor.month + 1, 0).getDate()
    for (let d = 1; d <= days; d += 1) out.push(toISO(new Date(cursor.year, cursor.month, d)))
    while (out.length % 7 !== 0) out.push(null)
    return out
  }, [cursor])

  const byDate = useMemo(() => {
    const map = new Map()
    for (const e of events) {
      if (!map.has(e.date)) map.set(e.date, [])
      map.get(e.date).push(e)
    }
    return map
  }, [events])

  const monthEvents = useMemo(
    () =>
      events
        .filter((e) => e.date.startsWith(`${cursor.year}-${String(cursor.month + 1).padStart(2, '0')}`))
        .sort((a, b) => a.date.localeCompare(b.date)),
    [events, cursor],
  )

  const shift = (delta) => {
    const d = new Date(cursor.year, cursor.month + delta, 1)
    setCursor({ year: d.getFullYear(), month: d.getMonth() })
  }

  const addEvent = (e) => {
    e.preventDefault()
    if (!draft.title.trim()) return
    onAddEvent({ id: `EV-${Date.now()}`, ...draft, title: draft.title.trim() })
    const [y, m] = draft.date.split('-').map(Number)
    setCursor({ year: y, month: m - 1 })
    setDraft({ title: '', date: draft.date, kind: 'event' })
    setDrafting(false)
  }

  return (
    <div className="space-y-5">
      <Panel
        code="ORB"
        title={`${MONTH_NAMES[cursor.month]} ${cursor.year}`}
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => shift(-1)}
              aria-label="Previous month"
              className="grid size-8 place-items-center border border-bezel text-muted hover:border-rivet hover:text-readout"
            >
              <ChevronLeft size={15} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => setCursor({ year: now.getFullYear(), month: now.getMonth() })}
              className="readout border border-bezel px-2.5 py-1.5 text-[11px] tracking-[0.12em] text-muted uppercase hover:border-rivet hover:text-readout"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => shift(1)}
              aria-label="Next month"
              className="grid size-8 place-items-center border border-bezel text-muted hover:border-rivet hover:text-readout"
            >
              <ChevronRight size={15} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => setDrafting((v) => !v)}
              className="switch ml-1 inline-flex items-center gap-1.5"
            >
              {drafting ? <X size={13} strokeWidth={1.5} /> : <Plus size={13} strokeWidth={1.5} />}
              {drafting ? 'Cancel' : 'Submit event'}
            </button>
          </div>
        }
      >
        {drafting && (
          <form
            onSubmit={addEvent}
            className="mb-4 grid gap-3 border border-bezel bg-deck/50 p-3.5 sm:grid-cols-[1fr_170px_150px_auto] sm:items-end"
          >
            <label className="block">
              <span className="stamp mb-1.5 block text-faint">Event name</span>
              <input
                className="field"
                value={draft.title}
                autoFocus
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="Build night #8"
              />
            </label>
            <label className="block">
              <span className="stamp mb-1.5 block text-faint">Date</span>
              <input
                className="field"
                type="date"
                value={draft.date}
                onChange={(e) => setDraft({ ...draft, date: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="stamp mb-1.5 block text-faint">Type</span>
              <select
                className="field"
                value={draft.kind}
                onChange={(e) => setDraft({ ...draft, kind: e.target.value })}
              >
                {Object.entries(eventKinds).map(([id, k]) => (
                  <option key={id} value={id} className="bg-hull">
                    {k.label}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="switch h-[38px]">
              Add to schedule
            </button>
          </form>
        )}

        <div className="grid grid-cols-7 border-b border-bezel pb-2">
          {WEEKDAYS.map((d) => (
            <span key={d} className="stamp text-center text-faint">
              <span className="hidden sm:inline">{d}</span>
              <span className="sm:hidden">{d[0]}</span>
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 border-t border-l border-bezel/60">
          {cells.map((iso, i) => {
            if (!iso)
              return (
                <div
                  key={`pad-${i}`}
                  className="min-h-[64px] border-r border-b border-bezel/60 bg-void/40 sm:min-h-[104px]"
                />
              )
            const dayEvents = byDate.get(iso) ?? []
            const isToday = iso === today
            return (
              <div
                key={iso}
                className={`min-h-[64px] border-r border-b border-bezel/60 p-1.5 sm:min-h-[104px] sm:p-2 ${
                  isToday ? 'bg-signal/8 ring-1 ring-signal ring-inset' : ''
                }`}
              >
                <span
                  className={`readout text-[11px] tabular-nums ${
                    isToday ? 'font-semibold text-signal' : 'text-faint'
                  }`}
                >
                  {Number(iso.slice(8))}
                </span>

                <div className="mt-1 hidden space-y-1 sm:block">
                  {dayEvents.map((e) => (
                    <span
                      key={e.id}
                      title={e.title}
                      className={`readout block truncate border-l-2 px-1.5 py-0.5 text-[10.5px] ${
                        kindClass[eventKinds[e.kind].color]
                      }`}
                    >
                      {e.title}
                    </span>
                  ))}
                </div>

                <div className="mt-1.5 flex flex-wrap gap-1 sm:hidden">
                  {dayEvents.map((e) => (
                    <span
                      key={e.id}
                      className={`size-1.5 ${dotClass[eventKinds[e.kind].color]}`}
                      title={e.title}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Panel>

      <Panel
        code="MAN"
        title="Manifest for this month"
        bodyClass="p-0"
        actions={<span className="stamp text-faint">{monthEvents.length} scheduled</span>}
      >
        {monthEvents.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-muted">
            Nothing scheduled this month. Use “Submit event” to put something on the calendar.
          </p>
        ) : (
          <ul className="divide-y divide-bezel">
            {monthEvents.map((e) => (
              <li key={e.id} className="flex items-center gap-3 px-4 py-2.5 sm:px-5">
                <span className={`size-2 shrink-0 ${dotClass[eventKinds[e.kind].color]}`} />
                <span className="readout w-[104px] shrink-0 text-[11px] tracking-[0.08em] text-faint uppercase tabular-nums">
                  {formatDate(e.date)}
                </span>
                <span className="readout min-w-0 flex-1 truncate text-[13px] text-readout">
                  {e.title}
                </span>
                <span className="stamp shrink-0 text-faint">{eventKinds[e.kind].label}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  )
}
