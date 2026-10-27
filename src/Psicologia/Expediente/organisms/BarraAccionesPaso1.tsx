import { Icon } from '../../../utils/atoms/Icon'

interface BarraAccionesPaso1Props {
  onContinuarPaso2: () => void
  onRevisarDiagnostico: () => void
  estado: string
}

export function BarraAccionesPaso1({ onContinuarPaso2, onRevisarDiagnostico, estado }: BarraAccionesPaso1Props) {
  return (
    <div className='sa-no-print flex flex-col items-start justify-between gap-3 rounded-[12px] bg-[var(--color-forest)] px-6 py-4 text-[var(--sa-on-accent)] md:flex-row md:items-center'>
      <div className='flex items-center gap-3'>
        <span className='flex h-9 w-9 items-center justify-center rounded-lg bg-white/10'>
          <Icon name='info' size={18} color='currentColor' />
        </span>
        <div className='flex flex-col'>
          <span className='text-[13px] font-semibold opacity-90'>Estado del expediente</span>
          <span className='text-[15px] font-extrabold'>{estado}</span>
        </div>
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        <button
          type='button'
          onClick={onRevisarDiagnostico}
          className='inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] bg-white/10 px-4 text-[14px] font-bold transition hover:bg-white/15'
        >
          <Icon name='eye' size={16} color='currentColor' />
          Revisar Diagnóstico
        </button>
        <button
          type='button'
          onClick={onContinuarPaso2}
          className='inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] bg-white px-4 text-[14px] font-bold text-[var(--color-forest)] transition hover:brightness-95'
        >
          Continuar al Paso 2
          <Icon name='arrow-right' size={16} color='currentColor' />
        </button>
      </div>
    </div>
  )
}
