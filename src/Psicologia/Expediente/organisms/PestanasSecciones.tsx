import { PestanaSeccion } from '../molecules/PestanaSeccion'
import type { PestanaSeccion as PestanaSeccionDatos, SeccionId } from '../types'

interface PestanasSeccionesProps {
  pestanas: PestanaSeccionDatos[]
  activa: SeccionId
  onSeleccionar: (id: SeccionId) => void
}

export function PestanasSecciones({ pestanas, activa, onSeleccionar }: PestanasSeccionesProps) {
  return (
    <div
      role='tablist'
      aria-label='Secciones del expediente psicopedagógico'
      className='sa-no-print sticky top-9 z-20 -mx-1 flex gap-1.5 overflow-x-auto rounded-[14px] bg-[var(--sa-field)] p-1.5 lg:grid lg:grid-cols-4 lg:overflow-visible'
    >
      {pestanas.map((pestana) => (
        <PestanaSeccion
          key={pestana.id}
          pestana={pestana}
          activa={pestana.id === activa}
          onSeleccionar={onSeleccionar}
        />
      ))}
    </div>
  )
}
