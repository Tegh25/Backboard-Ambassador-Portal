import { ExternalLink } from 'lucide-react'
import { resources } from '../data/mock'
import { Panel } from '../components/ui'

export default function ShipsArchive() {
  return (
    <Panel
      code="ARC"
      title="Ship's archive"
      bodyClass="p-0"
      actions={<span className="stamp text-faint">{resources.length} documents</span>}
    >
      <ul className="divide-y divide-bezel">
        {resources.map((r) => (
          <li key={r.id} className="flex flex-col gap-1.5 px-4 py-3.5 sm:flex-row sm:gap-5 sm:px-5">
            <span className="stamp w-24 shrink-0 pt-1 text-phosphor">{r.category}</span>
            <div className="min-w-0">
              <a
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="readout inline-flex items-center gap-1.5 text-[13.5px] text-readout hover:text-signal hover:underline"
              >
                {r.title}
                <ExternalLink size={12} strokeWidth={1.5} className="opacity-60" />
              </a>
              <p className="mt-1 max-w-[72ch] text-[13px] leading-snug text-muted">
                {r.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
