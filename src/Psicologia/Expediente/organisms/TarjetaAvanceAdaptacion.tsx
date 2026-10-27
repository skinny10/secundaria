import { Chip } from '../../../Portal/shared/atoms/Chip'
import type { IndicadorAvance } from '../types'

interface TarjetaAvanceAdaptacionProps {
  indicadores: IndicadorAvance[]
  tasa: { etiqueta: string; valor: string }
}

export function TarjetaAvanceAdaptacion({ indicadores, tasa }: TarjetaAvanceAdaptacionProps) {
  return (
    <section className='sa-no-print flex flex-col gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-[18px] shadow-[var(--shadow-sm)]'>
      <header className='flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-[15px] leading-tight font-bold'>Avance de Adaptación</h2>
        <Chip tono='menta'>Semestre 1</Chip>
      </header>

      <p className='text-[12.5px] leading-relaxed text-[var(--sa-muted)]'>
        Métricas consolidadas de bitácora docente y autorregulación en aula.
      </p>

      <div className='rounded-[14px] bg-[var(--sa-field)] p-3'>
        <div className='flex h-28 items-end gap-2'>
          {indicadores.map((indicador) => (
            <div
              key={indicador.id}
              className='flex h-full flex-1 flex-col items-center justify-end gap-1'
            >
              <span className='text-[11px] font-bold'>{indicador.valor}%</span>
              <div
                className='w-3/4 rounded-t-[6px]'
                style={{ height: `${Math.round(indicador.valor * 0.85)}px`, backgroundColor: indicador.color }}
              />
            </div>
          ))}
        </div>
        <div className='mt-2 flex gap-2'>
          {indicadores.map((indicador) => (
            <span
              key={indicador.id}
              className='flex-1 text-center text-[10.5px] leading-tight font-bold text-[var(--sa-muted)]'
            >
              {indicador.label}
            </span>
          ))}
        </div>
      </div>

      <div className='rounded-[14px] bg-[var(--sa-field)] p-3'>
        <p className='text-[12px] leading-snug text-[var(--sa-muted)]'>{tasa.etiqueta}</p>
        <p className='mt-0.5 text-[14px] leading-tight font-bold'>{tasa.valor}</p>
      </div>
    </section>
  )
}
