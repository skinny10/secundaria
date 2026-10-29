import type { PlantelConfig } from '../types'
import { Icon } from '../../../utils/atoms/Icon'
import { CampoConfig } from './CampoConfig'
import { TarjetaConfig } from './TarjetaConfig'

interface TarjetaProtocolosProps {
  config: PlantelConfig
  errores: Record<string, string>
  onCambio: (config: PlantelConfig) => void
}

export function TarjetaProtocolos({ config, errores, onCambio }: TarjetaProtocolosProps) {
  const set = (patch: Partial<PlantelConfig['protocolos']>) => {
    onCambio({ ...config, protocolos: { ...config.protocolos, ...patch } })
  }

  return (
    <TarjetaConfig
      titulo='Protocolos de Enlace'
      descripcion='Tiempos de respuesta comprometidos entre el plantel, SEE y las familias.'
      icono='handshake'
    >
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <CampoConfig
          id='protocolos.slaUrgenteMin'
          etiqueta='Atención urgente'
          valor={config.protocolos.slaUrgenteMin}
          onChange={(valor) => set({ slaUrgenteMin: valor === '' ? 0 : Number(valor) })}
          error={errores['protocolos.slaUrgenteMin']}
          tipo='number'
          min={1}
          max={60}
          sufijo='min'
          icono='zap'
          ayuda='Respuesta inmediata ante riesgo eminente.'
        />
        <CampoConfig
          id='protocolos.slaPrioritariaHoras'
          etiqueta='Atención prioritaria'
          valor={config.protocolos.slaPrioritariaHoras}
          onChange={(valor) => set({ slaPrioritariaHoras: valor === '' ? 0 : Number(valor) })}
          error={errores['protocolos.slaPrioritariaHoras']}
          tipo='number'
          min={1}
          max={72}
          sufijo='h'
          icono='clock'
          ayuda='Canalización con seguimiento dentro del mismo día hábil.'
        />
        <CampoConfig
          id='protocolos.slaOrdinariaDiasHabiles'
          etiqueta='Atención ordinaria'
          valor={config.protocolos.slaOrdinariaDiasHabiles}
          onChange={(valor) =>
            set({ slaOrdinariaDiasHabiles: valor === '' ? 0 : Number(valor) })
          }
          error={errores['protocolos.slaOrdinariaDiasHabiles']}
          tipo='number'
          min={1}
          max={30}
          sufijo='días hábiles'
          icono='calendar'
        />
        <CampoConfig
          id='protocolos.paseSensorialMin'
          etiqueta='Duración del pase sensorial'
          valor={config.protocolos.paseSensorialMin}
          onChange={(valor) => set({ paseSensorialMin: valor === '' ? 0 : Number(valor) })}
          error={errores['protocolos.paseSensorialMin']}
          tipo='number'
          min={5}
          max={60}
          sufijo='min'
          icono='qr-code'
        />
        <CampoConfig
          id='protocolos.paseToleranciaMin'
          etiqueta='Tolerancia de retorno al aula'
          valor={config.protocolos.paseToleranciaMin}
          onChange={(valor) => set({ paseToleranciaMin: valor === '' ? 0 : Number(valor) })}
          error={errores['protocolos.paseToleranciaMin']}
          tipo='number'
          min={5}
          max={30}
          sufijo='min'
          icono='refresh'
          ayuda='No puede superar la duración del pase sensorial.'
          className='sm:col-span-2'
        />
      </div>
      <p className='flex items-start gap-2 rounded-xl bg-[var(--semaforo-amarillo-bg)] px-4 py-3 text-[15px] font-semibold text-[var(--semaforo-amarillo-fg)]'>
        <Icon name='alert-triangle' size={17} className='mt-0.5 shrink-0' />
        Modificar los protocolos es sensible: requiere motivo, 2FA y genera una nueva versión
        auditada del plantel.
      </p>
    </TarjetaConfig>
  )
}
