import { Icon } from '../../../utils/atoms/Icon'
import type { Metric } from '../types'
import { cn } from '../../../utils/cn'
import { softToneClasses } from '../../shared/atoms/toneStyles'

const chipClasses = 'bg-[var(--sa-peach)] text-[var(--sa-coffee)]'

interface MetricCardProps {
  metric: Metric
}

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-[16px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)]">
      <span
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-[14px]',
          softToneClasses[metric.tone]
        )}
        aria-hidden="true"
      >
        <Icon name={metric.icon} size={24} color="currentColor" />
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-[var(--sa-muted)]">{metric.title}</h3>
        <p className="text-xl font-extrabold text-[var(--sa-accent)]">{metric.value}</p>
        <p className="text-lg text-[var(--sa-muted)]">{metric.description}</p>
        {metric.chip ? (
          <span
            className={cn(
              'mt-1 inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-bold',
              chipClasses
            )}
          >
            {metric.chip.label}
          </span>
        ) : null}
      </div>
    </article>
  )
}
