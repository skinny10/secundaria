import { Icon } from '../../../utils/atoms/Icon'
import type { FichaAlumno } from '../types'

interface DiagnosticCardProps {
  diagnostic: FichaAlumno['diagnostic']
}

export function DiagnosticCard({ diagnostic }: DiagnosticCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-[14px] bg-[var(--sa-field)] p-5">
      <div className="flex items-center gap-2 text-[var(--sa-accent)]">
        <Icon name={diagnostic.icon} size={18} color="currentColor" />
        <span className="text-sm font-extrabold uppercase tracking-wide">{diagnostic.label}</span>
      </div>
      <p className="text-base font-extrabold">{diagnostic.value}</p>
      <p className="text-lg text-[var(--sa-muted)]">{diagnostic.detail}</p>
    </div>
  )
}
