import { AlertTriangle } from 'lucide-react'

/** Instrument panel: bezel frame, stamped designation, optional right-side controls. */
export function Panel({ code, title, actions, children, bodyClass = 'p-4 sm:p-5', className = '' }) {
  return (
    <section className={`bezel ${className}`}>
      <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-bezel px-4 py-2.5">
        <div className="flex items-baseline gap-2.5">
          {code && <span className="stamp text-signal-dim">{code}</span>}
          <h2 className="readout text-[13px] font-medium tracking-[0.14em] text-readout uppercase">
            {title}
          </h2>
        </div>
        {actions}
      </header>
      <div className={bodyClass}>{children}</div>
    </section>
  )
}

const chipTone = {
  phosphor: 'border-phosphor-dim text-phosphor bg-phosphor/5',
  signal: 'border-signal-dim text-signal bg-signal/5',
  go: 'border-go/40 text-go bg-go/5',
  alarm: 'border-alarm/40 text-alarm bg-alarm/5',
  muted: 'border-bezel text-muted bg-transparent',
}

export function Chip({ tone = 'muted', children, className = '' }) {
  return (
    <span
      className={`stamp inline-flex items-center gap-1.5 border px-1.5 py-1 ${chipTone[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

export function Avatar({ initials, hue = 190, size = 40, ring = true }) {
  return (
    <span
      className="readout inline-grid shrink-0 place-items-center font-semibold"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        color: `hsl(${hue} 70% 72%)`,
        background: `hsl(${hue} 45% 12%)`,
        border: ring ? `1px solid hsl(${hue} 50% 34%)` : 'none',
        borderRadius: '50%',
        letterSpacing: '0.04em',
      }}
    >
      {initials}
    </span>
  )
}

export function EmptyState({ icon: Icon = AlertTriangle, headline, children, action }) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <span className="grid size-14 place-items-center border border-bezel bg-deck text-faint">
        <Icon size={22} strokeWidth={1.5} />
      </span>
      <p className="readout text-sm tracking-[0.12em] text-readout uppercase">{headline}</p>
      <p className="max-w-[46ch] text-sm leading-relaxed text-muted">{children}</p>
      {action}
    </div>
  )
}

const socialPaths = {
  x: 'M4 4l7.5 9.2L4.4 20M20 4l-7.4 8.1L20 20h-4.2L4 4h4.3l11.7 16',
  linkedin: 'M4.5 9v11M4.5 4.6v.02M10 20V9m0 3.6c0-2 1.5-3.6 3.5-3.6S17 10.6 17 12.6V20',
  instagram:
    'M4 8.5A4.5 4.5 0 018.5 4h7A4.5 4.5 0 0120 8.5v7a4.5 4.5 0 01-4.5 4.5h-7A4.5 4.5 0 014 15.5zM12 8.6a3.4 3.4 0 100 6.8 3.4 3.4 0 000-6.8zM16.6 7.3v.02',
  github:
    'M9.2 20.4v-2.7c-3 .6-3.7-1.4-3.7-1.4-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.4-.3-4.9-1.2-4.9-5.4 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10 10 0 015.4 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.2-2.5 5.1-4.9 5.4.4.4.8 1.1.8 2.2v3.6',
  youtube: 'M3.5 8.6A2.6 2.6 0 016.1 6h11.8a2.6 2.6 0 012.6 2.6v6.8a2.6 2.6 0 01-2.6 2.6H6.1a2.6 2.6 0 01-2.6-2.6zM10.3 9.4l4.6 2.6-4.6 2.6z',
  tiktok: 'M14.2 3.5v10.8a3.6 3.6 0 11-3.6-3.6c.4 0 .7 0 1 .1M14.2 3.5c.3 2.5 1.9 4.2 4.6 4.4',
  website: 'M12 3.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17zM3.6 12h16.8M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5S14.2 18.2 12 20.5c-2.2-2.3-3.3-5.1-3.3-8.5S9.8 5.8 12 3.5z',
}

export const socialLabels = {
  x: 'X',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  github: 'GitHub',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  website: 'Website',
}

/** Monoline social marks drawn to match the 1.5-weight line icons used in the rail. */
export function SocialIcon({ network, size = 15 }) {
  const d = socialPaths[network] ?? socialPaths.website
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}

export function SocialRow({ links = {}, className = '' }) {
  const entries = Object.entries(links).filter(([, href]) => href)
  if (entries.length === 0) {
    return <p className={`text-[13px] text-faint italic ${className}`}>No links shared yet.</p>
  }
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {entries.map(([network, href]) => (
        <a
          key={network}
          href={href}
          target="_blank"
          rel="noreferrer"
          title={socialLabels[network] ?? network}
          aria-label={socialLabels[network] ?? network}
          className="grid size-7 place-items-center border border-bezel text-muted transition-colors hover:border-phosphor-dim hover:text-phosphor"
        >
          <SocialIcon network={network} />
        </a>
      ))}
    </div>
  )
}
