

export type EstadoDocumentoCotejo = 'cotejado' | 'pendiente'

export interface DocumentoCotejo {
  id: string
  orden: number
  nombre: string
  detalle?: string
  estado: EstadoDocumentoCotejo
  fechaCotejo?: string
  verificadoPor?: string
  prorroga?: string
  nota?: string
}

export interface AlumnoCotejo {
  id: string
  matricula: string
  nombreCompleto: string
  curp: string
  gradoGrupo: string
  tutor?: {
    nombre: string
    parentesco: string
    telefono: string
  }
  fotoUrl?: string
}

export interface ObservacionesCotejo {
  texto: string
  requerido: boolean
}

export interface CotejoExpediente {
  expedienteId: string
  alumno: AlumnoCotejo
  documentos: DocumentoCotejo[]
  observaciones: ObservacionesCotejo
  registradoPor: string
  actualizadoEn?: string
}

export interface ResumenCotejo {
  cotejados: number
  pendientes: number
  total: number
}

export interface ConfirmacionGuardar {
  abierto: boolean
}
