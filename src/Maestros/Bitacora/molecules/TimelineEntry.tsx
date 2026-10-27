import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { Chip } from '../../shared/atoms/Chip'
import { IconTile } from '../../shared/atoms/IconTile'
import { RichText } from './RichText'
import type { HighlightTone, Observacion } from '../types'

const linkToneClasses: Record<HighlightTone, string> = {
  forest: 'text-[var(--sa-accent)]',
  steel: 'text-[var(--sa-steel)]',
  coffee: 'text-[var(--sa-coffee)]',
}

interface TimelineEntryProps {
  observacion: Observacion
}

export function TimelineEntry({ observacion }: TimelineEntryProps) {
  const { categoria, link } = observacion

  return (
    <article className="rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        <div className="flex items-start gap-3 sm:w-[190px] sm:shrink-0 sm:flex-col sm:gap-3">
          <IconTile icon={observacion.icon} tone={observacion.tone} />
          <div>
            <p className="text-base font-extrabold text-[var(--color-text-primary)]">
              {observacion.fecha}
            </p>
            <p
              className={cn(
                'mt-1 inline-flex items-center gap-1.5 text-base font-bold',
                observacion.horaTone === 'coffee'
                  ? 'text-[var(--sa-coffee)]'
                  : 'text-[var(--sa-muted)]'
              )}
            >
              <Icon name="clock" size={14} color="currentColor" />
              {observacion.hora}
            </p>
            <p className="mt-1 text-[13px] font-bold tracking-wide text-[var(--sa-muted)] uppercase">
              {observacion.lugar}
            </p>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-2 font-extrabold text-[var(--color-text-primary)]">
              <Icon name={observacion.materiaIcon} size={17} color="var(--sa-accent)" />
              {observacion.materia}
              <span className="font-semibold text-[var(--sa-muted)]">· {observacion.docente}</span>
            </span>
            <Chip label={categoria.label} icon={categoria.icon} tone={categoria.tone} />
          </div>

          <div className="mt-3 rounded-xl bg-[var(--sa-field)] px-4 py-3">
            <RichText segments={observacion.nota} />
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[13px] font-extrabold tracking-wide text-[var(--sa-muted)] uppercase">
                {observacion.chipsLabel}
              </span>
              {observacion.chips.map((chip) => (
                <Chip key={chip} label={chip} tone="neutral" />
              ))}
            </div>
            <button
              type="button"
              className={cn(
                'inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold underline',
                linkToneClasses[link.tone ?? 'forest']
              )}
            >
              <Icon name={link.icon} size={15} color="currentColor" />
              {link.label}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
