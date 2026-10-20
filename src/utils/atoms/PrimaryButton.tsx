import type { IconName } from '../types'
import { Icon } from './Icon'

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  leadingIcon?: IconName
  trailingIcon?: IconName
  loading?: boolean
}

export function PrimaryButton({
  label,
  leadingIcon,
  trailingIcon,
  loading,
  className,
  disabled,
  ...props
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      type="button"
      className={[
        'w-full min-h-[var(--size-min-touch)] flex items-center justify-center gap-2 rounded-[var(--radius-md)]',
        'bg-[var(--color-forest)] text-white font-bold',
        'hover:brightness-95 active:brightness-90 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--color-steel)] focus-visible:outline-offset-2',
        isDisabled ? 'opacity-60 cursor-not-allowed' : undefined,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {leadingIcon ? <Icon name={leadingIcon} size={20} color="currentColor" /> : null}
      <span>{label}</span>
      {trailingIcon ? <Icon name={trailingIcon} size={20} color="currentColor" /> : null}
    </button>
  )
}
