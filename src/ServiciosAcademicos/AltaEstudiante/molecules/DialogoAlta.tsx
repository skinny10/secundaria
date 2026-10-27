import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import type { IconName } from '../../../utils/types'

interface DialogoAltaProps {
  tituloId: string
  descripcionId: string
  titulo: string
  descripcion: string
  icono: IconName
  onCerrar: () => void
  cerrarDeshabilitado?: boolean
  children?: ReactNode
  footer: ReactNode
  ancho?: 'sm' | 'md'
}

export function DialogoAlta({
  tituloId,
  descripcionId,
  titulo,
  descripcion,
  icono,
  onCerrar,
  cerrarDeshabilitado,
  children,
  footer,
  ancho = 'md',
}: DialogoAltaProps) {
  const dialogoRef = useRef<HTMLElement | null>(null)
  const cerrarRef = useRef(onCerrar)

  useEffect(() => {
    cerrarRef.current = onCerrar
  }, [onCerrar])

  useEffect(() => {
    const disparador =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    const overflowOriginal = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const enfocarInicial = () => {
      const contenido = dialogoRef.current
      if (!contenido) return
      const objetivo =
        contenido.querySelector<HTMLElement>('[data-autofocus]') ??
        contenido.querySelector<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      objetivo?.focus()
    }
    const temporizador = window.setTimeout(enfocarInicial, 20)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        if (!cerrarDeshabilitado) cerrarRef.current()
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
      window.clearTimeout(temporizador)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflowOriginal
      if (disparador?.isConnected) disparador.focus()
    }
  }, [cerrarDeshabilitado])

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-[var(--sa-overlay)] p-4'
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !cerrarDeshabilitado) onCerrar()
      }}
    >
      <section
        ref={dialogoRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby={tituloId}
        aria-describedby={descripcionId}
        className={`flex max-h-[92vh] w-full ${ancho === 'sm' ? 'max-w-[520px]' : 'max-w-[680px]'} min-w-0 flex-col gap-4 overflow-y-auto rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-md)] sm:p-6`}
      >
        <div className='flex items-start justify-between gap-3'>
          <div className='flex min-w-0 items-start gap-3'>
            <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-menta-soft)] text-[var(--sa-on-menta-soft)]'>
              <Icon name={icono} size={22} color='currentColor' />
            </span>
            <div className='min-w-0'>
              <h2 id={tituloId} className='text-[20px] leading-tight font-extrabold break-words'>
                {titulo}
              </h2>
              <p
                id={descripcionId}
                className='mt-1 text-[14px] leading-relaxed text-[var(--sa-muted)]'
              >
                {descripcion}
              </p>
            </div>
          </div>
          <button
            type='button'
            onClick={onCerrar}
            disabled={cerrarDeshabilitado}
            aria-label='Cerrar diálogo'
            className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] hover:bg-[var(--sa-field)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)] disabled:opacity-50'
          >
            <Icon name='x' size={17} color='currentColor' />
          </button>
        </div>

        {children ? <div className='min-w-0'>{children}</div> : null}

        <div className='flex min-w-0 flex-wrap items-center justify-end gap-2 border-t border-[var(--sa-border)] pt-4'>
          {footer}
        </div>
      </section>
    </div>
  )
}
