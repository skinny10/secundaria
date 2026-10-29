import type { PlantelConfig } from '../types'
import { Icon } from '../../../utils/atoms/Icon'
import { CampoConfig } from './CampoConfig'
import { TarjetaConfig } from './TarjetaConfig'

interface TarjetaCapacidadesDUAProps {
  config: PlantelConfig
  errores: Record<string, string>
  onCambio: (config: PlantelConfig) => void
}

export function TarjetaCapacidadesDUA({ config, errores, onCambio }: TarjetaCapacidadesDUAProps) {
  const set = (patch: Partial<PlantelConfig['capacidades']>) => {
    onCambio({ ...config, capacidades: { ...config.capacidades, ...patch } })
  }

  return (
    <TarjetaConfig
      titulo='Capacidades DUA'
      descripcion='Límites operativos para garantizar aulas inclusivas con apoyos diferenciados.'
      icono='users'
    >
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <CampoConfig
          id='capacidades.cupoAula'
          etiqueta='Cupo máximo por aula'
          valor={config.capacidades.cupoAula}
          onChange={(valor) => set({ cupoAula: valor === '' ? 0 : Number(valor) })}
          error={errores['capacidades.cupoAula']}
          tipo='number'
          min={15}
          max={40}
          sufijo='estudiantes'
          icono='users'
          ayuda='Rango permitido: 15 a 40 estudiantes.'
        />
        <CampoConfig
          id='capacidades.limiteDictamenGrupo'
          etiqueta='Límite de dictámenes por grupo'
          valor={config.capacidades.limiteDictamenGrupo}
          onChange={(valor) =>
            set({ limiteDictamenGrupo: valor === '' ? 0 : Number(valor) })
          }
          error={errores['capacidades.limiteDictamenGrupo']}
          tipo='number'
          min={1}
          max={6}
          sufijo='dictámenes'
          icono='stamp'
          ayuda='Rango permitido: 1 a 6 dictámenes DUA.'
        />
      </div>
      <div className='flex items-start gap-3 rounded-xl bg-[var(--sa-field)] px-4 py-4'>
        <Icon name='info' size={20} className='mt-0.5 shrink-0 text-[var(--color-forest)]' />
        <p className='text-[15px] text-[var(--sa-muted)]'>
          Si un grupo supera estos límites, el alta de estudiantes requerirá autorización de la
          Dirección y quedará marcada como excepción en la bitácora.
        </p>
      </div>
    </TarjetaConfig>
  )
}
