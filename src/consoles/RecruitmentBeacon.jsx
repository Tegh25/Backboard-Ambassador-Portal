import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { user } from '../data/mock'
import { Panel } from '../components/ui'

export default function RecruitmentBeacon({ onNotify }) {
  const [copied, setCopied] = useState(false)
  const link = `https://backboard.io/join?ref=${user.referralCode}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link)
    } catch {
      // Clipboard blocked (insecure context or denied): the field stays selectable.
    }
    setCopied(true)
    onNotify?.('Beacon link copied')
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <Panel code="BCN" title="Recruitment beacon">
      <p className="max-w-[64ch] text-[14px] leading-relaxed text-muted">
        Anyone who joins Backboard through this link is tagged to your callsign. Signups post to
        your record within a day.
      </p>

      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
        <input readOnly value={link} className="field flex-1" aria-label="Your beacon link" />
        <button type="button" onClick={copy} className="switch inline-flex items-center justify-center gap-2">
          {copied ? <Check size={13} strokeWidth={1.5} /> : <Copy size={13} strokeWidth={1.5} />}
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>

      <p className="stamp mt-3 text-faint">Beacon ID {user.referralCode}</p>
    </Panel>
  )
}
