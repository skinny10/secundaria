import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type TonoMensaje = 'exito' | 'alerta' | 'info'

const tonosMensaje: Record<TonoMensaje, string> = {
  exito: 'bg-[var(--sa-menta)] text-[var(--sa-on-menta)]',
  alerta: 'bg-[var(--sa-coffee)] text-[var(--sa-on-accent)]',
  info: 'bg-[var(--sa-field)] text-[var(--sa-muted)]',
}

interface MensajeEstadoProps {
  children: ReactNode
  tono?: TonoMensaje
}

export function MensajeEstado({ children, tono = 'exito' }: MensajeEstadoProps) {
  return (
    <p
      role='status'
      className={cn(
        'rounded-xl border border-[var(--sa-border)] px-3 py-2 text-[12px] font-semibold',
        tonosMensaje[tono]
      )}
    >
      {children}
    </p>
  )
}
