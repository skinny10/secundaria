import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import type { ProtocoloCrisis } from '../types'

interface TarjetaPaseSensorialProps {
  protocolo: ProtocoloCrisis
}

export function TarjetaPaseSensorial({ protocolo }: TarjetaPaseSensorialProps) {
  return (
    <article className='flex flex-col gap-3 rounded-2xl border border-[var(--sa-menta)] bg-[var(--sa-menta-soft)] p-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <Chip tono='bosque' icon='lock'>
          {protocolo.instrumento}
        </Chip>
        <span className='inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[var(--sa-on-menta-soft)]'>
          <Icon name='clock' size={15} color='currentColor' className='shrink-0' />
          {protocolo.duracion}
        </span>
      </div>

      <h3 className='text-[16px] leading-snug font-bold'>{protocolo.titulo}</h3>

      <p className='text-[13px] leading-relaxed text-[var(--sa-on-menta-soft)]'>
        {protocolo.parrafo.map((parte, indice) => (
          <span key={`${protocolo.id}-${indice}`} className={parte.bold ? 'font-bold' : undefined}>
            {parte.texto}
          </span>
        ))}
      </p>

      <div className='mt-auto flex items-start gap-2.5 rounded-[14px] bg-[var(--sa-card)] p-3'>
        <Icon name='armchair' size={17} color='var(--color-forest)' className='mt-0.5 shrink-0' />
        <p className='text-[12.5px] leading-relaxed text-[var(--sa-muted)]'>
          {protocolo.espacio?.map((parte) => parte.texto)}
        </p>
      </div>
    </article>
  )
}
