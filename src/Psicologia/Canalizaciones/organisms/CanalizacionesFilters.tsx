import { Icon } from '../../../utils/atoms/Icon'

export function CanalizacionesFilters() {
  return (
    <section className='flex w-full min-w-0 flex-wrap items-center gap-2 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-[10px] py-2 shadow-[var(--shadow-sm)]'>
      <div className='flex h-11 min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-field)] px-2'>
        <Icon name='search' size={16} color='var(--sa-muted)' />
        <input
          className='h-full w-full min-w-0 bg-transparent text-[14.5px] outline-none placeholder:text-[var(--sa-muted)]'
          placeholder='Buscar por apellido del alumno...'
        />
      </div>
      <select className='h-11 min-w-0 flex-[0_1_180px] rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[14.5px]'>
        <option>Todos los Grados / Grupos</option>
      </select>
      <select className='h-11 min-w-0 flex-[0_1_180px] rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[14.5px]'>
        <option>Todos los Orígenes</option>
      </select>
      <select className='h-11 min-w-0 flex-[0_1_180px] rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[14.5px]'>
        <option>Estado de Canalización</option>
      </select>
      <button
        type='button'
        className='inline-flex h-11 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] hover:bg-[var(--sa-field)]'
        aria-label='Actualizar filtros'
      >
        <Icon name='clock' size={18} color='currentColor' />
      </button>
    </section>
  )
}
