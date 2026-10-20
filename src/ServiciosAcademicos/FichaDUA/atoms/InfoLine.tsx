import { Icon } from '../../../utils/atoms/Icon'
import type { IconName } from '../../../utils/types'
import { cn } from '../../../utils/cn'

interface InfoLineProps {
  icon: IconName
  children: string
  emphasize?: boolean
  className?: string
}

export function InfoLine({ icon, children, emphasize, className }: InfoLineProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-lg',
        emphasize ? 'font-bold text-[var(--sa-accent)]' : 'text-[var(--sa-muted)]',
        className
      )}
    >
      <Icon name={icon} size={16} color="currentColor" />
      {children}
    </span>
  )
}
