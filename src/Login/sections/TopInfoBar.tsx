import { Icon } from '../../utils/atoms/Icon'
import { PillButton } from '../../utils/atoms/PillButton'
import { loginContent } from '../constants/loginContent'
import type { ThemeMode } from '../../utils/hooks/useTheme'

interface TopInfoBarProps {
  cycle: string
  zone: string
  plantelKey: string
  theme: ThemeMode
  onToggleTheme: () => void
}

export function TopInfoBar({
  cycle,
  zone,
  plantelKey,
  theme,
  onToggleTheme,
}: TopInfoBarProps) {
  const isDark = theme === 'dark'
  return (
    <header className="flex flex-col gap-4 rounded-[var(--radius-lg)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-sm)] md:flex-row md:items-center md:justify-between md:gap-6 md:px-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-logo)]">
          <Icon name="hat" size={20} color="#FFFFFF" />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-base font-bold leading-tight">{cycle}</span>
          <span className="text-sm">
            {zone} • {plantelKey}
          </span>
        </div>
      </div>
      <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:flex-nowrap">
        <PillButton
          className="flex-1 justify-center md:flex-none"
          label={isDark ? loginContent.topBar.themeLight : loginContent.topBar.themeDark}
          icon={isDark ? 'sun' : 'moon'}
          variant="light"
          aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          onClick={onToggleTheme}
        />
        <PillButton
          className="flex-1 justify-center md:flex-none"
          label={loginContent.topBar.helpDesk}
          icon="help-circle"
          variant="sky"
          onClick={() => {}}
        />
      </div>
    </header>
  )
}
