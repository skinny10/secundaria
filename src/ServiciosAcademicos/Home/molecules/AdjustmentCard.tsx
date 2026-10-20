import { cn } from '../../../utils/cn'

interface AdjustmentCardProps {
  index: number
  title: string
  description: string
  numberClass: string
}

export function AdjustmentCard({ index, title, description, numberClass }: AdjustmentCardProps) {
  return (
    <div className="flex gap-3 rounded-[14px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-4">
      <span
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-base font-bold',
          numberClass
        )}
        aria-hidden="true"
      >
        {index}
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <h4 className="text-base font-bold">{title}</h4>
        <p className="text-lg leading-snug text-[var(--sa-muted)]">{description}</p>
      </div>
    </div>
  )
}
