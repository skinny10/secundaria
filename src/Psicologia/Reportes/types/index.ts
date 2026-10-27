import type { IconName } from '../../../utils/types'
import type { TonoChip } from '../../../Portal/shared/types'

export type { TonoChip }

export type TipoDocumento = 'concentrado' | 'oficio' | 'carta' | 'ficha'

export interface GeneradorFormato {
  id: TipoDocumento
  ciclo: string
  etiqueta: string
  chip: string
  icono: IconName
  iconoTono: 'menta' | 'sky' | 'peach' | 'neutral'
  titulo: string
  descripcion: string
  tipo: TipoDocumento
}

export interface FolioEmitido {
  folio: string
  ciclo: string
  fecha: string
  estudiante: string
  detalle: string
  tramite: string
  tipo: TipoDocumento
  estatus: string
  tono: TonoChip
  accion: string
  accionIcono: IconName
  grupo: string
}
