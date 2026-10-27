import type { ReactNode } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { IconName } from '../../../utils/types'

export type VarianteBoton = 'verde' | 'gris' | 'pizarra' | 'cafe'

const variantesBoton: Record<VarianteBoton, string> = {
  verde: 'bg-[var(--color-forest)] text-[var(--sa-on-accent)] hover:brightness-95',
  gris: 'border border-[var(--sa-border)] bg-[var(--sa-field)] text-[var(--color-text-primary)] hover:brightness-95',
  pizarra: 'bg-[var(--sa-slate)] text-[var(--sa-on-accent)] hover:brightness-95',
  cafe: 'bg-[var(--sa-coffee)] text-[var(--sa-on-accent)] hover:brightness-95',
}

interface BotonAccionProps {
  variante: VarianteBoton
  icono: IconName
  children: ReactNode
  onClick?: () => void
  ancho?: boolean
  disabled?: boolean
}

export function BotonAccion({
  variante,
  icono,
  children,
  onClick,
  ancho,
  disabled,
}: BotonAccionProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 py-[10px] text-center text-[13px] leading-[1.25] font-bold whitespace-normal',
        variantesBoton[variante],
        ancho ? 'w-full' : 'flex-1 basis-auto',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      <Icon name={icono} size={16} color='currentColor' className='shrink-0' />
      <span className='min-w-0'>{children}</span>
    </button>
  )
}
