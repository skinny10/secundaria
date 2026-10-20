import { Icon } from '../../../utils/atoms/Icon'
import { ProgressRing } from '../atoms/ProgressRing'
import { bitacoraContent } from '../constants/bitacoraContent'

export function SummaryCard() {
  const { summary } = bitacoraContent

  return (
    <article className="rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <div className="flex items-center gap-5">
          <ProgressRing value={summary.value} />
          <div>
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-[var(--color-text-primary)]">
              <Icon name={summary.icon} size={20} color="var(--sa-accent)" />
              {summary.title}
            </h3>
            <p className="mt-1 text-lg text-[var(--sa-muted)]">{summary.body}</p>
          </div>
        </div>

        <div className="sa-no-print flex flex-wrap gap-3 lg:ml-auto">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] px-5 text-base font-bold text-[var(--color-text-primary)] hover:brightness-95"
          >
            <Icon name={summary.print.icon} size={17} color="currentColor" />
            {summary.print.label}
          </button>
          <button
            type="button"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[var(--sa-slate)] px-5 text-base font-bold text-[var(--sa-on-accent)] hover:brightness-95"
          >
            <Icon name={summary.share.icon} size={17} color="currentColor" />
            {summary.share.label}
          </button>
        </div>
      </div>
    </article>
  )
}
