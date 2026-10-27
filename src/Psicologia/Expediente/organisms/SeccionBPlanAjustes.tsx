import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import { GrupoMaterias } from '../molecules/GrupoMaterias'
import type { GrupoMaterias as GrupoMateriasDatos } from '../types'

interface SeccionBPlanAjustesProps {
  grupos: GrupoMateriasDatos[]
}

export function SeccionBPlanAjustes({ grupos }: SeccionBPlanAjustesProps) {
  return (
    <section
      id='seccion-b'
      role='tabpanel'
      aria-labelledby='pestana-B'
      className='flex flex-col gap-4 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)]'
    >
      <header className='flex flex-wrap items-start justify-between gap-3'>
        <div className='flex min-w-0 items-start gap-3'>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-sky)] text-[var(--sa-steel)]'>
            <Icon name='list-checks' size={20} color='currentColor' />
          </span>
          <div className='min-w-0'>
            <h2 className='text-[17px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
              2. Pautas y Ajustes DUA Aula
            </h2>
            <p className='mt-1 max-w-[90ch] text-[13px] leading-snug text-[var(--sa-muted)]'>
              Ajustes razonables por área curricular, principio DUA y medidas a aplicar en el proceso de enseñanza-aprendizaje para garantizar la equidad y el acceso.
            </p>
          </div>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <Chip tono='bosque' icon='stamp'>
            Formato Oficial Ciclo 2024-2025
          </Chip>
          <button
            type='button'
            className='inline-flex h-11 items-center gap-2 rounded-lg bg-[var(--sa-accent)] px-3 text-[13px] font-bold whitespace-nowrap text-[var(--sa-on-accent)] transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
          >
            <Icon name='plus' size={16} color='currentColor' />
            Agregar pauta / ajuste
          </button>
        </div>
      </header>

      <div className='flex flex-col gap-4'>
        {grupos.map((grupo) => (
          <GrupoMaterias key={grupo.id} grupo={grupo} />
        ))}
      </div>
    </section>
  )
}
