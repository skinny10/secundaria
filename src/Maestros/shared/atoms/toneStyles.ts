import type { ActionTone, Tone } from '../types'

export const softToneClasses: Record<Tone, string> = {
  menta: 'bg-[var(--sa-menta)] text-[var(--sa-accent)]',
  sky: 'bg-[var(--sa-sky)] text-[var(--sa-slate)]',
  peach: 'bg-[var(--sa-peach)] text-[var(--sa-coffee)]',
}

export const solidToneClasses: Record<ActionTone, string> = {
  forest: 'bg-[var(--color-forest)] text-[var(--sa-on-accent)] hover:brightness-95',
  slate: 'bg-[var(--sa-slate)] text-[var(--sa-on-accent)] hover:brightness-95',
  coffee: 'bg-[var(--sa-coffee)] text-[var(--sa-on-accent)] hover:brightness-95',
}

export const avatarFilledClasses = {
  forest: 'bg-[var(--color-forest)] text-[var(--sa-on-accent)]',
  slate: 'bg-[var(--sa-slate)] text-[var(--sa-on-accent)]',
} as const
