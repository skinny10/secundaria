import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import type { ObjetoRegulador } from '../constants/protocoloCrisisDetalle'

interface TarjetaObjetoProps {
  objeto: ObjetoRegulador
}

export function TarjetaObjeto({ objeto }: TarjetaObjetoProps) {
  return (
    <article className='flex min-w-0 flex-col overflow-hidden rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)]'>
      <img
        src={objeto.imagen}
        alt={`Ilustración de ${objeto.nombre}`}
        loading='lazy'
        width={400}
        height={300}
        className='aspect-[4/3] w-full object-cover'
      />
      <div className='flex flex-1 flex-col gap-2 p-4'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <h3 className='min-w-0 text-[15px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
            {objeto.nombre}
          </h3>
          <Chip tono={objeto.tono}>{objeto.chip}</Chip>
        </div>
        <p className='text-[13px] leading-relaxed text-[var(--sa-muted)]'>{objeto.descripcion}</p>
        <p className='mt-auto flex items-center gap-1.5 pt-1 text-[12px] leading-snug font-bold text-[var(--sa-success-fg)]'>
          <Icon name='circle-check' size={14} color='currentColor' className='shrink-0' />
          <span className='min-w-0'>{objeto.uso}</span>
        </p>
      </div>
    </article>
  )
}
