import { Icon } from '../../../utils/atoms/Icon'
import { hashConfidencial } from '../constants/dashboard'

export function PieConfidencialidad() {
  return (
    <section className='flex w-full min-w-0 flex-col gap-3 rounded-2xl bg-[var(--sa-confidencial)] p-4 sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex min-w-0 items-start gap-3'>
        <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--sa-menta)] text-[var(--sa-on-menta)]'>
          <Icon name='lock' size={18} color='currentColor' />
        </span>
        <div className='min-w-0'>
          <p className='text-[13.5px] leading-tight font-extrabold'>
            Confidencialidad Médica y Ética Psicopedagógica Garantizada
          </p>
          <p className='mt-0.5 max-w-[90ch] text-[12.5px] leading-snug text-[var(--sa-muted)]'>
            El acceso a este panel está restringido al personal autorizado de la Unidad SEE. La
            información clínica se resguarda conforme a la normativa de protección de datos.
          </p>
        </div>
      </div>
      <p className='shrink-0 self-start rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 py-2 font-mono text-[11px] leading-tight font-semibold whitespace-nowrap sm:self-auto'>
        {hashConfidencial}
      </p>
    </section>
  )
}
