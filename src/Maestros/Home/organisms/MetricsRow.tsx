import { MetricCard } from '../molecules/MetricCard'
import { homeContent } from '../constants/homeContent'

export function MetricsRow() {
  return (
    <section aria-label="Métricas del grupo" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {homeContent.metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </section>
  )
}
