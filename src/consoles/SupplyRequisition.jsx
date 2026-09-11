import { useState } from 'react'
import { Lock, Package } from 'lucide-react'
import { RANKS, storeTiers, rankById } from '../data/mock'
import { Chip, Panel } from '../components/ui'

const rankIndex = (id) => RANKS.findIndex((r) => r.id === id)

/** Stand-in for product photography: a lit swatch rendered like a viewport readout. */
function ItemTile({ color }) {
  return (
    <div
      className="relative h-20 w-full overflow-hidden border border-bezel"
      style={{
        background: color
          ? `radial-gradient(120% 130% at 24% 0%, color-mix(in srgb, ${color} 70%, #eef5f9) 0%, ${color} 48%, color-mix(in srgb, ${color} 55%, #05080b) 100%)`
          : 'repeating-linear-gradient(135deg, #111d26 0 8px, #0d151c 8px 16px)',
      }}
      aria-hidden="true"
    >
      <span className="absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent_0_3px,rgba(0,0,0,0.16)_3px_4px)]" />
      <span className="absolute inset-x-2 bottom-2 h-px bg-white/15" />
      <span className="absolute top-2 left-2 size-1.5 border border-white/25" />
    </div>
  )
}

function ItemCard({ item, fuel, locked, count, onRedeem }) {
  const [swatch, setSwatch] = useState(item.swatches[0] ?? null)
  const affordable = fuel >= item.cost
  const disabled = locked || !affordable

  return (
    <article className="flex flex-col border border-bezel bg-deck/40 p-3.5">
      <ItemTile color={swatch} />

      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="readout text-[13.5px] text-readout">{item.name}</h3>
        <span className="readout shrink-0 text-[14px] font-semibold text-signal tabular-nums">
          {item.cost}
        </span>
      </div>

      <p className="mt-1.5 flex-1 text-[13px] leading-snug text-muted">{item.description}</p>

      {item.swatches.length > 0 && (
        <div className="mt-3 flex items-center gap-2">
          <span className="stamp text-faint">Finish</span>
          {item.swatches.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSwatch(s)}
              aria-label={`Choose finish ${s}`}
              aria-pressed={swatch === s}
              className={`size-5 border transition-colors ${
                swatch === s ? 'border-phosphor' : 'border-rivet hover:border-muted'
              }`}
              style={{ background: s }}
            />
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-bezel pt-3">
        <span className="stamp text-faint">{item.limit}</span>
        {count > 0 && <span className="stamp text-go">{count} requisitioned</span>}
      </div>

      <button
        type="button"
        className="switch mt-3"
        disabled={disabled}
        onClick={() => onRedeem(item, swatch)}
      >
        {locked ? 'Rank locked' : affordable ? 'Redeem' : 'Not enough fuel'}
      </button>
    </article>
  )
}

export default function SupplyRequisition({ fuel, rank, redemptions, onRedeem }) {
  return (
    <div className="space-y-5">
      <Panel code="SUP" title="Fuel cell" bodyClass="p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <p className="stamp text-faint">Spendable fuel</p>
            <p className="readout mt-1 text-5xl leading-none font-bold text-signal tabular-nums">
              {fuel}
            </p>
          </div>
          <div className="readout space-y-1 text-[12px] text-muted">
            <p>
              Rank <span className="text-phosphor">{rank.code}</span>{' '}
              <span className="text-faint">({rank.source} tier)</span>
            </p>
            <p>
              Requisitions filled{' '}
              <span className="text-readout tabular-nums">
                {Object.values(redemptions).reduce((a, b) => a + b, 0)}
              </span>
            </p>
          </div>
        </div>
      </Panel>

      {storeTiers.map((tier) => {
        const locked = tier.requires ? rankIndex(rank.id) < rankIndex(tier.requires) : false
        return (
          <Panel
            key={tier.id}
            code={tier.id.toUpperCase()}
            title={tier.label.replace(/^T\d · /, '')}
            actions={
              locked ? (
                <Chip tone="alarm">
                  <Lock size={11} strokeWidth={1.5} />
                  Locked · {rankById(tier.requires).code}
                </Chip>
              ) : (
                <span className="stamp text-faint">{tier.note}</span>
              )
            }
          >
            {locked && (
              <p className="mb-4 border border-alarm/30 bg-alarm/5 px-3.5 py-2.5 text-[13px] text-muted">
                Reach {rankById(tier.requires).code} to requisition from this tier. You are{' '}
                {rank.code}.
              </p>
            )}

            <div className={`grid gap-3 sm:grid-cols-2 xl:grid-cols-3 ${locked ? 'opacity-55' : ''}`}>
              {tier.items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  fuel={fuel}
                  locked={locked}
                  count={redemptions[item.id] ?? 0}
                  onRedeem={onRedeem}
                />
              ))}
            </div>
          </Panel>
        )
      })}

      <p className="flex items-center gap-2 text-[13px] text-faint">
        <Package size={14} strokeWidth={1.5} />
        Requisitions ship from the program depot at the end of each month.
      </p>
    </div>
  )
}
