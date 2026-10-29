import { Icon } from '../../../utils/atoms/Icon'

export function ContextBarIntegridad() {
  return (
    <div className='flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--sa-border)] bg-[color-mix(in_srgb,#2C5A7A_10%,transparent)] px-8 py-5 shadow-sm'>
      <div className='flex items-center gap-4'>
        <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-forest)] text-[var(--sa-on-accent)]'>
          <Icon name='lock' size={24} />
        </div>
        <div>
          <p className='text-[20px] font-bold text-[var(--sa-text)]'>Cifrado en Reposo y en Tránsito (AES-256-GCM)</p>
          <p className='text-[19px] text-[var(--sa-muted)]'>Cada consulta a expedientes psicopedagógicos firma un bloque criptográfico individual no repudiable.</p>
        </div>
      </div>
      <div className='text-[19px] text-[var(--sa-muted)]'>Última réplica: 09:44:12 hrs (Hace 2 min)</div>
    </div>
  )
}
