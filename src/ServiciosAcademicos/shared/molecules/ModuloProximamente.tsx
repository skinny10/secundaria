import { Icon } from '../../../utils/atoms/Icon'
import { roles } from '../../../Portal/shared/constants/roles'
import type { SidebarKey } from '../../../Portal/shared/types'
import { estudiantes, nombreCompleto } from '../../PadronGeneral/constants/padronData'
import { ServiciosAcademicosTemplate } from '../templates/ServiciosAcademicosTemplate'
import { modulosProximamente, textosModulo } from '../constants/modulos'
import { rutaServicios } from '../constants/rutas'
import type { ModuloServicios } from '../constants/rutas'

interface ModuloProximamenteProps {
  modulo: ModuloServicios
}

function leerAlumnoSeleccionado(): string | null {
  const query = window.location.hash.split('?')[1] ?? ''
  const id = new URLSearchParams(query).get('alumno')
  if (!id) return null
  const estudiante = estudiantes.find((registro) => registro.id === id)
  return estudiante ? nombreCompleto(estudiante) : null
}

export function ModuloProximamente({ modulo }: ModuloProximamenteProps) {
  const config = modulosProximamente[modulo]
  const alumno = leerAlumnoSeleccionado()

  const navegar = (key: SidebarKey) => {
    const item = roles.servicios_academicos.navItems.find((moduloNav) => moduloNav.key === key)
    window.location.hash = item?.hash ?? rutaServicios('padron')
  }

  return (
    <ServiciosAcademicosTemplate
      vista={config.vista}
      activeKey={config.activeKey}
      onNavigate={navegar}
    >
      <section
        aria-label={textosModulo.aria}
        className='flex min-h-[420px] w-full min-w-0 items-center justify-center rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)]'
      >
        <div className='flex max-w-[620px] min-w-0 flex-col items-center gap-4 text-center'>
          <span className='flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--sa-menta-soft)] text-[var(--sa-on-menta-soft)]'>
            <Icon name={config.icon} size={30} color='currentColor' />
          </span>
          <span className='inline-flex items-center gap-1.5 rounded-full bg-[var(--sa-sky)] px-3 py-1 text-[10.5px] font-bold tracking-widest text-[var(--sa-steel)] uppercase'>
            <Icon name='clock' size={13} color='currentColor' />
            {textosModulo.chip}
          </span>
          <div className='flex min-w-0 flex-col gap-2'>
            <p className='text-[11px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
              {textosModulo.encabezado}
            </p>
            <h1 className='text-[clamp(24px,3vw,30px)] leading-tight font-extrabold text-[var(--sa-title)]'>
              {config.titulo}
            </h1>
            <p className='text-[14px] leading-relaxed text-[var(--sa-muted)]'>
              {config.descripcion}
            </p>
            {alumno ? (
              <p className='mt-1 rounded-xl bg-[var(--sa-field)] px-4 py-3 text-[13px] font-semibold'>
                <span className='text-[var(--sa-muted)]'>{config.detalleAlumno}: </span>
                {alumno}
              </p>
            ) : null}
            <p className='mt-1 flex items-start gap-2 rounded-xl bg-[var(--sa-confidencial)] px-4 py-3 text-left text-[12px] leading-relaxed text-[var(--sa-muted)]'>
              <Icon name='shield' size={16} color='currentColor' className='mt-0.5 shrink-0' />
              {textosModulo.aviso}
            </p>
          </div>
          <button
            type='button'
            onClick={() => {
              window.location.hash = rutaServicios('padron')
            }}
            className='inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[var(--color-forest)] px-4 text-[13px] font-bold text-[var(--sa-on-accent)] hover:brightness-95'
          >
            <Icon name='arrow-left' size={16} color='currentColor' />
            {textosModulo.volver}
          </button>
        </div>
      </section>
    </ServiciosAcademicosTemplate>
  )
}
