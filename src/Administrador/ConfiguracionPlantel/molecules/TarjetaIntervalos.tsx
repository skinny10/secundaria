import type { PlantelConfig } from '../types'
import { Icon } from '../../../utils/atoms/Icon'
import { CampoConfig } from './CampoConfig'
import { TarjetaConfig } from './TarjetaConfig'
import { ToggleConfig } from './ToggleConfig'

interface TarjetaIntervalosProps {
  config: PlantelConfig
  errores: Record<string, string>
  onCambio: (config: PlantelConfig) => void
}

export function TarjetaIntervalos({ config, errores, onCambio }: TarjetaIntervalosProps) {
  const set = (patch: Partial<PlantelConfig['intervalo']>) => {
    onCambio({ ...config, intervalo: { ...config.intervalo, ...patch } })
  }

  return (
    <TarjetaConfig
      titulo='Intervalos y Pausas Activas'
      descripcion='Pausas de regulación entre módulos y control del ruido ambiental en aulas inclusivas.'
      icono='volume-x'
    >
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <CampoConfig
          id='intervalo.pausaMin'
          etiqueta='Pausa activa entre módulos'
          valor={config.intervalo.pausaMin}
          onChange={(valor) => set({ pausaMin: valor === '' ? 0 : Number(valor) })}
          error={errores['intervalo.pausaMin']}
          tipo='number'
          min={5}
          max={30}
          sufijo='min'
          icono='clock'
        />
        <CampoConfig
          id='intervalo.db'
          etiqueta='Nivel máximo del atenuador'
          valor={config.intervalo.db}
          onChange={(valor) => set({ db: valor === '' ? 0 : Number(valor) })}
          error={errores['intervalo.db']}
          tipo='number'
          min={40}
          max={85}
          sufijo='dB'
          icono='volume-x'
        />
      </div>
      <div className='rounded-xl bg-[var(--sa-field)] px-4 py-4'>
        <ToggleConfig
          id='intervalo.atenuadorActivo'
          etiqueta='Atenuador de ruido activo'
          activo={config.intervalo.atenuadorActivo}
          onChange={(atenuadorActivo) => set({ atenuadorActivo })}
          descripcion='Reduce la contaminación acústica durante evaluaciones y pases sensoriales.'
        />
      </div>
      <p className='flex items-start gap-2 text-[15px] text-[var(--sa-muted)]'>
        <Icon name='info' size={16} className='mt-0.5 shrink-0 text-[var(--color-forest)]' />
        La pausa se aplica a todas las jornadas activas; los recesos configurados por turno tienen
        prioridad.
      </p>
    </TarjetaConfig>
  )
}
