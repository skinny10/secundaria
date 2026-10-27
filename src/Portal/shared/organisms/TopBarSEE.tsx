import { Icon } from '../../../utils/atoms/Icon'
import { roles } from '../constants/roles'
import type { RoleKey } from '../types'

interface TopBarSEEProps {
  roleKey?: RoleKey
  isDark: boolean
  onToggleTheme: () => void
  busqueda: string
  onBuscar: (valor: string) => void
  onOpenMenu: () => void
  placeholder?: string
}

export function TopBarSEE({
  roleKey = 'psicologia',
  isDark,
  onToggleTheme,
  busqueda,
  onBuscar,
  onOpenMenu,
  placeholder,
}: TopBarSEEProps) {
  const config = roles[roleKey]
  const usuario = config.user
  const placeholderVisible = placeholder ?? config.searchPlaceholder

  return (
    <header className='sa-no-print flex flex-wrap items-center gap-2 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 py-2 shadow-[var(--shadow-sm)]'>
      <button
        type='button'
        onClick={onOpenMenu}
        aria-label='Abrir menú de navegación'
        className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] lg:hidden'
      >
        <Icon name='menu' size={18} color='currentColor' />
      </button>

      <div className='flex h-11 min-w-0 flex-1 items-center gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] px-3'>
        <Icon name='search' size={16} color='var(--sa-muted)' className='shrink-0' />
        <input
          value={busqueda}
          onChange={(event) => onBuscar(event.target.value)}
          placeholder={placeholderVisible}
          aria-label={placeholderVisible}
          className='h-full w-full min-w-0 bg-transparent text-[13px] outline-none placeholder:text-[var(--sa-muted)]'
        />
      </div>

      <span className='inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[12px] font-semibold'>
        <Icon name='calendar' size={16} color='var(--sa-muted)' className='shrink-0' />
        Ciclo 2024-2025
        <Icon name='chevron-down' size={14} color='var(--sa-muted)' className='shrink-0' />
      </span>

      <button
        type='button'
        onClick={onToggleTheme}
        aria-label={`${isDark ? 'Modo claro' : 'Modo oscuro'}: cambiar tema`}
        className='inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[12px] font-semibold'
      >
        <Icon name={isDark ? 'sun' : 'moon'} size={16} color='currentColor' className='shrink-0' />
        {isDark ? 'Modo claro' : 'Modo oscuro'}
      </button>

      <div className='ml-auto flex min-w-0 items-center gap-2'>
        <div className='hidden min-w-0 text-right sm:block'>
          <p className='truncate text-[13px] leading-tight font-bold'>{usuario.name}</p>
          <p className='truncate text-[11px] leading-tight font-bold text-[var(--color-forest)]'>
            {usuario.role}
          </p>
        </div>
        {usuario.avatarUrl ? (
          <img
            src={usuario.avatarUrl}
            alt={`Avatar de ${usuario.name}`}
            className='h-10 w-10 shrink-0 rounded-full object-cover'
          />
        ) : (
          <span
            aria-label={`Avatar de ${usuario.name}`}
            className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-[13px] font-bold text-[var(--sa-on-accent)]'
          >
            {usuario.initials}
          </span>
        )}
      </div>
    </header>
  )
}
