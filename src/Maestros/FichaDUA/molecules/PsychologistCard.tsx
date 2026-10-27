import { Icon } from '../../../utils/atoms/Icon'
import { ActionButton } from '../../shared/atoms/ActionButton'
import type { FichaAlumno } from '../types'

interface PsychologistCardProps {
  psychologist: FichaAlumno['psychologist']
}

export function PsychologistCard({ psychologist }: PsychologistCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-[14px] bg-[var(--sa-field)] p-5">
      <div className="flex items-center gap-2 text-[var(--sa-accent)]">
        <Icon name={psychologist.icon} size={18} color="currentColor" />
        <span className="text-sm font-extrabold uppercase tracking-wide">
          {psychologist.label}
        </span>
      </div>
      <p className="text-base font-extrabold">{psychologist.name}</p>
      <div className="mt-1 flex flex-wrap gap-3">
        <ActionButton
          label={psychologist.call.label}
          icon={psychologist.call.icon}
          variant="solid"
          tone="forest"
        />
        <ActionButton
          label={psychologist.message.label}
          icon={psychologist.message.icon}
          variant="neutral"
        />
      </div>
    </div>
  )
}
