import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import { folioCedulaElectronico } from '../constants/concentrado'

export function EndosoInstitucional() {
  return (
    <section className='w-full min-w-0 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 shadow-[var(--shadow-sm)]'>
      <div className='flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between'>
        <div className='min-w-0'>
          <p className='text-[10.5px] font-bold tracking-widest text-[var(--sa-steel)] uppercase'>
            Validación legal y dictaminación
          </p>
          <h2 className='mt-1 text-[20px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
            Endoso Institucional de Atención Psicopedagógica
          </h2>
        </div>
        <Chip tono='menta' icon='circle-check'>
          Certificado Electrónico Folio: {folioCedulaElectronico}
        </Chip>
      </div>

      <div className='mt-5 grid w-full min-w-0 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3'>
        <article className='flex min-w-0 flex-col items-center gap-2 rounded-xl bg-[var(--sa-field)] px-4 py-5 text-center'>
          <span className='flex h-11 w-11 items-center justify-center rounded-full bg-[#22C55E]/15 text-[#166534]'>
            <Icon name='shield' size={20} color='currentColor' />
          </span>
          <p className='mt-1 text-[14px] font-extrabold'>Dra. Claudia Méndez</p>
          <p className='text-[12px] text-[var(--sa-muted)]'>Cédula Prof. 8492041 • Psicóloga SEE</p>
          <p className='text-[11.5px] text-[var(--sa-muted)]'>Especialista en Intervención y DUA</p>
          <div className='mt-3 h-px w-full max-w-[220px] bg-[var(--sa-border)]' />
          <p className='text-[11px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>Firma y sello</p>
        </article>

        <article className='flex min-w-0 flex-col items-center gap-2 rounded-xl bg-[var(--sa-field)] px-4 py-5 text-center'>
          <span className='flex h-11 w-11 items-center justify-center rounded-full bg-[var(--sa-slate)]/15 text-[var(--sa-slate)]'>
            <Icon name='graduation-cap' size={20} color='currentColor' />
          </span>
          <p className='mt-1 text-[14px] font-extrabond'>Mtro. Roberto Tovilla Ruiz</p>
          <p className='text-[12px] text-[var(--sa-muted)]'>Director del Plantel Escolar</p>
          <p className='text-[11.5px] text-[var(--sa-muted)]'>Sec. Fed. "Adolfo López Mateos"</p>
          <div className='mt-3 h-px w-full max-w-[220px] bg-[var(--sa-border)]' />
          <p className='text-[11px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>Firma y sello</p>
        </article>

        <article className='flex min-w-0 flex-col items-center gap-2 rounded-xl bg-[var(--sa-field)] px-4 py-5 text-center'>
          <span className='flex h-11 w-11 items-center justify-center rounded-full bg-[var(--sa-coffee)]/15 text-[var(--sa-coffee)]'>
            <Icon name='stamp' size={20} color='currentColor' />
          </span>
          <p className='mt-1 text-[14px] font-extrabold'>Supervisión Escolar Zona 014</p>
          <p className='text-[12px] text-[var(--sa-muted)]'>Inspección General de Educación Secundaria</p>
          <p className='text-[11.5px] text-[var(--sa-muted)]'>Secretaría de Educación del Estado</p>
          <div className='mt-3 h-px w-full max-w-[220px] bg-[var(--sa-border)]' />
          <p className='text-[11px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>Firma y sello</p>
        </article>
      </div>

      <div className='mt-4 flex min-w-0 items-start gap-3 rounded-xl bg-[var(--sa-field)] px-4 py-3'>
        <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--sa-card)] text-[var(--color-text-primary)]'>
          <Icon name='shield' size={18} color='currentColor' />
        </span>
        <p className='text-[12px] leading-relaxed text-[var(--sa-muted)]'>
          <span className='font-bold text-[var(--color-text-primary)]'>AVISO DE PRIVACIDAD Y NORMATIVIDAD:</span>{' '}
          La información contenida en este concentrado psicopedagógico está protegida por la Ley General
          de Protección de Datos Personales en Posesión de Sujetos Obligados y los lineamientos de
          Inclusión y Equidad de la Secretaría de Educación Pública (SEP). Su uso es estrictamente
          confidencial para adecuaciones curriculares y seguimiento socioemocional del estudiante.
        </p>
      </div>
    </section>
  )
}
