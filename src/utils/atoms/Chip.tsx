import { cn } from '../cn'

interface ChipProps {
  label: string
  className?: string
}

export function Chip({ label, className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 text-sm rounded-[var(--radius-sm)] bg-[var(--color-chip)] text-[var(--color-text-primary)]',
        className
      )}
    >
      {label}
    </span>
  )
}
