import { ProfileIdentity } from '../molecules/ProfileIdentity'
import { PriorityCard } from '../molecules/PriorityCard'
import type { FichaAlumno } from '../types'

interface ProfileCardProps {
  alumno: FichaAlumno
}

export function ProfileCard({ alumno }: ProfileCardProps) {
  return (
    <section
      aria-label="Perfil del alumno"
      className="rounded-[16px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)]"
    >
      <div className="flex flex-col gap-5 rounded-[14px] bg-[var(--sa-header)] p-5 lg:flex-row lg:items-center lg:justify-between">
        <ProfileIdentity alumno={alumno} />
        <PriorityCard label={alumno.priority.label} value={alumno.priority.value} />
      </div>
    </section>
  )
}
