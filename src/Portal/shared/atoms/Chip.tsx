import type { ReactNode } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { IconName } from '../../../utils/types'
import type { TonoChip } from '../types'

const tonosChip: Record<TonoChip, string> = {
  menta: 'bg-[var(--sa-menta)] text-[var(--sa-on-menta)]',
  mentaSuave: 'bg-[var(--sa-menta-soft)] text-[var(--sa-on-menta-soft)]',
  gris: 'bg-[var(--sa-field)] text-[var(--sa-muted)]',
  azul: 'bg-[var(--sa-sky)] text-[var(--sa-steel)]',
  pizarra: 'bg-[var(--sa-slate)] text-[var(--sa-on-accent)]',
  cafe: 'bg-[var(--sa-coffee)] text-[var(--sa-on-accent)]',
  bosque: 'bg-[var(--color-forest)] text-[var(--sa-on-accent)]',
  rosa: 'bg-[var(--sa-rosa)] text-[var(--sa-on-rosa)]',
}

interface ChipProps {
  tono: TonoChip
  children: ReactNode
  icon?: IconName
  className?: string
}

export function Chip({ tono, children, icon, className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] leading-snug font-bold',
        tonosChip[tono],
        className
      )}
    >
      {icon ? <Icon name={icon} size={13} color='currentColor' className='shrink-0' /> : null}
      <span className='min-w-0 break-words'>{children}</span>
    </span>
  )
}
