import { Icon } from '../atoms/Icon'
import type { IconName } from '../types'
import { cn } from '../cn'

interface InfoNoticeProps {
  icon: IconName
  title: string
  body: string
  tone?: 'policy' | 'privacy'
  className?: string
}

const toneClasses = {
  policy: 'bg-[var(--color-surface-alt)] border-[var(--color-surface)]',
  privacy: 'bg-[var(--color-surface-alt)] border-[var(--color-surface)]',
} as const

export function InfoNotice({ icon, title, body, tone = 'policy', className }: InfoNoticeProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-md)] border p-4 flex flex-col gap-2',
        toneClasses[tone],
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Icon name={icon} size={18} color="var(--color-text-primary)" />
        <h4 className="text-sm font-bold">{title}</h4>
      </div>
      <p className="text-sm">{body}</p>
    </div>
  )
}
