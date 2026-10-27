import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import type { MetaPEI } from '../types'

interface TarjetaMetasPEIProps {
  metas: MetaPEI[]
}

export function TarjetaMetasPEI({ metas }: TarjetaMetasPEIProps) {
  return (
    <section className='sa-no-print flex flex-col gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-[18px] shadow-[var(--shadow-sm)]'>
      <h2 className='flex items-center gap-2 text-[15px] leading-tight font-bold'>
        <Icon name='flag' size={17} color='var(--color-forest)' className='shrink-0' />
        Metas Trimestrales PEI
      </h2>

      <ul className='flex flex-col gap-2.5'>
        {metas.map((meta) => (
          <li key={meta.id} className='rounded-[14px] bg-[var(--sa-field)] p-3'>
            <div className='flex flex-wrap items-start justify-between gap-2'>
              <p className='min-w-0 text-[13px] leading-tight font-bold'>{meta.titulo}</p>
              <Chip tono={meta.tono}>{meta.estado}</Chip>
            </div>
            <p className='mt-1.5 text-[12.5px] leading-relaxed text-[var(--sa-muted)]'>
              {meta.descripcion}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
