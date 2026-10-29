import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'

interface ToggleConfigProps {
  id: string
  etiqueta: string
  activo: boolean
  onChange: (activo: boolean) => void
  descripcion?: string
  bloqueado?: boolean
  motivoBloqueo?: string
}

export function ToggleConfig({
  id,
  etiqueta,
  activo,
  onChange,
  descripcion,
  bloqueado,
  motivoBloqueo,
}: ToggleConfigProps) {
  const descripcionId = `${id}-descripcion`

  return (
    <div className='flex items-start justify-between gap-4'>
      <div className='min-w-0'>
        <p id={`${id}-etiqueta`} className='text-[17px] font-bold text-[var(--sa-text)]'>
          {etiqueta}
        </p>
        {descripcion ? (
          <p id={descripcionId} className='text-[15px] text-[var(--sa-muted)]'>
            {descripcion}
          </p>
        ) : null}
        {bloqueado && motivoBloqueo ? (
          <p className='mt-1 flex items-start gap-1.5 text-[15px] font-semibold text-[var(--sa-coffee)]'>
            <Icon name='lock' size={15} className='mt-0.5 shrink-0' />
            {motivoBloqueo}
          </p>
        ) : null}
      </div>
      <button
        id={id}
        type='button'
        role='switch'
        aria-checked={activo}
        aria-labelledby={`${id}-etiqueta`}
        aria-describedby={descripcion ? descripcionId : undefined}
        disabled={bloqueado}
        title={bloqueado ? motivoBloqueo : undefined}
        onClick={() => onChange(!activo)}
        className={cn(
          'relative inline-flex h-9 w-16 shrink-0 items-center rounded-full border transition-colors',
          'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]',
          activo
            ? 'border-[var(--color-forest)] bg-[var(--color-forest)]'
            : 'border-[var(--sa-input-border)] bg-[var(--sa-field)]',
          bloqueado ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
        )}
      >
        <span
          aria-hidden='true'
          className={cn(
            'inline-block h-7 w-7 transform rounded-full bg-white shadow-sm transition-transform',
            activo ? 'translate-x-8' : 'translate-x-1'
          )}
        />
      </button>
    </div>
  )
}
