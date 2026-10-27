import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { ObservationType } from '../types'

interface ObservationTypeOptionProps {
  name: string
  type: ObservationType
  checked: boolean
  large?: boolean
  onSelect: (id: string) => void
}

export function ObservationTypeOption({
  name,
  type,
  checked,
  large,
  onSelect,
}: ObservationTypeOptionProps) {
  const id = `obs-tipo-${type.id}`

  return (
    <label
      htmlFor={id}
      className={cn(
        'flex cursor-pointer items-center rounded-xl border transition-colors has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-[var(--sa-accent)]',
        large ? 'min-h-[84px] gap-4 px-5 py-4' : 'min-h-[64px] gap-3 px-4 py-3',
        checked
          ? 'border-[var(--sa-avatar)] bg-[var(--sa-avatar)] text-white'
          : 'border-[var(--sa-border)] bg-[var(--sa-field)] text-[var(--color-text-primary)] hover:brightness-[0.98]'
      )}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={type.id}
        checked={checked}
        onChange={() => onSelect(type.id)}
        className="sr-only"
      />
      <span
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full border-2',
          large ? 'h-6 w-6' : 'h-5 w-5',
          checked ? 'border-white' : 'border-[var(--sa-muted)]'
        )}
        aria-hidden="true"
      >
        {checked ? (
          <span className={cn('rounded-full bg-white', large ? 'h-3 w-3' : 'h-2.5 w-2.5')} />
        ) : null}
      </span>
      <Icon name={type.icon} size={large ? 28 : 22} color={checked ? 'currentColor' : 'var(--sa-accent)'} />
      <span className="min-w-0">
        <span className={cn('block font-bold', large ? 'text-lg' : 'text-base')}>{type.title}</span>
        <span
          className={cn(
            'block',
            large ? 'text-lg' : 'text-base',
            checked ? 'text-white/80' : 'text-[var(--sa-muted)]'
          )}
        >
          {type.subtitle}
        </span>
      </span>
    </label>
  )
}
