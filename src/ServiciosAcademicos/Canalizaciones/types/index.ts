export type CanalizacionStep = 'paso1' | 'paso2'

export interface CanalizacionAlumno {
  nombre: string
  matricula: string
  grupo: string
  asignatura: string
  docente: string
  turno: string
}

export type AfectaAprendizaje = 'si' | 'no' | null

export type ManifestacionId =
  | 'desregulacion'
  | 'consignas'
  | 'aislamiento'
  | 'lectura-calculo'

export interface Manifestacion {
  id: ManifestacionId
  label: string
  icon: string
  checked: boolean
}

export type PrioridadId = 'ordinaria' | 'prioritaria' | 'urgente' | null

export interface Prioridad {
  id: PrioridadId
  title: string
  description: string
  icon: string
}

export interface CanalizacionFormData {
  afectaAprendizaje: AfectaAprendizaje
  manifestaciones: Manifestacion[]
  descripcion: string
  prioridad: PrioridadId
  draftSaved: boolean
  enviado: boolean
}
