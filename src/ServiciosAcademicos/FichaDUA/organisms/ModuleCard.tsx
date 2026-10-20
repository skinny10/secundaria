import { Icon } from '../../../utils/atoms/Icon'
import { IconTile } from '../../shared/atoms/IconTile'
import { PautaItem } from '../molecules/PautaItem'
import type { DuaModule } from '../types'

interface ModuleCardProps {
  duaModule: DuaModule
}

export function ModuleCard({ duaModule }: ModuleCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-[16px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-4 shadow-[var(--shadow-sm)]">
      <header className="flex items-center gap-3 rounded-[12px] bg-[var(--sa-header)] p-3">
        <IconTile icon={duaModule.icon} tone={duaModule.tone} size="sm" />
        <div className="flex min-w-0 flex-col">
          <span className="text-[13px] font-extrabold uppercase tracking-widest text-[var(--sa-muted)]">
            {duaModule.label}
          </span>
          <h3 className="text-base font-extrabold leading-tight">{duaModule.title}</h3>
        </div>
      </header>

      <div className="flex flex-col gap-3">
        {duaModule.pautas.map((pauta) => (
          <PautaItem key={pauta.title} pauta={pauta} />
        ))}
      </div>

      <div className="mt-auto flex items-start gap-2 rounded-[12px] bg-[var(--sa-field)] px-3 py-2 text-base font-semibold text-[var(--sa-muted)]">
        <Icon
          name={duaModule.footer.icon}
          size={14}
          color="currentColor"
          className="mt-0.5 shrink-0"
        />
        {duaModule.footer.text}
      </div>
    </article>
  )
}
