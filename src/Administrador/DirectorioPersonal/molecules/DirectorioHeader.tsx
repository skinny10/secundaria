import { Icon } from '../../../utils/atoms/Icon'

interface DirectorioHeaderProps {
  onAlta: () => void
}

export function DirectorioHeader({ onAlta }: DirectorioHeaderProps) {
  return (
    <div className='flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-8 py-7 shadow-sm'>
      <div className='flex items-center gap-6'>
        <div className='flex h-18 w-18 items-center justify-center rounded-xl bg-[var(--color-forest)] text-[var(--sa-on-accent)]'>
          <Icon name='shield' size={32} />
        </div>
        <div>
          <p className='text-[17px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>MÓDULO DE GOBERNANZA INSTITUCIONAL</p>
          <h1 className='text-[50px] font-extrabold text-[var(--sa-text)] sm:text-[58px]'>Directorio de Personal y Control de Accesos</h1>
          <p className='text-[24px] text-[var(--sa-muted)]'>Administración centralizada de cuentas del personal docente, psicología SEE, prefectura y servicios académicos.</p>
        </div>
      </div>
      <div className='flex flex-wrap items-center gap-4'>
        <button type='button' className='inline-flex min-h-[64px] items-center gap-3 rounded-xl border border-[var(--sa-border)] px-7 text-[22px] font-semibold hover:bg-[var(--sa-field)]'>
          <Icon name='file-text' size={26} />
          Historial de Auditoría
        </button>
        <button type='button' className='inline-flex min-h-[64px] items-center gap-3 rounded-xl border border-[var(--sa-border)] px-7 text-[22px] font-semibold hover:bg-[var(--sa-field)]'>
          <Icon name='download' size={26} />
          Exportar Padrón
        </button>
        <button type='button' onClick={onAlta} className='inline-flex min-h-[64px] items-center gap-3 rounded-xl bg-[var(--color-forest)] px-8 text-[22px] font-bold text-[var(--sa-on-accent)] hover:brightness-95'>
          <Icon name='plus' size={26} />
          + Registrar Nuevo Usuario
        </button>
      </div>
    </div>
  )
}
