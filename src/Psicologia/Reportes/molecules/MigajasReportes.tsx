import { Icon } from '../../../utils/atoms/Icon'

export function MigajasReportes() {
  return (
    <nav
      aria-label='Migas de pan'
      className='flex flex-wrap items-center gap-1.5 text-[10.5px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'
    >
      <Icon name='folder' size={14} color='currentColor' className='shrink-0' />
      <span>Psicología</span>
      <Icon name='chevron-right' size={12} color='currentColor' className='shrink-0' />
      <span>Expedientes</span>
      <Icon name='chevron-right' size={12} color='currentColor' className='shrink-0' />
      <span className='text-[var(--color-text-primary)]'>Reportes y Trámites</span>
    </nav>
  )
}
