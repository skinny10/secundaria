import { Icon } from '../../../utils/atoms/Icon'
import type { IconName } from '../../../utils/types'
import type { Tone } from '../types'
import { cn } from '../../../utils/cn'
import { softToneClasses } from './toneStyles'

const sizeClasses = {
  sm: 'h-10 w-10 rounded-[10px]',
  md: 'h-12 w-12 rounded-[14px]',
} as const

interface IconTileProps {
  icon: IconName
  tone: Tone
  size?: keyof typeof sizeClasses
  className?: string
}

export function IconTile({ icon, tone, size = 'md', className }: IconTileProps) {
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center',
        sizeClasses[size],
        softToneClasses[tone],
        className
      )}
      aria-hidden="true"
    >
      <Icon name={icon} size={size === 'sm' ? 18 : 24} color="currentColor" />
    </span>
  )
}
