import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { KpiPadron } from '../types'

const tonos = {
  gris: {
    tile: 'bg-[var(--sa-field)] text-[var(--sa-muted)]',
    valor: 'text-[var(--color-text-primary)]',
  },
  azul: {
    tile: 'bg-[var(--sa-sky)] text-[var(--sa-steel)]',
    valor: 'text-[var(--sa-steel)]',
  },
  rosa: {
    tile: 'bg-[var(--sa-rosa)] text-[var(--sa-on-rosa)]',
    valor: 'text-[var(--sa-danger)]',
  },
} as const

interface KpiPadronCardProps {
  kpi: KpiPadron
  valor: number
  activo?: boolean
  onClick?: () => void
  ariaLabel?: string
}

export function KpiPadronCard({
  kpi,
  valor,
  activo = false,
  onClick,
  ariaLabel,
}: KpiPadronCardProps) {
  const contenido = (
    <>
      <span
        aria-hidden='true'
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
          tonos[kpi.tono].tile
        )}
      >
        <Icon name={kpi.icon} size={22} color='currentColor' />
      </span>
      <span className='flex min-w-0 flex-col gap-0.5'>
        <span className='text-[11px] leading-[1.2] font-bold tracking-wide text-[var(--sa-muted)] uppercase'>
          {kpi.etiqueta}
        </span>
        <span
          className={cn(
            'text-[30px] leading-none font-extrabold',
            tonos[kpi.tono].valor
          )}
        >
          {valor}
        </span>
      </span>
    </>
  )

  const clases = cn(
    'flex min-h-[76px] min-w-[150px] flex-1 items-center gap-3 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 py-2 text-left',
    onClick && 'hover:bg-[var(--sa-field)]',
    activo && 'border-[var(--color-forest)] ring-2 ring-[var(--color-forest)]'
  )

  if (onClick) {
    return (
      <button
        type='button'
        onClick={onClick}
        aria-label={ariaLabel}
        aria-pressed={activo}
        className={clases}
      >
        {contenido}
      </button>
    )
  }

  return (
    <div className={clases} aria-label={ariaLabel}>
      {contenido}
    </div>
  )
}
