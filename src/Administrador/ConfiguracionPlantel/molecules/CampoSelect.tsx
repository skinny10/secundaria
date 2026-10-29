import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'

interface CampoSelectProps {
  id: string
  etiqueta: string
  valor: string
  opciones: readonly string[]
  onChange: (valor: string) => void
  error?: string
  ayuda?: string
  disabled?: boolean
}

export function CampoSelect({
  id,
  etiqueta,
  valor,
  opciones,
  onChange,
  error,
  ayuda,
  disabled,
}: CampoSelectProps) {
  const descripcionId = `${id}-descripcion`

  return (
    <div className='flex min-w-0 flex-col gap-1.5'>
      <label htmlFor={id} className='text-[17px] font-bold text-[var(--sa-text)]'>
        {etiqueta}
      </label>
      <div
        className={cn(
          'relative flex min-h-[56px] items-center rounded-xl border bg-[var(--sa-field)] px-3',
          'focus-within:outline focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-[var(--color-forest)]',
          error ? 'border-[var(--sa-danger)]' : 'border-[var(--sa-input-border)]'
        )}
      >
        <Icon name='calendar' size={20} color='var(--sa-muted)' className='shrink-0' aria-hidden='true' />
        <select
          id={id}
          value={valor}
          onChange={(evento) => onChange(evento.target.value)}
          disabled={disabled}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error || ayuda ? descripcionId : undefined}
          className='min-w-0 flex-1 appearance-none bg-transparent px-2 py-3 text-[19px] font-medium text-[var(--color-text-primary)] outline-none'
        >
          {opciones.map((opcion) => (
            <option key={opcion} value={opcion}>
              Ciclo {opcion}
            </option>
          ))}
        </select>
        <Icon name='chevron-down' size={18} color='var(--sa-muted)' className='shrink-0' aria-hidden='true' />
      </div>
      {error ? (
        <p id={descripcionId} className='text-[15px] font-semibold text-[var(--sa-danger)]' role='alert'>
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
