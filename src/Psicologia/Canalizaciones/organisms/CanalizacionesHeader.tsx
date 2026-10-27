import { Icon } from '../../../utils/atoms/Icon'

export function CanalizacionesHeader() {
  return (
    <section className='w-full min-w-0 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-[18px] py-[14px] shadow-[var(--shadow-sm)]'>
      <div className='flex flex-col gap-3'>
        <div className='flex min-w-0 flex-col gap-2'>
          <span className='inline-flex w-fit items-center gap-2 rounded-full bg-[var(--sa-field)] px-3 py-1 text-[11px] font-bold tracking-widest uppercase text-[var(--color-forest)]'>
            <Icon name='clipboard' size={14} color='currentColor' />
            SUBDIRECCIÓN TÉCNICA · UNIDAD DE SERVICIOS EDUCATIVOS ESPECIALES (SEE)
          </span>
          <h1 className='text-[clamp(24px,2.1vw,30px)] leading-tight font-extrabold text-[#1F4A3F]'>
            Registro y Control de Canalizaciones al Departamento de Psicología y SEE
          </h1>
          <p className='max-w-[90ch] text-[13.5px] text-[var(--sa-muted)]'>
            Recepción sistemática de solicitudes enviadas por Docentes titulares, Asesores de
            grupo y Trabajo Social para valoración psicopedagógica y atención clínica.
          </p>
        </div>
        <div className='flex flex-wrap items-center justify-start gap-2'>
          <select className='h-11 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[14.5px]'>
            <option>Periodo: Sep - Oct 2025</option>
          </select>
          <button className='inline-flex h-11 items-center gap-2 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-field)] px-3 text-[14.5px] font-bold hover:brightness-95'>
            <Icon name='file-text' size={16} color='currentColor' />
            Descargar Excel / CSV
          </button>
          <button className='inline-flex h-11 items-center gap-2 rounded-lg bg-[var(--sa-accent)] px-3 text-[14.5px] font-bold text-[var(--sa-on-accent)] hover:brightness-95'>
            <Icon name='plus' size={16} color='currentColor' />
            Nueva Canalización Manual
          </button>
        </div>
      </div>
    </section>
  )
}
