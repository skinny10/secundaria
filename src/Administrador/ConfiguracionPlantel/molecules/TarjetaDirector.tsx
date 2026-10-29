import type { DirectorConfig, PlantelConfig } from '../types'
import { Icon } from '../../../utils/atoms/Icon'
import { CampoConfig } from './CampoConfig'
import { TarjetaConfig } from './TarjetaConfig'

interface TarjetaDirectorProps {
  config: PlantelConfig
  errores: Record<string, string>
  onCambio: (config: PlantelConfig) => void
}

export function TarjetaDirector({ config, errores, onCambio }: TarjetaDirectorProps) {
  const director = config.identidad.director

  const set = (patch: Partial<DirectorConfig>) => {
    onCambio({
      ...config,
      identidad: { ...config.identidad, director: { ...director, ...patch } },
    })
  }

  return (
    <TarjetaConfig
      titulo='Director Responsable'
      descripcion='Persona con firma electrónica autorizada para actas, constancias y trámites ante la autoridad educativa.'
      icono='user-cog'
    >
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <CampoConfig
          id='identidad.director.nombre'
          etiqueta='Nombre completo'
          valor={director.nombre}
          onChange={(nombre) => set({ nombre })}
          error={errores['identidad.director.nombre']}
          icono='person'
          className='md:col-span-2'
        />
        <CampoConfig
          id='identidad.director.correo'
          etiqueta='Correo institucional'
          valor={director.correo}
          onChange={(correo) => set({ correo })}
          error={errores['identidad.director.correo']}
          icono='mail'
          tipo='email'
        />
        <CampoConfig
          id='identidad.director.telefono'
          etiqueta='Teléfono directo'
          valor={director.telefono}
          onChange={(telefono) => set({ telefono: telefono.replace(/[^\d\s-]/g, '') })}
          error={errores['identidad.director.telefono']}
          icono='phone'
          tipo='tel'
        />
        <CampoConfig
          id='identidad.director.cedula'
          etiqueta='Cédula profesional'
          valor={director.cedula}
          onChange={(cedula) => set({ cedula: cedula.replace(/\D/g, '') })}
          error={errores['identidad.director.cedula']}
          icono='file-signature'
          sufijo='7–8 dígitos'
          className='md:col-span-2'
        />
      </div>
      <p className='flex items-start gap-2 rounded-xl bg-[var(--sa-menta-soft)] px-4 py-3 text-[15px] font-semibold text-[var(--sa-on-menta-soft)]'>
        <Icon name='shield-check' size={18} className='mt-0.5 shrink-0' />
        Cambiar al director responsable es una operación sensible: exige motivo, reautenticación 2FA y
        queda registrada en la bitácora inmutable.
      </p>
    </TarjetaConfig>
  )
}
