import { Icon } from '../../../utils/atoms/Icon'
import type { Pauta } from '../types'

interface PautaItemProps {
  pauta: Pauta
}

export function PautaItem({ pauta }: PautaItemProps) {
  return (
    <div className="flex gap-3 rounded-[12px] bg-[var(--sa-field)] p-3">
      <Icon
        name={pauta.icon}
        size={18}
        color="var(--sa-accent)"
        className="mt-0.5 shrink-0"
      />
      <div className="flex min-w-0 flex-col gap-1">
        <h4 className="text-base font-semibold">{pauta.title}</h4>
        <p className="text-lg leading-snug text-[var(--sa-muted)]">{pauta.description}</p>
      </div>
    </div>
  )
}
