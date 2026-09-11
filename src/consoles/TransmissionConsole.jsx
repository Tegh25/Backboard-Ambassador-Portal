import { useMemo, useState } from 'react'
import { ExternalLink, Minus, Plus, Send } from 'lucide-react'
import { submissionCategories } from '../data/mock'
import { formatDate, hostOf, todayISO } from '../lib/format'
import { Chip, Panel } from '../components/ui'

const statusView = {
  approved: { tone: 'go', label: 'Approved' },
  pending: { tone: 'signal', label: 'Pending' },
  rejected: { tone: 'alarm', label: 'Rejected · apply again' },
}

export default function TransmissionConsole({ submissions, onTransmit }) {
  const [categoryId, setCategoryId] = useState('content')
  const [optionId, setOptionId] = useState('awareness-post')
  const [proof, setProof] = useState('')
  const [notes, setNotes] = useState('')
  const [award, setAward] = useState(50)

  const category = submissionCategories.find((c) => c.id === categoryId)
  const option = useMemo(
    () => category.options.find((o) => o.id === optionId) ?? null,
    [category, optionId],
  )

  const selectCategory = (id) => {
    const next = submissionCategories.find((c) => c.id === id)
    setCategoryId(id)
    setOptionId(next.options[0].id)
    setAward(next.options[0].points)
  }

  const selectOption = (opt) => {
    setOptionId(opt.id)
    setAward(opt.points)
  }

  const ready = Boolean(option && proof.trim())

  const transmit = (e) => {
    e.preventDefault()
    if (!ready) return
    onTransmit({
      id: `TX-${Math.floor(1000 + Math.random() * 8999)}`,
      title: `${option.title} — ${notes.trim() ? notes.trim().slice(0, 48) : 'awaiting reviewer notes'}`,
      category: category.label,
      status: 'pending',
      points: award,
      submitted: todayISO(),
      reviewed: null,
      proof: proof.trim(),
    })
    setProof('')
    setNotes('')
  }

  return (
    <div className="space-y-5">
      <Panel
        code="TX"
        title="New transmission"
        actions={<span className="stamp text-faint">Reviewed within 48h</span>}
      >
        <form onSubmit={transmit}>
          <div
            role="tablist"
            aria-label="Submission categories"
            className="-mx-1 flex gap-1 overflow-x-auto pb-1"
          >
            {submissionCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={c.id === categoryId}
                onClick={() => selectCategory(c.id)}
                className={`readout shrink-0 border px-3 py-1.5 text-[12px] tracking-[0.1em] uppercase transition-colors ${
                  c.id === categoryId
                    ? 'border-phosphor bg-phosphor/10 text-phosphor'
                    : 'border-bezel text-muted hover:border-rivet hover:text-readout'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <p className="mt-4 max-w-[70ch] text-sm leading-relaxed text-muted">{category.blurb}</p>

          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {category.options.map((opt) => {
              const selected = opt.id === optionId
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => selectOption(opt)}
                  aria-pressed={selected}
                  className={`flex flex-col items-start gap-1.5 border p-3.5 text-left transition-colors ${
                    selected
                      ? 'border-signal bg-signal/8'
                      : 'border-bezel bg-deck/40 hover:border-rivet'
                  }`}
                >
                  <span className="flex w-full items-baseline justify-between gap-3">
                    <span
                      className={`readout text-[13px] ${selected ? 'text-signal' : 'text-readout'}`}
                    >
                      {opt.title}
                    </span>
                    <span
                      className={`readout shrink-0 text-[13px] font-semibold tabular-nums ${
                        selected ? 'text-signal' : 'text-muted'
                      }`}
                    >
                      {opt.points}
                      <span className="stamp ml-1 opacity-60">fuel</span>
                    </span>
                  </span>
                  <span className="text-[13px] leading-snug text-muted">{opt.description}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_260px]">
            <div className="space-y-4">
              <label className="block">
                <span className="stamp mb-1.5 block text-faint">Proof link</span>
                <input
                  className="field"
                  type="url"
                  required
                  value={proof}
                  onChange={(e) => setProof(e.target.value)}
                  placeholder="https://"
                />
              </label>

              <label className="block">
                <span className="stamp mb-1.5 block text-faint">Notes for the reviewer</span>
                <textarea
                  className="field min-h-[104px] resize-y"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="What you made, where it ran, what it moved."
                />
              </label>
            </div>

            <div className="border border-bezel bg-deck/50 p-4">
              <p className="stamp text-faint">Suggested award</p>
              <p className="readout mt-2 text-4xl font-semibold text-signal tabular-nums">
                {award}
                <span className="stamp ml-1.5 align-middle opacity-60">fuel</span>
              </p>

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAward((v) => Math.max(0, v - 25))}
                  className="grid size-8 place-items-center border border-bezel text-muted hover:border-rivet hover:text-readout"
                  aria-label="Lower suggested award"
                >
                  <Minus size={14} strokeWidth={1.5} />
                </button>
                <input
                  type="number"
                  min="0"
                  step="25"
                  value={award}
                  onChange={(e) => setAward(Math.max(0, Number(e.target.value) || 0))}
                  className="field flex-1 text-center"
                  aria-label="Suggested award"
                />
                <button
                  type="button"
                  onClick={() => setAward((v) => v + 25)}
                  className="grid size-8 place-items-center border border-bezel text-muted hover:border-rivet hover:text-readout"
                  aria-label="Raise suggested award"
                >
                  <Plus size={14} strokeWidth={1.5} />
                </button>
              </div>

              <p className="mt-3 text-[13px] leading-snug text-faint">
                A reviewer can move this before it posts to your fuel cell.
              </p>

              <button type="submit" className="switch mt-4 flex w-full items-center justify-center gap-2" disabled={!ready}>
                <Send size={13} strokeWidth={1.5} />
                Submit for review
              </button>
              {!ready && (
                <p className="mt-2 text-center text-[12px] text-faint">A proof link is required.</p>
              )}
            </div>
          </div>
        </form>
      </Panel>

      <Panel
        code="LOG"
        title="Transmission history"
        bodyClass="p-0"
        actions={<span className="stamp text-faint">{submissions.length} on record</span>}
      >
        <ul className="divide-y divide-bezel">
          {submissions.map((s) => {
            const view = statusView[s.status]
            return (
              <li key={s.id} className="flex flex-col gap-2.5 px-4 py-3.5 sm:px-5">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div className="min-w-0">
                    <p className="readout text-[13px] text-readout">{s.title}</p>
                    <p className="stamp mt-1.5 text-faint">
                      {s.id} · {s.category}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2.5">
                    {s.points > 0 && (
                      <span className="readout text-[13px] font-semibold text-signal tabular-nums">
                        +{s.points}
                      </span>
                    )}
                    <Chip tone={view.tone}>{view.label}</Chip>
                  </div>
                </div>

                {s.note && <p className="text-[13px] text-alarm/85">{s.note}</p>}

                <div className="readout flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] tracking-[0.08em] text-faint uppercase">
                  <span>Sent {formatDate(s.submitted)}</span>
                  <span>Reviewed {s.reviewed ? formatDate(s.reviewed) : '—'}</span>
                  <a
                    href={s.proof}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-phosphor hover:underline"
                  >
                    <ExternalLink size={12} strokeWidth={1.5} />
                    {hostOf(s.proof)}
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      </Panel>
    </div>
  )
}
