import { Fragment } from 'react'
import { TimelineEntry } from '../molecules/TimelineEntry'
import type { Observacion } from '../types'

interface TimelineProps {
  observaciones: Observacion[]
}

export function Timeline({ observaciones }: TimelineProps) {
  if (observaciones.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--sa-border)] bg-[var(--sa-card)] p-8 text-center text-base font-semibold text-[var(--sa-muted)]">
        No hay observaciones registradas para esta asignatura.
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {observaciones.map((observacion, index) => (
        <Fragment key={observacion.id}>
          <TimelineEntry observacion={observacion} />
          {index < observaciones.length - 1 ? (
            <span className="ml-[43px] h-5 w-0.5 bg-[var(--sa-border)]" aria-hidden="true" />
          ) : null}
        </Fragment>
      ))}
    </div>
  )
}
