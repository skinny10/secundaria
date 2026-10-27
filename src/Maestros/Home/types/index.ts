import type { IconName } from '../../../utils/types'
import type { ActionTone, Tone } from '../../shared/types'

export type { ActionTone, Tone }

export interface Metric {
  id: string
  tone: Tone
  icon: IconName
  title: string
  value: string
  description: string
  chip?: { label: string; tone: 'coffee' }
}

export interface Adjustment {
  title: string
  description: string
}

export interface Student {
  id: string
  initials: string
  name: string
  matricula: string
  salon: string
  tone: Tone
  actionTone: ActionTone
  condition: { label: string; icon: IconName; tone: Tone }
  adjustments: Adjustment[]
  tracking: { icon: IconName; text: string }
}
