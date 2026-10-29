import type { PlantelConfig, RecesoConfig, TurnoConfig } from '../types'
import { Icon } from '../../../utils/atoms/Icon'
import { aMinutos } from '../utils/validacion'
import { CampoConfig } from './CampoConfig'
import { TarjetaConfig } from './TarjetaConfig'
import { ToggleConfig } from './ToggleConfig'

interface TarjetaJornadasProps {
  config: PlantelConfig
  errores: Record<string, string>
  onCambio: (config: PlantelConfig) => void
}

export function TarjetaJornadas({ config, errores, onCambio }: TarjetaJornadasProps) {
  const setTurno = (indice: number, patch: Partial<TurnoConfig>) => {
    onCambio({
      ...config,
      turnos: config.turnos.map((turno, i) => (i === indice ? { ...turno, ...patch } : turno)),
    })
  }

  const setReceso = (indiceTurno: number, indiceReceso: number, patch: Partial<RecesoConfig>) => {
    const turno = config.turnos[indiceTurno]
    setTurno(indiceTurno, {
      recesos: turno.recesos.map((receso, i) =>
        i === indiceReceso ? { ...receso, ...patch } : receso
      ),
    })
  }

  return (
    <TarjetaConfig
      titulo='Jornadas y Turnos Escolares'
      descripcion='Define la entrada, salida, módulos y recesos. Los horarios activos no pueden empalmarse.'
      icono='clock'
    >
      <div className='flex flex-col gap-6'>
        {config.turnos.map((turno, indice) => {
          const base = `turnos.${indice}`
          const disponible = (aMinutos(turno.fin) ?? 0) - (aMinutos(turno.inicio) ?? 0)
          const ocupado =
            turno.modulos * turno.moduloMin +
            turno.recesos.reduce((total, receso) => total + receso.duracionMin, 0)
          const excedido = disponible > 0 && ocupado > disponible
          const bloqueado = turno.activo && turno.asignaciones > 0

          return (
            <div
              key={turno.id}
              className='flex flex-col gap-4 rounded-xl border border-[var(--sa-border)] p-4 sm:p-5'
            >
              <div className='flex flex-wrap items-start justify-between gap-4'>
                <div className='flex min-w-0 items-center gap-3'>
                  <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--sa-field)] text-[var(--color-forest)]'>
                    <Icon name='sun' size={21} aria-hidden='true' />
                  </span>
                  <div className='min-w-0'>
                    <p className='text-[20px] font-extrabold text-[var(--sa-text)]'>{turno.nombre}</p>
                    <p className='text-[15px] text-[var(--sa-muted)]'>
                      {turno.inicio} a {turno.fin} · {turno.modulos} módulos de {turno.moduloMin} min
                    </p>
                  </div>
                </div>
                <div className='min-w-[230px] max-w-[320px]'>
                  <ToggleConfig
                    id={`${base}.activo`}
                    etiqueta='Jornada activa'
                    activo={turno.activo}
                    onChange={(activo) => setTurno(indice, { activo })}
                    descripcion='Disponible para inscripción y pases.'
                    bloqueado={bloqueado}
                    motivoBloqueo={`No se puede desactivar: ${turno.asignaciones} grupos asignados.`}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <CampoConfig
                  id={`${base}.inicio`}
                  etiqueta='Hora de entrada'
                  valor={turno.inicio}
                  onChange={(inicio) => setTurno(indice, { inicio })}
                  error={errores[`${base}.inicio`]}
                  tipo='time'
                  icono='clock'
                />
                <CampoConfig
                  id={`${base}.fin`}
                  etiqueta='Hora de salida'
                  valor={turno.fin}
                  onChange={(fin) => setTurno(indice, { fin })}
                  error={errores[`${base}.fin`]}
                  tipo='time'
                  icono='clock'
                />
                <CampoConfig
                  id={`${base}.moduloMin`}
                  etiqueta='Duración del módulo'
                  valor={turno.moduloMin}
                  onChange={(valor) =>
                    setTurno(indice, { moduloMin: valor === '' ? 0 : Number(valor) })
                  }
                  error={errores[`${base}.moduloMin`]}
                  tipo='number'
                  min={30}
                  max={90}
                  sufijo='min'
                />
                <CampoConfig
                  id={`${base}.modulos`}
                  etiqueta='Módulos por jornada'
                  valor={turno.modulos}
                  onChange={(valor) =>
                    setTurno(indice, { modulos: valor === '' ? 0 : Number(valor) })
                  }
                  error={errores[`${base}.modulos`]}
                  tipo='number'
                  min={1}
                  max={12}
                />
              </div>

              <div className='flex flex-col gap-3'>
                <p className='text-[16px] font-bold text-[var(--sa-text)]'>Recesos</p>
                {turno.recesos.map((receso, indiceReceso) => (
                  <div
                    key={receso.id}
                    className='grid grid-cols-1 gap-3 rounded-lg bg-[var(--sa-field)] p-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]'
                  >
                    <CampoConfig
                      id={`${base}.recesos.${indiceReceso}.nombre`}
                      etiqueta='Nombre'
                      valor={receso.nombre}
                      onChange={(nombre) => setReceso(indice, indiceReceso, { nombre })}
                      error={errores[`${base}.recesos.${indiceReceso}.nombre`]}
                    />
                    <CampoConfig
                      id={`${base}.recesos.${indiceReceso}.inicio`}
                      etiqueta='Inicio'
                      valor={receso.inicio}
                      onChange={(inicio) => setReceso(indice, indiceReceso, { inicio })}
                      error={errores[`${base}.recesos.${indiceReceso}.inicio`]}
                      tipo='time'
                    />
                    <CampoConfig
                      id={`${base}.recesos.${indiceReceso}.duracionMin`}
                      etiqueta='Duración'
                      valor={receso.duracionMin}
                      onChange={(valor) =>
                        setReceso(indice, indiceReceso, {
                          duracionMin: valor === '' ? 0 : Number(valor),
                        })
                      }
                      error={errores[`${base}.recesos.${indiceReceso}.duracionMin`]}
                      tipo='number'
                      min={5}
                      max={45}
                      sufijo='min'
                    />
                  </div>
                ))}
              </div>

              <p
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[15px] font-semibold ${
                  excedido
                    ? 'bg-[var(--semaforo-rojo-bg)] text-[var(--semaforo-rojo-fg)]'
                    : 'bg-[var(--sa-menta-soft)] text-[var(--sa-on-menta-soft)]'
                }`}
              >
                <Icon name={excedido ? 'alert-triangle' : 'circle-check'} size={17} className='shrink-0' />
                Carga académica: {ocupado} de {Math.max(disponible, 0)} min disponibles
                {excedido ? ' · excede la jornada' : ''}.
              </p>
            </div>
          )
        })}
      </div>
    </TarjetaConfig>
  )
}
