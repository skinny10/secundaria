import type { EspacioConfig, PlantelConfig } from '../types'
import { Icon } from '../../../utils/atoms/Icon'
import { CampoConfig } from './CampoConfig'
import { TarjetaConfig } from './TarjetaConfig'
import { ToggleConfig } from './ToggleConfig'

interface TarjetaEspaciosProps {
  config: PlantelConfig
  errores: Record<string, string>
  onCambio: (config: PlantelConfig) => void
}

export function TarjetaEspacios({ config, errores, onCambio }: TarjetaEspaciosProps) {
  const setEspacio = (indice: number, patch: Partial<EspacioConfig>) => {
    onCambio({
      ...config,
      espacios: config.espacios.map((espacio, i) =>
        i === indice ? { ...espacio, ...patch } : espacio
      ),
    })
  }

  return (
    <TarjetaConfig
      titulo='Espacios Reguladores'
      descripcion='Áreas de calma, movimiento y acompañamiento disponibles para pases sensoriales.'
      icono='armchair'
      etiqueta='Inclusión'
    >
      <div className='flex flex-col gap-3'>
        {config.espacios.map((espacio, indice) => {
          const base = `espacios.${indice}`
          const bloqueado = espacio.activo && espacio.pasesActivos > 0

          return (
            <div
              key={espacio.id}
              className='flex flex-col gap-3 rounded-xl border border-[var(--sa-border)] p-4'
            >
              <div className='flex flex-wrap items-start justify-between gap-3'>
                <div className='min-w-0'>
                  <p className='text-[19px] font-extrabold text-[var(--sa-text)]'>{espacio.nombre}</p>
                  <p className='text-[15px] text-[var(--sa-muted)]'>{espacio.tipo}</p>
                </div>
                <div className='min-w-[210px] max-w-[280px]'>
                  <ToggleConfig
                    id={`${base}.activo`}
                    etiqueta='Espacio habilitado'
                    activo={espacio.activo}
                    onChange={(activo) => setEspacio(indice, { activo })}
                    bloqueado={bloqueado}
                    motivoBloqueo={`No se puede desactivar: ${espacio.pasesActivos} pases activos.`}
                  />
                </div>
              </div>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'>
                <CampoConfig
                  id={`${base}.nombre`}
                  etiqueta='Nombre del espacio'
                  valor={espacio.nombre}
                  onChange={(nombre) => setEspacio(indice, { nombre })}
                  error={errores[`${base}.nombre`]}
                  icono='map-pin'
                />
                <CampoConfig
                  id={`${base}.capacidad`}
                  etiqueta='Capacidad'
                  valor={espacio.capacidad}
                  onChange={(valor) =>
                    setEspacio(indice, { capacidad: valor === '' ? 0 : Number(valor) })
                  }
                  error={errores[`${base}.capacidad`]}
                  tipo='number'
                  min={1}
                  max={40}
                  sufijo='personas'
                />
              </div>
              <p className='flex items-center gap-1.5 text-[14px] text-[var(--sa-muted)]'>
                <Icon name='qr-code' size={15} className='shrink-0' />
                {espacio.pasesActivos} pases sensoriales activos · tipo {espacio.tipo}
              </p>
            </div>
          )
        })}
      </div>
    </TarjetaConfig>
  )
}
