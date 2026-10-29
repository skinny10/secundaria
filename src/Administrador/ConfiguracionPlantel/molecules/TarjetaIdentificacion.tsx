import type { IdentidadConfig, PlantelConfig } from '../types'
import { Icon } from '../../../utils/atoms/Icon'
import { CampoConfig } from './CampoConfig'
import { TarjetaConfig } from './TarjetaConfig'

interface TarjetaIdentificacionProps {
  config: PlantelConfig
  errores: Record<string, string>
  onCambio: (config: PlantelConfig) => void
  onValidarCCT: (cct: string) => void
  validandoCCT: boolean
}

const ESTADOS_CCT = {
  validada: {
    texto: 'CCT validada',
    icono: 'circle-check' as const,
    clase: 'bg-[var(--semaforo-verde-bg)] text-[var(--semaforo-verde-fg)]',
  },
  pendiente: {
    texto: 'Verificando CCT',
    icono: 'clock' as const,
    clase: 'bg-[var(--semaforo-amarillo-bg)] text-[var(--semaforo-amarillo-fg)]',
  },
  invalida: {
    texto: 'CCT no válida',
    icono: 'circle-x' as const,
    clase: 'bg-[var(--semaforo-rojo-bg)] text-[var(--semaforo-rojo-fg)]',
  },
}

export function TarjetaIdentificacion({
  config,
  errores,
  onCambio,
  onValidarCCT,
  validandoCCT,
}: TarjetaIdentificacionProps) {
  const identidad = config.identidad
  const estado = ESTADOS_CCT[identidad.cctValidacion]
  const avisoEntidad =
    identidad.entidad.trim() &&
    identidad.domicilio.trim() &&
    !identidad.domicilio.toLowerCase().includes(identidad.entidad.toLowerCase())

  const set = (patch: Partial<IdentidadConfig>) => {
    onCambio({ ...config, identidad: { ...identidad, ...patch } })
  }

  return (
    <TarjetaConfig
      titulo='Identificación Oficial'
      descripcion='Datos legales que aparecen en actas, certificados y reportes oficiales ante la SEP.'
      icono='stamp'
      acciones={
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-bold ${estado.clase}`}
          title='Validación contra el catálogo oficial de centros de trabajo'
        >
          <Icon name={estado.icono} size={15} aria-hidden='true' />
          {estado.texto}
        </span>
      }
    >
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <CampoConfig
          id='identidad.nombre'
          etiqueta='Nombre oficial del plantel'
          valor={identidad.nombre}
          onChange={(nombre) => set({ nombre })}
          error={errores['identidad.nombre']}
          icono='hat'
          className='md:col-span-2'
        />
        <div className='flex flex-col gap-1.5'>
          <CampoConfig
            id='identidad.cct'
            etiqueta='Clave de Centro de Trabajo (CCT)'
            valor={identidad.cct}
            onChange={(cct) => set({ cct: cct.toUpperCase(), cctValidacion: 'pendiente' })}
            onBlur={(cct) => onValidarCCT(cct)}
            error={errores['identidad.cct']}
            icono='id-card'
            placeholder='02EES0045Z'
            autoComplete='off'
            ayuda={
              validandoCCT
                ? 'Consultando el catálogo SEP/SEE…'
                : identidad.cctValidacion === 'pendiente'
                  ? 'La CCT cambió. Se verificará automáticamente al salir del campo.'
                  : estado.texto
            }
          />
          {avisoEntidad ? (
            <p className='flex items-start gap-1.5 rounded-lg bg-[var(--semaforo-amarillo-bg)] px-3 py-2 text-[14px] font-semibold text-[var(--semaforo-amarillo-fg)]'>
              <Icon name='info' size={15} className='mt-0.5 shrink-0' />
              El domicilio no menciona la entidad seleccionada. Es un aviso, no bloquea el guardado.
            </p>
          ) : null}
        </div>
        <CampoConfig
          id='identidad.entidad'
          etiqueta='Entidad federativa'
          valor={identidad.entidad}
          onChange={(entidad) => set({ entidad })}
          error={errores['identidad.entidad']}
          icono='map-pin'
        />
        <CampoConfig
          id='identidad.municipio'
          etiqueta='Municipio'
          valor={identidad.municipio}
          onChange={(municipio) => set({ municipio })}
          error={errores['identidad.municipio']}
          icono='map-pin'
        />
        <CampoConfig
          id='identidad.domicilio'
          etiqueta='Domicilio oficial'
          valor={identidad.domicilio}
          onChange={(domicilio) => set({ domicilio })}
          error={errores['identidad.domicilio']}
          icono='map-pin'
          className='md:col-span-2'
        />
        <CampoConfig
          id='identidad.telefono'
          etiqueta='Teléfono del plantel'
          valor={identidad.telefono}
          onChange={(telefono) => set({ telefono: telefono.replace(/[^\d\s-]/g, '') })}
          error={errores['identidad.telefono']}
          icono='phone'
          tipo='tel'
          ayuda='10 dígitos, con o sin separadores.'
        />
        <CampoConfig
          id='identidad.correo'
          etiqueta='Correo institucional'
          valor={identidad.correo}
          onChange={(correo) => set({ correo })}
          error={errores['identidad.correo']}
          icono='mail'
          tipo='email'
          autoComplete='email'
        />
      </div>
    </TarjetaConfig>
  )
}
