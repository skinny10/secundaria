import { Icon } from '../../../utils/atoms/Icon'
import type { HistorialIntervencion } from '../constants/diagnosticoBap'

interface HistorialIntervencionesSectionProps {
  historial: HistorialIntervencion[]
}

export function HistorialIntervencionesSection({ historial }: HistorialIntervencionesSectionProps) {
  return (
    <section className='flex flex-col gap-4 rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 shadow-[var(--shadow-sm)]'>
      <header className='flex items-start gap-3'>
        <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sa-sky)] text-[var(--sa-steel)]'>
          <Icon name='clock' size={20} color='currentColor' />
        </span>
        <div className='flex flex-col gap-1'>
          <h2 className='text-[22px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
            4. Historial de Intervenciones y Observación de Aula
          </h2>
          <p className='text-[14px] text-[var(--sa-muted)]'>
            Seguimiento cronológico de las acciones realizadas
          </p>
        </div>
      </header>

      <div className='relative flex flex-col gap-4'>
        <div className='absolute left-[18px] top-2 bottom-2 hidden w-px bg-[var(--sa-border)] md:block' />
        {historial.map((item) => (
          <article key={item.id} className='relative grid grid-cols-1 gap-3 md:grid-cols-[auto_1fr] md:gap-5'>
            <div className='hidden md:flex'>
              <span className='flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-forest)] text-[var(--sa-on-accent)] ring-4 ring-[var(--sa-card)]'>
                <Icon name='circle-check' size={16} color='currentColor' />
              </span>
            </div>
            <div className='flex min-w-0 flex-col gap-2 rounded-xl border border-[var(--sa-border)] p-5'>
              <div className='flex flex-wrap items-center justify-between gap-2'>
                <div className='flex items-center gap-2'>
                  <span className='inline-flex items-center rounded-full bg-[var(--sa-field)] px-2.5 py-1 text-[12px] font-bold'>
                    {item.fecha}
                  </span>
                  <span className='text-[14px] font-extrabold' style={{ color: 'var(--sa-title)' }}>
                    {item.tipo}
                  </span>
                </div>
                <span className='text-[13px] text-[var(--sa-muted)]'>{item.responsable}</span>
              </div>
              <p className='text-[14px] leading-[1.7] text-[var(--color-text-primary)]'>{item.descripcion}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
