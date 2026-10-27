import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import { CodigoQR } from '../atoms/CodigoQR'
import type { ProtocoloCrisisDetalle } from '../constants/protocoloCrisisDetalle'

interface PaseSensorialCardProps {
  pase: ProtocoloCrisisDetalle['pase']
  folio: string
  alumno: string
  grado: string
  onReemitir: () => void
  bloqueado?: boolean
}

export function PaseSensorialCard({
  pase,
  folio,
  alumno,
  grado,
  onReemitir,
  bloqueado = false,
}: PaseSensorialCardProps) {
  return (
    <section className='flex flex-col gap-4 rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 shadow-[var(--shadow-sm)]'>
      <header className='flex flex-wrap items-start justify-between gap-3'>
        <div className='flex min-w-0 items-start gap-3'>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-sky)] text-[var(--sa-steel)]'>
            <Icon name='qr-code' size={20} color='currentColor' />
          </span>
          <div className='flex min-w-0 flex-col gap-1'>
            <h2 className='text-[19px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
              {pase.titulo}
            </h2>
            <p className='text-[13px] leading-relaxed text-[var(--sa-muted)]'>{pase.subtitulo}</p>
          </div>
        </div>
        <Chip tono='azul' icon='shield'>
          {pase.chip}
        </Chip>
      </header>

      <div className='grid grid-cols-1 gap-4 rounded-xl bg-[var(--sa-field)] p-4 lg:grid-cols-[auto_minmax(0,1fr)]'>
        <div
          className='flex min-w-0 flex-col items-center gap-2 rounded-xl border border-[var(--sa-border)] p-3'
          style={{ backgroundColor: 'var(--qr-surface)' }}
        >
          <div className='flex w-full items-center justify-between gap-2'>
            <p
              className='text-[11px] font-extrabold tracking-[0.14em] uppercase'
              style={{ color: 'var(--qr-ink)' }}
            >
              Pase oficial SEE
            </p>
            <p
              className='text-[10px] font-bold tracking-[0.1em] uppercase'
              style={{ color: 'var(--qr-ink)' }}
            >
              {pase.vigencia}
            </p>
          </div>
          <CodigoQR
            valor={`NexusEdu|PASE-SEE|${folio}|${alumno}|${grado}|${pase.destino}`}
            etiqueta={`QR folio ${folio}`}
            size={126}
          />
          <div className='flex flex-col items-center gap-0.5 text-center'>
            <p
              className='text-[14px] leading-tight font-extrabold'
              style={{ color: 'var(--qr-ink)' }}
            >
              Pase Sensorial {folio}
            </p>
            <p className='text-[12px] leading-snug' style={{ color: 'var(--qr-ink)' }}>
              {alumno} • {grado}
            </p>
          </div>
          <span className='inline-flex items-center gap-1.5 rounded-full bg-[var(--sa-sky)] px-2.5 py-1 text-center text-[10.5px] leading-snug font-bold text-[var(--sa-steel)]'>
            <Icon name='map-pin' size={12} color='currentColor' className='shrink-0' />
            {pase.destino}
          </span>
        </div>

        <div className='flex min-w-0 flex-col gap-3'>
          <h3 className='text-[15px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
            Reglas de Operación en Pasillos
          </h3>
          <ul className='flex flex-col gap-2.5'>
            {pase.reglas.map((regla) => (
              <li key={regla.id} className='flex min-w-0 items-start gap-2.5 rounded-lg bg-[var(--sa-card)] p-3'>
                <span className='mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--sa-field)] text-[var(--color-forest)]'>
                  <Icon name={regla.icono} size={15} color='currentColor' />
                </span>
                <p className='min-w-0 text-[13px] leading-relaxed text-[var(--color-text-primary)]'>
                  <span className='font-extrabold'>{regla.titulo}</span> {regla.descripcion}
                </p>
              </li>
            ))}
          </ul>
          <div className='flex flex-wrap items-center justify-between gap-2'>
            <span className='inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--sa-muted)]'>
              <Icon name='map-pin' size={14} color='currentColor' className='shrink-0' />
              {pase.distancia}
            </span>
            <button
              type='button'
              onClick={onReemitir}
              disabled={bloqueado}
              title={bloqueado ? 'El expediente está bloqueado por dictamen emitido.' : undefined}
              className='inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] border border-[var(--sa-border)] bg-[var(--sa-card)] px-4 text-[13px] font-bold text-[var(--color-text-primary)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60'
            >
              <Icon name='refresh' size={15} color='currentColor' />
              Reemitir Credencial QR
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
