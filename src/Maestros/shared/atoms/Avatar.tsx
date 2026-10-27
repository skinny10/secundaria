import { cn } from '../../../utils/cn'
import type { Tone } from '../types'
import { avatarFilledClasses, softToneClasses } from './toneStyles'

type AvatarTone = Tone | 'forest' | 'slate'

const sizeClasses = {
  sm: 'h-9 w-9 text-base',
  md: 'h-12 w-12 text-base',
} as const

interface AvatarProps {
  initials: string
  tone?: AvatarTone
  size?: keyof typeof sizeClasses
  className?: string
  ariaLabel?: string
}

export function Avatar({ initials, tone = 'menta', size = 'md', className, ariaLabel }: AvatarProps) {
  const toneClass = tone === 'forest' || tone === 'slate' ? avatarFilledClasses[tone] : softToneClasses[tone]

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-extrabold',
        sizeClasses[size],
        toneClass,
        className
      )}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : 'true'}
    >
      {initials}
    </span>
  )
}
