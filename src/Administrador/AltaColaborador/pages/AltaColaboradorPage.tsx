import { AdministradorTemplate } from '../../shared/templates/AdministradorTemplate'
import { DatosPersonalesForm, type DatosPersonales } from '../molecules/DatosPersonalesForm'
import { CredencialesSeguridadForm, generarPassword } from '../molecules/CredencialesSeguridadForm'
import { RolAsignacion } from '../molecules/RolAsignacion'
import { PlantelGradosForm } from '../molecules/PlantelGradosForm'
import { Icon } from '../../../utils/atoms/Icon'
import { useAdminNavigation } from '../../shared/hooks/useAdminNavigation'
import { useState } from 'react'
import { usersApi, type ApiRole } from '../../../utils/services/sigeanApi'
import { mapAuthError } from '../../../Login/services/authService'
import type { RolColaborador } from '../constants/roles'

const rolesApi: Record<Exclude<RolColaborador, ''>, ApiRole> = {
  maestro: 'TEACHER',
  prefecto: 'PREFECT',
  psicologo: 'PSYCHOLOGIST',
  servicios: 'ACADEMIC_SERVICES',
}

const datosIniciales: DatosPersonales = { nombres: '', primerApellido: '', segundoApellido: '' }

export function AltaColaboradorPage() {
  const [rolSeleccionado, setRolSeleccionado] = useState<RolColaborador>('')
  const [datos, setDatos] = useState<DatosPersonales>(datosIniciales)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(generarPassword)
  const [teacherId, setTeacherId] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [exito, setExito] = useState<string | null>(null)
  const navegar = useAdminNavigation()
  const volver = () => { window.location.hash = '#administrador/directorio' }

  const crearCuenta = async () => {
    setError(null)
    setExito(null)
    const correo = email.trim().toLowerCase()
    const fullName = [datos.nombres, datos.primerApellido, datos.segundoApellido].map((v) => v.trim()).filter(Boolean).join(' ')
    if (!datos.nombres.trim() || !datos.primerApellido.trim()) return setError('Capture el nombre y el primer apellido.')
    if (!/^[^\s@]+@[^\s@]+$/.test(correo)) return setError('Capture un correo válido.')
    if (password.length < 8) return setError('La contraseña debe tener al menos 8 caracteres.')
    if (!rolSeleccionado) return setError('Seleccione un rol institucional.')
    const role = rolesApi[rolSeleccionado]
    if (role === 'TEACHER' && !/^\d+$/.test(teacherId.trim())) return setError('Capture el ID de docente vinculado.')
    setEnviando(true)
    try {
      const usuario = await usersApi.register({
        username: correo.split('@')[0],
        email: correo,
        fullName,
        password,
        role,
        teacherId: role === 'TEACHER' ? Number(teacherId.trim()) : null,
      })
      setExito(`Cuenta creada para ${usuario.fullName ?? usuario.username} (${usuario.email}).`)
      setDatos(datosIniciales)
      setEmail('')
      setPassword(generarPassword())
      setTeacherId('')
      setRolSeleccionado('')
    } catch (err) {
      setError(mapAuthError(err))
    } finally {
      setEnviando(false)
    }
  }

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
            <button type='button' onClick={() => void crearCuenta()} disabled={enviando} className='inline-flex min-h-[64px] items-center gap-3 rounded-xl bg-[var(--color-forest)] px-9 text-[22px] font-bold text-[var(--sa-on-accent)] hover:brightness-95 disabled:opacity-60'>
              <Icon name='save' size={26} />
              {enviando ? 'Creando cuenta…' : 'Crear Cuenta y Enviar Accesos'}
            </button>
          </div>
        </div>
        {error ? (
          <div role='alert' className='rounded-2xl border border-[#C62828] bg-[#FFF4F4] px-8 py-5 text-[22px] font-bold text-[#C62828]'>{error}</div>
        ) : null}
        {exito ? (
          <div role='status' className='rounded-2xl border border-[var(--color-forest)] bg-[color-mix(in_srgb,var(--color-forest)_12%,transparent)] px-8 py-5 text-[22px] font-bold text-[var(--color-forest)]'>{exito}</div>
        ) : null}
        <div className='grid gap-8 lg:grid-cols-2'>
          <DatosPersonalesForm valores={datos} onCambiar={(campo, valor) => setDatos((previo) => ({ ...previo, [campo]: valor }))} />
          <CredencialesSeguridadForm email={email} password={password} onEmail={setEmail} onPassword={setPassword} />
        </div>
        <RolAsignacion rolSeleccionado={rolSeleccionado} onSelect={setRolSeleccionado} />
        {rolSeleccionado === 'maestro' ? (
          <div className='flex flex-col gap-2 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-8 py-6 shadow-sm'>
            <label htmlFor='teacher-id' className='text-[20px] font-semibold'>ID de Docente Vinculado *</label>
            <input id='teacher-id' inputMode='numeric' value={teacherId} onChange={(e) => setTeacherId(e.target.value)} placeholder='Ej. 1' className='h-16 rounded-xl border border-[var(--sa-border)] px-4 text-[22px]' />
          </div>
        ) : null}
        <PlantelGradosForm />
        <div className='flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-8 py-6 shadow-sm'>
          <div className='flex items-center gap-3 text-[22px] text-[var(--sa-muted)]'>
            <Icon name='shield' size={24} />
            <span>Validación de privacidad y datos personales conforme a lineamientos institucionales. No se almacena información sensible en URL ni logs.</span>
          </div>
          <div className='flex flex-wrap items-center gap-4'>
            <button type='button' onClick={volver} className='inline-flex min-h-[64px] items-center gap-3 rounded-xl border border-[var(--sa-border)] px-7 text-[22px] font-semibold hover:bg-[var(--sa-field)]'>Cancelar y Descartar</button>
            <button type='button' className='inline-flex min-h-[64px] items-center gap-3 rounded-xl border border-[var(--sa-border)] px-7 text-[22px] font-semibold hover:bg-[var(--sa-field)]'>Guardar como Borrador</button>
            <button type='button' onClick={() => void crearCuenta()} disabled={enviando} className='inline-flex min-h-[64px] items-center gap-3 rounded-xl bg-[var(--color-forest)] px-9 text-[22px] font-bold text-[var(--sa-on-accent)] hover:brightness-95 disabled:opacity-60'>Crear Cuenta y Notificar al Colaborador</button>
          </div>
        </div>
      </div>
    </AdministradorTemplate>
  )
}
