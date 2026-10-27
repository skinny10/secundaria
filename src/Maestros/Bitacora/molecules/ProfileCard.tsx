import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../shared/atoms/Chip'
import type { BitacoraAlumno } from '../types'

interface ProfileCardProps {
  alumno: BitacoraAlumno
}

export function ProfileCard({ alumno }: ProfileCardProps) {
  return (
    <article className="rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <span className="flex h-[72px] w-[72px] items-center justify-center rounded-[12px] bg-[var(--sa-avatar)] text-2xl font-extrabold text-white">
              {alumno.initials}
            </span>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-forest)] px-2.5 py-0.5 text-[13px] font-extrabold whitespace-nowrap text-[var(--sa-on-accent)] shadow-[var(--shadow-sm)]">
              {alumno.duaTag}
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              {alumno.chips.map((chip) => (
                <Chip key={chip.label} label={chip.label} tone={chip.tone} />
              ))}
            </div>
            <h2
              className="mt-2 truncate text-2xl font-extrabold text-[var(--color-text-primary)]"
              title={alumno.name}
            >
              {alumno.name}
            </h2>
            <p className="text-lg font-semibold text-[var(--sa-muted)]">{alumno.grupo}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-xl bg-[var(--sa-field)] px-5 py-4 sm:grid-cols-2 sm:gap-8 lg:ml-auto">
          {alumno.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-[13px] font-extrabold tracking-wide text-[var(--sa-muted)] uppercase">
                {stat.label}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-base font-extrabold text-[var(--color-text-primary)]">
                {stat.check ? (
                  <Icon name="check" size={16} color="var(--sa-accent)" />
                ) : null}
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
