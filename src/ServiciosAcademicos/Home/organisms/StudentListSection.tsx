import { Icon } from '../../../utils/atoms/Icon'
import { Pagination } from '../molecules/Pagination'
import { StudentCard } from './StudentCard'
import { homeContent } from '../constants/homeContent'
import type { Student } from '../types'

interface StudentListSectionProps {
  students: Student[]
}

export function StudentListSection({ students }: StudentListSectionProps) {
  const { title, subtitle, validated } = homeContent.list

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-extrabold">{title}</h2>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--sa-field)] px-3 py-1 text-sm font-bold text-[var(--sa-muted)]">
            <Icon name={validated.icon} size={14} color="currentColor" />
            {validated.label}
          </span>
        </div>
        <p className="text-lg text-[var(--sa-muted)]">{subtitle}</p>
      </div>

      <div className="flex flex-col gap-5">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

      <Pagination />
    </section>
  )
}
