import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { dialogoTransferencia, textosLista } from '../constants/padronContent'
import { nombreCompleto } from '../constants/padronData'
import type { Estudiante } from '../types'

interface DialogoTransferenciaProps {
  estudiante: Estudiante
  onCerrar: () => void
  onConfirmar: (motivo: string, notas: string) => void
}

export function DialogoTransferencia({
  estudiante,
  onCerrar,
  onConfirmar,
}: DialogoTransferenciaProps) {
  const [motivo, setMotivo] = useState('')
  const [notas, setNotas] = useState('')
  const [errores, setErrores] = useState<{ motivo?: string; notas?: string }>({})
  const selectRef = useRef<HTMLSelectElement | null>(null)
  const dialogoRef = useRef<HTMLElement | null>(null)
  const nombre = nombreCompleto(estudiante)

  useEffect(() => {
    const disparador =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    selectRef.current?.focus()
    const overflowOriginal = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCerrar()
        return
      }
      if (event.key !== 'Tab') return

      const dialogo = dialogoRef.current
      if (!dialogo) return
      const enfocables = Array.from(
        dialogo.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), select:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((elemento) => elemento.getClientRects().length > 0)

      if (enfocables.length === 0) {
        event.preventDefault()
        return
      }

      const primero = enfocables[0]
      const ultimo = enfocables[enfocables.length - 1]
      const activo = document.activeElement
      const fueraDelDialogo = !dialogo.contains(activo)

      if (event.shiftKey && (activo === primero || fueraDelDialogo)) {
        event.preventDefault()
        ultimo.focus()
      } else if (!event.shiftKey && (activo === ultimo || fueraDelDialogo)) {
        event.preventDefault()
        primero.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflowOriginal
      if (disparador?.isConnected && !('disabled' in disparador && disparador.disabled)) {
        disparador.focus()
      } else {
        document.querySelector<HTMLElement>('[aria-current="page"]')?.focus()
      }
    }
  }, [onCerrar])

  const enviar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const siguientesErrores: { motivo?: string; notas?: string } = {}
    if (!motivo) siguientesErrores.motivo = dialogoTransferencia.errorMotivo
    if (!notas.trim()) siguientesErrores.notas = dialogoTransferencia.errorNotas
    setErrores(siguientesErrores)
    if (Object.keys(siguientesErrores).length > 0) return
    onConfirmar(motivo, notas.trim())
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-[var(--sa-overlay)] p-4'
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCerrar()
      }}
    >
      <section
        ref={dialogoRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby='titulo-transferencia'
        aria-describedby='descripcion-transferencia'
        className='flex max-h-[90vh] w-full max-w-[560px] min-w-0 flex-col gap-4 overflow-y-auto rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-md)]'
      >
        <div className='flex items-start justify-between gap-3'>
          <div className='flex min-w-0 items-start gap-3'>
            <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-menta-soft)] text-[var(--sa-on-menta-soft)]'>
              <Icon name='share' size={22} color='currentColor' />
            </span>
            <div className='min-w-0'>
              <h2 id='titulo-transferencia' className='text-[18px] leading-tight font-extrabold'>
                {dialogoTransferencia.titulo}
              </h2>
              <p
                id='descripcion-transferencia'
                className='mt-1 text-[13px] leading-relaxed text-[var(--sa-muted)]'
              >
                {dialogoTransferencia.descripcion}
              </p>
            </div>
          </div>
          <button
            type='button'
            onClick={onCerrar}
            aria-label={dialogoTransferencia.ariaCerrar}
            className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)]'
          >
            <Icon name='x' size={16} color='currentColor' />
          </button>
        </div>

        <div className='flex flex-wrap items-center gap-2 rounded-xl bg-[var(--sa-field)] px-3 py-2.5'>
          <Icon name='id-card' size={16} color='var(--sa-muted)' className='shrink-0' />
          <span className='text-[13px] font-bold'>{nombre}</span>
          <span className='text-[12px] text-[var(--sa-muted)]'>
            {textosLista.matricula(estudiante.matricula)}
          </span>
        </div>

        <form className='flex min-w-0 flex-col gap-4' onSubmit={enviar} noValidate>
          <div className='flex min-w-0 flex-col gap-1.5'>
            <label htmlFor='motivo-transferencia' className='text-[12px] font-bold'>
              {dialogoTransferencia.motivoLabel}
            </label>
            <select
              ref={selectRef}
              id='motivo-transferencia'
              value={motivo}
              onChange={(event) => {
                setMotivo(event.target.value)
                setErrores((previos) => ({ ...previos, motivo: undefined }))
              }}
              aria-invalid={Boolean(errores.motivo)}
              aria-describedby={errores.motivo ? 'error-motivo-transferencia' : undefined}
              className='h-11 w-full min-w-0 rounded-xl border border-[var(--sa-input-border)] bg-[var(--sa-card)] px-3 text-[13px]'
            >
              <option value=''>{dialogoTransferencia.motivoPlaceholder}</option>
              {dialogoTransferencia.motivos.map((opcion) => (
                <option key={opcion} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
            {errores.motivo ? (
              <p
                id='error-motivo-transferencia'
                role='alert'
                className='text-[12px] font-semibold text-[var(--sa-danger)]'
              >
                {errores.motivo}
              </p>
            ) : null}
          </div>

          <div className='flex min-w-0 flex-col gap-1.5'>
            <label htmlFor='notas-transferencia' className='text-[12px] font-bold'>
              {dialogoTransferencia.notasLabel}
            </label>
            <textarea
              id='notas-transferencia'
              value={notas}
              onChange={(event) => {
                setNotas(event.target.value)
                setErrores((previos) => ({ ...previos, notas: undefined }))
              }}
              placeholder={dialogoTransferencia.notasPlaceholder}
              aria-invalid={Boolean(errores.notas)}
              aria-describedby={errores.notas ? 'error-notas-transferencia' : undefined}
              rows={3}
              className='min-h-[88px] w-full min-w-0 resize-y rounded-xl border border-[var(--sa-input-border)] bg-[var(--sa-card)] px-3 py-2 text-[13px]'
            />
            {errores.notas ? (
              <p
                id='error-notas-transferencia'
                role='alert'
                className='text-[12px] font-semibold text-[var(--sa-danger)]'
              >
                {errores.notas}
              </p>
            ) : null}
          </div>

          <div className='flex flex-wrap justify-end gap-2'>
            <button
              type='button'
              onClick={onCerrar}
              className='inline-flex min-h-[44px] items-center rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-4 text-[13px] font-bold text-[var(--sa-muted)] hover:bg-[var(--sa-field)]'
            >
              {dialogoTransferencia.cancelar}
            </button>
            <button
              type='submit'
              className='inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[var(--color-forest)] px-4 text-[13px] font-bold text-[var(--sa-on-accent)] hover:brightness-95'
            >
              <Icon name='share' size={16} color='currentColor' />
              {dialogoTransferencia.confirmar}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
