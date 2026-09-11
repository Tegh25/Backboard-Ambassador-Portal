import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { user } from '../data/mock'
import { Avatar } from './ui'

const clockFormat = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZone: 'UTC',
})

export default function StatusBar({ station, fuel, rank, onMenu, onProfile }) {
  const [time, setTime] = useState(() => clockFormat.format(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTime(clockFormat.format(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-bezel bg-hull/95 px-4 py-2.5 backdrop-blur sm:px-6">
      <button
        type="button"
        onClick={onMenu}
        className="text-muted hover:text-readout lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={20} strokeWidth={1.5} />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="readout truncate text-[13px] font-medium tracking-[0.12em] text-readout uppercase">
          {station.name}
        </h1>
        <p className="stamp truncate text-faint">
          Station {station.code} · reskins {station.origin}
        </p>
      </div>

      <p className="readout hidden text-[12px] tracking-[0.1em] text-muted tabular-nums md:block">
        {time} <span className="text-faint">UTC</span>
      </p>

      <div className="flex items-center gap-2 border border-bezel bg-deck px-2.5 py-1.5">
        <span className="stamp text-faint">Fuel</span>
        <span className="readout text-[15px] font-semibold text-signal tabular-nums">{fuel}</span>
      </div>

      <button
        type="button"
        onClick={onProfile}
        className="flex items-center gap-2"
        aria-label="Open personnel file"
      >
        <span className="readout hidden text-[11px] tracking-[0.14em] text-phosphor uppercase sm:block">
          {rank.code}
        </span>
        <Avatar initials={user.avatar.initials} hue={user.avatar.hue} size={32} />
      </button>
    </header>
  )
}
