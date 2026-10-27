import { Icon } from '../../../utils/atoms/Icon'

interface ResumenDiagnosticoCardProps {
  resumen: typeof import('../constants/diagnosticoBap').resumenDiagnostico
}

export function ResumenDiagnosticoCard({ resumen }: ResumenDiagnosticoCardProps) {
  return (
    <section className='rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-[var(--shadow-sm)]'>
      <header className='flex flex-wrap items-center justify-between gap-2 border-b border-[var(--sa-border)] px-6 py-4'>
        <div className='flex items-center gap-2.5'>
          <span className='flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--sa-sky)] text-[var(--sa-steel)]'>
            <Icon name='file-text' size={18} color='currentColor' />
          </span>
          <div className='flex flex-col'>
            <span className='text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--sa-muted)]'>
              {resumen.encabezado}
            </span>
            <h2 className='text-[22px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
              {resumen.titulo}
            </h2>
          </div>
        </div>
        <span className='inline-flex items-center gap-1.5 rounded-full bg-[var(--sa-menta)] px-3 py-1 text-[12px] font-bold text-[var(--sa-on-menta)]'>
          <Icon name='circle-check' size={14} color='currentColor' />
          {resumen.validado}
        </span>
      </header>

      <div className='grid grid-cols-1 gap-4 px-6 py-5 md:grid-cols-2 xl:grid-cols-4'>
        <div className='flex flex-col gap-1'>
          <span className='text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--sa-muted)]'>Especialista emisor</span>
          <p className='text-[15px] leading-snug font-semibold'>{resumen.especialista}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--sa-muted)]'>Tipo de evaluación</span>
          <p className='text-[15px] leading-snug font-semibold'>{resumen.tipoEvaluacion}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--sa-muted)]'>Dictamen principal</span>
          <p className='text-[15px] leading-snug font-semibold'>{resumen.dictamenPrincipal}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--sa-muted)]'>Referencia y fecha</span>
          <p className='text-[15px] leading-snug font-semibold'>{resumen.referenciaFecha}</p>
        </div>
      </div>

      <div className='flex flex-col gap-4 border-t border-[var(--sa-border)] px-6 py-5'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-[16px] font-extrabold' style={{ color: 'var(--sa-title)' }}>
            Resumen Clínico
          </h3>
          <p className='text-[15px] leading-[1.7] text-[var(--color-text-primary)]'>{resumen.resumen}</p>
        </div>
        <div className='flex items-start gap-3 rounded-xl bg-[var(--sa-field)] px-4 py-3'>
          <span className='flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--sa-card)] text-[var(--color-forest)]'>
            <Icon name='info' size={18} color='currentColor' />
          </span>
          <div className='flex flex-col gap-1'>
            <p className='text-[14px] font-extrabold'>Orientación al cuerpo docente</p>
            <p className='text-[14px] leading-[1.7] text-[var(--sa-muted)]'>{resumen.notaDocente}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
