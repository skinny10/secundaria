import { Icon } from '../../../utils/atoms/Icon'
import { bitacoraContent } from '../constants/bitacoraContent'

export function BitacoraHeader({ onAdd }: { onAdd: () => void }) {
  const { header } = bitacoraContent

  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <span className="inline-flex items-center gap-2 text-[13px] font-extrabold tracking-wide text-[var(--sa-muted)] uppercase">
          <Icon name={header.eyebrowIcon} size={15} color="var(--sa-accent)" />
          {header.eyebrow}
        </span>
        <h1 className="mt-2 text-[32px] leading-tight font-extrabold text-[var(--color-text-primary)]">
          {header.title}
        </h1>
        <p className="mt-2 max-w-3xl text-lg text-[var(--sa-muted)]">{header.subtitle}</p>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="sa-no-print inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[var(--color-forest)] px-5 text-base font-bold whitespace-nowrap text-[var(--sa-on-accent)] shadow-[var(--shadow-sm)] hover:brightness-95"
      >
        <Icon name={header.add.icon} size={18} color="currentColor" />
        {header.add.label}
      </button>
    </header>
  )
}
