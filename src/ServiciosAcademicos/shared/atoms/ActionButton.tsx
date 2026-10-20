import { Icon } from '../../../utils/atoms/Icon'
import type { IconName } from '../../../utils/types'
import { cn } from '../../../utils/cn'
import { solidToneClasses } from './toneStyles'
import type { ActionTone } from '../types'

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  icon?: IconName
  variant?: 'solid' | 'neutral' | 'sky'
  tone?: ActionTone
}

const variantClasses = {
  neutral: 'bg-[var(--sa-field)] text-[var(--color-text-primary)] hover:brightness-95',
  sky: 'bg-[var(--sa-sky)] text-[var(--sa-slate)] hover:brightness-95',
} as const

export function ActionButton({
  label,
  icon,
  variant = 'neutral',
  tone = 'forest',
  className,
  ...props
}: ActionButtonProps) {
  const styleClass = variant === 'solid' ? solidToneClasses[tone] : variantClasses[variant]

  return (
    <button
      type="button"
      className={cn(
        'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[14px] px-4 text-base font-bold active:scale-[0.98]',
        styleClass,
        className
      )}
      {...props}
    >
      {icon ? <Icon name={icon} size={18} color="currentColor" /> : null}
      {label}
    </button>
  )
}
