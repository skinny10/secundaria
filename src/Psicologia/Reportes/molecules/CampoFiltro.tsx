import type { ReactNode } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import type { IconName } from '../../../utils/types'

export const campoControlClass =
  'h-11 w-full min-w-0 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[13px] text-[var(--color-text-primary)] outline-none'

interface CampoFiltroProps {
  label: string
  icono: IconName
  children: ReactNode
}

export function CampoFiltro({ label, icono, children }: CampoFiltroProps) {
  return (
    <label className='flex min-w-0 flex-col gap-1.5'>
      <span className='flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
        <Icon name={icono} size={13} color='currentColor' className='shrink-0' />
        {label}
      </span>
      {children}
    </label>
  )
}
