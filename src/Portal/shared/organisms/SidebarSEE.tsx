import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { roles } from '../constants/roles'
import type { RoleKey, SidebarKey } from '../types'

interface SidebarSEEProps {
  roleKey?: RoleKey
  activeKey: SidebarKey
  onNavigate?: (key: SidebarKey) => void
  onClose?: () => void
  className?: string
}

export function SidebarSEE({
  roleKey = 'psicologia',
  activeKey,
  onNavigate,
  onClose,
  className,
}: SidebarSEEProps) {
  const config = roles[roleKey]

  return (
    <aside
      aria-label={config.sidebarAria}
      className={cn(
        'flex w-full flex-col gap-4 border-b border-[var(--sa-border)] bg-[var(--sa-bg)] p-3',
        'lg:w-[208px] lg:shrink-0 lg:border-r lg:border-b-0 lg:px-3 lg:py-4',
        'lg:sticky lg:top-9 lg:max-h-[calc(100vh-36px)] lg:overflow-y-auto',
        className
      )}
    >
      <div className='flex items-center justify-between gap-2'>
        <div className='flex min-w-0 items-center gap-2'>
          <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-[var(--sa-on-accent)]'>
            <Icon name={config.bannerIcon} size={18} color='currentColor' />
          </span>
          <div className='min-w-0'>
            <p className='text-[15px] leading-tight font-extrabold'>NexusEdu</p>
            <p className='text-[10.5px] leading-tight font-bold tracking-widest text-[var(--color-forest)] uppercase'>
              {config.portal}
            </p>
          </div>
        </div>
        {onClose ? (
          <button
            type='button'
            onClick={onClose}
            aria-label='Cerrar menú de navegación'
            className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] lg:hidden'
          >
            <Icon name='x' size={16} color='currentColor' />
          </button>
        ) : null}
      </div>

      <div className='flex flex-col gap-2'>
        <p className='text-[10.5px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
          {config.sidebarLabel}
        </p>
        <nav className='flex flex-col gap-1'>
          {config.navItems.map((modulo) => {
            const activo = modulo.key === activeKey
            return (
              <button
                key={modulo.key}
                type='button'
                aria-current={activo ? 'page' : undefined}
                onClick={() => onNavigate?.(modulo.key)}
                className={cn(
                  'flex min-h-[44px] w-full items-start gap-2.5 rounded-xl px-3 py-2.5 text-left text-[14px] leading-snug font-semibold',
                  activo
                    ? 'bg-[var(--color-forest)] text-[var(--sa-on-accent)]'
                    : 'text-[var(--sa-muted)] hover:bg-[var(--sa-field)]'
                )}
              >
                <Icon
                  name={modulo.icon}
                  size={20}
                  color='currentColor'
                  className='mt-0.5 shrink-0'
                />
                <span className='min-w-0 flex-1 break-words'>{modulo.label}</span>
                {modulo.proximamente ? (
                  <span className='mt-0.5 ml-auto shrink-0 rounded-full bg-[var(--sa-field)] px-1.5 py-0.5 text-[9px] leading-tight font-bold tracking-wide text-[var(--sa-muted)] uppercase'>
                    Pronto
                  </span>
                ) : null}
                {activo ? (
                  <span
                    aria-hidden='true'
                    className='mt-1.5 ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sa-on-accent)]'
                  />
                ) : null}
              </button>
            )
          })}
        </nav>
      </div>

      <div className='mt-auto flex flex-col gap-2'>
        {config.footer.type === 'norma' ? (
          <>
            <span className='inline-flex items-center gap-2 rounded-lg bg-[var(--sa-field)] px-2.5 py-2 text-[11px] font-bold text-[var(--sa-muted)]'>
              <Icon name='shield' size={14} color='currentColor' className='shrink-0' />
              {config.footer.norma}
            </span>
            <span className='inline-flex w-fit items-center rounded-full bg-[var(--sa-menta)] px-2.5 py-1 text-[11px] font-bold text-[var(--sa-on-menta)]'>
              {config.footer.ciclo}
            </span>
          </>
        ) : (
          <div className='flex items-start gap-2 rounded-xl bg-[var(--sa-field)] px-3 py-3'>
            <Icon
              name='headphones'
              size={20}
              color='var(--sa-muted)'
              className='mt-0.5 shrink-0'
            />
            <div className='min-w-0'>
              <p className='text-[12px] leading-tight font-bold'>{config.footer.title}</p>
              <p className='mt-1 text-[11px] leading-snug text-[var(--sa-muted)]'>
                {config.footer.text}
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
