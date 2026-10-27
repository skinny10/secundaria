import { cn } from '../../../utils/cn'
import { observacionModal } from '../constants/observacionModal'

interface NotificationToggleProps {
  checked: boolean
  large?: boolean
  onChange: (checked: boolean) => void
}

export function NotificationToggle({ checked, large, onChange }: NotificationToggleProps) {
  const { notificar } = observacionModal

  return (
    <label
      className={cn(
        'flex cursor-pointer items-start rounded-xl bg-[var(--sa-field)]',
        large ? 'gap-4 px-6 py-5' : 'gap-3 px-5 py-4'
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className={cn(
          'shrink-0 accent-[var(--color-forest)]',
          large ? 'mt-1 h-7 w-7' : 'mt-0.5 h-6 w-6'
        )}
      />
      <span>
        <span
          className={cn('block font-bold text-[var(--color-text-primary)]', large ? 'text-lg' : 'text-base')}
        >
          {notificar.title}
        </span>
        <span className={cn('mt-1 block text-[var(--sa-muted)]', large ? 'text-lg' : 'text-base')}>
          {notificar.body}
        </span>
      </span>
    </label>
  )
}
