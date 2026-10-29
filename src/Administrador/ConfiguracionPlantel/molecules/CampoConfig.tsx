import type { ReactNode } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { IconName } from '../../../utils/types'

interface CampoConfigProps {
  id: string
  etiqueta: string
  valor: string | number
  onChange: (valor: string) => void
  tipo?: 'text' | 'email' | 'tel' | 'number' | 'time'
  error?: string
  ayuda?: string
  icono?: IconName
  sufijo?: string
  min?: number
  max?: number
  disabled?: boolean
  readOnly?: boolean
  placeholder?: string
  autoComplete?: string
  onBlur?: (valor: string) => void
  trailing?: ReactNode
  className?: string
}

export function CampoConfig({
  id,
  etiqueta,
  valor,
  onChange,
  tipo = 'text',
  error,
  ayuda,
  icono,
  sufijo,
  min,
  max,
  disabled,
  readOnly,
  placeholder,
  autoComplete,
  onBlur,
  trailing,
  className,
}: CampoConfigProps) {
  const descripcionId = `${id}-descripcion`

  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      <label htmlFor={id} className='text-[17px] font-bold text-[var(--sa-text)]'>
        {etiqueta}
      </label>
      <div
        className={cn(
          'flex min-h-[56px] items-center gap-2 rounded-xl border bg-[var(--sa-field)] px-3 transition-colors',
          'focus-within:outline focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-[var(--color-forest)]',
          error
            ? 'border-[var(--sa-danger)]'
            : 'border-[var(--sa-input-border)] hover:border-[var(--color-forest)]',
          disabled || readOnly ? 'opacity-80' : ''
        )}
      >
        {icono ? (
          <Icon
            name={icono}
            size={20}
            color='var(--sa-muted)'
            className='shrink-0'
            aria-hidden='true'
          />
        ) : null}
        <input
          id={id}
          type={tipo}
          value={valor}
          onChange={(evento) => onChange(evento.target.value)}
          onBlur={(evento) => onBlur?.(evento.target.value)}
          min={min}
          max={max}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={tipo === 'number' ? 'numeric' : tipo === 'tel' ? 'tel' : undefined}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error || ayuda ? descripcionId : undefined}
          className='min-w-0 flex-1 bg-transparent py-3 text-[19px] font-medium text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-placeholder)]'
        />
        {sufijo ? (
          <span className='shrink-0 text-[15px] font-bold text-[var(--sa-muted)]'>{sufijo}</span>
        ) : null}
        {trailing}
      </div>
      {error ? (
        <p
          id={descripcionId}
          className='flex items-start gap-1.5 text-[15px] font-semibold text-[var(--sa-danger)]'
          role='alert'
        >
          <Icon name='alert-triangle' size={16} className='mt-0.5 shrink-0' />
          {error}
        </p>
      ) : ayuda ? (
        <p id={descripcionId} className='text-[15px] text-[var(--sa-muted)]'>
          {ayuda}
        </p>
      ) : null}
    </div>
  )
}
