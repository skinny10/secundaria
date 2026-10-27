import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { Filtro, FiltroId } from '../types'

interface FilterPillsProps {
  filters: Filtro[]
  active: FiltroId
  count: number
  onChange: (id: FiltroId) => void
}

export function FilterPills({ filters, active, count, onChange }: FilterPillsProps) {
  return (
    <div className="sa-no-print flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[13px] font-extrabold tracking-wide text-[var(--sa-muted)] uppercase">
          Filtrar historial por asignatura:
        </span>
        {filters.map((filter) => {
          const isActive = filter.id === active
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(filter.id)}
              className={cn(
                'inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-bold transition-colors',
                isActive
                  ? 'bg-[var(--color-forest)] text-[var(--sa-on-accent)] shadow-[var(--shadow-sm)]'
                  : 'border border-[var(--sa-border)] bg-[var(--sa-card)] text-[var(--color-text-primary)] hover:bg-[var(--sa-field)]'
              )}
            >
              <Icon name={filter.icon} size={15} color="currentColor" />
              {filter.label}
            </button>
          )
        })}
      </div>
      <span className="text-sm font-semibold text-[var(--sa-muted)]">
        {count} {count === 1 ? 'registro reciente visible' : 'registros recientes visibles'}
      </span>
    </div>
  )
}
