import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { accionesPorEstatus, etiquetasAcciones } from '../constants/padronContent'
import type { AccionEstudiante, DestinoModulo, Estudiante } from '../types'

const estilosBoton = {
  neutral:
    'border border-[var(--sa-border)] bg-[var(--sa-card)] text-[var(--sa-muted)] hover:bg-[var(--sa-field)]',
  forest: 'bg-[var(--color-forest)] text-[var(--sa-on-accent)] hover:brightness-95',
  coffee: 'bg-[var(--sa-coffee)] text-[var(--sa-on-accent)] hover:brightness-95',
  slate: 'bg-[var(--sa-slate)] text-[var(--sa-on-accent)] hover:brightness-95',
} as const

interface AccionesEstudianteProps {
  estudiante: Estudiante
  transferido: boolean
  onNavegar: (destino: DestinoModulo, estudiante: Estudiante) => void
  onTransferir: (estudiante: Estudiante) => void
}

export function AccionesEstudiante({
  estudiante,
  transferido,
  onNavegar,
  onTransferir,
}: AccionesEstudianteProps) {
  return (
    <div className='flex w-full flex-wrap items-center justify-end gap-2'>
      {accionesPorEstatus[estudiante.estatusExpediente].map((accion: AccionEstudiante) => {
        const esTransferencia = accion.tipo === 'transferir'
        const deshabilitado = esTransferencia && transferido
        const etiqueta = deshabilitado ? etiquetasAcciones.transferido : accion.etiqueta

        return (
          <button
            key={accion.id}
            type='button'
            disabled={deshabilitado}
            aria-label={
              accion.destino === 'expediente'
                ? etiquetasAcciones.abrirExpediente
                : accion.etiqueta
            }
            onClick={() => {
              if (esTransferencia && accion.destino !== 'transferencias') {
                onTransferir(estudiante)
                return
              }
              if (accion.destino) {
                onNavegar(accion.destino, estudiante)
                return
              }
              if (esTransferencia) {
                onTransferir(estudiante)
              }
            }}
            className={cn(
              'inline-flex min-h-[44px] items-center gap-2 rounded-xl px-3.5 text-[13px] font-bold',
              deshabilitado
                ? 'cursor-not-allowed border border-[var(--sa-border)] bg-[var(--sa-field)] text-[var(--sa-muted)] opacity-80'
                : estilosBoton[accion.tono]
            )}
          >
            <Icon
              name={deshabilitado ? 'circle-check' : accion.icon}
              size={16}
              color='currentColor'
              className='shrink-0'
            />
            <span className='whitespace-nowrap'>{etiqueta}</span>
          </button>
        )
      })}
    </div>
  )
}
