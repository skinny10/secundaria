import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { IconName } from '../../../utils/types'

interface ActionCardProps {
  icon: IconName
  title: string
  description: string
  selected: boolean
  onSelect: () => void
  variant: 'ordinaria' | 'prioritaria' | 'urgente'
}

const variantClasses = {
  ordinaria: 'border-[var(--sa-border)] bg-[var(--sa-field)] hover:brightness-[0.98]',
  prioritaria:
    'border-[var(--color-forest)] bg-[var(--sa-menta)] hover:brightness-[0.98]',
  urgente: 'border-[var(--sa-border)] bg-[var(--sa-field)] hover:brightness-[0.98]',
}

const iconColors = {
  ordinaria: 'var(--sa-accent)',
  prioritaria: 'var(--color-forest)',
  urgente: '#C62828',
}

const radioColors = {
  ordinaria: 'border-[var(--sa-muted)]',
  prioritaria: 'border-[var(--color-forest)]',
  urgente: 'border-[var(--sa-muted)]',
}

export function ActionCard({
  icon,
  title,
  description,
  selected,
  onSelect,
  variant,
}: ActionCardProps) {
  const id = `prioridad-${variant}`
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex min-h-[84px] cursor-pointer items-center gap-4 rounded-xl border px-4 py-3 transition-colors',
        variantClasses[variant],
        selected && variant === 'prioritaria' ? 'ring-2 ring-[var(--color-forest)]' : '',
        selected && variant === 'urgente' ? 'ring-2 ring-[#C62828]' : '',
        selected && variant === 'ordinaria' ? 'ring-2 ring-[var(--sa-accent)]' : '',
      )}
    >
      <input
        id={id}
        type="radio"
        name="prioridad"
        checked={selected}
        onChange={onSelect}
        className="sr-only"
        aria-label={title}
      />
      <Icon name={icon} size={22} color={iconColors[variant]} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-base font-bold">{title}</h4>
          <span
            className={cn(
              'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
              radioColors[variant],
              selected && variant === 'prioritaria' ? 'bg-[var(--color-forest)]' : '',
              selected && variant === 'urgente' ? 'bg-[#C62828]' : '',
              selected && variant === 'ordinaria' ? 'bg-[var(--sa-accent)]' : '',
            )}
            aria-hidden="true"
          >
            {selected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
          </span>
        </div>
        <p className="mt-1 text-sm leading-snug text-[var(--sa-muted)]">
          {description}
        </p>
      </div>
    </label>
  )
}
