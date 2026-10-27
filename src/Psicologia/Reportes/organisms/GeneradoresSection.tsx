import { Icon } from '../../../utils/atoms/Icon'
import { GeneradorCard } from '../molecules/GeneradorCard'
import type { GeneradorFormato, TipoDocumento } from '../types'

interface GeneradoresSectionProps {
  generadores: GeneradorFormato[]
  autorizado: boolean
  onGenerar: (tipo: TipoDocumento) => void
  onPreview: (generador: GeneradorFormato) => void
  onConfirmar: (texto: string) => void
  onImprimir: () => void
}

export function GeneradoresSection({
  generadores,
  autorizado,
  onGenerar,
  onPreview,
  onConfirmar,
  onImprimir,
}: GeneradoresSectionProps) {
  return (
    <section className='flex min-w-0 flex-col gap-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex min-w-0 items-center gap-2'>
          <Icon name='file-text' size={18} color='var(--color-forest)' className='shrink-0' />
          <h2 className='text-[15px] font-extrabold'>Generadores de Formatos Normativos</h2>
        </div>
        <span className='text-[12px] font-semibold text-[var(--sa-steel)]'>
          {generadores.length} Módulos Oficiales Disponibles
        </span>
      </div>

      {generadores.length > 0 ? (
        <div className='grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2'>
          {generadores.map((generador) => (
            <GeneradorCard
              key={generador.id}
              generador={generador}
              autorizado={autorizado}
              onGenerar={onGenerar}
              onPreview={onPreview}
              onConfirmar={onConfirmar}
              onImprimir={onImprimir}
            />
          ))}
        </div>
      ) : (
        <p className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 text-[13px] text-[var(--sa-muted)]'>
          No hay generadores que coincidan con los filtros seleccionados.
        </p>
      )}
    </section>
  )
}
