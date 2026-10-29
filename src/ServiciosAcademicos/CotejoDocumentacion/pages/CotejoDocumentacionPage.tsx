import { ServiciosAcademicosTemplate } from '../../shared/templates/ServiciosAcademicosTemplate'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { cotejoContent, OBSERVACIONES_MAX } from '../constants/cotejoContent'
import { useCotejo } from '../hooks/useCotejo'
import { useEffect, useMemo, useState } from 'react'
import { roles } from '../../../Portal/shared/constants/roles'
import type { SidebarKey } from '../../../Portal/shared/types'

function leerExpedienteId(): string | undefined {
  const hash = window.location.hash.replace('#', '')
  const [ruta] = hash.split('?')
  const segmentos = ruta.split('/')
  if (segmentos[0] !== 'servicios-academicos' || segmentos[1] !== 'cotejo') return undefined
  if (!segmentos[2]) return undefined
  return decodeURIComponent(segmentos[2])
}

export function CotejoDocumentacionPage() {
  const expedienteId = useMemo(() => leerExpedienteId(), [])
  const {
    expediente,
    guardando,
    resumen,
    tieneCambios,
    hayObservacionesRequeridas,
    toggleDocumento,
    setObservaciones,
    guardar,
  } = useCotejo({ expedienteId })

  const [confirmar, setConfirmar] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (tieneCambios && !guardando) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [tieneCambios, guardando])

  const volverPadron = () => {
    window.location.hash = '#servicios-academicos/padron?estatus=cotejo_pendiente'
  }

  const cancelar = () => {
    if (tieneCambios && !guardando) {
      const aceptar = window.confirm('Hay cambios sin guardar. ¿Desea descartar los cambios?')
      if (!aceptar) return
    }
    volverPadron()
  }

  const intentarGuardar = () => {
    setMensaje(null)
    if (hayObservacionesRequeridas) {
      setMensaje(cotejoContent.mensajes.obligatorioObservaciones)
      const el = document.getElementById('cotejo-observaciones')
      el?.focus()
      return
    }
    setConfirmar(true)
  }

  const confirmarGuardar = async () => {
    const res = await guardar()
    setConfirmar(false)
    if (res.ok) {
      setMensaje(cotejoContent.mensajes.guardadoExitoso)
      setTimeout(() => {
        volverPadron()
      }, 600)
    }
  }

  if (!expedienteId || !expediente) {
    const navegarSinExp = (key: SidebarKey) => {
      if (key === 'cotejo') return
      const item = roles.servicios_academicos.navItems.find((modulo) => modulo.key === key)
      const hash = item?.hash ?? '#servicios-academicos/padron'
      window.location.hash = hash
    }
    return (
      <ServiciosAcademicosTemplate
        vista='COTEJO Y DOCUMENTACIÓN'
        activeKey='cotejo'
        onNavigate={navegarSinExp}
      >
        <div className='mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8'>
          <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 shadow-sm'>
            <div className='flex flex-col items-start gap-3'>
              <div className='flex items-center gap-2 text-[var(--sa-text)]'>
                <Icon name='alert-triangle' size={18} />
                <h1 className='text-lg font-bold'>{cotejoContent.sinExpediente.titulo}</h1>
              </div>
              <p className='text-sm text-[var(--sa-muted)]'>{cotejoContent.sinExpediente.texto}</p>
              <button
                type='button'
                onClick={volverPadron}
                className='inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[var(--color-forest)] px-4 text-sm font-bold text-[var(--sa-on-accent)] hover:brightness-95'
              >
                <Icon name='arrow-left' size={16} />
                {cotejoContent.sinExpediente.accion}
              </button>
            </div>
          </section>
        </div>
      </ServiciosAcademicosTemplate>
    )
  }

  const obsLongitud = expediente.observaciones.texto.length

  const navegarVista = (key: SidebarKey) => {
    if (key === 'cotejo') return
    const item = roles.servicios_academicos.navItems.find((modulo) => modulo.key === key)
    const hash = item?.hash ?? '#servicios-academicos/padron'
    if (tieneCambios && !guardando) {
      const aceptar = window.confirm('Hay cambios sin guardar. ¿Desea salir sin guardar?')
      if (!aceptar) return
    }
    window.location.hash = hash
  }

  return (
    <ServiciosAcademicosTemplate
      vista='COTEJO Y DOCUMENTACIÓN'
      activeKey='cotejo'
      onNavigate={navegarVista}
    >
      <div className='mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8'>
        <header className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-forest)_12%,transparent)] text-[var(--color-forest)]'>
              <Icon name={cotejoContent.encabezado.icon} size={18} />
            </div>
            <div>
              <h1 className='text-xl font-bold text-[var(--sa-text)] sm:text-2xl'>{cotejoContent.encabezado.titulo}</h1>
              <p className='text-sm text-[var(--sa-muted)]'>{cotejoContent.encabezado.subtitulo(expediente.alumno.matricula)}</p>
            </div>
          </div>
        </header>

        <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-4 shadow-sm sm:p-5'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2 text-[var(--sa-text)]'>
              <Icon name='info' size={16} />
              <h2 className='text-sm font-bold'>{cotejoContent.instruccion.titulo}</h2>
            </div>
            <p className='text-sm text-[var(--sa-muted)]'>{cotejoContent.instruccion.texto}</p>
          </div>
        </section>

        <div className='grid gap-4 lg:grid-cols-[minmax(0,1fr)_clamp(280px,26vw,340px)] lg:gap-6'>
          <div className='flex min-w-0 flex-col gap-4'>
            <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
              <header className='flex flex-col gap-1 border-b border-[var(--sa-border)] px-4 py-4 sm:px-6'>
                <h2 className='text-base font-bold text-[var(--sa-text)]'>{cotejoContent.documentos.leyenda}</h2>
                <p className='text-sm text-[var(--sa-muted)]'>{cotejoContent.documentos.descripcion}</p>
              </header>
              <div className='flex flex-col divide-y divide-[var(--sa-border)]'>
                {expediente.documentos
                  .slice()
                  .sort((a, b) => a.orden - b.orden)
                  .map((doc) => {
                    const cotejado = doc.estado === 'cotejado'
                    return (
                      <article key={doc.id} className='flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6'>
                        <div className='flex min-w-0 flex-1 flex-col gap-1'>
                          <div className='flex items-start gap-3'>
                            <div className='mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--color-forest)_10%,transparent)] text-[var(--color-forest)]'>
                              <Icon name='file-text' size={16} />
                            </div>
                            <div className='flex min-w-0 flex-col gap-1'>
                              <h3 className='text-sm font-bold text-[var(--sa-text)] sm:text-[15px]'>{doc.nombre}</h3>
                              {doc.detalle ? <p className='text-sm text-[var(--sa-muted)]'>{doc.detalle}</p> : null}
                              {doc.prorroga ? (
                                <span className='inline-flex w-fit items-center rounded-full bg-[color-mix(in_srgb,var(--color-warning)_14%,transparent)] px-2 py-0.5 text-xs font-semibold text-[var(--sa-text)]'>
                                  {cotejoContent.documentos.prorroga(doc.prorroga)}
                                </span>
                              ) : null}
                              {cotejado && doc.fechaCotejo ? (
                                <p className='text-xs text-[var(--sa-muted)]'>
                                  Cotejado el {doc.fechaCotejo} {doc.verificadoPor ? `por ${doc.verificadoPor}` : ''}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className='flex items-center justify-between gap-3 sm:flex-col sm:items-end'>
                          <span
                            className={cn(
                              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
                              cotejado
                                ? 'bg-[color-mix(in_srgb,var(--color-forest)_14%,transparent)] text-[var(--color-forest)]'
                                : 'bg-[color-mix(in_srgb,var(--color-warning)_16%,transparent)] text-[var(--sa-text)]'
                            )}
                          >
                            <Icon name={cotejado ? 'circle-check' : 'clock'} size={14} />
                            {cotejado ? cotejoContent.documentos.cotejado : cotejoContent.documentos.pendiente}
                          </span>
                          <label className='inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[var(--sa-border)] px-3 text-sm font-semibold text-[var(--sa-text)] hover:bg-[var(--sa-field)]'>
                            <input
                              type='checkbox'
                              checked={cotejado}
                              onChange={() => toggleDocumento(doc.id)}
                              className='h-4 w-4 accent-[var(--color-forest)]'
                              aria-label={`Marcar ${doc.nombre} como ${cotejado ? 'pendiente' : 'cotejado'}`}
                            />
                            {cotejado ? 'Marcar como pendiente' : 'Marcar como cotejado'}
                          </label>
                        </div>
                      </article>
                    )
                  })}
              </div>
            </section>

            <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
              <header className='flex flex-col gap-1 border-b border-[var(--sa-border)] px-4 py-4 sm:px-6'>
                <h2 className='text-base font-bold text-[var(--sa-text)]'>{cotejoContent.observaciones.etiqueta}</h2>
                <p className='text-sm text-[var(--sa-muted)]'>
                  {hayObservacionesRequeridas ? cotejoContent.observaciones.requerido : 'Opcional'}
                </p>
              </header>
              <div className='flex flex-col gap-2 px-4 py-4 sm:px-6'>
                <textarea
                  id='cotejo-observaciones'
                  value={expediente.observaciones.texto}
                  onChange={(e) => setObservaciones(e.target.value.slice(0, OBSERVACIONES_MAX))}
                  placeholder={cotejoContent.observaciones.placeholder}
                  className={cn(
                    'min-h-[140px] w-full resize-y rounded-xl border px-3 py-2 text-sm text-[var(--sa-text)] outline-none',
                    hayObservacionesRequeridas
                      ? 'border-[color-mix(in_srgb,var(--color-warning)_70%,transparent)] bg-[var(--sa-card)] focus:border-[color-mix(in_srgb,var(--color-warning)_90%,transparent)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-warning)_25%,transparent)]'
                      : 'border-[var(--sa-border)] bg-[var(--sa-card)] focus:border-[var(--color-forest)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-forest)_18%,transparent)]'
                  )}
                  aria-required={hayObservacionesRequeridas}
                />
                <div className='flex items-center justify-between text-xs text-[var(--sa-muted)]'>
                  <span aria-live='polite'>{mensaje}</span>
                  <span>{cotejoContent.observaciones.contador(obsLongitud, OBSERVACIONES_MAX)}</span>
                </div>
              </div>
            </section>

            <div className='flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between'>
              <button
                type='button'
                onClick={cancelar}
                className='inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[var(--sa-border)] px-4 text-sm font-bold text-[var(--sa-muted)] hover:bg-[var(--sa-field)]'
              >
                <Icon name='arrow-left' size={16} />
                {cotejoContent.acciones.cancelar}
              </button>
              <button
                type='button'
                onClick={intentarGuardar}
                disabled={guardando}
                className='inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[var(--color-forest)] px-5 text-sm font-bold text-[var(--sa-on-accent)] hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70'
              >
                <Icon name='save' size={16} />
                {guardando ? 'Guardando...' : cotejoContent.acciones.guardar}
              </button>
            </div>
          </div>

          <aside className='flex min-w-0 flex-col gap-4'>
            <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
              <header className='border-b border-[var(--sa-border)] px-4 py-3'>
                <h2 className='text-sm font-bold text-[var(--sa-text)]'>{cotejoContent.lateral.alumno}</h2>
              </header>
              <div className='flex flex-col gap-3 px-4 py-4'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-11 w-11 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-forest)_14%,transparent)] text-sm font-bold text-[var(--color-forest)]'>
                    {expediente.alumno.nombreCompleto
                      .split(/\s+/)
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((p) => p[0])
                      .join('')
                      .toUpperCase()}
                  </div>
                  <div className='min-w-0'>
                    <p className='truncate text-sm font-bold text-[var(--sa-text)]'>{expediente.alumno.nombreCompleto}</p>
                    <p className='text-xs text-[var(--sa-muted)]'>
                      Matrícula {expediente.alumno.matricula} • {expediente.alumno.gradoGrupo}
                    </p>
                  </div>
                </div>
                <dl className='grid grid-cols-1 gap-2 text-sm'>
                  <div className='flex items-center justify-between'>
                    <dt className='text-[var(--sa-muted)]'>CURP</dt>
                    <dd className='font-medium text-[var(--sa-text)]'>{expediente.alumno.curp}</dd>
                  </div>
                  {expediente.alumno.tutor ? (
                    <>
                      <div className='flex items-center justify-between'>
                        <dt className='text-[var(--sa-muted)]'>Tutor(a)</dt>
                        <dd className='text-right font-medium text-[var(--sa-text)]'>{expediente.alumno.tutor.nombre}</dd>
                      </div>
                      <div className='flex items-center justify-between'>
                        <dt className='text-[var(--sa-muted)]'>Parentesco</dt>
                        <dd className='font-medium text-[var(--sa-text)]'>{expediente.alumno.tutor.parentesco}</dd>
                      </div>
                      <div className='flex items-center justify-between'>
                        <dt className='text-[var(--sa-muted)]'>Teléfono</dt>
                        <dd className='font-medium text-[var(--sa-text)]'>{expediente.alumno.tutor.telefono}</dd>
                      </div>
                    </>
                  ) : null}
                </dl>
              </div>
            </section>

            <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
              <header className='border-b border-[var(--sa-border)] px-4 py-3'>
                <h2 className='text-sm font-bold text-[var(--sa-text)]'>{cotejoContent.lateral.resumen}</h2>
              </header>
              <div className='flex flex-col gap-3 px-4 py-4'>
                <div className='grid grid-cols-3 gap-2 text-center'>
                  <div className='rounded-xl border border-[var(--sa-border)] px-2 py-2'>
                    <p className='text-lg font-bold text-[var(--color-forest)]'>{resumen.cotejados}</p>
                    <p className='text-xs text-[var(--sa-muted)]'>{cotejoContent.lateral.cotejados}</p>
                  </div>
                  <div className='rounded-xl border border-[var(--sa-border)] px-2 py-2'>
                    <p className='text-lg font-bold text-[var(--sa-text)]'>{resumen.pendientes}</p>
                    <p className='text-xs text-[var(--sa-muted)]'>{cotejoContent.lateral.pendientes}</p>
                  </div>
                  <div className='rounded-xl border border-[var(--sa-border)] px-2 py-2'>
                    <p className='text-lg font-bold text-[var(--sa-text)]'>{resumen.total}</p>
                    <p className='text-xs text-[var(--sa-muted)]'>{cotejoContent.lateral.total}</p>
                  </div>
                </div>
                <div className='flex flex-col gap-1 text-xs text-[var(--sa-muted)]'>
                  <p>
                    {cotejoContent.lateral.registradoPor}: <span className='font-medium text-[var(--sa-text)]'>{expediente.registradoPor}</span>
                  </p>
                  {expediente.actualizadoEn ? (
                    <p>
                      {cotejoContent.lateral.actualizadoEn}:{' '}
                      <span className='font-medium text-[var(--sa-text)]'>{expediente.actualizadoEn.slice(0, 16).replace('T', ' ')}</span>
                    </p>
                  ) : null}
                </div>
                <p className='text-xs text-[var(--sa-muted)]'>{cotejoContent.lateral.instrucciones}</p>
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
                <Icon name='clipboard-check' size={18} />
              </div>
              <h3 className='text-base font-bold text-[var(--sa-text)]'>{cotejoContent.acciones.dialogoTitulo}</h3>
            </header>
            <div className='px-5 py-4'>
              <p className='text-sm text-[var(--sa-muted)]'>{cotejoContent.acciones.dialogoTexto(resumen.pendientes)}</p>
            </div>
            <footer className='flex flex-col-reverse gap-2 border-t border-[var(--sa-border)] px-5 py-3 sm:flex-row sm:justify-end'>
              <button
                type='button'
                onClick={() => setConfirmar(false)}
                className='inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[var(--sa-border)] px-4 text-sm font-bold text-[var(--sa-muted)] hover:bg-[var(--sa-field)]'
              >
                {cotejoContent.acciones.guardarCancelar}
              </button>
              <button
                type='button'
                onClick={confirmarGuardar}
                disabled={guardando}
                className='inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[var(--color-forest)] px-4 text-sm font-bold text-[var(--sa-on-accent)] hover:brightness-95 disabled:opacity-70'
              >
                {guardando ? 'Guardando...' : cotejoContent.acciones.guardarConfirmar}
              </button>
            </footer>
          </div>
        </div>
      ) : null}
    </ServiciosAcademicosTemplate>
  )
}
