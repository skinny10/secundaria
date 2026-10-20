import { IconTile } from '../../shared/atoms/IconTile'
import { Chip } from '../../shared/atoms/Chip'
import { fichaContent } from '../constants/fichaContent'

export function SectionHeader() {
  const { icon, title, subtitle, chip } = fichaContent.section

  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <IconTile icon={icon} tone="menta" />
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-extrabold leading-tight">{title}</h2>
          <p className="text-lg text-[var(--sa-muted)]">{subtitle}</p>
        </div>
      </div>
      <Chip label={chip} tone="neutral" className="w-fit sm:shrink-0" />
    </section>
  )
}
