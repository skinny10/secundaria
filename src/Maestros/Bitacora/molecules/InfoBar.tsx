import { Icon } from '../../../utils/atoms/Icon'
import { bitacoraContent } from '../constants/bitacoraContent'

export function InfoBar() {
  const { infoBar } = bitacoraContent

  return (
    <div className="sa-no-print flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl bg-[var(--sa-field)] px-[15px] py-3 text-base">
      <span className="flex min-w-0 flex-1 items-center gap-2 text-[var(--sa-muted)]">
        <Icon name={infoBar.icon} size={16} color="var(--sa-accent)" />
        <span>{infoBar.text}</span>
      </span>
      <span className="font-semibold whitespace-nowrap text-[var(--sa-muted)]">
        {infoBar.sync}
      </span>
      <button
        type="button"
        className="inline-flex min-h-[44px] items-center gap-1.5 font-bold whitespace-nowrap text-[var(--sa-accent)] underline"
      >
        <Icon name={infoBar.link.icon} size={15} color="currentColor" />
        {infoBar.link.label}
      </button>
    </div>
  )
}
