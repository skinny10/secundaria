import type { IconName } from '../../../utils/types'

export type Tone = 'menta' | 'sky' | 'peach'

export type ChipTone = 'menta' | 'sky' | 'peach' | 'neutral'

export type ActionTone = 'forest' | 'slate' | 'coffee'

export interface SidebarItem {
  id: string
  label: string
  icon: IconName
}
