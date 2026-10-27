import { Chip } from '../../../Portal/shared/atoms/Chip'
import { Icon } from '../../../utils/atoms/Icon'
import { escuelaInfo } from '../constants/concentrado'

export function TarjetaEscuela() {
  return (
    <section className='w-full min-w-0 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 shadow-[var(--shadow-sm)]'>
      <div className='grid min-w-0 grid-cols-1 items-center gap-4 lg:grid-cols-[auto_minmax(0,1fr)_auto]'>
        <span className='flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--sa-menta)] text-[var(--sa-on-menta)]'>
          <Icon name='graduation-cap' size={30} color='currentColor' />
        </span>
        <div className='min-w-0'>
          <div className='flex flex-wrap items-center gap-2'>
            <Chip tono='azul'>CCT: {escuelaInfo.cct}</Chip>
            <Chip tono='gris'>ZONA ESCOLAR: {escuelaInfo.zona}</Chip>
            <Chip tono='bosque'>SOSTENIMIENTO: {escuelaInfo.sostenimiento}</Chip>
          </div>
          <h1
            className='mt-2 text-[clamp(22px,2.4vw,26px)] leading-tight'
            style={{ color: 'var(--sa-title)', fontWeight: 800 }}
          >
            {escuelaInfo.nombre}
          </h1>
          <p className='mt-1 max-w-[90ch] text-[13.5px] leading-relaxed text-[var(--sa-muted)]'>
            {escuelaInfo.direccion} • Turno:{' '}
            <span className='font-bold text-[var(--color-text-primary)]'>{escuelaInfo.turno}</span>{' '}
            • Periodo:{' '}
            <span className='font-bold text-[var(--color-text-primary)]'>{escuelaInfo.periodo}</span>
          </p>
        </div>
        <div className='w-full min-w-0 rounded-xl bg-[var(--sa-field)] px-4 py-3 lg:w-[230px]'>
          <p className='text-[10px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
            Estatus cédula
          </p>
          <p className='mt-1 flex min-h-[44px] items-center gap-2 text-[12.5px] leading-tight font-bold'>
            <span className='h-2 w-2 shrink-0 rounded-full bg-emerald-500' />
            <span className='whitespace-normal'>En Tiempo / Dictaminación</span>
          </p>
        </div>
      </div>
    </section>
  )
}
