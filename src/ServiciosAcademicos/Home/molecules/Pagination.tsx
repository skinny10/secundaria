import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { homeContent } from '../constants/homeContent'

export function Pagination() {
  const { summary, prev, next, pages, activePage } = homeContent.pagination

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-lg text-[var(--sa-muted)]">{summary}</p>
      <nav aria-label="Paginación de expedientes" className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="inline-flex min-h-[44px] items-center gap-1 rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-base font-semibold text-[var(--sa-muted)] hover:bg-[var(--sa-field)]"
        >
          <Icon name="chevron-left" size={16} color="currentColor" />
          {prev}
        </button>
        {pages.map((page) => {
          const isActive = page === activePage
          return (
            <button
              key={page}
              type="button"
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center rounded-[12px] text-base font-bold',
                isActive
                  ? 'bg-[var(--color-forest)] text-[var(--sa-on-accent)]'
                  : 'border border-[var(--sa-border)] bg-[var(--sa-card)] text-[var(--sa-muted)] hover:bg-[var(--sa-field)]'
              )}
            >
              {page}
            </button>
          )
        })}
        <button
          type="button"
          className="inline-flex min-h-[44px] items-center gap-1 rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-base font-semibold text-[var(--sa-muted)] hover:bg-[var(--sa-field)]"
        >
          {next}
          <Icon name="chevron-right" size={16} color="currentColor" />
        </button>
      </nav>
    </div>
  )
}
