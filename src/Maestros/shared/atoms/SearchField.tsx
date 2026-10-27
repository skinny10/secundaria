import { useId } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'

interface SearchFieldProps {
  label: string
  placeholder: string
  className?: string
}

export function SearchField({ label, placeholder, className }: SearchFieldProps) {
  const id = useId()

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-base font-semibold text-[var(--sa-muted)]">
        {label}
      </label>
      <div className="relative flex items-center rounded-[14px] border border-[var(--sa-border)] bg-[var(--sa-card)]">
        <span className="absolute left-3 flex items-center justify-center text-[var(--sa-muted)]" aria-hidden="true">
          <Icon name="search" size={18} color="currentColor" />
        </span>
        <input
          id={id}
          type="search"
          placeholder={placeholder}
          className="min-h-[44px] w-full rounded-[14px] bg-transparent pl-10 pr-3 text-base text-[var(--color-text-primary)] outline-none"
        />
      </div>
    </div>
  )
}
