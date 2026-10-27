import { Icon } from '../../../utils/atoms/Icon'

interface EncabezadoReportesProps {
  ultimoFolio: string
}

export function EncabezadoReportes({ ultimoFolio }: EncabezadoReportesProps) {
  return (
    <section className='w-full min-w-0 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)] sm:px-6'>
      <div className='grid min-w-0 grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1fr)_auto]'>
        <div className='flex min-w-0 flex-col gap-3'>
          <span className='inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-[var(--sa-menta)] px-3 py-1 text-[11px] font-bold text-[var(--sa-on-menta)]'>
            <Icon name='circle-check' size={14} color='currentColor' className='shrink-0' />
            <span className='min-w-0'>
              Supervisión Escolar de Zona 014 · Válido Oficial SEP / SEE
            </span>
          </span>
          <h1 className='max-w-[46ch] text-[clamp(22px,2.2vw,28px)] leading-tight font-extrabold'>
            Centro de Reportes Oficiales y Oficios Institucionales
          </h1>
          <p className='max-w-[80ch] text-[14px] text-[var(--sa-muted)]'>
            Generación automatizada de formatos oficiales de la SEP, oficios de canalización
            externa, actas de acuerdos y concentrado semestral foliado para Supervisión de Zona
            014.
          </p>
        </div>

        <div className='w-full min-w-0 rounded-xl bg-[var(--sa-box)] p-4 xl:w-[240px]'>
          <p className='text-[10px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
            Último folio registrado
          </p>
          <p className='mt-1 text-[24px] leading-tight font-bold whitespace-nowrap text-[var(--color-forest)]'>
            {ultimoFolio}
          </p>
          <p className='mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-[var(--sa-muted)]'>
            <span className='h-2 w-2 shrink-0 rounded-full bg-emerald-500' />
            Cadena Digital Activa
          </p>
        </div>
      </div>
    </section>
  )
}
