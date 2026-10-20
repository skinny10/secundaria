import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'

interface StepCardProps {
  activo: boolean
  numero: string
  etiqueta: string
  titulo: string
  onClick: () => void
}

export function StepCard({ activo, numero, etiqueta, titulo, onClick }: StepCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-full w-full items-center gap-3 rounded-xl border px-5 py-4 text-left transition-colors',
        activo
          ? 'border-[var(--color-forest)] bg-[var(--sa-menta)]'
          : 'border-[var(--sa-border)] bg-[var(--sa-field)]',
      )}
      aria-current={activo ? 'step' : undefined}
    >
      <span
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-bold',
          activo ? 'bg-[var(--color-forest)] text-white' : 'bg-[var(--sa-border)] text-[var(--sa-muted)]',
        )}
      >
        {numero}
      </span>
      <div className="min-w-0 flex-1">
        <span
          className={cn(
            'text-[10px] font-bold uppercase tracking-widest',
            activo ? 'text-[var(--color-forest)]' : 'text-[var(--sa-muted)]',
          )}
        >
          {etiqueta}
        </span>
        <h3
        className={cn(
          'truncate text-base font-bold',
          activo ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-primary)]',
        )}
          title={titulo}
        >
          {titulo}
        </h3>
      </div>
      <Icon
        name={activo ? 'chevron-right' : 'more-horizontal'}
        size={18}
        color={activo ? 'var(--color-forest)' : 'var(--sa-muted)'}
      />
    </button>
  )
}
