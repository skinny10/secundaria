import { Icon } from '../../../utils/atoms/Icon'
import { privacy } from '../constants/navigation'

export function PrivacyBox() {
  const { icon, title, body } = privacy

  return (
    <div className="flex flex-col gap-2 rounded-[14px] bg-[var(--sa-field)] p-3">
      <div className="flex items-center gap-2 text-[var(--sa-accent)]">
        <Icon name={icon} size={16} color="currentColor" />
        <span className="text-sm font-extrabold uppercase tracking-wide">{title}</span>
      </div>
      <p className="text-base leading-snug text-[var(--sa-muted)]">{body}</p>
    </div>
  )
}
