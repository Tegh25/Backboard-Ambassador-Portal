import { useState } from 'react'
import { ChevronDown, Clock } from 'lucide-react'
import { formatDate, daysUntil } from '../lib/format'
import { Chip, Panel } from '../components/ui'

const weightOf = (points) =>
  points >= 400 ? 'Heavy lift' : points >= 150 ? 'Standard' : 'Quick burn'

const weightTone = (points) => (points >= 400 ? 'alarm' : points >= 150 ? 'signal' : 'phosphor')

export default function MissionBoard({ challenges, onSubmitApproval }) {
  const [openId, setOpenId] = useState(null)

  return (
    <div className="space-y-5">
      <Panel
        code="MSN"
        title="Active missions"
        actions={
          <span className="stamp text-faint">
            {challenges.filter((c) => c.status === 'open').length} open ·{' '}
            {challenges.reduce((n, c) => (c.status === 'open' ? n + c.points : n), 0)} fuel
            unclaimed
          </span>
        }
        bodyClass="p-0"
      >
        <ul className="divide-y divide-bezel">
          {challenges.map((c) => {
            const days = daysUntil(c.due)
            const full = c.claimed >= c.slots
            const expanded = openId === c.id

            return (
              <li key={c.id} className="px-4 py-4 sm:px-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  {/* Award reads as the instrument on the left rail of each mission. */}
                  <div className="flex shrink-0 items-center gap-3 sm:w-28 sm:flex-col sm:items-start sm:gap-1">
                    <span className="readout text-2xl leading-none font-semibold text-signal tabular-nums">
                      {c.points}
                    </span>
                    <span className="stamp text-faint">fuel</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="readout text-[14px] text-readout">{c.title}</h3>
                      <Chip tone={weightTone(c.points)}>{weightOf(c.points)}</Chip>
                    </div>

                    <p className="mt-1.5 max-w-[74ch] text-[13.5px] leading-relaxed text-muted">
                      {c.description}
                    </p>

                    <div className="readout mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] tracking-[0.08em] text-faint uppercase">
                      <span>{c.id}</span>
                      <span className={full ? 'text-alarm' : undefined}>
                        {c.claimed}/{c.slots} claimed
                      </span>
                      <span className={days <= 7 ? 'inline-flex items-center gap-1.5 text-signal' : 'inline-flex items-center gap-1.5'}>
                        <Clock size={12} strokeWidth={1.5} />
                        Due {formatDate(c.due)}
                        {days >= 0 ? ` · ${days}d left` : ' · closed'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setOpenId(expanded ? null : c.id)}
                        aria-expanded={expanded}
                        className="inline-flex items-center gap-1 text-phosphor hover:underline"
                      >
                        View details
                        <ChevronDown
                          size={12}
                          strokeWidth={1.5}
                          className={expanded ? 'rotate-180' : undefined}
                        />
                      </button>
                    </div>

                    {expanded && (
                      <dl className="mt-3 grid gap-x-6 gap-y-2 border border-bezel bg-deck/50 p-3.5 text-[13px] sm:grid-cols-2">
                        <div>
                          <dt className="stamp text-faint">Proof required</dt>
                          <dd className="mt-1 text-muted">
                            A public link plus one photo or screenshot of the result.
                          </dd>
                        </div>
                        <div>
                          <dt className="stamp text-faint">Review window</dt>
                          <dd className="mt-1 text-muted">
                            48 hours from submission. Fuel posts on approval.
                          </dd>
                        </div>
                        <div>
                          <dt className="stamp text-faint">Slots</dt>
                          <dd className="mt-1 text-muted">
                            {c.slots} ambassador{c.slots > 1 ? 's' : ''} can claim this mission.
                          </dd>
                        </div>
                        <div>
                          <dt className="stamp text-faint">Published by</dt>
                          <dd className="mt-1 text-muted">Diego Salcedo · program lead</dd>
                        </div>
                      </dl>
                    )}
                  </div>

                  <div className="shrink-0 sm:text-right">
                    {c.status === 'approved' ? (
                      <Chip tone="go">Approved</Chip>
                    ) : c.status === 'submitted' ? (
                      <Chip tone="signal">Under review</Chip>
                    ) : (
                      <button
                        type="button"
                        className="switch w-full whitespace-nowrap sm:w-auto"
                        disabled={full || days < 0}
                        onClick={() => onSubmitApproval(c.id)}
                      >
                        {full ? 'Slots filled' : days < 0 ? 'Closed' : 'Submit for approval'}
                      </button>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </Panel>
    </div>
  )
}
