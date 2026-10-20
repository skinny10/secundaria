import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { IconName } from '../../../utils/types'

interface CheckboxCardProps {
  icon: IconName
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function CheckboxCard({ icon, label, checked, onChange }: CheckboxCardProps) {
  const id = `check-${label.replace(/\s+/g, '-').toLowerCase()}`
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex min-h-[56px] cursor-pointer items-center gap-3 rounded-xl border px-3 py-2',
        checked
          ? 'border-[var(--color-forest)] bg-[var(--sa-menta)]'
          : 'border-[var(--sa-border)] bg-[var(--sa-field)] hover:brightness-[0.98]',
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={cn(
          'flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded border-2',
          checked ? 'border-[var(--color-forest)] bg-[var(--color-forest)]' : 'border-[var(--sa-border)] bg-white',
        )}
        aria-hidden="true"
      >
        {checked ? <Icon name="circle-check" size={14} color="#FFFFFF" /> : null}
      </span>
      <Icon name={icon} size={18} color={checked ? 'var(--color-forest)' : 'var(--sa-accent)'} />
      <span className="text-base font-semibold">{label}</span>
    </label>
  )
}
