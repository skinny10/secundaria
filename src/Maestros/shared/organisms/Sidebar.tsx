import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { app, navItems } from '../constants/navigation'
import { PrivacyBox } from '../molecules/PrivacyBox'
import { SidebarItem } from '../molecules/SidebarItem'

interface SidebarProps {
  open: boolean
  activeId: string
  onNavigate?: (id: string) => void
  onClose: () => void
}

export function Sidebar({ open, activeId, onNavigate, onClose }: SidebarProps) {
  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      ) : null}
      <aside
        aria-label="Navegación principal"
        className={cn(
          'sa-no-print fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col gap-6 border-r border-[var(--sa-border)] bg-[var(--sa-bg)] p-4 transition-transform duration-200 md:translate-x-0 xl:w-[260px]',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center gap-2">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-[var(--sa-on-accent)]"
            aria-hidden="true"
          >
            <Icon name="shield" size={20} color="currentColor" />
          </span>
          <div className="flex min-w-0 flex-col">
            <span className="text-base font-extrabold leading-tight">{app.name}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--sa-muted)]">
              {app.portal}
            </span>
          </div>
        </div>

        <nav className="flex-1">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <SidebarItem
                key={item.id}
                label={item.label}
                icon={item.icon}
                active={item.id === activeId}
                onClick={() => {
                  onNavigate?.(item.id)
                  onClose()
                }}
              />
            ))}
          </ul>
        </nav>

        <PrivacyBox />
      </aside>
    </>
  )
}
