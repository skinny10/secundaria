import { Icon } from '../../../utils/atoms/Icon'
import type { IconName } from '../../../utils/types'
import type { Tone } from '../types'
import { cn } from '../../../utils/cn'
import { softToneClasses } from './toneStyles'

interface ConditionPillProps {
  label: string
  icon: IconName
  tone: Tone
  className?: string
}

export function ConditionPill({ label, icon, tone, className }: ConditionPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-4 py-2 text-base font-bold',
        softToneClasses[tone],
        className
      )}
    >
      <Icon name={icon} size={18} color="currentColor" />
      {label}
    </span>
  )
}
