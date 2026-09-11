import { useRef, useState } from 'react'
import { Upload, UserCircle } from 'lucide-react'
import { user } from '../data/mock'
import { Avatar, Chip, Panel, SocialIcon, SocialRow, socialLabels } from '../components/ui'

const LINK_FIELDS = ['x', 'linkedin', 'tiktok', 'instagram', 'youtube', 'website']

export default function PersonnelFile({ profile, rank, onSave, onNotify }) {
  const [draft, setDraft] = useState(profile)
  const fileInput = useRef(null)

  const dirty = JSON.stringify(draft) !== JSON.stringify(profile)

  const setLink = (key, value) => setDraft({ ...draft, links: { ...draft.links, [key]: value } })

  const pickPhoto = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setDraft({ ...draft, photo: URL.createObjectURL(file) })
  }

  const save = (e) => {
    e.preventDefault()
    onSave(draft)
    onNotify?.('Personnel file updated')
  }

  return (
    <form onSubmit={save} className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-5">
        <Panel code="PSN" title="Personnel file">
          <div className="flex flex-wrap items-center gap-4">
            {draft.photo ? (
              <img
                src={draft.photo}
                alt=""
                className="size-20 rounded-full border border-rivet object-cover"
              />
            ) : (
              <Avatar initials={draft.avatar.initials} hue={draft.avatar.hue} size={80} />
            )}

            <div className="flex flex-wrap gap-2">
              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                onChange={pickPhoto}
                className="hidden"
              />
              <button
                type="button"
                className="switch switch-ghost inline-flex items-center gap-2"
                onClick={() => fileInput.current?.click()}
              >
                <Upload size={13} strokeWidth={1.5} />
                Change photo
              </button>
              {draft.photo && (
                <button
                  type="button"
                  className="switch switch-ghost"
                  onClick={() => setDraft({ ...draft, photo: null })}
                >
                  Remove photo
                </button>
              )}
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="stamp mb-1.5 block text-faint">Name</span>
              <input
                className="field"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="stamp mb-1.5 block text-faint">School</span>
              <input
                className="field"
                value={draft.school}
                onChange={(e) => setDraft({ ...draft, school: e.target.value })}
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="stamp mb-1.5 block text-faint">Bio</span>
            <textarea
              className="field min-h-[96px] resize-y"
              value={draft.bio}
              onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
              placeholder="What you build, and where people can find you on campus."
            />
          </label>
        </Panel>

        <Panel code="LNK" title="Links">
          <div className="grid gap-3 sm:grid-cols-2">
            {LINK_FIELDS.map((key) => (
              <label key={key} className="block">
                <span className="stamp mb-1.5 flex items-center gap-1.5 text-faint">
                  <SocialIcon network={key} size={12} />
                  {socialLabels[key]}
                </span>
                <input
                  className="field"
                  type="url"
                  value={draft.links[key] ?? ''}
                  onChange={(e) => setLink(key, e.target.value)}
                  placeholder="https://"
                />
              </label>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-bezel pt-4">
            <button type="submit" className="switch" disabled={!dirty}>
              Save file
            </button>
            <button
              type="button"
              className="switch switch-ghost"
              disabled={!dirty}
              onClick={() => setDraft(profile)}
            >
              Revert
            </button>
            <span className="stamp text-faint">
              {dirty ? 'Unsaved changes' : 'All changes saved'}
            </span>
          </div>
        </Panel>
      </div>

      <Panel code="PRV" title="How the crew sees you" className="h-fit">
        <div className="flex items-start gap-3">
          {draft.photo ? (
            <img
              src={draft.photo}
              alt=""
              className="size-11 shrink-0 rounded-full border border-rivet object-cover"
            />
          ) : (
            <Avatar initials={draft.avatar.initials} hue={draft.avatar.hue} size={44} />
          )}
          <div className="min-w-0">
            <p className="readout truncate text-[13.5px] text-readout">
              {draft.name || 'Unnamed ambassador'}
            </p>
            <p className="mt-1 text-[13px] text-muted">{draft.school}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Chip tone="phosphor">{rank.code}</Chip>
          <span className="stamp text-faint">
            {user.crewId} · joined {user.joined}
          </span>
        </div>

        <p className="mt-3 text-[13px] leading-snug text-muted">
          {draft.bio || 'No bio yet.'}
        </p>

        <SocialRow links={draft.links} className="mt-3 border-t border-bezel pt-3" />

        <p className="mt-4 flex items-center gap-2 text-[12px] text-faint">
          <UserCircle size={13} strokeWidth={1.5} />
          This card is what shows on the crew roster.
        </p>
      </Panel>
    </form>
  )
}
