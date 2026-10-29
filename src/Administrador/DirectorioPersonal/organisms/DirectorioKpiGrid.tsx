import { KpiCard } from '../molecules/KpiCard'

export function DirectorioKpiGrid() {
  const items = [
    { label: 'Cuentas totales', valor: 48, desc: 'Usuarios habilitados', icon: 'users', color: 'bg-[color-mix(in_srgb,var(--color-forest)_16%,transparent)] text-[var(--color-forest)]' },
    { label: 'Docentes / Maestros', valor: 28, desc: 'Personal docente', icon: 'graduation-cap', color: 'bg-[color-mix(in_srgb,#2C5A7A_16%,transparent)] text-[var(--sa-steel)]' },
    { label: 'Psicología & SEE', valor: 6, desc: 'Gabinete especializado', icon: 'brain', color: 'bg-[color-mix(in_srgb,#22524A_16%,transparent)] text-[var(--color-forest)]' },
    { label: 'Prefectura Escolar', valor: 8, desc: 'Convivencia escolar', icon: 'shield', color: 'bg-[color-mix(in_srgb,#7A4320_16%,transparent)] text-[var(--sa-coffee)]' },
    { label: 'Servicios Académicos', valor: 6, desc: 'Admisión y control', icon: 'clipboard', color: 'bg-[var(--sa-chip-gray)] text-[var(--sa-muted)]' },
  ]
  return (
    <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-5'>
      {items.map((k) => (
        <KpiCard key={k.label} {...k} />
      ))}
    </div>
  )
}
