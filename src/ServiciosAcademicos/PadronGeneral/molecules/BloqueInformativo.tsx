import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import { configuracionBloque } from '../constants/padronContent'
import type { BloqueInformativoData } from '../types'

const contenedores = {
  menta: 'bg-[var(--sa-menta-soft)] text-[var(--sa-on-menta-soft)]',
  rosa: 'bg-[var(--sa-rosa)] text-[var(--sa-on-rosa)]',
  azul: 'bg-[var(--sa-sky)] text-[var(--sa-steel)]',
} as const

interface BloqueInformativoProps {
  bloque: BloqueInformativoData
}

export function BloqueInformativo({ bloque }: BloqueInformativoProps) {
  const config = configuracionBloque[bloque.tipo]

  return (
    <div
      className={cn(
        'flex w-full min-w-0 flex-col gap-2 rounded-xl px-4 py-3.5 md:flex-row md:items-start md:justify-between',
        contenedores[config.tono]
      )}
    >
      <div className='flex min-w-0 items-start gap-2.5'>
        <Icon name={config.icon} size={18} color='currentColor' className='mt-0.5 shrink-0' />
        <div className='min-w-0'>
          <h4 className='text-[10.5px] leading-snug font-bold tracking-widest uppercase'>
            {bloque.titulo}
          </h4>
          <p className='mt-1 text-[13.5px] leading-relaxed'>{bloque.texto}</p>
        </div>
      </div>
      <Chip
        tono={config.chipTono}
        icon={config.chipIcon}
        className='w-fit shrink-0 self-start whitespace-nowrap md:ml-3'
      >
        {bloque.chip}
      </Chip>
    </div>
  )
}
