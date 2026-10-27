import { Icon } from '../../../utils/atoms/Icon'
import type { Indicador } from '../types'

function colorLegible(hex: string, isDark: boolean) {
  if (!isDark) return hex
  const n = parseInt(hex.replace('#', ''), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum < 0.55 ? 'var(--color-text-primary)' : hex
}

interface IndicadorCardProps {
  indicador: Indicador
  isDark: boolean
}

export function IndicadorCard({ indicador, isDark }: IndicadorCardProps) {
  const color = colorLegible(indicador.color, isDark)

  return (
    <article className='flex min-w-0 flex-col gap-2 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-[14px] py-3 shadow-[var(--shadow-sm)]'>
      <div className='flex items-start justify-between gap-2'>
        <span className='text-[11px] font-bold tracking-widest uppercase leading-snug text-[var(--sa-muted)]'>
          {indicador.label}
        </span>
        <Icon name={indicador.icon} size={16} color={color} />
      </div>
      <div className='flex flex-wrap items-baseline gap-x-2 gap-y-1'>
        <p className='text-[30px] leading-none font-extrabold' style={{ color }}>
          {indicador.valor}
        </p>
        <p className='text-[12.5px] text-[var(--sa-muted)]'>{indicador.apoyo}</p>
        {indicador.chip ? (
          <span className='inline-flex items-center rounded-full bg-[var(--sa-peach)] px-2 py-0.5 text-[12.5px] font-bold text-[var(--sa-coffee)]'>
            {indicador.chip}
          </span>
        ) : null}
      </div>
      <div className='mt-auto h-1 w-full rounded-full bg-[var(--sa-field)]'>
        <div
          className='h-full rounded-full'
          style={{ width: `${indicador.barra}%`, backgroundColor: color }}
        />
      </div>
    </article>
  )
}
