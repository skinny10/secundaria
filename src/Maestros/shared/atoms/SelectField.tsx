import { useId } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'

interface SelectFieldProps {
  label: string
  value: string
  options: string[]
  icon?: 'sliders'
  className?: string
}

export function SelectField({ label, value, options, icon, className }: SelectFieldProps) {
  const id = useId()

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-base font-semibold text-[var(--sa-muted)]">
        {label}
      </label>
      <div className="relative flex items-center rounded-[14px] border border-[var(--sa-border)] bg-[var(--sa-card)]">
        {icon ? (
          <span className="absolute left-3 flex items-center justify-center text-[var(--sa-muted)]" aria-hidden="true">
            <Icon name={icon} size={18} color="currentColor" />
          </span>
        ) : null}
        <select
          id={id}
          defaultValue={value}
          className={cn(
            'min-h-[44px] w-full appearance-none rounded-[14px] bg-transparent py-2 pr-9 text-base font-medium text-[var(--color-text-primary)] outline-none',
            icon ? 'pl-10' : 'pl-3'
          )}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 flex items-center justify-center text-[var(--sa-muted)]" aria-hidden="true">
          <Icon name="chevron-down" size={18} color="currentColor" />
        </span>
      </div>
    </div>
  )
}
