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
            'flex w-full flex-col gap-6 border-b border-[var(--sa-border)] bg-[var(--sa-bg)] p-6',
            'lg:w-[300px] lg:shrink-0 lg:border-r lg:border-b-0 lg:px-5 lg:py-6 [1100px]:w-[280px]',
            'lg:sticky lg:top-9 lg:max-h-[calc(100vh-36px)] lg:overflow-y-auto',
            className
          )}
        >
      <div className='flex items-center justify-between gap-2'>
        <div className='flex min-w-0 items-center gap-3'>
          <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-[var(--sa-on-accent)]'>
            <Icon name={config.bannerIcon} size={22} color='currentColor' />
          </span>
          <div className='min-w-0'>
            <p className='text-[19px] leading-tight font-extrabold'>NexusEdu</p>
            <p className='text-[13px] leading-tight font-bold tracking-widest text-[var(--color-forest)] uppercase'>
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
        <p className='text-[13px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
          {config.sidebarLabel}
        </p>
        <nav className='flex flex-col gap-1.5'>
          {config.navItems.map((modulo) => {
            const activo = modulo.key === activeKey
            return (
              <button
                key={modulo.key}
                type='button'
                aria-current={activo ? 'page' : undefined}
                onClick={() => onNavigate?.(modulo.key)}
                title={modulo.label}
                className={cn(
                  'flex min-h-[52px] w-full items-center gap-4 rounded-xl px-4 py-4 text-left text-[18px] leading-[1.35] font-semibold',
                  'overflow-wrap-normal hyphens-manual break-normal',
                  activo
                    ? 'bg-[var(--color-forest)] text-[var(--sa-on-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
                    : 'text-[var(--sa-text)] hover:bg-[var(--sa-field)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
                )}
                style={{ overflowWrap: 'normal', wordBreak: 'normal', hyphens: 'manual' }}
              >
                <Icon
                  name={modulo.icon}
                  size={24}
                  color='currentColor'
                  className='shrink-0 flex-none'
                  aria-hidden='true'
                />
                <span className='min-w-0 flex-1' style={{ overflowWrap: 'normal', wordBreak: 'normal', hyphens: 'manual' }}>
                  {modulo.label}
                </span>
                {modulo.proximamente ? (
                  <span className='ml-auto shrink-0 rounded-full bg-[var(--sa-field)] px-2 py-[2px] text-[10px] leading-tight font-bold tracking-wide text-[var(--sa-muted)] uppercase'>
                    PRONTO
                  </span>
                ) : null}
                {activo && !modulo.proximamente ? (
                  <span
                    aria-hidden='true'
                    className='ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sa-on-accent)]'
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
            <span className='inline-flex items-center gap-2 rounded-lg bg-[var(--sa-field)] px-2.5 py-2 text-[11px] font-bold text-[var(--sa-muted)]' style={{ overflowWrap: 'normal', wordBreak: 'normal', hyphens: 'manual' }}>
              <Icon name='shield' size={14} color='currentColor' className='shrink-0' />
              <span className='min-w-0 flex-1' style={{ overflowWrap: 'normal', wordBreak: 'normal', hyphens: 'manual' }}>{config.footer.norma}</span>
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
              aria-hidden='true'
            />
            <div className='min-w-0 flex-1'>
              <p className='text-[12px] leading-tight font-bold' style={{ overflowWrap: 'normal', wordBreak: 'normal', hyphens: 'manual' }}>{config.footer.title}</p>
              <p className='mt-1 text-[11px] leading-snug text-[var(--sa-muted)]' style={{ overflowWrap: 'normal', wordBreak: 'normal', hyphens: 'manual' }}>
                {config.footer.text}
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
