import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { rolesColaborador } from '../constants/roles'

interface RolAsignacionProps {
  rolSeleccionado: string
  onSelect: (id: any) => void
}

export function RolAsignacion({ rolSeleccionado, onSelect }: RolAsignacionProps) {
  return (
    <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
      <header className='flex items-center gap-4 border-b border-[var(--sa-border)] px-8 py-6'>
        <span className='flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-forest)] text-[18px] font-bold text-[var(--sa-on-accent)]'>3</span>
        <h2 className='text-[28px] font-bold text-[var(--sa-text)]'>Asignación de Rol Institucional</h2>
      </header>
      <div className='grid gap-4 px-8 py-6 sm:grid-cols-2 lg:grid-cols-4'>
        {rolesColaborador.map((r) => (
          <button
            key={r.id}
            type='button'
            onClick={() => onSelect(r.id)}
            className={cn('flex flex-col items-start gap-3 rounded-xl border p-6 text-left', rolSeleccionado === r.id ? 'border-[var(--color-forest)] bg-[color-mix(in_srgb,var(--color-forest)_12%,transparent)]' : 'border-[var(--sa-border)] hover:bg-[var(--sa-field)]')}
          >
            <div className='flex items-center gap-3'>
              <Icon name={r.icon as any} size={24} />
              <p className='text-[22px] font-bold text-[var(--sa-text)]'>{r.titulo}</p>
            </div>
            <p className='text-[20px] text-[var(--sa-muted)]'>{r.desc}</p>
            <div className='flex flex-wrap gap-2'>
              {r.permisos.map((p) => (
                <span key={p} className='rounded-full bg-[var(--sa-chip-gray)] px-3 py-1 text-[17px] text-[var(--sa-muted)]'>{p}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
