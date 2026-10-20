export type CanalizacionOrigen = 'DOCENTE' | 'T. SOCIAL' | 'ASESOR'

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
  afectaDesempeno: boolean
  descripcion: string
  plan: string[]
}

export interface Indicador {
  id: string
  label: string
  icon: string
  valor: string
  apoyo?: string
  color: string
  barra: number
  chip?: string
}
