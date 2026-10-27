import type { ReactNode } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { IconName } from '../../../utils/types'

interface EtiquetaCampoProps {
  children: ReactNode
  icon?: IconName
  className?: string
}

export function EtiquetaCampo({ children, icon, className }: EtiquetaCampoProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-1.5 text-[10.5px] leading-tight font-bold tracking-widest text-[var(--sa-muted)] uppercase',
        className
      )}
    >
      {icon ? <Icon name={icon} size={12} color='currentColor' className='shrink-0' /> : null}
      <span className='min-w-0'>{children}</span>
    </p>
  )
}
