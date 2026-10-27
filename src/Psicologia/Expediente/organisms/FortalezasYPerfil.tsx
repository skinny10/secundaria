import { Icon } from '../../../utils/atoms/Icon'
import type { FortalezaBAP, PerfilCognitivo } from '../constants/diagnosticoBap'

interface FortalezasYPerfilProps {
  fortalezas: FortalezaBAP[]
  perfil: PerfilCognitivo[]
}

export function FortalezasYPerfil({ fortalezas, perfil }: FortalezasYPerfilProps) {
  return (
    <section className='flex flex-col gap-4 rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 shadow-[var(--shadow-sm)]'>
      <header className='flex items-start gap-3'>
        <span className='flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sa-menta)] text-[var(--sa-on-menta)]'>
          <Icon name='brain' size={20} color='currentColor' />
        </span>
        <div className='flex flex-col gap-1'>
          <h2 className='text-[22px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
            3. Fortalezas y Estilos de Procesamiento
          </h2>
          <p className='text-[14px] text-[var(--sa-muted)]'>
            Recursos del alumno para aprovechar en las adecuaciones DUA
          </p>
        </div>
      </header>

      <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
        {fortalezas.map((fortaleza) => (
          <article key={fortaleza.id} className='flex min-w-0 flex-col gap-2 rounded-xl border border-[var(--sa-border)] p-5'>
            <div className='flex items-start justify-between gap-2'>
              <div className='flex items-start gap-2.5'>
                <span className='flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--sa-menta)] text-[var(--sa-on-menta)]'>
                  <Icon name='star' size={18} color='currentColor' />
                </span>
                <h3 className='text-[16px] leading-snug font-extrabold' style={{ color: 'var(--sa-title)' }}>
                  {fortaleza.titulo}
                </h3>
              </div>
              {fortaleza.evaluacion ? (
                <span className='inline-flex items-center rounded-full bg-[var(--sa-menta)] px-2.5 py-1 text-[11px] font-bold text-[var(--sa-on-menta)]'>
                  {fortaleza.evaluacion}
                </span>
              ) : null}
            </div>
            <p className='text-[14px] leading-[1.7] text-[var(--color-text-primary)]'>{fortaleza.descripcion}</p>
          </article>
        ))}
      </div>

      <div className='flex flex-col gap-4 rounded-xl border border-[var(--sa-border)] p-5'>
        <header className='flex items-center justify-between gap-2'>
          <div className='flex items-center gap-2.5'>
            <span className='flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--sa-sky)] text-[var(--sa-steel)]'>
              <Icon name='trending-up' size={18} color='currentColor' />
            </span>
            <h3 className='text-[16px] font-extrabold' style={{ color: 'var(--sa-title)' }}>
              Perfil Cognitivo Comparativo
            </h3>
          </div>
          <span className='text-[12px] text-[var(--sa-muted)]'>Valores orientativos, no diagnósticos</span>
        </header>
        <div className='flex flex-col gap-3'>
          {perfil.map((item) => (
            <div key={item.id} className='flex flex-col gap-2'>
              <div className='flex flex-wrap items-center justify-between gap-2'>
                <p className='text-[14px] font-semibold'>{item.etiqueta}</p>
                <div className='flex items-center gap-2 text-[13px] text-[var(--sa-muted)]'>
                  <span className='font-bold text-[var(--color-text-primary)]'>
                    {item.valor}
                    {item.unidad}
                  </span>
                  <span>{item.interpretacion}</span>
                </div>
              </div>
              <div className='h-2.5 w-full rounded-full bg-[var(--sa-field)]'>
                <div
                  className='h-2.5 rounded-full bg-[linear-gradient(90deg,var(--color-forest)_0%,var(--sa-slate)_100%)]'
                  style={{ width: `${Math.min(100, Math.max(0, item.valor))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
