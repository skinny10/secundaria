import { Icon } from '../../../utils/atoms/Icon'
import { FilaDistribucion } from '../molecules/FilaDistribucion'
import type { CondicionDistribucion } from '../types'

interface DistribucionCondicionesProps {
  condiciones: CondicionDistribucion[]
  total: number
}

export function DistribucionCondiciones({ condiciones, total }: DistribucionCondicionesProps) {
  return (
    <section className='flex h-full min-w-0 flex-col rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-4 shadow-[var(--shadow-sm)] sm:p-5'>
      <div className='flex flex-col gap-1'>
        <h2
          className='text-[20px] leading-tight font-extrabold'
          style={{ color: 'var(--sa-title)' }}
        >
          Distribución por Condición de Aprendizaje
        </h2>
        <p className='text-[12.5px] text-[var(--sa-muted)]'>
          {total} casos activos en seguimiento psicopedagógico durante el ciclo 2024-2025.
        </p>
      </div>

      <div className='mt-4 flex flex-col gap-3'>
        {condiciones.map((condicion) => (
          <FilaDistribucion key={condicion.id} condicion={condicion} total={total} />
        ))}
      </div>

      <div className='mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl bg-[var(--sa-field)] px-3 py-1.5 pt-2'>
        <p className='flex min-w-0 items-center gap-2 text-[12px] font-semibold'>
          <Icon
            name='users'
            size={15}
            color='var(--sa-muted)'
            className='shrink-0'
          />
          <span>Todos los planes cuentan con revisión trimestral</span>
        </p>
        <button
          type='button'
          onClick={() => window.print()}
          className='ml-auto inline-flex min-h-[44px] items-center gap-1.5 text-[12px] font-bold text-[var(--color-forest)] underline underline-offset-2 hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
        >
          <Icon name='download' size={14} color='currentColor' className='shrink-0' />
          Descargar Gráfico Epidemiológico SEE (.PDF)
        </button>
      </div>
    </section>
  )
}
