import { Icon } from '../../../utils/atoms/Icon'

interface BitacoraHeaderProps {
  onFiltrarFechas: () => void
  onEventoCritico: () => void
  onExportar: () => void
  onActa: () => void
}

export function BitacoraHeader({ onFiltrarFechas, onEventoCritico, onExportar, onActa }: BitacoraHeaderProps) {
  return (
    <div className='flex flex-wrap items-start justify-between gap-6'>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-wrap items-center gap-4'>
          <div className='flex items-center gap-2 rounded-full bg-[color-mix(in_srgb,var(--color-forest)_16%,transparent)] px-4 py-1.5 text-[18px] font-bold text-[var(--color-forest)]'>
            <Icon name='shield-check' size={20} />
            <span>CADENA CRIPTOGRÁFICA SHA-256 VERIFICADA</span>
          </div>
          <button type='button' className='flex items-center gap-2 rounded-full border border-[var(--sa-border)] px-4 py-1.5 text-[18px] font-semibold'>
            <span className='font-mono'>FOLIO INMUTABLE #2024-AUD-9941</span>
            <Icon name='folder' size={16} />
          </button>
        </div>
        <h1 className='text-[56px] font-extrabold text-[var(--sa-text)] sm:text-[66px]'>Bitácora de Auditoría y Seguridad del Sistema</h1>
        <p className='max-w-[1500px] text-[24px] text-[var(--sa-muted)]'>Registro cronológico e inmutable de eventos de acceso, modificaciones de expedientes clínicos confidenciales y alertas de seguridad en tiempo real para el resguardo de la comunidad escolar.</p>
      </div>
      <div className='flex flex-wrap items-center gap-4'>
        <button type='button' onClick={onFiltrarFechas} className='inline-flex min-h-[64px] items-center gap-3 rounded-xl border border-[var(--sa-border)] px-7 text-[22px] font-semibold hover:bg-[var(--sa-field)]'>
          <Icon name='calendar' size={26} />
          Filtrar por Fechas
        </button>
        <button type='button' onClick={onEventoCritico} className='inline-flex min-h-[64px] items-center gap-3 rounded-xl border border-[var(--sa-border)] px-7 text-[22px] font-semibold hover:bg-[var(--sa-field)]'>
          <Icon name='alert-triangle' size={26} />
          Evento Crítico
        </button>
        <button type='button' onClick={onExportar} className='inline-flex min-h-[64px] items-center gap-3 rounded-xl border border-[var(--sa-border)] px-7 text-[22px] font-semibold hover:bg-[var(--sa-field)]'>
          <Icon name='download' size={26} />
          Exportar (CSV/XLS)
        </button>
        <button type='button' onClick={onActa} className='inline-flex min-h-[64px] items-center gap-3 rounded-xl bg-[var(--color-forest)] px-9 text-[22px] font-bold text-[var(--sa-on-accent)] hover:brightness-95'>
          <Icon name='shield' size={26} />
          Acta Cifrada Supervisión SEP
        </button>
      </div>
    </div>
  )
}
