import type { IconName } from '../../../utils/types'

export type CanalizacionOrigen = 'DOCENTE' | 'T. SOCIAL' | 'ASESOR' | 'SERVICIOS ACADÉMICOS'

export interface RegistroCanalizacion {
  id: string
  marcaTemporal: string
  nombre: string
  apellidos: string
  grado: string
  grupo: string
  turno: string
  origen: CanalizacionOrigen
  emisor: string
  asignatura: string
  estado: 'PENDIENTE' | 'RECIBIDO'
  folio: string
  fechaEmision: string
  afectaDesempeno: boolean | null
  descripcion: string
  plan: string[]
  matricula?: string
  especialistaAsignado?: string
  condicionReportada?: string
  sugerencias?: string[]
  documentosPendientes?: string[]
  curpEnmascarada?: string
  auditoriaId?: string
}

export interface Indicador {
  id: string
  label: string
  icon: IconName
  valor: string
  apoyo?: string
  color: string
  barra: number
  chip?: string
}
