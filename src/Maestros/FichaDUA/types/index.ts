import type { IconName } from '../../../utils/types'
import type { ChipTone, Tone } from '../../shared/types'

export type { ChipTone }

export interface Pauta {
  icon: IconName
  title: string
  description: string
}

export interface DuaModule {
  id: string
  label: string
  title: string
  icon: IconName
  tone: Tone
  pautas: Pauta[]
  footer: { icon: IconName; text: string }
}

export interface FichaAlumno {
  initials: string
  name: string
  expediente: string
  matricula: string
  grupo: string
  edad: string
  priority: { label: string; value: string }
  diagnostic: { icon: IconName; label: string; value: string; detail: string }
  psychologist: {
    icon: IconName
    label: string
    name: string
    call: { label: string; icon: IconName }
    message: { label: string; icon: IconName }
  }
}
