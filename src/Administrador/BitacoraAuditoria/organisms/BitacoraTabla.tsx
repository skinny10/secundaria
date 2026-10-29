import { Fragment, useEffect, useState } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { eventosConfiguracion, suscribirAuditoria } from '../../ConfiguracionPlantel/services/auditoriaService'
import { eventos } from '../constants/eventos'

const hoverCelda =
  'group/celda rounded-lg border border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--sa-border)] hover:bg-[var(--sa-field)] hover:shadow-sm'

const hoverTexto = 'transition-colors duration-200 group-hover/celda:text-[var(--color-forest)]'
const hoverIcono = 'shrink-0 transition-transform duration-200 group-hover/celda:scale-110'

export function BitacoraTabla() {
  const [expandido, setExpandido] = useState<string | null>(null)
  const [dinamicos, setDinamicos] = useState(eventosConfiguracion)

  useEffect(() => suscribirAuditoria(() => setDinamicos(eventosConfiguracion())), [])

  const registros = [...dinamicos, ...eventos]

  return (
    <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
      <header className='flex flex-wrap items-center justify-between gap-4 border-b border-[var(--sa-border)] px-8 py-6'>
        <div className='flex items-center gap-3'>
          <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-field)] text-[var(--color-forest)]'>
            <Icon name='list-checks' size={24} />
          </div>
          <div>
            <h2 className='text-[34px] font-extrabold text-[var(--sa-text)]'>Registros Forenses en Vivo</h2>
            <p className='text-[20px] text-[var(--sa-muted)]'>{registros.length} eventos desplegados</p>
          </div>
        </div>
        <div className='flex items-center gap-2 text-[19px] font-semibold text-[var(--color-forest)]'>
          <span className='h-2 w-2 rounded-full bg-[var(--color-forest)]' />
          <span>Recepción de Syslog Escolar Activa</span>
        </div>
      </header>
      <div className='overflow-x-auto'>
        <table className='min-w-[1500px] w-full text-[19px]'>
          <thead>
            <tr className='border-b border-[var(--sa-border)] bg-[var(--sa-field)]'>
              <th className='sticky left-0 z-10 min-w-[190px] bg-[var(--sa-field)] px-6 py-4 text-left text-[13px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>FECHA Y HORA</th>
              <th className='min-w-[260px] px-6 py-4 text-left text-[13px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>USUARIO / RESPONSABLE</th>
              <th className='min-w-[180px] px-6 py-4 text-left text-[13px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>ROL INSTITUCIONAL</th>
              <th className='min-w-[260px] px-6 py-4 text-left text-[13px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>ACCIÓN REALIZADA</th>
              <th className='min-w-[320px] px-6 py-4 text-left text-[13px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>MÓDULO / OBJETO AFECTADO</th>
              <th className='min-w-[160px] px-6 py-4 text-left text-[13px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>INTEGRIDAD</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((e) => {
              const critica = e.severidad === 'critica'
              return (
                <Fragment key={e.id}>
                  <tr
                    className={cn(
                      'group border-b border-[var(--sa-border)] transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--color-forest)_5%,transparent)]',
                      critica ? 'bg-[color-mix(in_srgb,#D64545_8%,transparent)]' : ''
                    )}
                  >
                    <td className='sticky left-0 z-10 bg-[var(--sa-card)] px-6 py-5 transition-colors duration-200 group-hover:bg-[color-mix(in_srgb,var(--color-forest)_5%,var(--sa-card))]'>
                      <div className={cn('flex flex-col px-3 py-2', hoverCelda)}>
                        <p className={cn('flex items-center gap-2 font-bold', hoverTexto)}>
                          <Icon name='calendar' size={18} className={cn(hoverIcono, 'text-[var(--color-forest)]')} />
                          {e.fechaRelativa}
                        </p>
                        <p className='pl-[26px] text-[17px] text-[var(--sa-muted)]'>{e.fechaAbsoluta}</p>
                      </div>
                    </td>
                    <td className='px-6 py-5'>
                      <div className={cn('flex items-center gap-3 px-3 py-2', hoverCelda)}>
                        <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--sa-field)] text-[16px] font-bold text-[var(--color-forest)] transition-transform duration-200 group-hover/celda:scale-105'>{e.actor.nombre.split(' ').slice(0, 2).map((n) => n[0]).join('')}</div>
                        <div>
                          <p className={cn('font-bold', hoverTexto)}>{e.actor.nombre}</p>
                          {e.actor.empleadoId ? <p className='flex items-center gap-1.5 text-[17px] text-[var(--sa-muted)]'><Icon name='id-card' size={15} className={hoverIcono} />ID: {e.actor.empleadoId}</p> : <p className='flex items-center gap-1.5 text-[17px] text-[var(--sa-muted)]'><Icon name='info' size={15} className={hoverIcono} />Origen: No identificado</p>}
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-5'>
                      {critica ? (
                        <span className='inline-flex items-center gap-2 rounded-full border border-transparent bg-[color-mix(in_srgb,#D64545_16%,transparent)] px-3 py-1 text-[17px] font-bold text-[#D64545] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--sa-border)] hover:shadow-sm'>
                          <Icon name='alert-triangle' size={16} className='shrink-0' />
                          {e.actor.rol}
                        </span>
                      ) : (
                        <span className='inline-flex items-center gap-2 rounded-full border border-transparent bg-[var(--sa-field)] px-3 py-1 text-[17px] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--sa-border)] hover:shadow-sm'>
                          <Icon name='user-cog' size={16} className='shrink-0 text-[var(--color-forest)]' />
                          {e.actor.rol}
                        </span>
                      )}
                    </td>
                    <td className='px-6 py-5'>
                      <div className={cn('flex items-start gap-2 px-3 py-2', hoverCelda)}>
                        <Icon name={critica ? 'alert-triangle' : 'zap'} size={18} className={cn(hoverIcono, critica ? 'text-[#D64545]' : 'text-[var(--color-forest)]')} />
                        <p className={cn('leading-snug', hoverTexto)}>{e.accion}</p>
                      </div>
                    </td>
                    <td className='px-6 py-5'>
                      <div className={cn('flex flex-col px-3 py-2', hoverCelda)}>
                        <p className={cn('flex items-center gap-2 font-bold', hoverTexto)}>
                          <Icon name='folder' size={17} className={cn(hoverIcono, 'text-[var(--color-forest)]')} />
                          {e.objeto.titulo}
                        </p>
                        <p className='pl-[25px] text-[17px] text-[var(--sa-muted)]'>{e.objeto.detalle}</p>
                        <p className='pl-[25px] text-[17px] text-[var(--sa-muted)]'>{e.modulo}</p>
                      </div>
                    </td>
                    <td className='px-6 py-5'>
                      <button
                        type='button'
                        onClick={() => setExpandido(expandido === e.id ? null : e.id)}
                        title='Ver detalle de integridad'
                        className='group/celda flex cursor-pointer items-center gap-2 rounded-lg border border-transparent px-3 py-2 font-mono text-[17px] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--sa-border)] hover:bg-[var(--sa-field)] hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
                      >
                        <Icon name='shield-check' size={16} className={cn(hoverIcono, 'text-[var(--color-forest)]')} />
                        <span className={hoverTexto}>{e.hash}</span>
                        <Icon name='clipboard' size={14} className={cn(hoverIcono, 'text-[var(--sa-muted)]')} />
                      </button>
                    </td>
                  </tr>
                  {expandido === e.id ? (
                    <tr className='bg-[var(--sa-field)]'>
                      <td colSpan={6} className='px-10 py-4'>
                        <div className='grid gap-2 text-[18px] sm:grid-cols-2 lg:grid-cols-4'>
                          <p><span className='font-semibold'>Hash previo:</span> <span className='font-mono'>{e.hashPrevio}</span></p>
                          <p><span className='font-semibold'>Hash actual:</span> <span className='font-mono'>{e.hash}</span></p>
                          <p><span className='font-semibold'>Resultado:</span> {e.resultado}</p>
                          <p><span className='font-semibold'>Severidad:</span> {e.severidad}</p>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
      <footer className='flex flex-wrap items-center justify-between gap-4 border-t border-[var(--sa-border)] px-8 py-5'>
        <p className='flex items-center gap-2 text-[19px] text-[var(--sa-muted)]'>
          <Icon name='folder' size={18} />
          Mostrando 1 - 5 de 216 registros forenses sincronizados
        </p>
        <div className='flex items-center gap-2'>
          <button className='inline-flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--sa-border)] transition-colors hover:bg-[var(--sa-field)]'>‹</button>
          <button className='inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-forest)] text-[var(--sa-on-accent)]'>1</button>
          <button className='inline-flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--sa-border)] transition-colors hover:bg-[var(--sa-field)]'>2</button>
          <button className='inline-flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--sa-border)] transition-colors hover:bg-[var(--sa-field)]'>3</button>
          <span className='px-2'>…</span>
          <button className='inline-flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--sa-border)] transition-colors hover:bg-[var(--sa-field)]'>44</button>
          <button className='inline-flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--sa-border)] transition-colors hover:bg-[var(--sa-field)]'>›</button>
        </div>
      </footer>
    </section>
  )
}
