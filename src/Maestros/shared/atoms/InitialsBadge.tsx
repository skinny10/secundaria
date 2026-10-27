import { cn } from '../../../utils/cn'

interface InitialsBadgeProps {
  initials: string
  className?: string
}

export function InitialsBadge({ initials, className }: InitialsBadgeProps) {
  return (
    <span
      className={cn(
        'flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px] bg-[var(--sa-avatar)] text-lg font-extrabold text-white',
        className
      )}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}
