import type { TonoChip } from '../../../Portal/shared/types'
import type { IconName } from '../../../utils/types'

export type Urgencia = 'Prioritaria' | 'Ordinaria'

export type FiltroUrgencia = 'todas' | Urgencia

export type TonoAcceso = 'primario' | 'azul' | 'durazno' | 'menta'

export type EstadoDocumento = 'completo' | 'parcial' | 'pendiente'

export interface CanalizacionDashboard {
  id: string
  iniciales: string
  nombre: string
  grado: string
  grupo: string
  folio: string
  docente: string
  materia: string
  motivo: string
  urgencia: Urgencia
  etiquetaUrgencia: string
  tonoUrgencia: TonoChip
}

export interface AccesoRapido {
  id: string
  titulo: string
  detalle: string
  icono: IconName
  tono: TonoAcceso
  destino: string
}

export interface CondicionDistribucion {
  id: string
  nombre: string
  alumnos: number
  porcentaje: string
  ajustes: string
  color: string
}

export interface DocumentoAuditoria {
  id: string
  nombre: string
  valor: string
  estado: EstadoDocumento
}
