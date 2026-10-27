import { Icon } from '../../../utils/atoms/Icon'

export function CadenaCustodia() {
  return (
    <footer className='flex flex-col gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-box)] p-4 lg:flex-row lg:items-center lg:justify-between'>
      <div className='flex min-w-0 items-start gap-3'>
        <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--sa-card)] text-[var(--color-forest)]'>
          <Icon name='shield' size={20} color='currentColor' />
        </span>
        <div className='min-w-0'>
          <p className='text-[14px] font-bold'>
            Cadena de Custodia Documental y Protección de Datos Sensibles
          </p>
          <p className='mt-1 text-[12.5px] leading-relaxed text-[var(--sa-muted)]'>
            Todo documento emitido mediante este sistema cuenta con firma de responsabilidad
            profesional, folio correlativo inalterable y cifrado conforme a la{' '}
            <strong className='font-bold text-[var(--color-text-primary)]'>
              Ley General de Educación
            </strong>{' '}
            y el{' '}
            <strong className='font-bold text-[var(--color-text-primary)]'>
              Artículo 76 de la LGDNNA
            </strong>
            . El acceso a expedientes médicos queda restringido únicamente a personal clínico y
            directivo facultado.
          </p>
        </div>
      </div>
      <span className='inline-flex w-fit items-center gap-2 rounded-full bg-[var(--sa-card)] px-3 py-2 text-[11px] font-bold text-[var(--color-forest)]'>
        <Icon name='check' size={14} color='currentColor' className='shrink-0' />
        Auditoría Interna SEE: Vigente 2024
      </span>
    </footer>
  )
}
