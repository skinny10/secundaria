import type { IconName } from '../types'
import { cn } from '../cn'

interface IconProps {
  name: IconName
  size?: number
  className?: string
  color?: string
  'aria-label'?: string
}

export function Icon({ name, size = 20, className, color = 'currentColor', 'aria-label': ariaLabel }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={cn(className)}
      style={{ color }}
      aria-hidden={ariaLabel ? undefined : 'true'}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      focusable="false"
    >
      <use href={`/icons.svg#${name}`} />
    </svg>
  )
}
