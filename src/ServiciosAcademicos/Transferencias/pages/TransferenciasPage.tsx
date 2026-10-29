import { ServiciosAcademicosTemplate } from '../../shared/templates/ServiciosAcademicosTemplate'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { roles } from '../../../Portal/shared/constants/roles'
import type { SidebarKey } from '../../../Portal/shared/types'
import { transferenciasContent, especialistasSEE, condicionesTransferencia, formatearPlazo } from '../constants/transferenciasContent'
import { useTransferir } from '../hooks/useTransferir'
import { useEffect, useMemo, useState } from 'react'
import { nombreCompleto } from '../../PadronGeneral/constants/padronData'

function leerAlumnoId(): string | undefined {
  const hash = window.location.hash.replace('#', '')
  const [ruta, consulta = ''] = hash.split('?')
  const segmentos = ruta.split('/')
  if (segmentos[0] !== 'servicios-academicos' || segmentos[1] !== 'transferencias') return undefined
  if (segmentos[2] !== 'nueva') return undefined
  const params = new URLSearchParams(consulta)
  return params.get('alumno') || undefined
}

export function TransferenciasPage() {
  const alumnoId = useMemo(() => leerAlumnoId(), [])
  const {
    alumno,
    guardando,
    motivo,
    setMotivo,
    condicionPreliminar,
    setCondicionPreliminar,
    especialistaId,
    setEspecialistaId,
    urgencia,
    setUrgencia,
    notas,
    setNotas,
    errores,
    setErrores,
    validar,
    tieneCambios,
    transferenciaActiva,
    guardar,
    especialistaSeleccionado,
  } = useTransferir({ alumnoId }) as any

  const [confirmar, setConfirmar] = useState(false)
  const [exito, setExito] = useState(false)
  const [folioExito, setFolioExito] = useState('')

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (tieneCambios && !guardando && !exito) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [tieneCambios, guardando, exito])

  const navegar = (key: SidebarKey) => {
    if (key === 'transferencias') return
    if (tieneCambios && !guardando && !exito) {
      const aceptar = window.confirm('¿Descartar cambios?')
      if (!aceptar) return
    }
    const item = roles.servicios_academicos.navItems.find((m) => m.key === key)
    window.location.hash = item?.hash ?? '#servicios-academicos/padron'
  }

  const volver = () => {
    if (tieneCambios && !guardando && !exito) {
      const aceptar = window.confirm('¿Descartar cambios?')
      if (!aceptar) return
    }
    window.location.hash = '#servicios-academicos/padron'
  }

  const intentarConfirmar = () => {
    if (transferenciaActiva) return
    if (!validar()) {
      const primero = document.querySelector('[aria-invalid="true"]') as HTMLElement | null
      primero?.focus()
      return
    }
    setConfirmar(true)
  }

  const confirmarAccion = async () => {
    const res = await guardar()
    setConfirmar(false)
    if (res.ok && res.transferencia) {
      setFolioExito(res.transferencia.folio)
      setExito(true)
    }
  }

  if (!alumnoId || !alumno) {
    return (
      <ServiciosAcademicosTemplate vista='TRANSFERENCIAS SEE' activeKey='transferencias' onNavigate={navegar}>
        <div className='mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-3 py-6 sm:px-4 lg:px-[15px]'>
          <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 shadow-sm'>
            <div className='flex flex-col items-start gap-3'>
              <div className='flex items-center gap-2 text-[var(--sa-text)]'>
                <Icon name='alert-triangle' size={18} />
                <h1 className='text-lg font-bold'>{transferenciasContent.sinAlumno.titulo}</h1>
              </div>
              <p className='text-sm text-[var(--sa-muted)]'>{transferenciasContent.sinAlumno.texto}</p>
              <button
                type='button'
                onClick={volver}
                className='inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[var(--color-forest)] px-4 text-sm font-bold text-[var(--sa-on-accent)] hover:brightness-95'
              >
                <Icon name='arrow-left' size={16} />
                {transferenciasContent.sinAlumno.accion}
              </button>
            </div>
          </section>
        </div>
      </ServiciosAcademicosTemplate>
    )
  }

  if (exito) {
    return (
      <ServiciosAcademicosTemplate vista='TRANSFERENCIAS SEE' activeKey='transferencias' onNavigate={navegar}>
        <div className='mx-auto flex w-full max-w-[900px] flex-col gap-6 px-3 py-6 sm:px-4 lg:px-[15px]'>
          <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 shadow-sm'>
            <div className='flex flex-col items-center gap-4 text-center'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-forest)_14%,transparent)] text-[var(--color-forest)]'>
                <Icon name='circle-check' size={24} />
              </div>
              <div>
                <h1 className='text-xl font-extrabold text-[var(--sa-text)] sm:text-2xl'>{transferenciasContent.exito.titulo}</h1>
                <p className='mt-1 text-sm text-[var(--sa-muted)]'>
                  {transferenciasContent.exito.folio}: <span className='font-bold text-[var(--sa-text)]'>{folioExito}</span>
                </p>
                <p className='text-sm text-[var(--sa-muted)]'>
                  {transferenciasContent.exito.plazo}: <span className='font-semibold text-[var(--sa-text)]'>{urgencia ? formatearPlazo(urgencia) : '-'}</span>
                </p>
              </div>
              <div className='flex flex-wrap items-center justify-center gap-2'>
                <button
                  type='button'
                  onClick={() => (window.location.hash = '#servicios-academicos/padron')}
                  className='inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[var(--sa-border)] px-4 text-sm font-bold text-[var(--sa-muted)] hover:bg-[var(--sa-field)]'
                >
                  <Icon name='users' size={16} />
                  {transferenciasContent.exito.verPadron}
                </button>
                <button
                  type='button'
                  onClick={() => window.print()}
                  className='inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[var(--color-forest)] px-4 text-sm font-bold text-[var(--sa-on-accent)] hover:brightness-95'
                >
                  <Icon name='printer' size={16} />
                  {transferenciasContent.exito.imprimir}
                </button>
              </div>
            </div>
          </section>
        </div>
      </ServiciosAcademicosTemplate>
    )
  }

  const nombreAlumno = alumno.nombreCompleto || nombreCompleto(alumno as any)
  const iniciales = nombreAlumno
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p: string) => p[0])
    .join('')
    .toUpperCase()

  return (
    <ServiciosAcademicosTemplate vista='TRANSFERENCIAS SEE' activeKey='transferencias' onNavigate={navegar}>
      <div className='mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-3 py-4 sm:px-4 lg:px-[15px]'>
        <nav aria-label='Migas de pan' className='flex flex-wrap items-center gap-1 text-sm text-[var(--sa-muted)]'>
          <button type='button' onClick={volver} className='font-medium hover:underline'>
            {transferenciasContent.migas.padron}
          </button>
          <span>{transferenciasContent.migas.separador}</span>
          <span className='font-bold text-[var(--sa-text)]'>{transferenciasContent.migas.transferir(nombreAlumno)}</span>
        </nav>

        <div className='flex items-center justify-between gap-2 rounded-xl bg-[var(--sa-field)] px-3 py-2 text-sm'>
          <div className='flex min-w-0 items-center gap-2'>
            <Icon name={transferenciasContent.barraInformativa.icon} size={16} className='shrink-0' />
            <span className='truncate font-semibold text-[var(--sa-text)]'>{transferenciasContent.barraInformativa.texto}</span>
          </div>
          <span className='shrink-0 rounded-full bg-[color-mix(in_srgb,var(--color-forest)_16%,transparent)] px-2 py-0.5 text-xs font-bold text-[var(--color-forest)]'>
            {transferenciasContent.barraInformativa.chip}
          </span>
        </div>

        <header className='flex flex-col gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-sm sm:p-6'>
          <div className='flex items-start gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-forest)_12%,transparent)] text-[var(--color-forest)]'>
                <Icon name='share' size={22} />
              </div>
            <div className='min-w-0'>
              <p className='text-[11px] font-bold uppercase tracking-wide text-[var(--color-forest)]'>
                {transferenciasContent.encabezado.etiqueta}
              </p>
              <h1 className='mt-1 text-[24px] font-extrabold text-[var(--sa-text)] sm:text-[28px]'>
                {transferenciasContent.encabezado.titulo}
              </h1>
            </div>
          </div>
        </header>

        {transferenciaActiva ? (
          <div role='alert' className='flex items-center justify-between gap-3 rounded-xl border border-[var(--sa-border)] bg-[color-mix(in_srgb,var(--color-warning)_14%,transparent)] px-4 py-3'>
            <div className='flex items-center gap-2'>
              <Icon name='alert-triangle' size={16} />
              <span className='text-sm font-semibold text-[var(--sa-text)]'>
                {transferenciasContent.alumno.avisos.activo(transferenciaActiva.folio)}
              </span>
            </div>
          </div>
        ) : null}

        <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-4 shadow-sm sm:p-5'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_srgb,#60a5fa_18%,transparent)] text-sm font-bold text-[#1d4ed8]'>
                {iniciales}
              </div>
              <div className='min-w-0'>
                <p className='text-[10.5px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>
                  {transferenciasContent.alumno.etiqueta}
                </p>
                <p className='text-[18px] font-bold text-[var(--sa-text)]'>{nombreAlumno}</p>
                <p className='text-sm text-[var(--sa-muted)]'>
                  {(alumno as any).grado}° Grado • Grupo {(alumno as any).grupo} {(alumno as any).turno}
                </p>
              </div>
            </div>
            <div className='flex items-center gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] px-3 py-2'>
              <div className='flex flex-col'>
                <span className='text-[10.5px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>
                  {transferenciasContent.alumno.folioEtiqueta}
                </span>
                <span className='font-mono text-sm font-bold text-[var(--sa-text)]'>{alumno.matricula}</span>
              </div>
              <button
                type='button'
                onClick={() => navigator.clipboard?.writeText(alumno.matricula)}
                aria-label={transferenciasContent.alumno.copiar}
                className='inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[var(--sa-card)]'
              >
                <Icon name='file-text' size={16} />
              </button>
            </div>
          </div>
        </section>

        <div className='grid gap-4 lg:grid-cols-[minmax(0,1fr)_clamp(280px,26vw,340px)] lg:gap-6'>
          <div className='flex min-w-0 flex-col gap-4'>
            <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
              <header className='flex items-center justify-between gap-3 border-b border-[var(--sa-border)] px-4 py-4 sm:px-6'>
                <div className='flex items-center gap-3'>
                  <span className='flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-forest)] text-sm font-bold text-[var(--sa-on-accent)]'>
                    1
                  </span>
                  <div>
                    <h2 className='text-[18px] font-bold text-[var(--sa-text)]'>{transferenciasContent.secciones[1].titulo}</h2>
                    <p className='text-sm text-[var(--sa-muted)]'>{transferenciasContent.secciones[1].ayuda}</p>
                  </div>
                </div>
              </header>
              <fieldset className='flex flex-col gap-2 px-4 py-4 sm:px-6'>
                <legend className='sr-only'>Motivo de transferencia</legend>
                {transferenciasContent.motivos.map((m) => {
                  const activo = motivo === m.id
                  return (
                    <label
                      key={m.id}
                      className={cn(
                        'flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3',
                        activo
                          ? 'border-[var(--color-forest)] bg-[color-mix(in_srgb,var(--color-forest)_8%,transparent)]'
                          : 'border-[var(--sa-border)] hover:bg-[var(--sa-field)]'
                      )}
                    >
                      <input
                        type='radio'
                        name='motivo'
                        value={m.id}
                        checked={activo}
                        onChange={() => {
                    setMotivo(m.id)
                    setErrores((prev: any) => ({ ...prev, motivo: undefined }))
                  }}
                        className='mt-1 h-4 w-4 accent-[var(--color-forest)]'
                        aria-invalid={Boolean(errores.motivo)}
                      />
                      <div className='min-w-0'>
                        <p className='text-sm font-bold text-[var(--sa-text)]'>{m.titulo}</p>
                        <p className='text-sm text-[var(--sa-muted)]'>{m.descripcion}</p>
                      </div>
                    </label>
                  )
                })}
                {errores.motivo ? (
                  <p role='alert' className='text-sm font-semibold text-[var(--sa-danger)]'>
                    {errores.motivo}
                  </p>
                ) : null}
              </fieldset>
            </section>

            <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
              <header className='flex items-center justify-between gap-3 border-b border-[var(--sa-border)] px-4 py-4 sm:px-6'>
                <div className='flex items-center gap-3'>
                  <span className='flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-forest)] text-sm font-bold text-[var(--sa-on-accent)]'>
                    2
                  </span>
                  <div>
                    <h2 className='text-[18px] font-bold text-[var(--sa-text)]'>{transferenciasContent.secciones[2].titulo}</h2>
                    <p className='text-sm text-[var(--sa-muted)]'>{transferenciasContent.secciones[2].ayuda}</p>
                  </div>
                </div>
              </header>
              <div className='flex flex-col gap-2 px-4 py-4 sm:px-6'>
                <label htmlFor='condicion' className='text-sm font-semibold text-[var(--sa-text)]'>
                  Condición preliminar
                </label>
                <select
                  id='condicion'
                  value={condicionPreliminar}
                  onChange={(e) => {
                    setCondicionPreliminar(e.target.value)
                    setErrores((prev: any) => ({ ...prev, condicion: undefined }))
                  }}
                  aria-invalid={Boolean(errores.condicion)}
                  className='h-[56px] w-full rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-base'
                >
                  <option value=''>Seleccione...</option>
                  {condicionesTransferencia.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                {errores.condicion ? (
                  <p role='alert' className='text-sm font-semibold text-[var(--sa-danger)]'>
                    {errores.condicion}
                  </p>
                ) : null}
              </div>
            </section>

            <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
              <header className='flex items-center justify-between gap-3 border-b border-[var(--sa-border)] px-4 py-4 sm:px-6'>
                <div className='flex items-center gap-3'>
                  <span className='flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-forest)] text-sm font-bold text-[var(--sa-on-accent)]'>
                    3
                  </span>
                  <div>
                    <h2 className='text-[18px] font-bold text-[var(--sa-text)]'>{transferenciasContent.secciones[3].titulo}</h2>
                    <p className='text-sm text-[var(--sa-muted)]'>{transferenciasContent.secciones[3].ayuda}</p>
                  </div>
                </div>
              </header>
              <div className='flex flex-col gap-2 px-4 py-4 sm:px-6'>
                <label htmlFor='especialista' className='text-sm font-semibold text-[var(--sa-text)]'>
                  Especialista o gabinete receptor
                </label>
                <select
                  id='especialista'
                  value={especialistaId}
                  onChange={(e) => {
                    setEspecialistaId(e.target.value)
                    setErrores((prev: any) => ({ ...prev, especialista: undefined }))
                  }}
                  aria-invalid={Boolean(errores.especialista)}
                  className='h-[56px] w-full rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-base'
                >
                  {especialistasSEE.map((esp) => (
                    <option key={esp.id} value={esp.id}>
                      {esp.nombre} - {esp.especialidad} {esp.turno}
                    </option>
                  ))}
                </select>
                {especialistaSeleccionado ? (
                  <p className='text-xs text-[var(--sa-muted)]'>Cédula: {especialistaSeleccionado.cedula}</p>
                ) : null}
                {errores.especialista ? (
                  <p role='alert' className='text-sm font-semibold text-[var(--sa-danger)]'>
                    {errores.especialista}
                  </p>
                ) : null}
              </div>
            </section>

            <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
              <header className='flex items-center justify-between gap-3 border-b border-[var(--sa-border)] px-4 py-4 sm:px-6'>
                <div className='flex items-center gap-3'>
                  <span className='flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-forest)] text-sm font-bold text-[var(--sa-on-accent)]'>
                    4
                  </span>
                  <div>
                    <h2 className='text-[18px] font-bold text-[var(--sa-text)]'>{transferenciasContent.secciones[4].titulo}</h2>
                    <p className='text-sm text-[var(--sa-muted)]'>{transferenciasContent.secciones[4].ayuda}</p>
                  </div>
                </div>
              </header>
              <fieldset className='flex flex-col gap-2 px-4 py-4 sm:flex-row sm:px-6'>
                <legend className='sr-only'>Nivel de urgencia</legend>
                {transferenciasContent.urgencias.map((u) => {
                  const activo = urgencia === u.id
                  return (
                    <label
                      key={u.id}
                      className={cn(
                        'relative flex flex-1 cursor-pointer flex-col gap-2 overflow-hidden rounded-xl border p-4',
                        activo
                          ? 'border-[var(--color-forest)]'
                          : 'border-[var(--sa-border)] hover:bg-[var(--sa-field)]'
                      )}
                    >
                      <input
                        type='radio'
                        name='urgencia'
                        value={u.id}
                        checked={activo}
                        onChange={() => {
                          setUrgencia(u.id)
                          setErrores((prev: any) => ({ ...prev, urgencia: undefined }))
                        }}
                        className='h-4 w-4 accent-[var(--color-forest)]'
                        aria-invalid={Boolean(errores.urgencia)}
                      />
                      <div className='flex items-center gap-2'>
                        <Icon name={u.icon} size={18} />
                        <p className='text-sm font-bold text-[var(--sa-text)]'>{u.titulo}</p>
                      </div>
                      <p className='text-sm text-[var(--sa-muted)]'>{u.descripcion}</p>
                      <div className='absolute bottom-0 left-0 h-1 w-full' style={{ backgroundColor: u.barra }} />
                    </label>
                  )
                })}
              </fieldset>
              {errores.urgencia ? (
                <p role='alert' className='px-4 pb-4 text-sm font-semibold text-[var(--sa-danger)] sm:px-6'>
                  {errores.urgencia}
                </p>
              ) : null}
            </section>

            <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
              <header className='flex items-center justify-between gap-3 border-b border-[var(--sa-border)] px-4 py-4 sm:px-6'>
                <div className='flex items-center gap-3'>
                  <span className='flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sa-field)] text-sm font-bold text-[var(--sa-muted)]'>
                    5
                  </span>
                  <div>
                    <h2 className='text-[18px] font-bold text-[var(--sa-text)]'>{transferenciasContent.secciones[5].titulo}</h2>
                    <p className='text-sm text-[var(--sa-muted)]'>{transferenciasContent.secciones[5].ayuda}</p>
                  </div>
                </div>
              </header>
              <div className='flex flex-col gap-2 px-4 py-4 sm:px-6'>
                <textarea
                  value={notas}
                  onChange={(e) => setNotas(e.target.value.slice(0, 500))}
                  rows={4}
                  placeholder='Describa contexto adicional...'
                  className='min-h-[112px] w-full rounded-xl border border-[var(--sa-border)] px-3 py-2 text-base'
                />
                <div className='text-right text-xs text-[var(--sa-muted)]'>{transferenciasContent.secciones[5].contador(notas.length)}</div>
              </div>
            </section>

            <div className='flex flex-col gap-2 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5'>
              <button
                type='button'
                onClick={volver}
                className='inline-flex min-h-[56px] items-center justify-center gap-2 rounded-xl border border-[var(--sa-border)] px-6 text-sm font-bold text-[var(--sa-muted)] hover:bg-[var(--sa-field)]'
              >
                {transferenciasContent.acciones.regresar}
              </button>
              <button
                type='button'
                onClick={intentarConfirmar}
                disabled={guardando || Boolean(transferenciaActiva)}
                className='inline-flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-[var(--color-forest)] px-6 text-sm font-bold text-[var(--sa-on-accent)] hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70'
              >
                <Icon name='circle-check' size={18} />
                {guardando ? 'Guardando...' : transferenciasContent.acciones.confirmar}
              </button>
            </div>
          </div>

          <aside className='flex min-w-0 flex-col gap-4'>
            <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
              <header className='border-b border-[var(--sa-border)] px-4 py-3'>
                <h2 className='text-sm font-bold text-[var(--sa-text)]'>{transferenciasContent.lateral.titulo}</h2>
              </header>
              <div className='flex flex-col gap-3 px-4 py-4 text-sm'>
                <div>
                  <p className='text-xs text-[var(--sa-muted)]'>{transferenciasContent.lateral.alumno}</p>
                  <p className='font-semibold text-[var(--sa-text)]'>{nombreAlumno}</p>
                  <p className='text-xs text-[var(--sa-muted)]'>{alumno.matricula}</p>
                </div>
                <div>
                  <p className='text-xs text-[var(--sa-muted)]'>{transferenciasContent.lateral.folio}</p>
                  <p className='font-mono font-semibold text-[var(--sa-text)]'>{alumno.matricula}</p>
                </div>
                {motivo ? (
                  <div>
                    <p className='text-xs text-[var(--sa-muted)]'>{transferenciasContent.lateral.motivo}</p>
                    <p className='font-semibold text-[var(--sa-text)]'>{transferenciasContent.motivos.find((m) => m.id === motivo)?.titulo}</p>
                  </div>
                ) : null}
                {condicionPreliminar ? (
                  <div>
                    <p className='text-xs text-[var(--sa-muted)]'>{transferenciasContent.lateral.condicion}</p>
                    <p className='font-semibold text-[var(--sa-text)]'>{condicionesTransferencia.find((c) => c.value === condicionPreliminar)?.label}</p>
                  </div>
                ) : null}
                {especialistaSeleccionado ? (
                  <div>
                    <p className='text-xs text-[var(--sa-muted)]'>{transferenciasContent.lateral.especialista}</p>
                    <p className='font-semibold text-[var(--sa-text)]'>{especialistaSeleccionado.nombre}</p>
                    <p className='text-xs text-[var(--sa-muted)]'>{especialistaSeleccionado.especialidad} • {especialistaSeleccionado.turno}</p>
                  </div>
                ) : null}
                {urgencia ? (
                  <div>
                    <p className='text-xs text-[var(--sa-muted)]'>{transferenciasContent.lateral.urgencia}</p>
                    <p className='font-semibold text-[var(--sa-text)]'>{transferenciasContent.urgencias.find((u) => u.id === urgencia)?.titulo}</p>
                    <p className='text-xs text-[var(--sa-muted)]'>{formatearPlazo(urgencia)}</p>
                  </div>
                ) : null}
                <div>
                  <p className='text-xs font-semibold text-[var(--sa-text)]'>{transferenciasContent.lateral.avisos}</p>
                  <ul className='mt-1 list-disc space-y-1 pl-4 text-xs text-[var(--sa-muted)]'>
                    <li>Especialista receptor</li>
                    <li>Expediente del alumno</li>
                    {urgencia === 'urgente' ? <li>Dirección</li> : null}
                  </ul>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>

      {confirmar ? (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'>
          <div className='w-full max-w-md rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-xl'>
            <header className='flex items-center gap-2 border-b border-[var(--sa-border)] px-5 py-4'>
            <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-forest)_12%,transparent)] text-[var(--color-forest)]'>
              <Icon name='share' size={18} />
            </div>
              <h3 className='text-base font-bold text-[var(--sa-text)]'>{transferenciasContent.dialogo.titulo}</h3>
            </header>
            <div className='px-5 py-4'>
              <p className='text-sm text-[var(--sa-muted)]'>{transferenciasContent.dialogo.texto}</p>
            </div>
            <footer className='flex flex-col-reverse gap-2 border-t border-[var(--sa-border)] px-5 py-3 sm:flex-row sm:justify-end'>
              <button
                type='button'
                onClick={() => setConfirmar(false)}
                className='inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[var(--sa-border)] px-4 text-sm font-bold text-[var(--sa-muted)] hover:bg-[var(--sa-field)]'
              >
                {transferenciasContent.acciones.revisar}
              </button>
              <button
                type='button'
                onClick={confirmarAccion}
                disabled={guardando}
                className='inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[var(--color-forest)] px-4 text-sm font-bold text-[var(--sa-on-accent)] hover:brightness-95 disabled:opacity-70'
              >
                {guardando ? 'Guardando...' : transferenciasContent.acciones.confirmarDialogo}
              </button>
            </footer>
          </div>
        </div>
      ) : null}
    </ServiciosAcademicosTemplate>
  )
}
