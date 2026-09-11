import { useMemo, useState } from 'react'
import { Search, ShieldCheck, Users } from 'lucide-react'
import { crew, rankById } from '../data/mock'
import { Avatar, Chip, EmptyState, Panel, SocialRow } from '../components/ui'

const rankTone = { legend: 'signal', builder: 'phosphor', rookie: 'muted' }

export default function CrewRoster() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return crew
    return crew.filter(
      (m) => m.name.toLowerCase().includes(q) || m.school.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <Panel
      code="CRW"
      title="Crew roster"
      actions={
        <span className="stamp text-faint">
          {results.length} of {crew.length} aboard
        </span>
      }
    >
      <label className="relative block max-w-md">
        <Search
          size={15}
          strokeWidth={1.5}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-faint"
        />
        <span className="sr-only">Search crew by name or school</span>
        <input
          className="field pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or school"
          type="search"
        />
      </label>

      {results.length === 0 ? (
        <EmptyState icon={Users} headline="No crew matched">
          Nobody on the roster matches “{query}”. Try a school name or a partial callsign.
        </EmptyState>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((m) => {
            const rank = rankById(m.rankId)
            return (
              <article key={m.id} className="flex flex-col border border-bezel bg-deck/40 p-3.5">
                <div className="flex items-start gap-3">
                  <Avatar initials={m.avatar.initials} hue={m.avatar.hue} size={44} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h3 className="readout truncate text-[13.5px] text-readout">{m.name}</h3>
                      {m.admin && (
                        <Chip tone="alarm">
                          <ShieldCheck size={11} strokeWidth={1.5} />
                          Admin
                        </Chip>
                      )}
                    </div>
                    <p className="mt-1 truncate text-[13px] text-muted" title={m.school}>
                      {m.school}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Chip tone={rankTone[m.rankId]}>{rank.code}</Chip>
                  <span className="stamp text-faint">{rank.source} tier</span>
                </div>

                <p className="mt-3 flex-1 text-[13px] leading-snug text-muted">{m.bio}</p>

                <SocialRow links={m.links} className="mt-3 border-t border-bezel pt-3" />
              </article>
            )
          })}
        </div>
      )}
    </Panel>
  )
}
