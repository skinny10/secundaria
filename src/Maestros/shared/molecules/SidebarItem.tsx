import { Icon } from '../../../utils/atoms/Icon'
import type { IconName } from '../../../utils/types'
import { cn } from '../../../utils/cn'

interface SidebarItemProps {
  label: string
  icon: IconName
  active?: boolean
  onClick?: () => void
}

export function SidebarItem({ label, icon, active, onClick }: SidebarItemProps) {
  return (
    <li>
      <button
        type="button"
        aria-current={active ? 'page' : undefined}
        onClick={onClick}
        className={cn(
          'flex min-h-[44px] w-full items-center gap-2.5 rounded-[12px] px-3 py-2 text-left text-sm font-semibold',
          active
            ? 'bg-[var(--color-forest)] text-[var(--sa-on-accent)]'
            : 'text-[var(--sa-muted)] hover:bg-[var(--sa-field)]'
        )}
      >
        <Icon name={icon} size={18} color="currentColor" className="shrink-0" />
        <span className="min-w-0 break-words leading-snug">{label}</span>
      </button>
    </li>
  )
}
