import { Icon } from '../../../utils/atoms/Icon'

interface ContextBarRolesProps {
  nivel?: string
  ultimaAuditoria?: string
}

export function ContextBarRoles({ nivel = 'Nivel Medio Superior', ultimaAuditoria = '28/10/2025 09:42' }: ContextBarRolesProps) {
  return (
    <div className='flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-8 py-5 shadow-sm'>
      <div className='flex items-center gap-4'>
        <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-forest)_16%,transparent)] text-[var(--color-forest)]'>
          <Icon name='shield' size={24} />
        </div>
        <div>
          <p className='text-[20px] font-bold text-[var(--sa-text)]'>GOBERNANZA DUA & LGDNNA • Sincronizado con SEP {nivel}</p>
          <p className='text-[19px] text-[var(--sa-muted)]'>Protocolo de Confidencialidad Médica y Neurodiversidad Activo · Última auditoría de roles: {ultimaAuditoria}</p>
        </div>
      </div>
      <div className='flex flex-wrap items-center gap-3'>
        <span className='rounded-full border border-[var(--sa-border)] px-4 py-1.5 text-[18px] font-semibold'>Cifrado SHA-256</span>
        <span className='rounded-full border border-[var(--sa-border)] px-4 py-1.5 text-[18px] font-semibold'>Ciclo 2024-2025</span>
      </div>
    </div>
  )
}
