import { Chip } from '../../../Portal/shared/atoms/Chip'
import type { ResumenEstrategia } from '../types'
import type { TonoChip } from '../../../Portal/shared/types'

interface TarjetasResumenProps {
  resumenes: ResumenEstrategia[]
  total: number
}

const tonos: Record<ResumenEstrategia['chipTono'], TonoChip> = {
  menta: 'menta',
  durazno: 'cafe',
  azul: 'azul',
}

export function TarjetasResumen({ resumenes, total }: TarjetasResumenProps) {
  return (
    <section className='grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
      {resumenes.map((item) => {
        const pct = total > 0 ? Math.max(4, Math.round((item.total / total) * 100)) : 0
        return (
          <article
            key={item.id}
            className='flex h-full min-w-0 flex-col rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-[var(--shadow-sm)]'
          >
            <div className='flex min-w-0 flex-col gap-2 p-5'>
              <div className='flex items-start justify-between gap-3'>
                <h3 className='text-[16px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
                  {item.titulo}
                </h3>
                <Chip tono={tonos[item.chipTono]}>{item.chipLabel}</Chip>
              </div>
              <p className='text-[12.5px] leading-relaxed text-[var(--sa-muted)]'>{item.descripcion}</p>
            </div>
            <div className='mt-auto h-2 w-full rounded-b-2xl bg-[var(--sa-field)]'>
              <div
                className='h-full rounded-bl-2xl rounded-br-2xl'
                style={{ width: `${pct}%`, backgroundColor: item.barraColor }}
              />
            </div>
          </article>
        )
      })}
    </section>
  )
}
