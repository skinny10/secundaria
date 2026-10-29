import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { Colaborador } from '../constants/directorio'

interface DirectorioTableProps {
  colaboradores: Colaborador[]
}

const hoverCelda =
  'group/celda rounded-lg border border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--sa-border)] hover:bg-[var(--sa-field)] hover:shadow-sm'

const hoverTexto = 'transition-colors duration-200 group-hover/celda:text-[var(--color-forest)]'
const hoverIcono = 'shrink-0 transition-transform duration-200 group-hover/celda:scale-110'

export function DirectorioTable({ colaboradores }: DirectorioTableProps) {
  return (
    <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
      <header className='flex flex-wrap items-center justify-between gap-3 border-b border-[var(--sa-border)] px-8 py-6'>
        <div className='flex items-center gap-3'>
          <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-field)] text-[var(--color-forest)]'>
            <Icon name='users' size={24} />
          </div>
          <div>
            <h2 className='text-[28px] font-extrabold text-[var(--sa-text)]'>Listado de Colaboradores</h2>
            <p className='text-[22px] text-[var(--sa-muted)]'>Directorio institucional con control de acceso y estado de cuenta</p>
          </div>
        </div>
        <span className='rounded-full bg-[var(--sa-field)] px-4 py-1.5 text-[18px] font-semibold text-[var(--sa-muted)]'>{colaboradores.length} resultados</span>
      </header>
      <div className='overflow-x-auto'>
        <table className='min-w-full text-[20px]'>
          <thead>
            <tr className='border-b border-[var(--sa-border)] bg-[var(--sa-field)]'>
              <th className='px-8 py-4 text-left text-[13px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>Colaborador</th>
              <th className='px-8 py-4 text-left text-[13px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>Rol / Departamento</th>
              <th className='px-8 py-4 text-left text-[13px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>Correo Institucional</th>
              <th className='px-8 py-4 text-left text-[13px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>Último Acceso</th>
              <th className='px-8 py-4 text-left text-[13px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>Turno</th>
              <th className='px-8 py-4 text-left text-[13px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>Estado</th>
              <th className='px-8 py-4 text-right text-[13px] font-bold uppercase tracking-wide text-[var(--sa-muted)]'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {colaboradores.map((c) => {
              const bloqueado = c.estado === 'Bloqueado'
              return (
                <tr
                  key={c.id}
                  className={cn(
                    'group border-b border-[var(--sa-border)] transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--color-forest)_5%,transparent)]',
                    bloqueado ? 'bg-[color-mix(in_srgb,#FAD9D9_40%,transparent)]' : ''
                  )}
                >
                  <td className='px-8 py-5'>
                    <div className={cn('flex items-center gap-4 px-3 py-2', hoverCelda)}>
                      <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-[18px] font-bold text-[var(--sa-on-accent)] transition-transform duration-200 group-hover/celda:scale-105'>{c.nombre.split(' ').slice(0, 2).map((n) => n[0]).join('')}</div>
                      <div>
                        <p className={cn('font-semibold text-[var(--sa-text)]', hoverTexto)}>{c.nombre}</p>
                        <p className='flex items-center gap-1.5 text-[18px] text-[var(--sa-muted)]'>
                          <Icon name='id-card' size={16} className={hoverIcono} />
                          ID: {c.id.padStart(6, '0')}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className='px-8 py-5'>
                    <div className={cn('flex flex-col px-3 py-2', hoverCelda)}>
                      <p className={cn('flex items-center gap-2 font-semibold', hoverTexto)}>
                        <Icon name='briefcase-medical' size={18} className={cn(hoverIcono, 'text-[var(--color-forest)]')} />
                        {c.rol}
                      </p>
                      <p className='text-[18px] text-[var(--sa-muted)]'>{c.departamento}</p>
                    </div>
                  </td>
                  <td className='px-8 py-5'>
                    <div className={cn('inline-flex items-center gap-2 px-3 py-2', hoverCelda)}>
                      <Icon name='mail' size={18} className={cn(hoverIcono, 'text-[var(--sa-muted)]')} />
                      <span className={hoverTexto}>{c.correo}</span>
                    </div>
                  </td>
                  <td className='px-8 py-5 text-[var(--sa-muted)]'>
                    <div className={cn('inline-flex items-center gap-2 px-3 py-2', hoverCelda)}>
                      <Icon name='clock' size={18} className={hoverIcono} />
                      <span className={hoverTexto}>{c.ultimoAcceso}</span>
                    </div>
                  </td>
                  <td className='px-8 py-5'>
                    <div className={cn('inline-flex items-center gap-2 px-3 py-2', hoverCelda)}>
                      <Icon name='calendar' size={18} className={cn(hoverIcono, 'text-[var(--sa-muted)]')} />
                      <span className={hoverTexto}>{c.turno}</span>
                    </div>
                  </td>
                  <td className='px-8 py-5'>
                    <span className={cn('inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[17px] font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm', bloqueado ? 'bg-[color-mix(in_srgb,#D64545_16%,transparent)] text-[#D64545]' : 'bg-[color-mix(in_srgb,var(--color-forest)_16%,transparent)] text-[var(--color-forest)]')}>
                      <Icon name={bloqueado ? 'circle-x' : 'circle-check'} size={16} className='shrink-0' />
                      {c.estado}
                    </span>
                  </td>
                  <td className='px-8 py-5 text-right'>
                    <button
                      type='button'
                      title='Más acciones'
                      aria-label={`Más acciones para ${c.nombre}`}
                      className='inline-flex h-12 w-12 items-center justify-center rounded-lg border border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--sa-border)] hover:bg-[var(--sa-field)] hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
                    >
                      <Icon name='more-horizontal' size={22} className='transition-transform duration-200 group-hover:scale-110' />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
