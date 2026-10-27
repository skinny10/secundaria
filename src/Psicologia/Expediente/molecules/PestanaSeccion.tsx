import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { PestanaSeccion as PestanaSeccionDatos } from '../types'

interface PestanaSeccionProps {
  pestana: PestanaSeccionDatos
  activa: boolean
  onSeleccionar: (id: PestanaSeccionDatos['id']) => void
}

export function PestanaSeccion({ pestana, activa, onSeleccionar }: PestanaSeccionProps) {
  return (
    <button
      type='button'
      id={`pestana-${pestana.id}`}
      aria-controls={`seccion-${pestana.id}`}
      aria-selected={activa}
      role='tab'
      onClick={() => onSeleccionar(pestana.id)}
      className={cn(
        'flex min-h-[56px] min-w-[220px] items-center gap-2 rounded-[12px] px-3 py-2.5 text-left text-[12.5px] leading-tight font-bold lg:min-w-0',
        activa
          ? 'bg-[var(--sa-card)] text-[var(--color-forest)] shadow-[var(--shadow-sm)]'
          : 'text-[var(--sa-muted)] hover:text-[var(--color-text-primary)]'
      )}
    >
      <Icon name={pestana.icono} size={17} color='currentColor' className='shrink-0' />
      <span className='min-w-0'>{pestana.etiqueta}</span>
    </button>
  )
}
