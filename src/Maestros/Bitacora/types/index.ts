import type { IconName } from '../../../utils/types'
import type { ChipTone, Tone } from '../../shared/types'

export type FiltroId = 'todas' | 'espanol' | 'quimica' | 'tecnologia' | 'civica'

export type HighlightTone = 'forest' | 'steel' | 'coffee'

export interface RichSegment {
  text: string
  highlight?: HighlightTone
}

export interface CategoriaTag {
  label: string
  tone: ChipTone
  icon?: IconName
}

export interface Observacion {
  id: string
  tone: Tone
  icon: IconName
  fecha: string
  hora: string
  horaTone?: 'coffee'
  lugar: string
  materia: string
  docente: string
  materiaIcon: IconName
  categoria: CategoriaTag
  nota: RichSegment[]
  chipsLabel: string
  chips: string[]
  link: { label: string; icon: IconName; tone?: HighlightTone }
  filtro: FiltroId
}

export interface Filtro {
  id: FiltroId
  label: string
  icon: IconName
}

export interface AsignaturaOption {
  id: string
  label: string
  materia: string
  docente: string
  materiaIcon: IconName
  filtro: FiltroId
}

export interface ObservationType {
  id: string
  icon: IconName
  title: string
  subtitle: string
  tone: Tone
  categoria: CategoriaTag
}

export interface ObservacionModalContent {
  header: {
    pill: { icon: IconName; label: string }
    badge: string
    title: string
    closeLabel: string
  }
  context: {
    studentLabel: string
    matricula: string
    specialistLabel: string
    specialistIcon: IconName
    specialistName: string
    specialistArea: string
  }
  asignatura: { label: string; icon: IconName; help: string }
  fecha: { label: string; icon: IconName; value: string; help: string }
  tipo: { label: string; icon: IconName }
  descripcion: {
    label: string
    icon: IconName
    pautaLabel: string
    help: string
    calidad: string
    calidadIcon: IconName
    defaultText: string
  }
  notificar: { title: string; body: string }
  footer: {
    cancel: { label: string; icon: IconName }
    save: { label: string; icon: IconName }
    savingLabel: string
    error: string
  }
  asignaturas: AsignaturaOption[]
  tipos: ObservationType[]
}

export interface BitacoraStat {
  label: string
  value: string
  check?: boolean
}

export interface BitacoraAlumno {
  initials: string
  duaTag: string
  chips: { label: string; tone: ChipTone }[]
  name: string
  grupo: string
  stats: BitacoraStat[]
}
