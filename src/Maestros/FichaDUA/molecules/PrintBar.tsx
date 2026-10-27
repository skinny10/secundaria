import { Icon } from '../../../utils/atoms/Icon'
import { fichaContent } from '../constants/fichaContent'

export function PrintBar() {
  const { icon, title, subtitle, history, print } = fichaContent.print

  return (
    <section className="sa-no-print flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-4 rounded-[16px] bg-[var(--sa-field)] px-5 py-4">
      <div className="flex min-w-0 grow shrink basis-[320px] items-center gap-[14px]">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[var(--sa-card)] text-[var(--sa-accent)]"
          aria-hidden="true"
        >
          <Icon name={icon} size={24} color="currentColor" />
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="text-[16px] font-bold leading-[1.3]">{title}</h3>
          <p className="text-lg leading-[1.5] text-[var(--sa-muted)]">{subtitle}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 max-[899px]:w-full min-[900px]:flex-none">
        <button
          type="button"
          className="inline-flex h-11 grow shrink basis-full items-center justify-center gap-2 whitespace-nowrap rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] px-[18px] text-sm font-bold text-[var(--color-text-primary)] hover:bg-[var(--sa-field)] min-[900px]:grow-0 min-[900px]:shrink-0 min-[900px]:basis-auto"
        >
          <Icon name={history.icon} size={16} color="currentColor" />
          {history.label}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex h-11 grow shrink basis-full items-center justify-center gap-2 whitespace-nowrap rounded-[12px] bg-[var(--color-forest)] px-[18px] text-sm font-bold text-[var(--sa-on-accent)] hover:brightness-95 min-[900px]:grow-0 min-[900px]:shrink-0 min-[900px]:basis-auto"
        >
          <Icon name={print.icon} size={16} color="currentColor" />
          {print.label}
        </button>
      </div>
    </section>
  )
}
