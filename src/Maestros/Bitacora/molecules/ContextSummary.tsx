import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { observacionModal } from '../constants/observacionModal'
import type { BitacoraAlumno } from '../types'

interface ContextSummaryProps {
  alumno: BitacoraAlumno
  large?: boolean
}

export function ContextSummary({ alumno, large }: ContextSummaryProps) {
  const { context } = observacionModal

  return (
    <div
      className={cn(
        'grid grid-cols-1 rounded-2xl bg-[var(--sa-context)] md:grid-cols-2',
        large ? 'gap-6 p-7' : 'gap-4 p-5'
      )}
    >
      <div className={cn('flex items-center', large ? 'gap-5' : 'gap-4')}>
        <span
          className={cn(
            'flex shrink-0 items-center justify-center rounded-[12px] bg-[var(--color-forest)] font-extrabold text-[var(--sa-on-accent)]',
            large ? 'h-20 w-20 text-3xl' : 'h-14 w-14 text-lg'
          )}
        >
          {alumno.initials}
        </span>
        <div className="min-w-0">
          <p
            className={cn(
              'font-extrabold tracking-wide text-[var(--sa-accent)] uppercase',
              large ? 'text-base' : 'text-[13px]'
            )}
          >
            {context.studentLabel}
          </p>
          <p
            className={cn(
              'truncate font-bold text-[var(--color-text-primary)]',
              large ? 'text-xl' : 'text-base'
            )}
            title={alumno.name}
          >
            {alumno.name}
          </p>
          <p
            className={cn(
              'mt-1 flex flex-wrap items-center gap-2 text-[var(--sa-muted)]',
              large ? 'text-lg' : 'text-base'
            )}
          >
            <span className="font-semibold">2° B Turno Vespertino ·</span>
            <span
              className={cn(
                'rounded-full bg-[var(--sa-chip-gray)] font-bold text-[var(--sa-chip-gray-text)]',
                large ? 'px-3 py-1.5 text-base' : 'px-2.5 py-1 text-[13px]'
              )}
            >
              {context.matricula}
            </span>
          </p>
        </div>
      </div>

      <div className={cn('flex items-center rounded-xl bg-[var(--sa-card)]', large ? 'gap-4 px-5 py-4' : 'gap-3 px-4 py-3')}>
        <Icon name={context.specialistIcon} size={large ? 32 : 24} color="var(--sa-steel)" />
        <div className="min-w-0">
          <p
            className={cn(
              'font-extrabold tracking-wide text-[var(--sa-steel)] uppercase',
              large ? 'text-base' : 'text-[13px]'
            )}
          >
            {context.specialistLabel}
          </p>
          <p
            className={cn(
              'truncate font-bold text-[var(--color-text-primary)]',
              large ? 'text-lg' : 'text-base'
            )}
          >
            {context.specialistName}
          </p>
          <p className={cn('truncate text-[var(--sa-muted)]', large ? 'text-lg' : 'text-base')}>
            {context.specialistArea}
          </p>
        </div>
      </div>
    </div>
  )
}
