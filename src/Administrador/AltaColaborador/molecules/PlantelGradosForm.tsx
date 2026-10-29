import { cn } from '../../../utils/cn'
import { useState } from 'react'

export function PlantelGradosForm() {
  const [grados, setGrados] = useState<string[]>([])
  const toggleGrado = (g: string) => {
    setGrados((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]))
  }
  return (
    <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
      <header className='flex items-center gap-4 border-b border-[var(--sa-border)] px-8 py-6'>
        <span className='flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sa-field)] text-[18px] font-bold text-[var(--sa-muted)]'>4</span>
        <h2 className='text-[28px] font-bold text-[var(--sa-text)]'>Plantel y Grados Asignados</h2>
      </header>
      <div className='grid gap-5 px-8 py-6 sm:grid-cols-2'>
        <div className='flex flex-col gap-2'>
          <label className='text-[20px] font-semibold'>Plantel de Adscripción *</label>
          <select className='h-16 rounded-xl border border-[var(--sa-border)] px-4 text-[22px]'>
            <option>Colegio Humanista Norte</option>
            <option>Secundaria Anexa</option>
          </select>
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-[20px] font-semibold'>Clave / Turno Institucional</label>
          <input placeholder='Ej. T-01 / MATUTINO' className='h-16 rounded-xl border border-[var(--sa-border)] px-4 text-[22px]' />
        </div>
        <div className='flex flex-col gap-2 sm:col-span-2'>
          <label className='text-[20px] font-semibold'>Grados / Secciones a Cargo</label>
          <div className='flex flex-wrap gap-3'>
            {['1°', '2°', '3°'].map((g) => (
              <button
                key={g}
                type='button'
                onClick={() => toggleGrado(g)}
                className={cn('rounded-xl border px-6 py-3 text-[20px] font-semibold', grados.includes(g) ? 'border-[var(--color-forest)] bg-[color-mix(in_srgb,var(--color-forest)_14%,transparent)] text-[var(--color-forest)]' : 'border-[var(--sa-border)]')}
              >
                {g} Grado
              </button>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2 sm:col-span-2'>
          <label className='text-[20px] font-semibold'>Observaciones de Adscripción</label>
          <textarea placeholder='Ej. Tutoría de grupo, apoyo a Proyecto Escolar...' className='min-h-[120px] rounded-xl border border-[var(--sa-border)] px-4 py-3 text-[22px]' />
        </div>
      </div>
    </section>
  )
}
