import type { PlantelConfig } from '../types'
import { Icon } from '../../../utils/atoms/Icon'
import { ciclosDisponibles } from '../constants/configInicial'
import { CampoSelect } from './CampoSelect'
import { TarjetaConfig } from './TarjetaConfig'

interface TarjetaCalendarioProps {
  config: PlantelConfig
  errores: Record<string, string>
  onCambio: (config: PlantelConfig) => void
}

const hitos = [
  { fecha: '26 Ago 2024', titulo: 'Inicio del ciclo escolar', icono: 'flag' as const },
  { fecha: '18 Nov 2024', titulo: 'Primer periodo de evaluación', icono: 'clipboard-check' as const },
  { fecha: '14 Abr 2025', titulo: 'Segundo periodo de evaluación', icono: 'list-checks' as const },
  { fecha: '11 Jul 2025', titulo: 'Fin del ciclo escolar', icono: 'flag' as const },
]

export function TarjetaCalendario({ config, errores, onCambio }: TarjetaCalendarioProps) {
  return (
    <TarjetaConfig
      titulo='Ciclo Escolar Vigente'
      descripcion='El ciclo activo ajusta automáticamente la matrícula, los grupos y los reportes de todo el plantel.'
      icono='calendar'
    >
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
        <CampoSelect
          id='ciclo.activo'
          etiqueta='Ciclo activo'
          valor={config.ciclo.activo}
          opciones={ciclosDisponibles}
          onChange={(activo) => onCambio({ ...config, ciclo: { activo } })}
          error={errores['ciclo.activo']}
          ayuda='Al guardar, la cascada actualiza los módulos dependientes.'
        />
        <div className='flex flex-col justify-center rounded-xl bg-[var(--sa-field)] px-4 py-3'>
          <p className='text-[14px] font-bold tracking-wide text-[var(--sa-muted)] uppercase'>
            Duración oficial
          </p>
          <p className='text-[19px] font-extrabold text-[var(--sa-text)]'>190 días hábiles</p>
          <p className='text-[15px] text-[var(--sa-muted)]'>Calendario SEP para secundaria técnica.</p>
        </div>
      </div>

      <div>
        <p className='mb-3 flex items-center gap-2 text-[17px] font-bold text-[var(--sa-text)]'>
          <Icon name='list-ordered' size={19} className='text-[var(--color-forest)]' />
          Hitos del ciclo
        </p>
        <ul className='grid grid-cols-1 gap-3 md:grid-cols-2'>
          {hitos.map((hito) => (
            <li
              key={hito.titulo}
              className='flex items-center gap-3 rounded-xl border border-[var(--sa-border)] px-4 py-3 transition-colors hover:bg-[var(--sa-field)]'
            >
              <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--sa-menta-soft)] text-[var(--color-forest)]'>
                <Icon name={hito.icono} size={19} aria-hidden='true' />
              </span>
              <div className='min-w-0'>
                <p className='text-[16px] font-bold text-[var(--sa-text)]'>{hito.titulo}</p>
                <p className='text-[15px] text-[var(--sa-muted)]'>{hito.fecha}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-[var(--sa-input-border)] px-4 py-4'>
        <div className='flex min-w-0 items-start gap-3'>
          <Icon name='calendar' size={22} className='mt-0.5 shrink-0 text-[var(--color-forest)]' />
          <div>
            <p className='text-[17px] font-bold text-[var(--sa-text)]'>Calendario oficial detallado</p>
            <p className='text-[15px] text-[var(--sa-muted)]'>
              Próximamente: suspensión de labores, consejos técnicos y periodos de inscripción.
            </p>
          </div>
        </div>
        <span className='rounded-full bg-[var(--sa-field)] px-3 py-1.5 text-[12px] font-bold tracking-wide text-[var(--sa-muted)] uppercase'>
          Próximamente
        </span>
      </div>
    </TarjetaConfig>
  )
}
