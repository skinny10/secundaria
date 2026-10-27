import type { IconName } from '../../../utils/types'
import type { TonoChip } from '../../../Portal/shared/types'

export type SeccionId = 'A' | 'B' | 'C' | 'D' | '1' | '2' | '3' | '4'

export interface MigasExpediente {
  texto: string
  activo?: boolean
}

export interface PestanaSeccion {
  id: SeccionId
  etiqueta: string
  icono: IconName
}

export interface AlumnoExpediente {
  nombre: string
  iniciales: string
  grado: string
  matricula: string
  folio: string
  diagnostico: string
  diagnosticoCorto: string
  curp: string
  ciclo: string
  expediente: string
  responsable: string
  estado: string
}

export interface AjusteDUA {
  etiqueta: string
  titulo: string
  descripcion: string
}

export interface GrupoMaterias {
  id: string
  titulo: string
  principio: string
  icono: IconName
  ajustes: AjusteDUA[]
}

export interface TextoEnriquecido {
  texto: string
  bold?: boolean
}

export interface FichaSemaforo {
  color: string
  titulo: string
  texto: string
}

export interface ProtocoloCrisis {
  id: string
  tipo: 'pase' | 'estrategia'
  titulo: string
  parrafo: TextoEnriquecido[]
  instrumento?: string
  duracion?: string
  espacio?: TextoEnriquecido[]
  etiqueta?: string
  fichas?: FichaSemaforo[]
  nota?: string
}

export interface FirmaExpediente {
  id: string
  rol: string
  autenticacion: string
  nombre: string
  cargo: string
  credencial: string
  fecha: string
  token: string
  firmado: boolean
  solicitada?: boolean
  trazo: 'claudia' | 'roberto' | 'tovilla'
}

export interface ContactoIntervencion {
  id: string
  nombre: string
  relacion: string
  telefono?: string
  documento?: boolean
}

export interface MetaPEI {
  id: string
  titulo: string
  estado: string
  tono: TonoChip
  descripcion: string
}

export interface IndicadorAvance {
  id: string
  label: string
  valor: number
  color: string
}

export interface ValidacionJuridica {
  vigente: string
  emitido: string
}
