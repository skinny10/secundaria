import { useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import { ObservationForm } from './ObservationForm'
import type { BitacoraAlumno, Observacion } from '../types'

interface RegisterObservationModalProps {
  alumno: BitacoraAlumno
  onClose: () => void
  onSave: (observacion: Observacion) => void
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function RegisterObservationModal({
  alumno,
  onClose,
  onSave,
}: RegisterObservationModalProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const node = containerRef.current
    const getFocusable = () =>
      node ? Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)) : []

    getFocusable()[0]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab') return

      const items = getFocusable()
      if (items.length === 0) return
      const firstItem = items[0]
      const lastItem = items[items.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === firstItem) {
        event.preventDefault()
        lastItem.focus()
      } else if (!event.shiftKey && active === lastItem) {
        event.preventDefault()
        firstItem.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      previous?.focus()
    }
  }, [])

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div
      onMouseDown={handleOverlayMouseDown}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{ background: 'var(--sa-overlay)', backdropFilter: 'blur(4px)' }}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="obs-modal-title"
        className="sa-modal my-6 flex flex-col overflow-hidden rounded-2xl bg-[var(--sa-card)] shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
        style={{ width: 'min(896px, calc(100% - 32px))', maxHeight: 'calc(100vh - 48px)' }}
      >
        <ObservationForm
          alumno={alumno}
          variant="modal"
          titleId="obs-modal-title"
          onSave={onSave}
          onClose={onClose}
        />
      </div>
    </div>
  )
}
