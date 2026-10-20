import { cn } from '../cn'
import type { IconName } from '../types'
import { Icon } from './Icon'

interface IconTileProps {
  icon: IconName
  background: 'green' | 'sky' | 'white' | 'surface'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  ariaLabel?: string
}

const bgMap = {
  green: 'bg-[var(--color-logo)]',
  sky: 'bg-[var(--color-sky)]',
  white: 'bg-[var(--color-card)]',
  surface: 'bg-[var(--color-surface)]',
} as const

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
} as const

const iconSizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
} as const

const iconColorMap = {
  green: '#FFFFFF',
  sky: 'var(--color-steel)',
  white: 'var(--color-text-primary)',
  surface: 'var(--color-text-primary)',
} as const

export function IconTile({ icon, background, size = 'md', className, ariaLabel }: IconTileProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full shrink-0',
        bgMap[background],
        sizeMap[size],
        className
      )}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
      aria-hidden={ariaLabel ? undefined : 'true'}
    >
      <Icon name={icon} size={iconSizeMap[size]} color={iconColorMap[background]} />
    </div>
  )
}
