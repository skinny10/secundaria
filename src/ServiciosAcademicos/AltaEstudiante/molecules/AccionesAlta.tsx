import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { IconName } from '../../../utils/types'

interface BotonAltaProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icono?: IconName
  iconoFinal?: IconName
  children: ReactNode
}

export function BotonPrimario({
  icono,
  iconoFinal,
  children,
  className,
  disabled,
  ...props
}: BotonAltaProps) {
  return (
    <button
      type='button'
      disabled={disabled}
      className={cn(
        'inline-flex min-h-[52px] min-w-0 items-center justify-center gap-2 rounded-xl bg-[var(--color-forest)] px-5 text-[16px] leading-snug font-bold text-[var(--sa-on-accent)] transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)] disabled:cursor-not-allowed disabled:opacity-55',
        className
      )}
      {...props}
    >
      {icono ? <Icon name={icono} size={19} color='currentColor' className='shrink-0' /> : null}
      <span className='min-w-0'>{children}</span>
      {iconoFinal ? (
        <Icon name={iconoFinal} size={19} color='currentColor' className='shrink-0' />
      ) : null}
    </button>
  )
}

export function BotonSecundario({
  icono,
  iconoFinal,
  children,
  className,
  disabled,
  ...props
}: BotonAltaProps) {
  return (
    <button
      type='button'
      disabled={disabled}
      className={cn(
        'inline-flex min-h-[52px] min-w-0 items-center justify-center gap-2 rounded-xl border border-[var(--sa-input-border)] bg-[var(--sa-card)] px-5 text-[16px] leading-snug font-bold text-[var(--color-forest)] transition hover:bg-[var(--sa-field)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)] disabled:cursor-not-allowed disabled:opacity-55',
        className
      )}
      {...props}
    >
      {icono ? <Icon name={icono} size={19} color='currentColor' className='shrink-0' /> : null}
      <span className='min-w-0'>{children}</span>
      {iconoFinal ? (
        <Icon name={iconoFinal} size={19} color='currentColor' className='shrink-0' />
      ) : null}
    </button>
  )
}

export function BotonTexto({
  icono,
  children,
  className,
  disabled,
  ...props
}: BotonAltaProps) {
  return (
    <button
      type='button'
      disabled={disabled}
      className={cn(
        'inline-flex min-h-[44px] min-w-0 items-center justify-center gap-1.5 rounded-lg px-2 text-[14px] font-bold text-[var(--color-forest)] hover:bg-[var(--sa-field)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)] disabled:cursor-not-allowed disabled:opacity-55',
        className
      )}
      {...props}
    >
      {icono ? <Icon name={icono} size={17} color='currentColor' /> : null}
      <span className='min-w-0'>{children}</span>
    </button>
  )
}

interface BarraAccionesAltaProps {
  children: ReactNode
  nota?: ReactNode
  className?: string
}

export function BarraAccionesAlta({ children, nota, className }: BarraAccionesAltaProps) {
  return (
    <footer
      className={cn(
        'flex w-full min-w-0 flex-col gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-4 shadow-[var(--shadow-sm)] sm:flex-row sm:items-center sm:justify-between sm:p-5',
        className
      )}
    >
      {nota ? (
        <div className='min-w-0 text-[13px] leading-snug text-[var(--sa-muted)]'>{nota}</div>
      ) : null}
      <div className='flex min-w-0 flex-wrap items-center gap-2 sm:ml-auto sm:justify-end'>
        {children}
      </div>
    </footer>
  )
}
