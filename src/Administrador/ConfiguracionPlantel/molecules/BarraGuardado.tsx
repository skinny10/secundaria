import { Icon } from '../../../utils/atoms/Icon'
import { formatearFechaHora } from '../utils/formato'
import type { PlantelConfig } from '../types'

interface BarraGuardadoProps {
  config: PlantelConfig
  cantidadCambios: number
  onRestaurar: () => void
  onGuardar: () => void
}

export function BarraGuardado({
  config,
  cantidadCambios,
  onRestaurar,
  onGuardar,
}: BarraGuardadoProps) {
  return (
    <footer className='sticky bottom-0 z-20 mt-2 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[var(--sa-bar-forest)] px-5 py-4 text-[var(--sa-on-accent)] shadow-[var(--shadow-md)] sm:px-7'>
      <div className='min-w-0'>
        <p className='flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase opacity-80'>
          <Icon name='shield-check' size={15} aria-hidden='true' />
          Trazabilidad registrada
        </p>
        <p className='mt-1 text-[15px] leading-snug font-semibold'>
          Última actualización: {formatearFechaHora(config.actualizadoEn)} · v{config.version} por{' '}
          {config.actualizadoPor}
        </p>
        <p className='text-[14px] opacity-85' aria-live='polite'>
          {cantidadCambios > 0
            ? `${cantidadCambios} ${cantidadCambios === 1 ? 'cambio' : 'cambios'} sin guardar`
            : 'Sin cambios pendientes · configuración sincronizada'}
        </p>
      </div>
      <div className='flex flex-wrap items-center gap-3'>
        <button
          type='button'
          onClick={onRestaurar}
          className='inline-flex min-h-[52px] items-center gap-2 rounded-xl border border-[color-mix(in_srgb,var(--sa-on-accent)_45%,transparent)] px-4 text-[16px] font-semibold transition-colors hover:bg-[color-mix(in_srgb,var(--sa-on-accent)_12%,transparent)]'
        >
          <Icon name='history' size={19} aria-hidden='true' />
          Restaurar valores por defecto
        </button>
        <button
          type='button'
          onClick={onGuardar}
          disabled={cantidadCambios === 0}
          className='inline-flex min-h-[52px] items-center gap-2 rounded-xl bg-[var(--sa-on-accent)] px-5 text-[16px] font-extrabold text-[var(--sa-bar-forest)] transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-55'
        >
          <Icon name='save' size={19} aria-hidden='true' />
          Guardar y aplicar cambios en plantel
        </button>
      </div>
    </footer>
  )
}
