export type EstadoBorrador = 'borrador' | 'registrado'

import type { IconName } from '../../../utils/types'

export type SexoRegistrado = 'hombre' | 'mujer' | 'otro' | ''

export type EstatusCurp =
  | 'sin_verificar'
  | 'certificada'
  | 'no_encontrada'
  | 'error_servicio'

export interface VerificacionCurp {
  estatus: EstatusCurp
  fecha?: string
  mensaje?: string
}

export interface IdentificacionAlta {
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  curp: string
  curpVerificada: VerificacionCurp
  fechaNacimiento: string
  sexo: SexoRegistrado
  discrepanciaCurpConfirmada: boolean
}

export interface AsignacionAlta {
  grado: string
  grupo: string
  turno: string
}

export interface TutorAlta {
  nombre: string
  parentesco: string
  telefono: string
  correo: string
  domicilio: string
}

export interface SaludAlta {
  institucion: string
  nss: string
  clinica: string
  alergias: string
  sugerencias: string[]
}

export type DiagnosticoPrevio = 'si' | 'en_proceso' | ''

export interface CondicionAlta {
  diagnosticoPrevio: DiagnosticoPrevio
  condicionPrincipal: string
  especialistaEmisor: string
}

export type EstadoDocumento = 'recibido' | 'pendiente' | 'validado' | 'plazo'

export interface DocumentoAlta {
  id: string
  nombre: string
  recibido: boolean
  estado: EstadoDocumento
  fechaLimite?: string
}

export interface DerivacionAlta {
  derivar: boolean
  especialistaId: string
}

export interface AltaBorrador {
  id: string
  estado: EstadoBorrador
  pasoActual: number
  pasosCompletados: number[]
  creadoPor: string
  actualizadoEn: string
  matriculaProvisional: string
  identificacion: IdentificacionAlta
  asignacion: AsignacionAlta
  tutor: TutorAlta
  salud: SaludAlta
  condicion: CondicionAlta
  documentos: DocumentoAlta[]
  derivacion: DerivacionAlta
  registroId?: string
}

export interface RegistroAltaResultado {
  borradorId: string
  estudianteId: string
  matricula: string
  folio: string
  canalizacionId?: string
  auditoriaId: string
}

export interface NotificacionAlta {
  id: string
  destinatario: string
  tipo: 'especialista' | 'plantilla_docente' | 'tutor'
  titulo: string
  detalle: string
  creadaEn: string
}

export interface AuditoriaAlta {
  id: string
  accion: 'registro_alta'
  actor: string
  rol: string
  creadaEn: string
  detalle: string
  referencia: string
}

export interface OpcionCatalogo {
  value: string
  label: string
}

export interface TurnoAlta extends OpcionCatalogo {
  horario: string
}

export interface GrupoAlta {
  value: string
  label: string
  grado: string
  grupo: string
}

export interface InstitucionSalud extends OpcionCatalogo {
  icono: IconName
  descripcion: string
}

export interface DocumentoCatalogo {
  id: string
  nombre: string
  chip: string
  chipTono: 'menta' | 'gris' | 'azul' | 'durazno'
  requisitoMinimo: boolean
}

export interface CondicionCatalogo extends OpcionCatalogo {
  descripcion: string
}

export interface EspecialistaSEE extends OpcionCatalogo {
  especialidad: string
}

export interface ErrorAlta {
  campo: string
  mensaje: string
  paso: 1 | 2 | 3
}

export interface OpcionesValidacionAlta {
  curpDuplicadaId?: string
}

export interface ResumenRegistro {
  nombre: string
  curpEnmascarada: string
  gradoGrupo: string
  turno: string
  tutor: string
  documentosRecibidos: number
  documentosTotal: number
  derivacion: string
  especialista: string
  condicion: string
  fechaNacimiento: string
  institucion: string
  documentosPendientes: number
  sugerencias: string[]
  correo: string
  telefono: string
  domicilio: string
  nombreEscuela: string
}
