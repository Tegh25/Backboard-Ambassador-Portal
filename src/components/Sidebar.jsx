import { X } from 'lucide-react'
import { navGroups, stations } from '../stations'
import { RANKS, user } from '../data/mock'
import { Avatar } from './ui'

function FuelGauge({ fuel, rank }) {
  const next = RANKS[RANKS.findIndex((r) => r.id === rank.id) + 1]
  const span = next ? next.minFuel - rank.minFuel : 1
  const pct = next
    ? Math.min(100, Math.round(((user.lifetimeFuel - rank.minFuel) / span) * 100))
    : 100

  return (
    <div className="border-t border-bezel bg-hull/60 px-4 py-3.5">
      <div className="flex items-end justify-between">
        <span className="stamp text-faint">Fuel available</span>
        <span className="readout text-lg font-semibold text-signal tabular-nums">{fuel}</span>
      </div>

      <div
        className="mt-2.5 h-1.5 w-full bg-deck"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progress to ${next ? next.code : 'top rank'}`}
      >
        <div
          className="h-full bg-linear-to-r from-phosphor-dim to-phosphor"
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="readout mt-2 text-[11px] tracking-[0.1em] text-muted">
        <span className="text-phosphor">{rank.code}</span>
        {next ? ` · ${next.minFuel - user.lifetimeFuel} to ${next.code}` : ' · top rank held'}
      </p>
    </div>
  )
}

export default function Sidebar({ active, onNavigate, fuel, rank, open, onClose }) {
  const profile = stations.find((s) => s.id === 'profile')

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-void/80 backdrop-blur-[2px] lg:hidden ${open ? '' : 'hidden'}`}
        aria-hidden="true"
      />

      <nav
        aria-label="Stations"
        className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-bezel bg-hull transition-transform duration-200 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-bezel px-4 py-3.5">
          <button
            type="button"
            onClick={() => onNavigate('submit')}
            className="flex items-center gap-2.5 text-left"
          >
            <span className="grid size-7 place-items-center border border-phosphor-dim text-phosphor">
              <span className="size-2 bg-phosphor blip" />
            </span>
            <span>
              <span className="readout block text-[12px] leading-tight font-semibold tracking-[0.14em] text-readout">
                MISSION CONTROL
              </span>
              <span className="stamp whitespace-nowrap text-faint">Ambassador portal</span>
            </span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-readout lg:hidden"
            aria-label="Close navigation"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3">
          {navGroups.map((group) => (
            <div key={group} className="mb-4">
              <p className="stamp px-4 pb-2 text-faint">{group}</p>
              <ul>
                {stations
                  .filter((s) => s.group === group)
                  .map((s) => {
                    const Icon = s.icon
                    const isActive = s.id === active
                    return (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => onNavigate(s.id)}
                          title={s.summary}
                          aria-current={isActive ? 'page' : undefined}
                          className={`flex w-full items-center gap-2.5 border-l-2 px-4 py-2 text-left transition-colors ${
                            isActive
                              ? 'border-signal bg-signal/10 text-signal'
                              : 'border-transparent text-muted hover:border-rivet hover:bg-deck hover:text-readout'
                          }`}
                        >
                          <Icon size={16} strokeWidth={1.5} className="shrink-0" />
                          <span className="readout truncate text-[12.5px] tracking-[0.04em]">
                            {s.name}
                          </span>
                          <span className="stamp ml-auto opacity-45">{s.code}</span>
                        </button>
                      </li>
                    )
                  })}
              </ul>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onNavigate('profile')}
          aria-current={active === 'profile' ? 'page' : undefined}
          className={`flex items-center gap-3 border-t border-bezel px-4 py-3 text-left transition-colors ${
            active === 'profile' ? 'bg-signal/10' : 'hover:bg-deck'
          }`}
        >
          <Avatar initials={user.avatar.initials} hue={user.avatar.hue} size={34} />
          <span className="min-w-0">
            <span className="readout block truncate text-[12.5px] text-readout">{user.name}</span>
            <span className="stamp text-faint">{profile.name}</span>
          </span>
        </button>

        <FuelGauge fuel={fuel} rank={rank} />
      </nav>
    </>
  )
}
