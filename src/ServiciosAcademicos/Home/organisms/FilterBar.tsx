import { ActionButton } from '../../shared/atoms/ActionButton'
import { SearchField } from '../../shared/atoms/SearchField'
import { SelectField } from '../../shared/atoms/SelectField'
import { homeContent } from '../constants/homeContent'

const groupOptions = [
  '2° B - Turno Vespertino',
  '2° B - Turno Matutino',
  '3° A - Turno Matutino',
]

const conditionOptions = [
  'Todos los diagnósticos',
  'TEA / Soporte en Comunicación',
  'TDAH Combinado',
  'Dislexia Fonológica',
]

export function FilterBar() {
  const { search, group, condition, newFicha } = homeContent.filters

  return (
    <section
      aria-label="Filtros de expedientes"
      className="grid grid-cols-1 items-end gap-4 rounded-[16px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)] md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_auto]"
    >
      <SearchField label={search.label} placeholder={search.placeholder} />
      <SelectField label={group.label} value={group.value} options={groupOptions} />
      <SelectField
        label={condition.label}
        value={condition.value}
        options={conditionOptions}
        icon="sliders"
      />
      <ActionButton label={newFicha.label} icon={newFicha.icon} variant="solid" tone="forest" />
    </section>
  )
}
