import type { ReactNode } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { IconName } from '../../../utils/types'

interface FormFieldProps {
  icon: IconName
  label: string
  help: string
  htmlFor?: string
  large?: boolean
  children: ReactNode
}

export function FormField({ icon, label, help, htmlFor, large, children }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className={cn(
          'flex items-center gap-2 font-bold text-[var(--color-text-primary)]',
          large ? 'text-[15px]' : 'text-sm'
        )}
      >
        <Icon name={icon} size={large ? 20 : 16} color="var(--sa-accent)" />
        {label}
      </label>
      <div className={large ? 'mt-3' : 'mt-2'}>{children}</div>
      <p className={cn(large ? 'mt-2 text-lg' : 'mt-1.5 text-base', 'text-[var(--sa-muted)]')}>
        {help}
      </p>
    </div>
  )
}
