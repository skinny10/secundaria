import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { IconName } from '../../../utils/types'
import { encabezadoAlta } from '../constants/altaContent'

export function EncabezadoAlta() {
  return (
    <header className='flex w-full min-w-0 flex-col gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-4 shadow-[var(--shadow-sm)] sm:p-5'>
      <div className='flex min-w-0 flex-wrap items-start justify-between gap-3'>
        <div className='flex min-w-0 items-start gap-3'>
          <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-menta-soft)] text-[var(--color-forest)]'>
            <Icon name='user-cog' size={26} color='currentColor' />
          </span>
          <div className='min-w-0'>
            <p className='text-[11px] font-extrabold tracking-[0.12em] text-[var(--sa-green)] uppercase'>
              {encabezadoAlta.eyebrow}
            </p>
            <h1
              id='alta-titulo-vista'
              tabIndex={-1}
              className='mt-0.5 text-[24px] leading-tight font-extrabold break-words text-[var(--color-text-primary)] sm:text-[28px]'
            >
              {encabezadoAlta.titulo}
            </h1>
            <p className='mt-1.5 max-w-3xl text-[14px] leading-snug text-[var(--sa-muted)]'>
              {encabezadoAlta.descripcion}
            </p>
          </div>
        </div>
        <span className='inline-flex max-w-full shrink-0 items-center gap-1.5 rounded-full border border-[var(--sa-border)] bg-[var(--sa-field)] px-3 py-2 text-[11px] font-extrabold tracking-[0.06em] text-[var(--sa-green)] uppercase'>
          <Icon name='shield-check' size={15} color='currentColor' />
          <span className='min-w-0 break-words'>{encabezadoAlta.chip}</span>
        </span>
      </div>
    </header>
  )
}

interface CabeceraPasoProps {
  numero: number
  etiqueta: string
  titulo: string
  descripcion?: string
  linea?: string
  icono: IconName
  chip?: string
}

export function CabeceraPaso({
  numero,
  etiqueta,
  titulo,
  descripcion,
  linea,
  icono,
  chip,
}: CabeceraPasoProps) {
  return (
    <header className='flex w-full min-w-0 flex-col gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-4 shadow-[var(--shadow-sm)] sm:p-5'>
      <div className='flex min-w-0 items-start gap-3'>
        <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-[var(--sa-on-accent)]'>
          <Icon name={icono} size={24} color='currentColor' />
        </span>
        <div className='min-w-0 flex-1'>
          <div className='flex min-w-0 flex-wrap items-center gap-2'>
            <span className='rounded-full bg-[var(--sa-menta-soft)] px-2.5 py-1 text-[10px] font-extrabold tracking-[0.1em] text-[var(--sa-green)] uppercase'>
              Paso {numero} de 3
            </span>
            <span className='text-[11px] font-extrabold tracking-[0.1em] text-[var(--sa-muted)] uppercase'>
              {etiqueta}
            </span>
          </div>
          <h1
            id='alta-titulo-paso'
            tabIndex={-1}
            className='mt-1 text-[22px] leading-tight font-extrabold break-words text-[var(--color-text-primary)] sm:text-[26px]'
          >
            {titulo}
          </h1>
          {descripcion ? (
            <p className='mt-1.5 max-w-4xl text-[14px] leading-snug text-[var(--sa-muted)]'>
              {descripcion}
            </p>
          ) : null}
          {linea ? (
            <p className='mt-1.5 text-[13px] leading-snug font-semibold text-[var(--sa-green)]'>
              {linea}
            </p>
          ) : null}
        </div>
        {chip ? (
          <span className='hidden shrink-0 items-center gap-1.5 rounded-full border border-[var(--sa-border)] bg-[var(--sa-field)] px-3 py-2 text-[10px] font-extrabold tracking-[0.06em] text-[var(--sa-green)] uppercase sm:inline-flex'>
            <Icon name='shield-check' size={14} color='currentColor' />
            {chip}
          </span>
        ) : null}
      </div>
    </header>
  )
}

export function BarraProgresoAlta({ activo }: { activo: number }) {
  return (
    <div
      className='h-1.5 w-full overflow-hidden rounded-full bg-[var(--sa-field)]'
      role='progressbar'
      aria-valuemin={1}
      aria-valuemax={3}
      aria-valuenow={activo}
      aria-label='Progreso del alta'
    >
      <div
        className={cn('h-full rounded-full bg-[var(--color-forest)] transition-[width]')}
        style={{ width: `${(activo / 3) * 100}%` }}
      />
    </div>
  )
}
