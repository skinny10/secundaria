import { ActionButton } from '../../shared/atoms/ActionButton'
import { Chip } from '../../shared/atoms/Chip'
import { fichaContent } from '../constants/fichaContent'

export function FichaNavRow() {
  const { back, chips } = fichaContent.nav

  return (
    <nav
      aria-label="Navegación de la ficha"
      className="sa-no-print flex flex-wrap items-center gap-3"
    >
      <ActionButton label={back.label} icon={back.icon} variant="neutral" />
      {chips.map((chip) => (
        <Chip key={chip.id} label={chip.label} icon={chip.icon} tone={chip.tone} />
      ))}
    </nav>
  )
}
