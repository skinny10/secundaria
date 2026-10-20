import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { Student } from '../types'
import { homeContent } from '../constants/homeContent'
import { ActionButton } from '../../shared/atoms/ActionButton'
import { AdjustmentCard } from '../molecules/AdjustmentCard'
import { Avatar } from '../../shared/atoms/Avatar'
import { ConditionPill } from '../../shared/atoms/ConditionPill'

const numberClasses = {
  forest: 'bg-[var(--color-forest)] text-[var(--sa-on-accent)]',
  slate: 'bg-[var(--sa-slate)] text-[var(--sa-on-accent)]',
  coffee: 'bg-[var(--sa-coffee)] text-[var(--sa-on-accent)]',
} as const

interface StudentCardProps {
  student: Student
}

export function StudentCard({ student }: StudentCardProps) {
  const { adjustmentsLabel, addNote, viewFicha } = homeContent.studentCard

  return (
    <article className="flex flex-col gap-5 rounded-[16px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Avatar
            initials={student.initials}
            tone={student.tone}
            ariaLabel={`Avatar de ${student.name}`}
          />
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--sa-sky)] px-3 py-1 text-sm font-bold text-[var(--sa-slate)]">
                MATRÍCULA: {student.matricula}
              </span>
              <span className="rounded-full bg-[var(--sa-field)] px-3 py-1 text-sm font-bold text-[var(--sa-muted)]">
                {student.salon}
              </span>
            </div>
            <h3 className="text-[28px] font-extrabold leading-tight">{student.name}</h3>
          </div>
        </div>
        <ConditionPill
          label={student.condition.label}
          icon={student.condition.icon}
          tone={student.condition.tone}
          className="w-fit sm:shrink-0"
        />
      </header>

      <section className="flex flex-col gap-3 rounded-[14px] bg-[var(--sa-field)] p-4">
        <div className="flex items-center gap-2 text-[var(--sa-accent)]">
          <Icon name="clipboard-check" size={18} color="currentColor" />
          <h4 className="text-base font-extrabold">{adjustmentsLabel}</h4>
        </div>
        <div
          className={cn(
            'grid grid-cols-1 gap-3',
            student.adjustments.length >= 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2'
          )}
        >
          {student.adjustments.map((adjustment, index) => (
            <AdjustmentCard
              key={adjustment.title}
              index={index + 1}
              title={adjustment.title}
              description={adjustment.description}
              numberClass={numberClasses[student.actionTone]}
            />
          ))}
        </div>
      </section>

      <div className="flex items-center gap-2 text-lg text-[var(--sa-muted)]">
        <Icon name={student.tracking.icon} size={18} color="currentColor" />
        <span>{student.tracking.text}</span>
      </div>

      <div className="flex flex-wrap gap-3">
        <ActionButton label={addNote.label} icon={addNote.icon} variant="neutral" />
        <ActionButton label={viewFicha} variant="solid" tone={student.actionTone} />
      </div>
    </article>
  )
}
