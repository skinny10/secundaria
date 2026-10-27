import type { IconName } from '../../../utils/types'
import type { TonoChip } from '../../../Portal/shared/types'

export type EstatusExpediente = 'completo' | 'cotejo_pendiente' | 'validado'

export type AtencionSEE = 'ninguna' | 'en_atencion' | 'usaer' | 'dua'

export type TipoBloque = 'adecuaciones' | 'urgente' | 'protocolo'

export interface DocumentosExpediente {
  total: number
  validados: number
  pendientes: string[]
}

export interface TutorEstudiante {
  nombre: string
  parentesco: string
}

export interface BloqueInformativoData {
  tipo: TipoBloque
  titulo: string
  texto: string
  chip: string
}

export interface Estudiante {
  id: string
  matricula: string
  curp: string
  nombre: string
  apellidos: string
  fotoUrl?: string
  grado: string
  grupo: string
  turno: string
  edad: number
  tutor: TutorEstudiante
  documentos: DocumentosExpediente
  estatusExpediente: EstatusExpediente
  atencionSEE: AtencionSEE
  bloque: BloqueInformativoData
  fechaRegistro?: string
  origenAlta?: boolean
}

export type KpiId = 'total' | 'nee' | 'pendientes'

export interface KpiPadron {
  id: KpiId
  etiqueta: string
  icon: IconName
  tono: 'gris' | 'azul' | 'rosa'
  valor: number
}

export type AccionTipo = 'navegar' | 'transferir'

export type DestinoModulo =
  | 'expediente'
  | 'cotejo'
  | 'ficha'
  | 'alta'

export interface AccionEstudiante {
  id: string
  etiqueta: string
  icon: IconName
  tono: 'neutral' | 'forest' | 'coffee' | 'slate'
  tipo: AccionTipo
  destino?: DestinoModulo
}

export interface ConfiguracionEstatus {
  icon: IconName
  tono: TonoChip
}

export interface ConfiguracionAtencion {
  etiqueta: string
  icon: IconName
  tono: TonoChip
}

export interface ConfiguracionBloque {
  icon: IconName
  tono: 'menta' | 'rosa' | 'azul'
  chipTono: TonoChip
  chipIcon: IconName
}

export interface OpcionFiltro {
  value: string
  label: string
}

export interface FiltrosPadron {
  q: string
  grado: string
  estatus: string
  pagina: number
}
