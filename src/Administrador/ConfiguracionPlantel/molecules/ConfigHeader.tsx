import { Icon } from '../../../utils/atoms/Icon'
import type { PlantelConfig } from '../types'
import { formatearFechaHora } from '../utils/formato'

interface ConfigHeaderProps {
  config: PlantelConfig
  sinGuardar: boolean
  onDescartar: () => void
  onGuardar: () => void
}

export function ConfigHeader({ config, sinGuardar, onDescartar, onGuardar }: ConfigHeaderProps) {
  return (
    <header className='flex flex-col gap-5'>
      <div className='flex flex-wrap items-center gap-2.5'>
        <span className='inline-flex items-center gap-2 rounded-full bg-[var(--sa-menta)] px-3.5 py-1.5 text-[14px] font-bold text-[var(--sa-on-menta)]'>
          <Icon name='calendar' size={16} aria-hidden='true' />
          Ciclo activo {config.ciclo.activo}
        </span>
        <span
          className='inline-flex items-center gap-2 rounded-full bg-[var(--semaforo-verde-bg)] px-3.5 py-1.5 text-[14px] font-bold text-[var(--semaforo-verde-fg)]'
          title={`Última validación contra SEE/SEP: ${formatearFechaHora(config.actualizadoEn)}`}
        >
          <Icon name='refresh' size={16} aria-hidden='true' />
          Sincronizado SEE/SEP
        </span>
        <span className='inline-flex items-center gap-2 rounded-full border border-[var(--sa-border)] px-3.5 py-1.5 font-mono text-[14px] font-bold text-[var(--sa-muted)]'>
          <Icon name='id-card' size={16} aria-hidden='true' />
          CCT {config.identidad.cct}
        </span>
        <span className='inline-flex items-center gap-2 rounded-full bg-[var(--sa-field)] px-3.5 py-1.5 text-[14px] font-bold text-[var(--sa-muted)]'>
          Versión v{config.version}
        </span>
      </div>

      <div className='flex flex-wrap items-start justify-between gap-6'>
        <div className='min-w-0 max-w-[1100px]'>
          <h1 className='text-[42px] leading-[1.12] font-extrabold tracking-tight text-[var(--sa-text)] sm:text-[52px] lg:text-[58px]'>
            Configuración General del Plantel
          </h1>
          <p className='mt-3 text-[20px] leading-relaxed text-[var(--sa-muted)] sm:text-[21px]'>
            Fuente única de verdad para identidad oficial, jornadas, espacios inclusivos y
            parámetros DUA. Cada cambio genera una versión auditada y se propaga a todos los
            módulos del sistema.
          </p>
        </div>
        <div className='flex flex-wrap items-center gap-3'>
          <button
            type='button'
            onClick={onDescartar}
            disabled={!sinGuardar}
            className='inline-flex min-h-[56px] items-center gap-2.5 rounded-xl border border-[var(--sa-border)] px-5 text-[18px] font-semibold transition-colors hover:bg-[var(--sa-field)] disabled:cursor-not-allowed disabled:opacity-50'
          >
            <Icon name='refresh' size={21} aria-hidden='true' />
            Descartar cambios
          </button>
          <button
            type='button'
            onClick={onGuardar}
            disabled={!sinGuardar}
            className='inline-flex min-h-[56px] items-center gap-2.5 rounded-xl bg-[var(--color-forest)] px-6 text-[18px] font-bold text-[var(--sa-on-accent)] transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <Icon name='save' size={21} aria-hidden='true' />
            Guardar y aplicar
          </button>
        </div>
      </div>
    </header>
  )
}
