import { Icon } from '../../../utils/atoms/Icon'
import { KpiPadronCard } from '../molecules/KpiPadronCard'
import { encabezadoPadron, kpisPadron } from '../constants/padronContent'
import type { KpiId, KpiPadron } from '../types'

interface EncabezadoPadronProps {
  valores: Record<KpiId, number>
  pendientesActivo: boolean
  onFiltrarPendientes: () => void
}

export function EncabezadoPadron({
  valores,
  pendientesActivo,
  onFiltrarPendientes,
}: EncabezadoPadronProps) {
  return (
    <section className='grid w-full min-w-0 grid-cols-1 items-center gap-4 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)] min-[1200px]:grid-cols-[minmax(0,1fr)_auto]'>
      <div className='flex min-w-0 items-start gap-3'>
        <span
          aria-hidden='true'
          className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-menta-soft)] text-[var(--sa-on-menta-soft)]'
        >
          <Icon name={encabezadoPadron.icono} size={26} color='currentColor' />
        </span>
        <div className='min-w-0'>
          <p className='text-[11px] leading-snug font-bold tracking-widest whitespace-nowrap text-[var(--sa-title)] uppercase'>
            {encabezadoPadron.eyebrow}
          </p>
          <h1 className='mt-1 max-w-[28ch] text-[clamp(24px,2vw,28px)] leading-tight font-extrabold text-[var(--sa-title)]'>
            {encabezadoPadron.titulo}
          </h1>
          <p className='mt-2 max-w-[70ch] text-[14px] leading-relaxed text-[var(--sa-muted)]'>
            {encabezadoPadron.descripcion}
          </p>
        </div>
      </div>

      <div className='flex w-full min-w-0 flex-wrap gap-2 min-[1200px]:w-auto min-[1200px]:justify-end'>
        {kpisPadron.map((kpi: KpiPadron) => (
          <KpiPadronCard
            key={kpi.id}
            kpi={kpi}
            valor={valores[kpi.id]}
            activo={kpi.id === 'pendientes' && pendientesActivo}
            onClick={kpi.id === 'pendientes' ? onFiltrarPendientes : undefined}
            ariaLabel={
              kpi.id === 'pendientes'
                ? encabezadoPadron.ariaFiltrarPendientes
                : `${kpi.etiqueta}: ${valores[kpi.id]}`
            }
          />
        ))}
      </div>
    </section>
  )
}
