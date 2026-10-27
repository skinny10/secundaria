import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import { TarjetaIndicador } from '../molecules/TarjetaIndicador'
import {
  conteoUrgencias,
  eficaciaAula,
  expedientesObservados,
  expedientesResguardo,
  totalAlumnos,
  totalCanalizaciones,
} from '../constants/dashboard'

interface IndicadoresGridProps {
  onVerLista: () => void
}

export function IndicadoresGrid({ onVerLista }: IndicadoresGridProps) {
  return (
    <section
      aria-label='Indicadores institucionales'
      className='grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4'
    >
      <TarjetaIndicador etiqueta='Padrón oficial'>
        <div className='flex flex-wrap items-baseline gap-x-2 gap-y-1'>
          <p
            className='text-[30px] leading-none font-extrabold'
            style={{ color: 'var(--sa-title)' }}
          >
            {totalAlumnos}
          </p>
          <p className='text-[13px] text-[var(--sa-muted)]'>Alumnos</p>
        </div>
        <div className='mt-auto flex items-center gap-2 rounded-lg bg-[var(--sa-field)] px-3 py-2 text-[12px] font-semibold'>
          <Icon
            name='circle-check'
            size={15}
            color='var(--sa-green)'
            className='shrink-0'
          />
          <span>{expedientesResguardo}% Expedientes en resguardo</span>
        </div>
      </TarjetaIndicador>

      <TarjetaIndicador etiqueta='Triaje clínico' chip={<Chip tono='azul'>En espera</Chip>}>
        <div className='flex flex-wrap items-baseline gap-x-2 gap-y-1'>
          <p
            className='text-[30px] leading-none font-extrabold'
            style={{ color: 'var(--sa-title)' }}
          >
            {totalCanalizaciones}
          </p>
          <p className='text-[13px] text-[var(--sa-muted)]'>Canalizaciones</p>
        </div>
        <button
          type='button'
          onClick={onVerLista}
          className='mt-auto flex min-h-[44px] w-full flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg bg-[var(--sa-sky)] px-3 py-2 text-left text-[12px] font-bold text-[var(--sa-steel)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
        >
          <span>{conteoUrgencias.prioritarias} en Prioridad Alta</span>
          <span className='inline-flex items-center gap-1 whitespace-nowrap'>
            Revisar lista
            <Icon name='arrow-down' size={14} color='currentColor' />
          </span>
        </button>
      </TarjetaIndicador>

      <TarjetaIndicador etiqueta='Eficacia en aula'>
        <div className='flex flex-wrap items-baseline gap-x-2 gap-y-1'>
          <p
            className='text-[30px] leading-none font-extrabold'
            style={{ color: 'var(--sa-title)' }}
          >
            {eficaciaAula}%
          </p>
          <p className='text-[13px] text-[var(--sa-muted)]'>Cumplimiento</p>
        </div>
        <div className='mt-auto'>
          <div
            role='progressbar'
            aria-label='Cumplimiento de ajustes en aula'
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={eficaciaAula}
            className='h-2 w-full overflow-hidden rounded-full bg-[var(--sa-field)]'
          >
            <div
              className='h-full rounded-full'
              style={{ width: `${eficaciaAula}%`, backgroundColor: 'var(--sa-green)' }}
            />
          </div>
          <p className='mt-1 text-[11.5px] leading-snug text-[var(--sa-muted)]'>
            Cobertura de ajustes aplicados en aula
          </p>
        </div>
      </TarjetaIndicador>

      <TarjetaIndicador
        etiqueta='Control normativo'
        chip={
          <Chip tono='rosa' icon='alert-triangle'>
            Atención
          </Chip>
        }
      >
        <div className='flex flex-wrap items-baseline gap-x-2 gap-y-1'>
          <p
            className='text-[30px] leading-none font-extrabold'
            style={{ color: 'var(--sa-danger)' }}
          >
            {expedientesObservados}
          </p>
          <p className='text-[13px] text-[var(--sa-muted)]'>Expedientes</p>
        </div>
        <div className='mt-auto flex items-center gap-2 rounded-lg bg-[var(--sa-rosa)] px-3 py-2 text-[12px] font-semibold text-[var(--sa-on-rosa)]'>
          <Icon name='calendar' size={15} color='currentColor' className='shrink-0' />
          <span>Cita a padres programada</span>
        </div>
      </TarjetaIndicador>
    </section>
  )
}
