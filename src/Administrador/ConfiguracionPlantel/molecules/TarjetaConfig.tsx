import type { ReactNode } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import type { IconName } from '../../../utils/types'

interface TarjetaConfigProps {
  titulo: string
  descripcion?: string
  icono: IconName
  children: ReactNode
  acciones?: ReactNode
  etiqueta?: string
}

export function TarjetaConfig({
  titulo,
  descripcion,
  icono,
  children,
  acciones,
  etiqueta,
}: TarjetaConfigProps) {
  const tituloId = `tarjeta-${titulo.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <section
      aria-labelledby={tituloId}
      className='flex min-w-0 flex-col rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'
    >
      <header className='flex flex-wrap items-start justify-between gap-3 border-b border-[var(--sa-border)] px-6 py-5 sm:px-8'>
        <div className='flex min-w-0 items-start gap-3'>
          <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-menta-soft)] text-[var(--color-forest)]'>
            <Icon name={icono} size={24} aria-hidden='true' />
          </span>
          <div className='min-w-0'>
            <div className='flex flex-wrap items-center gap-2'>
              <h2 id={tituloId} className='text-[26px] leading-tight font-extrabold text-[var(--sa-text)]'>
                {titulo}
              </h2>
              {etiqueta ? (
                <span className='rounded-full bg-[var(--sa-field)] px-2.5 py-1 text-[12px] font-bold tracking-wide text-[var(--sa-muted)] uppercase'>
                  {etiqueta}
                </span>
              ) : null}
            </div>
            {descripcion ? (
              <p className='mt-1 max-w-[70ch] text-[17px] text-[var(--sa-muted)]'>{descripcion}</p>
            ) : null}
          </div>
        </div>
        {acciones ? <div className='shrink-0'>{acciones}</div> : null}
      </header>
      <div className='flex flex-col gap-5 px-6 py-6 sm:px-8'>{children}</div>
    </section>
  )
}
