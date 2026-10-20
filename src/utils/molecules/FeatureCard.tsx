import { IconTile } from '../atoms/IconTile'
import type { IconName } from '../types'
import { cn } from '../cn'

interface FeatureCardProps {
  icon: IconName
  background: 'green' | 'sky'
  title: string
  subtitle: string
  description?: string
  className?: string
}

export function FeatureCard({
  icon,
  background,
  title,
  subtitle,
  description,
  className,
}: FeatureCardProps) {
  return (
    <article
      className={cn(
        'flex flex-col gap-3 rounded-[var(--radius-lg)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-sm)] h-full',
        className
      )}
    >
      <IconTile icon={icon} background={background} size="md" />
      <div className="flex flex-col gap-1">
        <h4 className="text-base font-bold">{title}</h4>
        <p className="text-sm font-bold text-[var(--color-steel)]">{subtitle}</p>
        {description ? <p className="text-sm">{description}</p> : null}
      </div>
    </article>
  )
}
