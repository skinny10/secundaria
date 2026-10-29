

export type MotivoTransferencia = 'diagnostico_previo' | 'dificultades_evaluacion' | 'solicitud_padres'

export type UrgenciaTransferencia = 'ordinaria' | 'prioritaria' | 'urgente'

export type EstadoTransferencia = 'pendiente_recepcion' | 'recibida' | 'cerrada'

export interface EspecialistaSEE {
  id: string
  nombre: string
  especialidad: string
  turno: string
  cedula: string
}

export interface CondicionTransferencia {
  value: string
  label: string
}

export interface Transferencia {
  id: string
  folio: string
  alumnoId: string
  matricula: string
  motivo: MotivoTransferencia
  condicionPreliminar: string
  especialistaId: string
  urgencia: UrgenciaTransferencia
  notas?: string
  creadaPor: string
  creadaEn: string
  venceEn: string
  estado: EstadoTransferencia
}

export interface DatosAlumnoTransferencia {
  id: string
  matricula: string
  nombreCompleto: string
  nombre: string
  apellidos: string
  grado: string
  grupo: string
  turno: string
  curp?: string
  fotoUrl?: string
  condicionPrincipal?: string
  especialistaAsignado?: string
}
