import { Icon } from '../../../utils/atoms/Icon'
import type { IconName } from '../../../utils/types'
import { cn } from '../../../utils/cn'
import type { ChipTone } from '../types'

const toneClasses: Record<ChipTone, string> = {
  menta: 'bg-[var(--sa-menta)] text-[var(--sa-accent)]',
  sky: 'bg-[var(--sa-sky)] text-[var(--sa-slate)]',
  peach: 'bg-[var(--sa-peach)] text-[var(--sa-coffee)]',
  neutral: 'bg-[var(--sa-field)] text-[var(--sa-muted)]',
}

interface ChipProps {
  label: string
  icon?: IconName
  tone?: ChipTone
  className?: string
}

export function Chip({ label, icon, tone = 'neutral', className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold',
        toneClasses[tone],
        className
      )}
    >
      {icon ? <Icon name={icon} size={14} color="currentColor" /> : null}
      {label}
    </span>
  )
}
