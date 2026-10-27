import { ObservationForm } from '../organisms/ObservationForm'
import type { BitacoraAlumno, Observacion } from '../types'

interface RegistrarObservacionPageProps {
  alumno: BitacoraAlumno
  onAdd: (observacion: Observacion) => void
}

export function RegistrarObservacionPage({ alumno, onAdd }: RegistrarObservacionPageProps) {
  return (
    <section
      aria-label="Registrar nueva observación de aula"
      className="overflow-hidden rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-[var(--shadow-sm)]"
    >
      <ObservationForm alumno={alumno} variant="page" titleId="obs-page-title" onSave={onAdd} />
    </section>
  )
}
