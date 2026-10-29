export type SeccionConfigId = 'datos' | 'calendario' | 'turnos' | 'dua'

export type EstadoValidacionCCT = 'validada' | 'pendiente' | 'invalida'

export interface RecesoConfig {
  id: string
  nombre: string
  inicio: string
  duracionMin: number
}

export interface TurnoConfig {
  id: string
  nombre: string
  inicio: string
  fin: string
  moduloMin: number
  modulos: number
  recesos: RecesoConfig[]
  activo: boolean
  asignaciones: number
}

export interface EspacioConfig {
  id: string
  nombre: string
  tipo: string
  capacidad: number
  activo: boolean
  pasesActivos: number
}

export interface DirectorConfig {
  nombre: string
  correo: string
  telefono: string
  cedula: string
}

export interface IdentidadConfig {
  nombre: string
  cct: string
  cctValidacion: EstadoValidacionCCT
  entidad: string
  municipio: string
  domicilio: string
  telefono: string
  correo: string
  director: DirectorConfig
}

export interface PlantelConfig {
  version: number
  actualizadoPor: string
  actualizadoEn: string
  identidad: IdentidadConfig
  ciclo: { activo: string }
  turnos: TurnoConfig[]
  intervalo: { pausaMin: number; atenuadorActivo: boolean; db: number }
  capacidades: { cupoAula: number; limiteDictamenGrupo: number }
  espacios: EspacioConfig[]
  protocolos: {
    slaUrgenteMin: number
    slaPrioritariaHoras: number
    slaOrdinariaDiasHabiles: number
    paseSensorialMin: number
    paseToleranciaMin: number
  }
  seguridad: { cifrado: boolean; reautenticacion2FA: boolean; retencionDias: number }
}

export type ErroresConfig = Record<string, string>

export interface CambioConfig {
  ruta: string
  etiqueta: string
  antes: string
  despues: string
  sensible: boolean
}

export interface MetaGuardado {
  motivo: string
  actor: string
  reautenticado: boolean
}
