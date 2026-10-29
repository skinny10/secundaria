import { AdministradorTemplate } from '../../shared/templates/AdministradorTemplate'
import { DatosPersonalesForm } from '../molecules/DatosPersonalesForm'
import { CredencialesSeguridadForm } from '../molecules/CredencialesSeguridadForm'
import { RolAsignacion } from '../molecules/RolAsignacion'
import { PlantelGradosForm } from '../molecules/PlantelGradosForm'
import { Icon } from '../../../utils/atoms/Icon'
import { useAdminNavigation } from '../../shared/hooks/useAdminNavigation'
import { useState } from 'react'

export function AltaColaboradorPage() {
  const [rolSeleccionado, setRolSeleccionado] = useState<any>('')
  const navegar = useAdminNavigation()
  const volver = () => { window.location.hash = '#administrador/directorio' }

  return (
    <AdministradorTemplate vista='ALTA DE COLABORADOR' activeKey='directorio' onNavigate={navegar} busqueda='' onBuscar={() => {}}>
      <div className='mx-auto flex w-full max-w-[1900px] flex-col gap-12 px-6 py-12 text-[22px] leading-relaxed sm:px-10 lg:px-14'>
        <div className='flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-10 py-8 shadow-sm'>
          <div>
            <h1 className='text-[56px] font-extrabold text-[var(--sa-text)] sm:text-[66px]'>Registro y Alta Integral de Colaborador Institucional</h1>
            <p className='max-w-[1500px] text-[26px] text-[var(--sa-muted)]'>Cree el perfil institucional, genere credenciales seguras de acceso y configure la gobernanza de permisos clínicos y pedagógicos con estricta observancia a las leyes LGDNNA y FERPA</p>
          </div>
          <div className='flex flex-wrap items-center gap-5'>
            <span className='rounded-full bg-[color-mix(in_srgb,var(--color-forest)_20%,transparent)] px-6 py-2 text-[18px] font-bold text-[var(--color-forest)]'>REGISTRO ACTIVO DE SISTEMA</span>
            <button type='button' onClick={volver} className='inline-flex min-h-[64px] items-center gap-3 rounded-xl border border-[var(--sa-border)] px-7 text-[22px] font-semibold hover:bg-[var(--sa-field)]'>
              <Icon name='arrow-left' size={26} />
              Volver al Directorio
            </button>
            <button type='button' className='inline-flex min-h-[64px] items-center gap-3 rounded-xl bg-[var(--color-forest)] px-9 text-[22px] font-bold text-[var(--sa-on-accent)] hover:brightness-95'>
              <Icon name='save' size={26} />
              Crear Cuenta y Enviar Accesos
            </button>
          </div>
        </div>
        <div className='grid gap-8 lg:grid-cols-2'>
          <DatosPersonalesForm />
          <CredencialesSeguridadForm />
        </div>
        <RolAsignacion rolSeleccionado={rolSeleccionado} onSelect={setRolSeleccionado} />
        <PlantelGradosForm />
        <div className='flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-8 py-6 shadow-sm'>
          <div className='flex items-center gap-3 text-[22px] text-[var(--sa-muted)]'>
            <Icon name='shield' size={24} />
            <span>Validación de privacidad y datos personales conforme a lineamientos institucionales. No se almacena información sensible en URL ni logs.</span>
          </div>
          <div className='flex flex-wrap items-center gap-4'>
            <button type='button' onClick={volver} className='inline-flex min-h-[64px] items-center gap-3 rounded-xl border border-[var(--sa-border)] px-7 text-[22px] font-semibold hover:bg-[var(--sa-field)]'>Cancelar y Descartar</button>
            <button type='button' className='inline-flex min-h-[64px] items-center gap-3 rounded-xl border border-[var(--sa-border)] px-7 text-[22px] font-semibold hover:bg-[var(--sa-field)]'>Guardar como Borrador</button>
            <button type='button' className='inline-flex min-h-[64px] items-center gap-3 rounded-xl bg-[var(--color-forest)] px-9 text-[22px] font-bold text-[var(--sa-on-accent)] hover:brightness-95'>Crear Cuenta y Notificar al Colaborador</button>
          </div>
        </div>
      </div>
    </AdministradorTemplate>
  )
}
