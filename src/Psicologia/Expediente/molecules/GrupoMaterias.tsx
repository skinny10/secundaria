import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import { AjusteMateriaCard } from './AjusteMateriaCard'
import type { GrupoMaterias as GrupoMateriasDatos } from '../types'

interface GrupoMateriasProps {
  grupo: GrupoMateriasDatos
}

export function GrupoMaterias({ grupo }: GrupoMateriasProps) {
  return (
    <div className='flex flex-col gap-4 rounded-[14px] border border-[var(--sa-border)] bg-[var(--sa-field)] p-4'>
      <div className='flex flex-wrap items-start justify-between gap-2'>
        <div className='flex min-w-0 items-center gap-2.5'>
          <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-card)] text-[var(--color-forest)]'>
            <Icon name={grupo.icono} size={18} color='currentColor' />
          </span>
          <h3 className='text-[16px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
            {grupo.titulo}
          </h3>
        </div>
        <Chip tono='gris' className='max-w-full whitespace-normal text-left'>
          {grupo.principio}
        </Chip>
      </div>
      <div className='grid gap-3 md:grid-cols-2'>
        {grupo.ajustes.map((ajuste) => (
          <AjusteMateriaCard key={ajuste.titulo} ajuste={ajuste} />
        ))}
      </div>
    </div>
  )
}
