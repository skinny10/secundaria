import { useEffect, useId, useState } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { CODIGO_DEMO_2FA } from '../constants/configInicial'
import type { CambioConfig, MetaGuardado } from '../types'
import { cambiosSensibles } from '../utils/diff'

export type ModoModal = 'guardar' | 'descartar' | 'restaurar'

interface ModalConfiguracionProps {
  modo: ModoModal
  cambios: CambioConfig[]
  version: number
  onCerrar: () => void
  onConfirmar: (meta?: MetaGuardado) => void
  actor: string
}

const TITULOS: Record<ModoModal, string> = {
  guardar: 'Confirmar guardado de configuración',
  descartar: 'Descartar cambios sin guardar',
  restaurar: 'Restaurar valores por defecto',
}

export function ModalConfiguracion({
  modo,
  cambios,
  version,
  onCerrar,
  onConfirmar,
  actor,
}: ModalConfiguracionProps) {
  const tituloId = useId()
  const [motivo, setMotivo] = useState('')
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState<string | null>(null)

  const sensible = modo === 'restaurar' || cambiosSensibles(cambios)
  const esConfirmacionSimple = modo === 'descartar'

  useEffect(() => {
    const onKeyDown = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') onCerrar()
    }
    window.addEventListener('keydown', onKeyDown)
    const overflowPrevio = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflowPrevio
    }
  }, [onCerrar])

  const confirmar = () => {
    if (esConfirmacionSimple) {
      onConfirmar()
      return
    }
    if (sensible && motivo.trim().length < 12) {
      setError('Escriba un motivo de al menos 12 caracteres para auditoría.')
      return
    }
    if (sensible && codigo.trim() !== CODIGO_DEMO_2FA) {
      setError('Código 2FA incorrecto. Use el código de demostración 246810.')
      return
    }
    onConfirmar({
      motivo: motivo.trim() || 'Actualización de parámetros operativos no sensibles.',
      actor,
      reautenticado: sensible,
    })
  }

  const titulo =
    modo === 'guardar'
      ? `${TITULOS.guardar} · v${version} → v${version + 1}`
      : TITULOS[modo]

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-[var(--sa-overlay)] p-3 sm:p-6'
      onMouseDown={(evento) => {
        if (evento.target === evento.currentTarget) onCerrar()
      }}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby={tituloId}
        className='flex max-h-[92vh] w-full max-w-[820px] flex-col overflow-hidden rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-[var(--shadow-md)]'
      >
        <header className='flex items-start justify-between gap-4 border-b border-[var(--sa-border)] bg-[var(--sa-modal-header)] px-5 py-4 sm:px-7'>
          <div className='flex min-w-0 items-start gap-3'>
            <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-menta-soft)] text-[var(--color-forest)]'>
              <Icon
                name={modo === 'descartar' ? 'refresh' : modo === 'restaurar' ? 'history' : 'save'}
                size={22}
                aria-hidden='true'
              />
            </span>
            <div className='min-w-0'>
              <h2 id={tituloId} className='text-[23px] leading-tight font-extrabold text-[var(--sa-text)]'>
                {titulo}
              </h2>
              <p className='mt-1 text-[15px] text-[var(--sa-muted)]'>
                {modo === 'guardar'
                  ? 'Revise el resumen antes y después. La operación es idempotente y queda auditada.'
                  : modo === 'restaurar'
                    ? 'Se aplicarán los valores de fábrica del plantel y se incrementará la versión.'
                    : 'Los cambios locales se perderán y se restaurará la última versión guardada.'}
              </p>
            </div>
          </div>
          <button
            type='button'
            onClick={onCerrar}
            aria-label='Cerrar diálogo'
            className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--sa-border)] hover:bg-[var(--sa-field)]'
          >
            <Icon name='x' size={18} aria-hidden='true' />
          </button>
        </header>

        <div className='flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-5 sm:px-7'>
          {esConfirmacionSimple ? (
            <p className='rounded-xl bg-[var(--semaforo-amarillo-bg)] px-4 py-3 text-[16px] font-semibold text-[var(--semaforo-amarillo-fg)]'>
              Hay {cambios.length} {cambios.length === 1 ? 'cambio' : 'cambios'} sin guardar. Si
              descarta, volverá a la versión v{version} registrada.
            </p>
          ) : (
            <>
              <div className='flex flex-wrap items-center justify-between gap-2'>
                <p className='text-[16px] font-bold text-[var(--sa-text)]'>
                  {cambios.length} {cambios.length === 1 ? 'cambio detectado' : 'cambios detectados'}
                </p>
                {sensible ? (
                  <span className='inline-flex items-center gap-1.5 rounded-full bg-[var(--semaforo-rojo-bg)] px-3 py-1 text-[13px] font-bold text-[var(--semaforo-rojo-fg)]'>
                    <Icon name='lock' size={14} aria-hidden='true' />
                    Requiere motivo y 2FA
                  </span>
                ) : null}
              </div>

              {cambios.length > 0 ? (
                <ul className='flex max-h-[280px] flex-col gap-2 overflow-y-auto pr-1'>
                  {cambios.map((cambio) => (
                    <li
                      key={cambio.ruta}
                      className='rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] px-4 py-3'
                    >
                      <p className='text-[15px] font-bold text-[var(--sa-text)]'>{cambio.etiqueta}</p>
                      <div className='mt-1.5 flex flex-wrap items-center gap-2 text-[15px]'>
                        <span className='rounded bg-[var(--semaforo-rojo-bg)] px-2 py-0.5 text-[var(--semaforo-rojo-fg)] line-through'>
                          {cambio.antes}
                        </span>
                        <Icon
                          name='arrow-right'
                          size={15}
                          color='var(--sa-muted)'
                          aria-hidden='true'
                        />
                        <span className='rounded bg-[var(--semaforo-verde-bg)] px-2 py-0.5 font-bold text-[var(--semaforo-verde-fg)]'>
                          {cambio.despues}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='rounded-xl bg-[var(--sa-field)] px-4 py-3 text-[16px] text-[var(--sa-muted)]'>
                  No hay diferencias que aplicar.
                </p>
              )}

              <div className='flex flex-col gap-1.5'>
                <label htmlFor='motivo-cambio' className='text-[16px] font-bold text-[var(--sa-text)]'>
                  Motivo del cambio {sensible ? '' : '(opcional)'}
                </label>
                <textarea
                  id='motivo-cambio'
                  value={motivo}
                  onChange={(evento) => setMotivo(evento.target.value)}
                  rows={3}
                  maxLength={240}
                  autoFocus={sensible}
                  placeholder='Ej. Actualización de la jornada vespertina autorizada por la Dirección.'
                  className='min-h-[92px] rounded-xl border border-[var(--sa-input-border)] bg-[var(--sa-field)] px-3 py-3 text-[17px] text-[var(--color-text-primary)] outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
                />
                <p className='text-[14px] text-[var(--sa-muted)]'>
                  {sensible
                    ? 'Mínimo 12 caracteres. Se almacena en la bitácora inmutable.'
                    : 'Se recomienda documentar el cambio para la bitácora.'}
                </p>
              </div>

              {sensible ? (
                <div className='flex flex-col gap-1.5'>
                  <label htmlFor='codigo-2fa' className='text-[16px] font-bold text-[var(--sa-text)]'>
                    Código de reautenticación 2FA
                  </label>
                  <input
                    id='codigo-2fa'
                    value={codigo}
                    onChange={(evento) => setCodigo(evento.target.value.replace(/\D/g, '').slice(0, 6))}
                    inputMode='numeric'
                    autoComplete='one-time-code'
                    maxLength={6}
                    placeholder='000000'
                    className='min-h-[56px] max-w-[240px] rounded-xl border border-[var(--sa-input-border)] bg-[var(--sa-field)] px-3 font-mono text-[22px] tracking-[0.35em] text-[var(--color-text-primary)] outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
                  />
                  <p className='text-[14px] text-[var(--sa-muted)]'>
                    Código de demostración: <span className='font-bold'>{CODIGO_DEMO_2FA}</span>.
                    En producción se envía al dispositivo registrado del director.
                  </p>
                </div>
              ) : null}
            </>
          )}

          {error ? (
            <p
              role='alert'
              className='flex items-start gap-2 rounded-xl bg-[var(--semaforo-rojo-bg)] px-4 py-3 text-[15px] font-semibold text-[var(--semaforo-rojo-fg)]'
            >
              <Icon name='alert-triangle' size={17} className='mt-0.5 shrink-0' />
              {error}
            </p>
          ) : null}
        </div>

        <footer className='flex flex-wrap items-center justify-end gap-3 border-t border-[var(--sa-border)] bg-[var(--sa-modal-footer)] px-5 py-4 sm:px-7'>
          <button
            type='button'
            onClick={onCerrar}
            className='inline-flex min-h-[52px] items-center rounded-xl border border-[var(--sa-border)] px-5 text-[17px] font-semibold hover:bg-[var(--sa-field)]'
          >
            Cancelar
          </button>
          <button
            type='button'
            onClick={confirmar}
            className='inline-flex min-h-[52px] items-center gap-2 rounded-xl bg-[var(--color-forest)] px-6 text-[17px] font-bold text-[var(--sa-on-accent)] hover:brightness-95'
          >
            <Icon
              name={modo === 'descartar' ? 'refresh' : modo === 'restaurar' ? 'history' : 'save'}
              size={19}
              aria-hidden='true'
            />
            {modo === 'guardar'
              ? 'Guardar y aplicar'
              : modo === 'restaurar'
                ? 'Restaurar y auditar'
                : 'Descartar cambios'}
          </button>
        </footer>
      </div>
    </div>
  )
}
