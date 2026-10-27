import { Icon } from '../../../utils/atoms/Icon'
import { SegmentedControl } from '../atoms/SegmentedControl'
import { Avatar } from '../atoms/Avatar'
import { topBarContent } from '../constants/navigation'
import type { ThemeMode } from '../../../utils/hooks/useTheme'

interface TopBarProps {
  onOpenSidebar: () => void
  theme: ThemeMode
  onChangeTheme: (theme: ThemeMode) => void
}

export function TopBar({ onOpenSidebar, theme, onChangeTheme }: TopBarProps) {
  const { searchLabel, cycle, segmented, profile } = topBarContent

  const options = segmented.map((option) => ({
    ...option,
    active: option.id === theme,
  }))

  const handleToggle = (id: string) => {
    if (id === 'light' || id === 'dark') onChangeTheme(id)
  }

  return (
    <header className="sa-no-print sticky top-0 z-20 flex flex-wrap items-center gap-2 border-b border-[var(--sa-border)] bg-[var(--sa-bg)] px-4 py-3 md:gap-3 md:px-6">
      <button
        type="button"
        onClick={onOpenSidebar}
        aria-label="Abrir menú de navegación"
        className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] text-[var(--sa-muted)] hover:bg-[var(--sa-field)] md:hidden"
      >
        <Icon name="menu" size={20} color="currentColor" />
      </button>

      <button
        type="button"
        aria-label={searchLabel}
        className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] text-[var(--sa-muted)] hover:bg-[var(--sa-field)]"
      >
        <Icon name="search" size={20} color="currentColor" />
      </button>

      <button
        type="button"
        className="inline-flex min-h-[44px] items-center gap-2 rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-base font-bold text-[var(--color-text-primary)] hover:bg-[var(--sa-field)]"
      >
        <Icon name="calendar" size={18} color="var(--sa-muted)" />
        {cycle}
        <Icon name="chevron-down" size={16} color="var(--sa-muted)" />
      </button>

      <SegmentedControl
        ariaLabel="Tema de la interfaz"
        options={options}
        onToggle={handleToggle}
      />

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden flex-col text-right sm:flex">
          <span className="text-base font-bold leading-tight">{profile.name}</span>
          <span className="text-sm text-[var(--sa-muted)]">{profile.role}</span>
        </div>
        <Avatar initials={profile.initials} tone="forest" ariaLabel={`Perfil de ${profile.name}`} />
      </div>
    </header>
  )
}
