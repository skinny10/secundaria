import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { altaConfig } from '../constants/altaConfig'
import { stepperAlta } from '../constants/altaContent'

interface AltaStepperProps {
  activo: number
  completados: number[]
  onIr: (paso: number) => void
}

export function AltaStepper({ activo, completados, onIr }: AltaStepperProps) {
  return (
    <nav aria-label={stepperAlta.aria} className='w-full min-w-0'>
      <ol className='flex w-full min-w-0 items-stretch gap-2'>
        {altaConfig.pasos.map((paso) => {
          const esActivo = paso.id === activo
          const completado = completados.includes(paso.id)
          const habilitado = !esActivo
          const estado = esActivo
            ? stepperAlta.estados.actual
            : completado
              ? stepperAlta.estados.completado
              : paso.id > activo
                ? stepperAlta.estados.siguiente
                : stepperAlta.estados.pendiente
          return (
            <li
              key={paso.id}
              className={cn('min-w-0', esActivo ? 'flex-1' : 'shrink-0 sm:flex-1')}
            >
              <button
                type='button'
                onClick={() => habilitado && onIr(paso.id)}
                disabled={!habilitado}
                aria-current={esActivo ? 'step' : undefined}
                aria-label={`${paso.id} ${estado} ${paso.label}`}
                className={cn(
                  'flex h-full min-h-[64px] w-full min-w-0 items-center gap-2.5 rounded-xl border px-2.5 py-2 text-left transition-colors sm:px-3',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]',
                  esActivo
                    ? 'border-[var(--color-forest)] bg-[var(--color-forest)] text-[var(--sa-on-accent)] shadow-[var(--shadow-sm)]'
                    : completado
                      ? 'border-[var(--color-forest)] bg-[var(--sa-card)] text-[var(--color-forest)] hover:bg-[var(--sa-menta-soft)]'
                      : 'cursor-pointer border-[var(--sa-border)] bg-[var(--sa-field)] text-[var(--sa-muted)] hover:bg-[var(--sa-menta-soft)]'
                )}
              >
                <span
                  aria-hidden='true'
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[15px] font-extrabold',
                    esActivo
                      ? 'border-[var(--sa-on-accent)] bg-[var(--sa-field)] text-[var(--color-forest)]'
                      : completado
                        ? 'border-[var(--color-forest)] bg-[var(--sa-card)] text-[var(--color-forest)]'
                        : 'border-[var(--sa-input-border)] bg-[var(--sa-card)] text-[var(--sa-muted)]'
                  )}
                >
                  {completado && !esActivo ? (
                    <Icon name='check' size={18} color='currentColor' />
                  ) : (
                    paso.id
                  )}
                </span>{' '}
                <span className={cn('min-w-0 flex-col gap-0.5', esActivo ? 'flex' : 'hidden sm:flex')}>
                  <span
                    className={cn(
                      'text-[10px] leading-none font-extrabold tracking-[0.09em] uppercase',
                      esActivo
                        ? 'text-[var(--sa-on-accent)] opacity-80'
                        : 'text-[var(--sa-muted)]'
                    )}
                  >
                    {estado}
                  </span>{' '}
                  <span className='line-clamp-2 text-[14px] leading-tight font-bold break-words'>
                    {paso.label}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
