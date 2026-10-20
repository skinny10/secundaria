import { Icon } from '../../../utils/atoms/Icon'
import type { IconName } from '../../../utils/types'
import { cn } from '../../../utils/cn'

export interface SegmentedOption {
  id: string
  label: string
  icon: IconName
  active: boolean
}

interface SegmentedControlProps {
  ariaLabel: string
  options: SegmentedOption[]
  onToggle: (id: string) => void
}

export function SegmentedControl({ ariaLabel, options, onToggle }: SegmentedControlProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-1 rounded-full bg-[var(--sa-control-bg)] p-1"
    >
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={option.active}
          onClick={() => onToggle(option.id)}
          className={cn(
            'inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 text-sm font-bold transition-colors',
            option.active
              ? 'bg-[var(--sa-pill)] text-[var(--sa-accent)] shadow-[var(--shadow-sm)]'
              : 'text-[var(--sa-muted)] hover:text-[var(--color-text-primary)]'
          )}
        >
          <Icon name={option.icon} size={15} color="currentColor" />
          {option.label}
        </button>
      ))}
    </div>
  )
}
