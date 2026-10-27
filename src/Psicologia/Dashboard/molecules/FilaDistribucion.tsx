import type { CondicionDistribucion } from '../types'

interface FilaDistribucionProps {
  condicion: CondicionDistribucion
  total: number
}

export function FilaDistribucion({ condicion, total }: FilaDistribucionProps) {
  const ancho = total > 0 ? Math.min(100, (condicion.alumnos / total) * 100) : 0

  return (
    <div className='min-w-0'>
      <div className='flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1'>
        <div className='flex min-w-0 items-center gap-2'>
          <span
            aria-hidden='true'
            className='h-2.5 w-2.5 shrink-0 rounded-full'
            style={{ backgroundColor: condicion.color }}
          />
          <p className='min-w-0 text-[13.5px] leading-tight font-bold'>{condicion.nombre}</p>
        </div>
        <p className='shrink-0 text-[12px] font-semibold whitespace-nowrap text-[var(--sa-muted)]'>
          {condicion.alumnos} alumnos ({condicion.porcentaje}%)
        </p>
      </div>
      <div
        role='progressbar'
        aria-label={`${condicion.nombre}: ${condicion.alumnos} alumnos de ${total}`}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={condicion.alumnos}
        className='mt-1.5 h-3 w-full overflow-hidden rounded-full bg-[var(--sa-field)]'
      >
        <div
          className='h-full rounded-full'
          style={{ width: `${ancho}%`, backgroundColor: condicion.color }}
        />
      </div>
      <p className='mt-1 text-[12px] leading-snug text-[var(--sa-muted)]'>
        <span aria-hidden='true'>• </span>Principales ajustes: {condicion.ajustes}
      </p>
    </div>
  )
}
