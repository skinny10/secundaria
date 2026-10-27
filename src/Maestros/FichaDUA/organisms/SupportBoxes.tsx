import { DiagnosticCard } from '../molecules/DiagnosticCard'
import { PsychologistCard } from '../molecules/PsychologistCard'
import type { FichaAlumno } from '../types'

interface SupportBoxesProps {
  alumno: FichaAlumno
}

export function SupportBoxes({ alumno }: SupportBoxesProps) {
  return (
    <section
      aria-label="Soporte clínico y psicológico"
      className="grid grid-cols-1 gap-4 lg:grid-cols-2"
    >
      <DiagnosticCard diagnostic={alumno.diagnostic} />
      <PsychologistCard psychologist={alumno.psychologist} />
    </section>
  )
}
