import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import type { AcuerdosLegales } from '../constants/acuerdosLegales'
import type { FirmaExpediente } from '../types'

const trazos: Record<FirmaExpediente['trazo'], string> = {
  claudia:
    'M12 50c10-26 14-34 22-30 9 4 2 32 12 34 9 2 14-26 24-24 10 2 3 28 13 29 10 1 16-20 24-17 7 3 4 15 12 14 9-1 15-14 23-10',
  roberto:
    'M12 46c8-18 13-24 20-18 8 7 2 22 10 23 8 1 12-18 20-16 8 2 2 17 11 18 8 1 12-14 20-11 8 3 5 13 12 12 8-1 13-10 21-6',
  tovilla:
    'M12 48c12-15 16-28 24-24 9 5 1 24 11 26 9 1 13-20 22-17 9 3 2 20 11 21 10 1 14-16 23-13 8 3 5 15 14 13 10-2 14-9 24-7',
}

interface FirmasCardProps {
  firmas: AcuerdosLegales['firmas']
  datos: FirmaExpediente[]
  onSolicitar: (firma: FirmaExpediente) => void
  bloqueado?: boolean
}

export function FirmasCard({ firmas, datos, onSolicitar, bloqueado = false }: FirmasCardProps) {
  const firmadas = datos.filter((firma) => firma.firmado).length

  return (
    <section className='flex flex-col gap-4 rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 shadow-[var(--shadow-sm)]'>
      <header className='flex flex-wrap items-start justify-between gap-3'>
        <div className='flex min-w-0 items-start gap-3'>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-field)] text-[var(--color-forest)]'>
            <Icon name='file-signature' size={20} color='currentColor' />
          </span>
          <div className='flex min-w-0 flex-col gap-1'>
            <h2 className='text-[19px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
              {firmas.titulo}
            </h2>
            <p className='text-[13px] leading-relaxed text-[var(--sa-muted)]'>{firmas.subtitulo}</p>
          </div>
        </div>
        <Chip tono={firmadas === datos.length ? 'menta' : 'gris'} icon='shield-check'>
          {firmadas}/{datos.length} Firmado
        </Chip>
      </header>

      <div className='grid w-full min-w-0 grid-cols-1 gap-3 md:grid-cols-3'>
        {datos.map((firma) => (
          <article
            key={firma.id}
            className='flex min-w-0 flex-col gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] p-4'
          >
            <div className='flex flex-wrap items-start justify-between gap-2'>
              <p className='text-[10px] leading-tight font-bold tracking-[0.12em] text-[var(--sa-muted)] uppercase'>
                {firma.rol}
              </p>
              {firma.firmado ? (
                <Chip tono='menta' icon='check'>
                  Firmado
                </Chip>
              ) : (
                <Chip tono='gris'>Pendiente</Chip>
              )}
            </div>
            <p className='text-[15px] leading-tight font-extrabold'>{firma.nombre}</p>
            <p className='text-[11.5px] leading-snug text-[var(--sa-muted)]'>{firma.cargo}</p>
            <p className='text-[11.5px] leading-snug font-semibold text-[var(--sa-muted)]'>
              {firma.credencial}
            </p>

            <div className='flex min-h-[76px] flex-col items-center justify-center gap-1 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-2 py-2'>
              <svg viewBox='0 0 200 70' className='h-10 w-full text-[var(--color-text-primary)]' aria-hidden='true'>
                <path
                  d={trazos[firma.trazo]}
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M24 62h150'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1'
                  strokeDasharray='2 4'
                  opacity='0.5'
                />
              </svg>
              <p className='text-[10px] font-bold tracking-[0.08em] text-[var(--sa-muted)] uppercase'>
                {firma.autenticacion}
              </p>
            </div>

            <p className='text-[11px] leading-snug text-[var(--sa-muted)]'>Fecha: {firma.fecha}</p>
            <p className='truncate text-[10.5px] leading-snug text-[var(--sa-muted)]' title={firma.token}>
              {firma.token}
            </p>

            {firma.firmado ? null : (
              <button
                type='button'
                onClick={() => onSolicitar(firma)}
                disabled={bloqueado}
                title={bloqueado ? 'El expediente está bloqueado por dictamen emitido.' : undefined}
                className='inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[12.5px] font-bold transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60'
              >
                <Icon name='file-signature' size={15} color='currentColor' />
                Solicitar firma
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
