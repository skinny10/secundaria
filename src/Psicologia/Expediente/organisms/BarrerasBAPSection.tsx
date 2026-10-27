import { Icon } from '../../../utils/atoms/Icon'
import type { BarreraBAP } from '../constants/diagnosticoBap'

interface BarrerasBAPSectionProps {
  barreras: BarreraBAP[]
}

const impactoTono: Record<BarreraBAP['impacto'], string> = {
  Alto: 'bg-[var(--sa-rosa)] text-[var(--sa-on-rosa)]',
  Medio: 'bg-[var(--sa-sky)] text-[var(--sa-steel)]',
  Bajo: 'bg-[var(--sa-field)] text-[var(--sa-muted)]',
}

export function BarrerasBAPSection({ barreras }: BarrerasBAPSectionProps) {
  return (
    <section className='flex flex-col gap-4 rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 shadow-[var(--shadow-sm)]'>
      <header className='flex items-start gap-3'>
        <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-sky)] text-[var(--sa-steel)]'>
          <Icon name='alert-triangle' size={20} color='currentColor' />
        </span>
        <div className='flex min-w-0 flex-col gap-1'>
          <h2 className='text-[22px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
            2. Barreras para el Aprendizaje y la Participación (BAP)
          </h2>
          <p className='text-[14px] text-[var(--sa-muted)]'>
            Barreras identificadas con categoría, impacto y recomendación prioritaria
          </p>
        </div>
      </header>

      <div className='grid grid-cols-1 gap-3 xl:grid-cols-3'>
        {barreras.map((barrera) => (
          <article key={barrera.id} className='flex min-w-0 flex-col gap-3 rounded-xl border border-[var(--sa-border)] p-5'>
            <div className='flex flex-wrap items-start justify-between gap-2'>
              <div className='flex min-w-0 flex-1 items-start gap-2.5'>
                <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--sa-field)] text-[var(--color-forest)]'>
                  <Icon name={barrera.icono} size={18} color='currentColor' />
                </span>
                <div className='flex min-w-0 flex-col gap-1'>
                  <h3 className='text-[16px] leading-snug font-extrabold' style={{ color: 'var(--sa-title)' }}>
                    {barrera.titulo}
                  </h3>
                  <span className='text-[12px] font-semibold text-[var(--sa-muted)]'>{barrera.categoria}</span>
                </div>
              </div>
              <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${impactoTono[barrera.impacto]}`}>
                Impacto: {barrera.impacto}
              </span>
            </div>
            <p className='text-[14px] leading-[1.7] text-[var(--color-text-primary)]'>{barrera.descripcion}</p>
            <div className='rounded-lg bg-[var(--sa-field)] px-3 py-2'>
              <p className='text-[13px] leading-[1.7] text-[var(--sa-muted)]'>
                <span className='font-bold text-[var(--color-text-primary)]'>Recomendación prioritaria:</span> {barrera.recomendacion}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
