import type { DestinoModulo } from '../../PadronGeneral/types'

export type ModuloServicios =
  | 'padron'
  | 'alta'
  | 'cotejo'
  | 'transferencias'
  | 'estadisticas'
  | 'expediente'
  | 'ficha'

const segmentos: Record<ModuloServicios, string> = {
  padron: 'padron',
  alta: 'alta',
  cotejo: 'cotejo',
  transferencias: 'transferencias',
  estadisticas: 'estadisticas',
  expediente: 'expediente',
  ficha: 'ficha',
}

export function rutaServicios(modulo: ModuloServicios, alumno?: string): string {
  const base = `#servicios-academicos/${segmentos[modulo]}`
  return alumno ? `${base}?alumno=${encodeURIComponent(alumno)}` : base
}

export function rutaAccion(destino: DestinoModulo, alumno: string): string {
  return rutaServicios(destino, alumno)
}
