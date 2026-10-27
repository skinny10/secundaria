import { Icon } from '../../../utils/atoms/Icon'
import { ActionButton } from '../../shared/atoms/ActionButton'
import { homeContent } from '../constants/homeContent'
import type { ThemeMode } from '../../../utils/hooks/useTheme'

interface PageHeaderProps {
  theme: ThemeMode
  onChangeTheme: (theme: ThemeMode) => void
}

export function PageHeader({ theme, onChangeTheme }: PageHeaderProps) {
  const { eyebrow, title, icon } = homeContent.pageHeader
  const isDark = theme === 'dark'

  return (
    <section className="flex flex-col gap-4 rounded-[16px] border border-[var(--sa-border)] border-l-[6px] border-l-[var(--color-forest)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)] lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[var(--sa-menta)] text-[var(--sa-on-menta)]"
          aria-hidden="true"
        >
          <Icon name={icon} size={24} color="currentColor" />
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold uppercase tracking-widest text-[var(--sa-muted)]">
            {eyebrow}
          </span>
          <h1 className="text-2xl font-extrabold leading-tight lg:text-3xl">{title}</h1>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 lg:shrink-0">
        <ActionButton
          label={isDark ? 'Modo claro' : 'Modo oscuro'}
          icon={isDark ? 'sun' : 'moon'}
          variant={isDark ? 'sky' : 'neutral'}
          aria-pressed={isDark}
          onClick={() => onChangeTheme(isDark ? 'light' : 'dark')}
        />
      </div>
    </section>
  )
}
