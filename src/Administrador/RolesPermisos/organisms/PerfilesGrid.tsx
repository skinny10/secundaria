import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { perfiles } from '../constants/perfiles'

export function PerfilesGrid() {
  return (
    <section className='flex flex-col gap-6'>
      <header className='flex flex-wrap items-center justify-between gap-4'>
        <div>
          <h2 className='text-[34px] font-extrabold text-[var(--sa-text)]'>Perfiles y Niveles de Seguridad</h2>
          <p className='text-[22px] text-[var(--sa-muted)]'>4 grupos de trabajo activos con 48 cuentas asignadas en el plantel</p>
        </div>
        <span className='rounded-full bg-[color-mix(in_srgb,var(--color-forest)_16%,transparent)] px-4 py-1.5 text-[19px] font-bold text-[var(--color-forest)]'>● 100% Cuentas Verificadas</span>
      </header>
      <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
        {perfiles.map((p) => (
          <article key={p.id} className='flex h-full flex-col rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
            <div className='flex flex-col gap-4 p-7'>
              <div className='flex items-center justify-between'>
                <div className='flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--sa-field)] text-[var(--color-forest)]'>
                  <Icon name={p.icono as any} size={28} />
                </div>
                <span className={cn('rounded-full px-3 py-1 text-[17px] font-bold', p.nivelColor)}>{p.nivel}</span>
              </div>
              <div>
                <h3 className='text-[28px] font-extrabold text-[var(--sa-text)]'>{p.nombre}</h3>
                <p className='text-[19px] text-[var(--sa-muted)]'>{p.usuarios} usuarios</p>
              </div>
              <p className='line-clamp-3 text-[21px] text-[var(--sa-text)]'>{p.descripcion}</p>
            </div>
            <div className='mt-auto flex items-center justify-between border-t border-[var(--sa-border)] px-7 py-4'>
              <div className='flex items-center gap-2 rounded-full bg-[var(--sa-field)] px-3 py-1 text-[18px] font-semibold'>
                <Icon name={p.pieIcono as any} size={18} />
                <span>{p.pieChip}</span>
              </div>
              <button type='button' className='text-[20px] font-bold text-[var(--color-forest)] hover:underline'>Editar ›</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
