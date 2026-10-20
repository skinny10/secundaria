import type { IconName } from '../types'
import { Icon } from './Icon'
import { cn } from '../cn'

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  icon?: IconName
  variant?: 'light' | 'sky'
}

export function PillButton({ label, icon, variant = 'light', className, ...props }: PillButtonProps) {
  const variantClasses =
    variant === 'sky'
      ? 'bg-[var(--color-sky)] text-[var(--color-text-primary)] hover:brightness-95'
      : 'bg-[var(--color-card)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)]'

  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-2 px-3 py-2 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] min-h-[var(--size-min-touch)]',
        'active:scale-[0.98]',
        'aria-pressed:bg-[var(--color-forest)] aria-pressed:text-white aria-pressed:shadow-none aria-pressed:ring-2 aria-pressed:ring-[var(--color-forest)] aria-pressed:ring-offset-2 aria-pressed:hover:brightness-110',
        variantClasses,
        className
      )}
      {...props}
    >
      {icon ? <Icon name={icon} size={18} color="currentColor" /> : null}
      <span className="text-sm font-bold">{label}</span>
    </button>
  )
}
